
import {light , dark} from './theme.js'

const taskContainer = document.querySelector('.list');
const taskInput = document.querySelector("#newTask");
const taskCount = document.querySelector('.num');
const themeBtn = document.querySelector('#theme')


// storage
class Store{
    static getTasks() {
        let tasks;
        if (localStorage.getItem("taskList") === null) {
            tasks = []
        }
        else {
            tasks = JSON.parse(localStorage.getItem('taskList'));
        }
        return tasks;
    }
    static setTasks(task) {
        let tasks = Store.getTasks();
        tasks.push(task)
        localStorage.setItem("taskList", JSON.stringify(tasks));
    }

    static removeTask(el) {
        let tasks = Store.getTasks();
        tasks.forEach((task, index) => {
            if (task.task == el) {
                tasks.splice(index, 1)
            }
        });
        localStorage.setItem('taskList',JSON.stringify(tasks))

    }
}


// task class
class Task{
    constructor(task) {
        this.task = task;
    }
}

//check if user is using a mobile or a pc
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


// class to control UI
class UI{
    static lightTheme() {
        light(mobileCheck())
    }
    static darkTheme() {
        dark(mobileCheck())
    }
}


// set theme by default
let theme;

// listen for use request on the theme
themeBtn.addEventListener("change", () => {
    
    // store the request in local storage
    localStorage.setItem("theme",themeBtn.checked)
})

//run on content load, check for default button checked status
document.addEventListener('DOMContentLoaded', () => {

    // theme settings
    themeBtn.checked = JSON.parse(localStorage.getItem("theme"));

    // display tasks on load
    ToDo.display();


    // task count
    taskCount.textContent = (taskContainer.childNodes.length);

});


if (themeBtn.checked) {
    theme = UI.darkTheme();
}
else {
    theme = UI.lightTheme();
}
themeBtn.addEventListener('change', (e) => {
    if(e.target.checked){
        UI.darkTheme()
    }
    else {
        UI.lightTheme()
    }
})


// main ToDo list class
class ToDo{

    static display() {
        let list = Store.getTasks();
        list.forEach((task)=>ToDo.addTask(task.task))
    }

    // count the number of tasks
    static count(num = 0) {
        taskCount.textContent = +(taskCount.textContent) + +num;
    }

    // add tasks to main container
    static addTask(job) {
        let taskList = document.createElement('li');
        taskList.classList.add('item')
        taskList.innerHTML = `
                   <label for="completeTask" class="complBtn"></label>
                   <input type="checkbox" id="complete" class="completeBtn">
                   <span class="job">${job}</span>
                   <button class="remove">
                       <img src="images/icon-cross.svg" alt="remove" class="remove">
                   </button>
               `
        taskContainer.appendChild(taskList)
    }

    // clear the input field after use
    static clear() {
        taskInput.value = '';
    }

    // remove element from UI
    static removeElement(el) {
        el.target.parentElement.parentElement.remove()
    }

    static removeLocal() {
        const tasks = JSON.parse(localStorage.getItem("taskList"));
        tasks.forEach((task, index) => {
            if (task.task) {
                tasks.splice(index,1)
            }
        })
        localStorage.setItem("taskList",JSON.stringify(tasks))
    }

    static completeTask(el) {
        if (el.target.classList.contains('completeBtn')) {
        let task = el.target.parentElement;
        let button = el.target;
        if (button.checked) {
            task.classList.add('complete')
            task.setAttribute('data-state','complete')
        }
        else {
            task.classList.remove('complete')
            task.setAttribute('data-state','not-complete')
        }
        
    }
    }

    }


ToDo.clear();

// add task to list when user press enter
taskInput.addEventListener('keydown', (e) => {
    if (e.keyCode == 13 && taskInput.value == '') {
        return
    }
    else if (e.keyCode == 13) {
        ToDo.addTask(taskInput.value)
        let item = new Task(taskInput.value)
        // Storage.addTasks(item)
        Store.setTasks(item)
        ToDo.count(1)
        ToDo.clear()
    }
    else {
        return
    }
})


// remove a task 
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')){
        Store.removeTask(e.target.parentElement.parentElement.children[2].textContent)
        ToDo.removeElement(e)
        ToDo.count(-1)
    }


}
)


// complete a task
document.addEventListener('click',(e)=>{
    ToDo.completeTask(e)
})

const clrComplete = document.querySelector('.compcls');
clrComplete.addEventListener('click', () => {
    let completeTasks = document.querySelectorAll('.item[data-state="complete"]')
    completeTasks.forEach((task) => {
        task.remove();
    })
    ToDo.count(-completeTasks.length)
})



function filter(state){
    let taskList = document.querySelectorAll('.item');
    switch (state) {
        case 'complete':
            taskList.forEach((task) => {
                if (task.dataset.state == 'complete') {
                    task.classList.remove('hide')
                }
                else {
                    task.classList.add('hide')
                }
            });
            break;
        
        case 'active':
            taskList.forEach((task) => {
                if (task.dataset.state == 'complete') {
                    task.classList.add('hide')
                }
                else{
                    task.classList.remove('hide')
                }
            })
            break;
        default:
            taskList.forEach((task) => {
                task.classList.remove('hide')
            })
    }
    }

const filterBtn = document.querySelectorAll("input[type='radio']")
filterBtn.forEach((choice) => {
    choice.addEventListener('change', (e) => {
        filter(e.target.value)
    })
})
