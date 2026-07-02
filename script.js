
        let taskInput = document.getElementById("taskInput");
        let list = document.getElementById("list");
        let count = document.getElementById("count");
        let addbtn = document.getElementById("addbtn");
        let msg = document.getElementById("msg");

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        renderTasks();
        
        addbtn.addEventListener("click",addTask);

        function addTask(){

            let input = taskInput.value; //.value to get what user typed
            if(input.trim()==="") return;
            
            for(let task of tasks){ //traversing the whole list
                if(input.trim().toLowerCase()===task.text.trim().toLowerCase()){ //comparing current item to each item in list (trimmed version of all) and firstChild used coz delete is also there and lowerCase to remove case sensitivity
                    msg.textContent="Task already exists!";
                    return;
                }
            }

            let newTask = {text : input, completed : false};
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            
             msg.textContent="";
            taskInput.value="";
            
            renderTasks();
        }

        function updateCount(){
            count.textContent = "Tasks: "+tasks.length;
        }

        function createTaskElement(task){
            let item = document.createElement("li");
            item.dataset.text = task.text;

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            item.appendChild(checkbox);

            let text = document.createElement("span");
            text.textContent = task.text;

            if(task.completed){
                text.classList.add("done");
            }
            item.appendChild(text);
            
            let del = document.createElement("button");
            del.textContent = "Delete";
            del.classList.add("delete-btn");
            item.appendChild(del);
            return item;
        }

        list.addEventListener("click", function(e){

            if(e.target.classList.contains("delete-btn")){
                let delContent = e.target.parentElement.dataset.text;
                tasks = tasks.filter(function(task){ //filter to delete task not fulfilling condition
                    return task.text !== delContent; //condition
                });
                localStorage.setItem("tasks", JSON.stringify(tasks)); //saved updated data set
                renderTasks();
            }

             else if(e.target.type === "checkbox"){
                let doneContent = e.target.parentElement.dataset.text;
                tasks.forEach(function(task){ //looping through every element
                    if(task.text === doneContent){ //if it is the current clicked task 
                        task.completed = e.target.checked; //mark it opposite if it was true and was clicked mark false and vice versa
                    }
                    if(e.target.checked){
                        confetti({
                        particleCount: 30,
                        spread: 50,
                        origin: { y: 0.7 },
                        });
                    }
                });
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            }
        });

        taskInput.addEventListener("keypress", function(e){
            if(e.key==="Enter"){
                addTask();
            }
        });

        function renderTasks(){
            list.innerHTML =""; //wipe ui

            tasks.forEach(function(task){
                let item = createTaskElement(task);
                list.appendChild(item);
            });

            updateCount();
        }
