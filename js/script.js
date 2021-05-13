// Form Read Data
let submitBtn = document.getElementById("submit-btn");
let toDoNameInput = document.getElementById("to-do");
let radioBtnsInput = Array.from(document.querySelectorAll(".radio input"))
submitBtn.addEventListener("click", handleFormData);

function handleFormData(_event){
    _event.preventDefault();
    let toDoName = toDoNameInput.value;
    let toDoPrio;
    radioBtnsInput.forEach(function(_radioBtn){
        if(_radioBtn.checked){
            toDoPrio = _radioBtn.value
        }
        
    })
    if(toDoName === "" || toDoPrio === undefined){
    } else {
        addListItem(toDoName, toDoPrio, currentTaskList)
    }
    // reset form
    toDoNameInput.value = "";
    radioBtnsInput.forEach(function(_radioBtn){
        _radioBtn.checked = false   
    })
}
// Add Items + Delete Btn + Finished Btn
const currentTaskList = document.getElementById("current-task-list");
const finishedTaskList = document.getElementById("finished-task-list");
const dropAreas = [currentTaskList, finishedTaskList];



function addListItem(_taskName, _prio, _DomList){
    let task = document.createElement("div")
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
    const dragables = document.querySelectorAll(".task");
    dragables.forEach(function(dragable){
        dragable.addEventListener("dragstart", function(_event){
            dragable.classList.add("dragging");
        })
        dragable.addEventListener("dragend", function(_event){
            dragable.classList.remove("dragging")
        })
    })
    finishedTaskList.addEventListener("dragover", function(_event){
        _event.preventDefault();
        const dragging = document.querySelector(".dragging");
        finishedTaskList.appendChild(dragging);
    })
    currentTaskList.addEventListener("dragover", function(_event){
        _event.preventDefault();
        const dragging = document.querySelector(".dragging");
        currentTaskList.appendChild(dragging);
    })

}


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
