import { showElements, hideElements, switchDisplay, finishTask, hideModal } from "./script.js";

const todoModalBtn = document.getElementById("todo-modal-btn");
const todoModal = document.querySelector(".todo-modal");
const newTodoBtn = document.getElementById("new-todo-btn");
const todoInput = document.getElementById("todo-input");
const todoInitialDisplay = document.getElementById("todo-initial-display");
const todoListDisplay = document.getElementById("todo-list-display");

todoModalBtn.addEventListener("click", () => {
    todoModal.classList.toggle("modal-active");
    contentCheck(todoListDisplay, todoInput, newTodoBtn);
});

newTodoBtn.addEventListener("click", () => {
    switchDisplayOpacity(newTodoBtn,todoInput);
});

function switchDisplayOpacity(closeElement, openElement){
    closeElement.style.opacity = "0";
    openElement.style.opacity = "1";
}

todoInput.addEventListener("keydown", (event) => addTodoItem(event));

function addTodoItem(event){
    if(event.key === "Enter" || event.keyCode === 13){
        if(!todoInput.value) return;

    todoInitialDisplay.style.display = "none";

    const listItemContainer = document.createElement("li");
    listItemContainer.classList.add("list-item-container");

        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("checkbox-container");
            const itemCheckbox = document.createElement("input");
            itemCheckbox.type = "checkbox";
            itemCheckbox.classList.add("todo-item-checkbox");
        checkboxContainer.append(itemCheckbox);

        const todoItemContainer = document.createElement("div")
        todoItemContainer.classList.add("todo-item-container");
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo-item");
            todoItem.textContent = todoInput.value;
            const todoItemInput = document.createElement("input");
            todoItemInput.type = "text";
            todoItemInput.classList.add("todo-item-input");
        todoItemContainer.append(todoItem, todoItemInput);

        const dotIconListContainer = document.createElement("div");
        dotIconListContainer.classList.add("dot-icon-list-container");
            const dotIconList = document.createElement("i");
            dotIconList.classList.add("fa-solid");
            dotIconList.classList.add("fa-ellipsis");
            const todoSettingsModal = document.createElement("div");
            todoSettingsModal.classList.add("todo-settings-modal");
                const editTodoBtn = document.createElement("li");
                editTodoBtn.classList.add("todo-settings-btn");
                editTodoBtn.textContent = "Edit";
                const deleteTodoBtn = document.createElement("li");
                deleteTodoBtn.classList.add("todo-settings-btn");
                deleteTodoBtn.textContent = "Delete";
            todoSettingsModal.append(editTodoBtn,deleteTodoBtn);
        dotIconListContainer.append(dotIconList, todoSettingsModal);
        
    listItemContainer.append(checkboxContainer, todoItemContainer, dotIconListContainer);
    todoListDisplay.append(listItemContainer);

        //adds a line-through todoItem when checkBox is checked
        itemCheckbox.addEventListener("click", () => finishTask(todoItem))
        
        //switches display of todoItem and todoItemInput
        todoItem.addEventListener("dblclick", () => editTodo(todoItem, todoItemInput))

        //switches display of todoItemInput and todoItem
        //passes the value of todoItemInput to todoItem
        todoItemInput.addEventListener("keydown", (event) => confirmTodoEdit(event, todoItem, todoItemInput))

        //adds hover effects for the dot icon
        todoItem.addEventListener("mouseover", () => showElements(dotIconList))
        todoItem.addEventListener("mouseout", () => hideElements(dotIconList))

        dotIconListContainer.addEventListener("mouseover", () => showElements(dotIconList))
        dotIconListContainer.addEventListener("mouseout", () => hideElements(dotIconList))

        dotIconList.addEventListener("click", (event) => {
            addBgColor(event, listItemContainer);
            showElements(todoSettingsModal);
        });

        document.addEventListener("click", (event) => removeBgColor(event, listItemContainer))

        editTodoBtn.addEventListener("click", () => editTodo(todoItem, todoItemInput))

        deleteTodoBtn.addEventListener("click", () => {
            deleteElement(listItemContainer);
            // adjustYPositionDown();
            contentCheck(todoListDisplay, todoInput, newTodoBtn)
        })

        document.addEventListener("click", (event) => hideModal(event, dotIconListContainer, todoSettingsModal));

        // adjustYPositionUp();

        todoInput.value = "";
    }
}

// let originYPosition = -80;
// function adjustYPositionUp(){
//     if(todoModal.style.transform === `translateY(-328.4px)`) return
//     originYPosition -= 13.8;
//     todoModal.style.transform = `translateY(${originYPosition}px)`;
//     console.log(todoModal.style.transform)
// }

// function adjustYPositionDown(){
//     originYPosition += 13.8;
//     if(originYPosition > -90) {
//         originYPosition = -80;
//         return todoModal.style.transform = "translateY(-150px)";
//     }
//     todoModal.style.transform = `translateY(${originYPosition}px)`;
//     console.log(todoModal.style.transform)
// }

function editTodo(textElement, inputElement){
    inputElement.value = textElement.textContent;
    switchDisplay(textElement, inputElement);
}

function confirmTodoEdit(event, textElement, inputElement){
    if(event.key === "Enter" || event.keyCode === 13){
    textElement.textContent = inputElement.value;
    switchDisplay(inputElement, textElement)
}}

function removeBgColor(event,container){
    if(!container.contains(event.target)){
        container.style.background = "none";
}}

function addBgColor(event, container){
    container.style.background = "rgba(255,255,255,0.1)";
}

function deleteElement(element){
    element.remove()
}

function contentCheck(container,input,button){
   if(!container.hasChildNodes()){
        todoInitialDisplay.style.display = "flex";
        todoModal.style.transform = "scale(-150px)";
        switchDisplayOpacity(input,button);
}}