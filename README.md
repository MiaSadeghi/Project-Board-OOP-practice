# Project Board

This is a simple project management application to showcases the use of classes and OOP concepts in JavaScript. The application allows users to manage projects by adding them to either an "active projects" list or a "finished projects" list. Users can switch projects between the two lists and view additional information about a project using tooltips.

I made this project with five main classes:

**Tooltip**: Represents a tooltip that displays additional information about a project when clicked. It has methods to show and hide tooltips.

**DOMHelper**: Provides static helper methods for manipulating DOM elements, such as moving elements, clearing event listeners, and removing elements.

**ProjectItem**: Represents a project item in the project list. It has methods to show extra information about the project, connect switch and info buttons, and update the project item.

**ProjectList**: Represents a list of projects. In this app there are two, "active projects" and "finished projects". this class has methods to switch projects between the lists (finish a project, or activate it), add projects, and set switch handler functions.

**App**: Serves as the entry point of the application and initializes the project lists, calls the setSwitchHandler functions, and starts the application.

Detailed documentation of these classes are found in the [classes](#classes) section of this file.

## Usage

To use this project, follow these steps:

1. Clone the repository to your local machine.

2. Open the `index.html` file in your web browser.

3. The application will display two lists, **"Active Projects"** and **"Finished Projects"**, along with some sample projects.

4. You can click on the **"More Info"** button for any project to view additional information in a tooltip. You can also close the tooltip by clicking on it.

5. You can click on the **"Finish"** or **"Activate"** button for any project to move it between the "Active Projects" and "Finished Projects" lists.

6. You can add new projects by modifying the HTML code in the `index.html` file and initializing the ProjectItem class with the appropriate parameters.

## Features

The project demonstrates the following features:

- Use of classes and object-oriented programming (OOP) concepts in JavaScript.
- Creation and manipulation of DOM elements using helper methods.
- Event handling and event delegation to manage user interactions.
- Updating and synchronizing data between different parts of the application.
- Separation of concerns through encapsulation and abstraction using classes.
- Use of static methods in a class for utility functions.
- Binding of event handlers with proper context using `bind()`.

## Classes

#### Tooltip

The Tooltip class provides methods for showing and hiding tooltips.

##### Methods

`hide(tooltipElement, project)`: Hides the tooltip element and sets the hasActiveTooltip property of the associated project object to false.

`show(project)`: Shows the tooltip for the given project object. It creates a new paragraph element with the tooltip content, adds it to the DOM after the project element, and attaches a click event listener to hide the tooltip when clicked.

#### DOMHelper

The DOMHelper class provides utility methods for DOM manipulation.

##### Methods

`moveElement(elementId, destination)`: Moves the DOM element with the given elementId to the DOM element with the given destination selector.

`clearEventListeners(element)`: Clones the given DOM element and replaces it with the cloned element, effectively clearing all event listeners attached to the original element. It returns the cloned element.

`removeElement(tooltipElement)`: Removes the given tooltip element from the DOM.

#### ProjectItem

The ProjectItem class represents a project item in the project list.

##### Properties

`id`: The ID of the project item DOM element.

`hasActiveTooltip`: A boolean flag to keep track of whether the tooltip for this project item is currently active.

`title`: The title of the project item.

`details`: The details of the project item.

`extraInfo`: The extra information associated with the project item.

`updateProjectListHandler`: The event handler function for updating the project list.

##### Methods

`showExtraInfoHandler()`: Shows the extra information tooltip for the project item when called. It creates a new instance of the Tooltip class and calls its `show()` method with the current project item as an argument.

`connectSwitchButton()`: Connects the event handler for the switch button of the project item. It clears any existing event listeners on the switch button, and attaches a new event listener that calls the update project list handler with the project item's `id` as an argument when clicked.

`connectInfoButton()`: Connects the event handler for the info button of the project item. It attaches an event listener that calls the `showExtraInfoHandler()` method of the current project item when clicked.

`update(updateListFn, listId)`: Updates the project item's update project list handler and switch button text content based on the given arguments.

#### ProjectList

The ProjectList class represents a list of projects.

##### Properties

`id`: The ID of the project list DOM element.

`projects`: An array to store the ProjectItem objects associated with the project list.

##### Methods

`setSwitchHandlerFn(switchHandlerFn)`: Sets the switch handler function for the project list, which is used to switch projects between active and finished lists.

`switchProjects(projectId)`: Switches a project from the active to finished list or vice versa. It calls the switch handler function with the project item object that matches the given projectId as an argument, and removes the project item from the current list of projects.

`addProject(project)`: Adds a new project to the project list. It pushes the project item object to the projects array, moves the project item DOM element to the project list DOM element, and calls the `update()` method of the project item object to update its `updateProjectListHandler` and switch button textContent.

#### App

The App class represents the main application entry point.

##### Methods

`init()`: This is a static method that initializes the main application. This method sets up two instances of the ProjectList class for the **"active-projects"** and **"finished-projects"** lists, and defines the switch handlers to allow projects to be moved between the lists.
