const checkboxList = document.querySelectorAll('.checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const progressBar = document.querySelector('.progress-bar');
const progressValue  =document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");

const allQuotes = [
    "Raise the bar by completing your goals!",
    "Well begun!",
    "Just a step away, keep going!",
    "You just completed all the goals!"
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    first: {
        name: "",
        completed: false,
    },
    second: {
        name: "",
        completed: false,
    },
    third: {
        name: "",
        completed: false,
    },
};

let completedGoals = Object.values(allGoals).filter((goal)=>goal.completed).length;
progressValue.style.width = `${(completedGoals / (inputFields.length)) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoals}/${inputFields.length} completed`;
progressLabel.innerText = allQuotes[completedGoals];

checkboxList.forEach((checkbox) => {
    checkbox.addEventListener("click",(e)=>{
        const allGoalsAdded = [...inputFields].every((input)=>{
            return input.value;
        }) 

        if(allGoalsAdded){
            checkbox.parentElement.classList.toggle("completed");
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].completed = !allGoals[inputId].completed;
            completedGoals = Object.values(allGoals).filter((goal)=>goal.completed).length;
            progressValue.style.width = `${completedGoals / 3 * 100}%`;
            progressValue.firstElementChild.innerText = `${completedGoals}/3 completed`;
            progressLabel.innerText = allQuotes[completedGoals];
            localStorage.setItem("allGoals", JSON.stringify(allGoals));
        }
        else{
            progressBar.classList.add("show-error");
        }
    })
})

inputFields.forEach((input)=>{
    input.value = allGoals[input.id].name;

    if(allGoals[input.id].completed){
        input.parentElement.classList.add("completed");
    }

    input.addEventListener("focus", ()=>{
        progressBar.classList.remove("show-error");
    })

    input.addEventListener("input", ()=>{
        if(allGoals[input.id].completed){
            return input.value = allGoals[input.id].name;
            
        }

        allGoals[input.id].name = input.value;
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
    })
})

