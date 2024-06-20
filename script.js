import { bgImgs, mantras, quotesArray } from "./variables.js";

const bgContainer = document.getElementById("bg-container");
export const bgLocation = document.querySelector(".bg-location");
export const bgPhotographer = document.querySelector(".bg-photographer");

function randomBackground(){
    let randomize = Math.floor(Math.random() * bgImgs.length);
    bgContainer.src = bgImgs[randomize].imgUrl;
    bgLocation.innerHTML = bgImgs[randomize].location;
    bgPhotographer.innerHTML = `${bgImgs[randomize].photographer}
                <i class="fa-regular fa-heart" style="color: #ffffff;"></i>
                <img src="./images/icons8-skip-14.png">`;
}
randomBackground()

const clock = document.getElementById("clock");
const clockContainer = document.getElementById("clock-container");
const dottedIcon = document.getElementById("dotted-icon");
const rotateIcon = document.getElementById("rotate-icon");
const modalTime = document.getElementById("modal-time");
const toggle = document.querySelector(".toggle");

function showTime(){
    const currentDate = new Date();
    let hours = 0;
    const minutes = String(currentDate.getMinutes()).padStart(2,0);

    //"active" indicates military time/24hour clock
    //condition checks if it DOESNT contain the class
    if(!(toggle.classList.contains("active"))){
        if(currentDate.getHours() <= 12){ 
            hours = currentDate.getHours();
        } else {
            hours = currentDate.getHours()-12;
        }
    } else {
        hours = String((currentDate.getHours())).padStart(2,0);
    }     
    clock.innerHTML = `${hours}:${minutes}`;
}

function updateFunctions(){
    setInterval(showTime, 200);
    // setInterval(randomMantra, 1000 * 15); //update
    setInterval(() => switchDisplay(greetingDisplay, mantraDisplay), 1000 * 15);
    setInterval(() => switchDisplay(mantraDisplay, greetingDisplay), 1000 * 30);
    setInterval(updateGreeting, 1000 * 60 * 60);
}
updateFunctions();

clockContainer.addEventListener("mouseover", () => showElements(dottedIcon, rotateIcon));
clockContainer.addEventListener("mouseout", () => hideElements(dottedIcon, rotateIcon));

export function showElements(firstElement, secondElement){
    if(!secondElement) return firstElement.style.transform = "scale(1)";
    firstElement.style.transform = "scale(1)";
    secondElement.style.transform = "scale(1)";
}

export function hideElements(firstElement, secondElement){
    if(!secondElement) return firstElement.style.transform = "scale(0)";
    firstElement.style.transform = "scale(0)";
    secondElement.style.transform = "scale(0)";
}

dottedIcon.addEventListener("click",  () => showElements(modalTime));
document.addEventListener("click", (event) => hideModal(event,clockContainer,modalTime));

export function hideModal(event,container,modal){
    //checks if event is false on container and scale down modal
    if(!container.contains(event.target)){
        hideElements(modal);
    }
}

modalTime.addEventListener("click", activateToggle)

function activateToggle(){
    toggle.classList.toggle("active");
}

const greeting = document.getElementById("greeting");

function updateGreeting(){
    const hourOfDay = new Date().getHours();
    if(hourOfDay >= 17) return greeting.textContent = "Good evening,";
    if(hourOfDay >= 13)  return greeting.textContent = "Good afternoon,";
    if(hourOfDay >= 12) return greeting.textContent = "Good noon,";
    if(hourOfDay < 12) return greeting.textContent = "Good morning,";
}
updateGreeting();

const username = document.getElementById("username");
const usernameInput = document.getElementById("username-input");
const usernameContainer = document.querySelector(".username-container");

username.addEventListener("dblclick", showInput);
usernameInput.addEventListener("keydown", (event) => changeUsername(event));
usernameInput.addEventListener("input", extendInput);

function showInput(){
    switchDisplay(mantraDisplay,greetingDisplay);
    username.style.display = "none";
    usernameInput.style.display = "block";
}

function changeUsername(event){
    if(event.key === "Enter" || event.keyCode === 13){
        let nameStorage = username.textContent;
        usernameInput.style.display = "none";
        username.style.display = "block";
        username.textContent = usernameInput.value;
        if(!usernameInput.value) return username.textContent = nameStorage;
    }
}

//function allows username-input to expand when string goes over the initial width
function extendInput(){
    usernameInput.style.width = `${usernameInput.value.length * 30}px`;
    usernameContainer.style.width = `${usernameInput.value.length * 30}px`;
    if(!usernameInput.value) return usernameInput.style.width = "2.5rem";
}

const greetingSection = document.querySelector(".greeting-section");
const dottedIconUsername = document.getElementById("dot-icon-username");
const modalGreeting = document.getElementById("modal-greeting");
const editNameBtn = document.getElementById("edit-name-btn");

greetingSection.addEventListener("mouseover", () => showElements(dottedIconUsername));
greetingSection.addEventListener("mouseout", () => hideElements(dottedIconUsername));

dottedIconUsername.addEventListener("click",  () => showElements(modalGreeting));
document.addEventListener("click", (event) => hideModal(event,greetingSection,modalGreeting));

editNameBtn.addEventListener("click", showInput);

const mantraBtn = document.getElementById("mantra-btn");
const greetingDisplay = document.getElementById("greeting-display");
const mantraDisplay = document.getElementById("mantra-display");

mantraBtn.addEventListener("click", () => switchDisplay(greetingDisplay, mantraDisplay));

export function switchDisplay(closeElement, openElement){
    hideElements(closeElement);
    showElements(openElement);
}

//for mantra and quote of the day
function randomMantra(){
    let random = Math.floor(Math.random() * mantras.length);
    if(mantras[random].mantra.length >  25){ greetingSection.style.width = "81%"};
    mantraDisplay.textContent = mantras[random].mantra;
}
randomMantra(mantras,mantraDisplay);


//goal section
const goalInput = document.getElementById("goal-input");
const goal = document.getElementById("goal");
const goalInputDisplay = document.querySelector(".goal-input-display");
const goalDisplay = document.querySelector(".goal-display");
const goalCheckbox = document.getElementById("goal-checkbox");
const goalInnerContainer = document.getElementById("goal-inner-container");
const dotIconGoal = document.getElementById("dot-icon-goal");
const modalGoal = document.getElementById("modal-goal");
const accomplishNotif = document.getElementById("accomplish-notification");

goalInput.addEventListener("keydown", (event) => enterGoal(event));

function enterGoal(event){
    if(event.key === "Enter" || event.keyCode === 13){
        if(!goalInput.value) return;
        goal.textContent = goalInput.value;
        goalInputDisplay.classList.toggle("toggle-active");
        goalDisplay.classList.toggle("toggle-active");
    }
}

goalCheckbox.addEventListener("click", () => {
    finishTask(goal);
    showNotification();
});


export function finishTask(task){
    task.classList.toggle("line-through");
}

function showNotification(){
    if(goal.classList.contains("line-through")){
        const notif = ["Good Job!", "Nice.", "Well Done!", "Way to go!"];

        let random = Math.floor(Math.random() * notif.length);
        accomplishNotif.textContent = `${notif[random]}`;
        showElements(accomplishNotif);
        setTimeout(() => {
            hideElements(accomplishNotif);
        }, 5000);
    }
}

goalInnerContainer.addEventListener("mouseover", () => showElements(goalCheckbox,dotIconGoal));
goalInnerContainer.addEventListener("mouseout", keepCheckbox);

function keepCheckbox(){
    hideElements(dotIconGoal);
    if(goalCheckbox.checked) return showElements(goalCheckbox);
    hideElements(goalCheckbox);
}

dotIconGoal.addEventListener("click", () => showElements(modalGoal));
document.addEventListener("click", (event) => hideModal(event,goalInnerContainer,modalGoal));

const editGoalBtn = document.getElementById("edit-goal-btn");
const clearGoalBtn = document.getElementById("clear-goal-btn");

editGoalBtn.addEventListener("click", () => {
    goalInputDisplay.classList.toggle("toggle-active");
    goalDisplay.classList.toggle("toggle-active");
})

clearGoalBtn.addEventListener("click", () => removeTask(goalInput))

function removeTask(input){
    goalInputDisplay.classList.toggle("toggle-active");
    goalDisplay.classList.toggle("toggle-active");
    input.value = "";
}

//Qoute Section
export const quoteDisplay = document.getElementById("quote");
export const quoteSpeaker = document.getElementById("quote-speaker");
const quoteSection = document.getElementById("quote-section");

function randomQuote(){
    let random = Math.floor(Math.random() * quotesArray.length);
    quoteDisplay.innerHTML = `"${quotesArray[random].quote}."`;
    quoteSpeaker.innerHTML = `${quotesArray[random].speaker}
                <i class="fa-regular fa-heart" style="color: #ffffff;"></i>
                <img src="./images/icons8-skip-14.png">
                <i class="fa-brands fa-twitter" style="color: #ffffff;"></i>`;
}
randomQuote();

quoteSection.addEventListener("mouseover", moveQuoteContent);
quoteSection.addEventListener("mouseout", returnQuoteContent);

function moveQuoteContent(){
    quoteDisplay.style.transform = "translateY(-13px)";
    quoteSpeaker.style.transform = "translateY(13px)";
    quoteSpeaker.style.opacity = "1";
}

function returnQuoteContent(){
    quoteDisplay.style.transform = "translateY(0)";
    quoteSpeaker.style.transform = "translateY(0)";
    quoteSpeaker.style.opacity = "0";
}
 