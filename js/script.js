// Form Read Data
const form = document.getElementById("form");
const toDoNameInput = document.getElementById("to-do");
const radioBtnsInput = Array.from(document.querySelectorAll(".radio input"));
const formBtn = document.getElementById("submit-btn");
form.addEventListener("submit", handleFormData);

function handleFormData(_event){
    _event.preventDefault();
    let toDoName = toDoNameInput.value;
    let toDoPrio;
    radioBtnsInput.forEach(function(_radioBtn){
        if(_radioBtn.checked){
            toDoPrio = _radioBtn.value;
        }
    })
    addListItem(toDoName, toDoPrio, currentTaskList)
    // reset form
    toDoNameInput.value = "";
    radioBtnsInput.forEach(function(_radioBtn){
        _radioBtn.checked = false;
    })
}

// Add Task + Delete Btn + Finished Btn
const currentTaskList = document.getElementById("current-task-list");
const finishedTaskList = document.getElementById("finished-task-list");
const dropAreas = [currentTaskList, finishedTaskList];

function addListItem(_taskName, _prio, _DomList){
    // create and add task
    const task = document.createElement("div")
    task.classList.add("task");
    task.draggable = "true";
    task.innerHTML = `<div class="task-element infos">
    <p>${_taskName}</p>
    <p class="${_prio.toLowerCase()}">${_prio}</p>
    </div>
    <div class="task-element btns">
    <p class="btn" id="delete-btn">Delete</p>
    <p class="btn" id="finished-btn" >Finished</p>
    </div>`
    _DomList.appendChild(task);
    
    // Events Btns
    const finishedBtns = document.querySelectorAll("#finished-btn");
    finishedBtns.forEach(function(finishedBtn){
        finishedBtn.addEventListener("click", handleFinishedTask);
    })
    const deleteBtns = document.querySelectorAll("#delete-btn");
    deleteBtns.forEach(function(deleteBtn){
        deleteBtn.addEventListener("click", handleDeleteTask);
    })
    // Drag and Drop
    // add class ".dragging" if element is draged
    const dragables = document.querySelectorAll(".task");
    dragables.forEach(function(dragable){
        dragable.addEventListener("dragstart", function(_event){
            dragable.classList.add("dragging");
        })
        dragable.addEventListener("dragend", function(_event){
            dragable.classList.remove("dragging");
        })
    })
}
// List Events - dragover
currentTaskList.addEventListener("dragover", handelDragoverList);
finishedTaskList.addEventListener("dragover", handelDragoverList);
//  Task Btns Event handlers
function handleDeleteTask(_event){
    const elemntDel = _event.currentTarget.parentElement.parentElement;
    const list = _event.currentTarget.parentElement.parentElement.parentElement;
    if(list.id === "current-task-list"){
        currentTaskList.removeChild(elemntDel);
    } else if(list.id === "finished-task-list"){
        finishedTaskList.removeChild(elemntDel);
    }
}

function handleFinishedTask(_event){
    const elementFinished = _event.currentTarget.parentElement.parentElement;
    currentTaskList.removeChild(elementFinished);
    finishedTaskList.appendChild(elementFinished);
}
// Dragover handler
function handelDragoverList(_event) {
    _event.preventDefault();
    const dragging = document.querySelector(".dragging");
    _event.currentTarget.appendChild(dragging);
}