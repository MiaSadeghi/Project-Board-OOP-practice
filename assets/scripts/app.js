class Tooltip {
  hide(tooltipElement, project) {
    DOMHelper.removeElement(tooltipElement);
    project.hasActiveTooltip = false;
  }

  show(project) {
    const tooltipElement = document.createElement("p");
    tooltipElement.textContent = project.extraInfo;
    document
      .getElementById(project.id)
      .insertAdjacentElement("beforeend", tooltipElement);
    tooltipElement.addEventListener("click", () => {
      this.hide(tooltipElement, project);
    });
  }
}

class DOMHelper {
  static moveElement(elementId, destination) {
    const element = document.getElementById(elementId);
    const destinationEl = document.querySelector(destination);
    destinationEl.append(element);
  }

  static clearEventListeners(element) {
    const clonedEl = element.cloneNode(true);
    element.replaceWith(clonedEl);
    return clonedEl;
  }

  static removeElement(element) {
    element.remove();
  }
}

class ProjectItem {
  constructor(id, updateProjectListFn) {
    this.hasActiveTooltip = false;
    this.id = id;
    this.updateProjectListHandler = updateProjectListFn;
    this.title = document.getElementById(id).children[0].textContent;
    this.details = document.getElementById(id).children[1].textContent;
    this.extraInfo = document.getElementById(id).dataset.extraInfo;
    this.connectInfoButton();
    this.connectSwitchButton();
  }

  showExtraInfoHandler() {
    if (this.hasActiveTooltip) return;
    const tooltip = new Tooltip();
    tooltip.show(this);
    this.hasActiveTooltip = true;
  }

  connectSwitchButton() {
    const projectEl = document.getElementById(this.id);
    let switchButton = projectEl.querySelectorAll("button")[1];
    switchButton = DOMHelper.clearEventListeners(switchButton);
    switchButton.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id),
    );
  }
  connectInfoButton() {
    let infoButton = document.getElementById(this.id).querySelector("button");
    infoButton.addEventListener("click", this.showExtraInfoHandler.bind(this));
  }

  update(updateListFn, listId) {
    this.updateProjectListHandler = updateListFn;
    this.connectSwitchButton();
    document.getElementById(this.id).querySelectorAll("button")[1].textContent =
      listId === "active-projects" ? "Finish" : "Activate";
  }
}

class ProjectList {
  constructor(id) {
    this.id = id;
    this.projects = [];
    let listItems = document.getElementById(id).querySelectorAll("li");
    listItems.forEach((item) => {
      this.projects.push(
        new ProjectItem(item.id, this.switchProjects.bind(this)),
      );
    });
  }

  setSwitchHandlerFn(switchHandlerFn) {
    this.switchHandler = switchHandlerFn;
  }

  switchProjects(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.id} ul`);
    project.update(this.switchProjects.bind(this), this.id);
  }
}

class App {
  static init() {
    const activeProjects = new ProjectList("active-projects");
    const finishedProjects = new ProjectList("finished-projects");
    activeProjects.setSwitchHandlerFn(
      finishedProjects.addProject.bind(finishedProjects),
    );
    finishedProjects.setSwitchHandlerFn(
      activeProjects.addProject.bind(activeProjects),
    );
  }
}

App.init();
