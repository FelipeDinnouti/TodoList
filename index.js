const task_list = document.getElementById("task_list");
const add_button = document.getElementById("button");
const task_name_input = document.getElementById("task_name_input");

function create_task_object(text) {
    if (text === "") {
        return
    }

    // Creating the document objects 
    const task_object = document.createElement("li");
    const checkbox = document.createElement("input");
    const p = document.createElement("p");

    // Remember to change their properties to match the example one
    checkbox.type = "checkbox";
    checkbox.className = "task_checkbox";

    p.className = "task_description";
    p.innerText = text;

    task_object.className = "task";

    // Append child adds the element as a child of the other element
    // other_element.appendChild(element)
    task_object.appendChild(checkbox);
    task_object.appendChild(p);

    // Add the object to the task_list
    task_list.appendChild(task_object);
}

add_button.onclick = function() {
    create_task_object(task_name_input.value);
    // Reset the input
    task_name_input.value = ""
}