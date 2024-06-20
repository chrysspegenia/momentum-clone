import { quotesArray } from "./variables.js";
import {bgLocation, bgPhotographer, quoteDisplay, quoteSpeaker} from "./script.js";

const settingsSection = document.querySelector(".settings-section");
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.querySelector(".settings-modal");
const quotesDisplaySettings = document.querySelector(".quotes-display-settings");
const saveQuoteBtn = document.querySelector(".save-quote-btn");
const quoteInput = document.querySelector(".quote-input");
const quoteSpeakerInput = document.querySelector(".quote-speaker-input");
const addQuoteBtn = document.querySelector(".add-quote-btn");
const addQuoteDisplay = document.querySelector(".add-quote-display");

settingsBtn.addEventListener("click", () => {
    settingsBtn.classList.toggle("rotate-btn");
    settingsModal.classList.toggle("modal-active");
});

settingsSection.addEventListener("mouseover", expandContent)
settingsSection.addEventListener("mouseout", collapseContent)

function expandContent(){
    bgLocation.style.transform = "translateY(-10px)";
    bgPhotographer.style.transform = "translateY(10px)";
    bgPhotographer.style.opacity = "1";
}

function collapseContent(){
    bgLocation.style.transform = "translateY(0)";
    bgPhotographer.style.transform = "translateY(0)";
    bgPhotographer.style.opacity = "0";
}

addQuoteBtn.addEventListener("click", () => {
    addQuoteDisplay.classList.toggle("show-display");
    quotesDisplaySettings.classList.toggle("show-display");
})

function showQuotes(){
    for(let i = 0; i < quotesArray.length;i++){
        const quoteInfoContainer = document.createElement("div");
        quoteInfoContainer.classList.add("quote-info-container");
            const quoteItem = document.createElement("div");
            quoteItem.classList.add("quote-item")
            quoteItem.textContent = `"${quotesArray[i].quote}."`;

            const speakerItem = document.createElement("div");
            speakerItem.classList.add("speaker-item");
            speakerItem.textContent = `- ${quotesArray[i].speaker}`;

            const applyQuoteBtn = document.createElement("div");
            applyQuoteBtn.classList.add("apply-quote-btn");
            applyQuoteBtn.innerHTML = `<i class="fa-solid fa-check" style="color: #ffffff;"></i>`;

            const removeQuoteBtn = document.createElement("div");
            removeQuoteBtn.classList.add("remove-quote-btn");
            removeQuoteBtn.innerHTML = `<i class="fa-solid fa-x" style="color: #ffffff;"></i>`;
        quoteInfoContainer.append(quoteItem, speakerItem, applyQuoteBtn, removeQuoteBtn);
        quotesDisplaySettings.append(quoteInfoContainer);

        applyQuoteBtn.addEventListener("click", () => applyQuote(quoteItem, speakerItem))
        removeQuoteBtn.addEventListener("click", () => removeQuote(quoteInfoContainer))
    }
}   
showQuotes();

saveQuoteBtn.addEventListener("click", addQuoteToArray);

function addQuoteToArray(){
    if(!quoteInput.value || !quoteSpeakerInput.value){
        quoteInput.classList.toggle("invalid-input");
        return quoteSpeakerInput.classList.toggle("invalid-input");
    }

    if(quoteInput.classList.contains("invalid-input") ||
     quoteSpeakerInput.classList.contains("invalid-input")){
        quoteInput.classList.remove("invalid-input");
        quoteSpeakerInput.classList.remove("invalid-input");
     }
    
     clearQuoteDisplay()

    let newQuoteInfo = {
                        speaker:`${quoteSpeakerInput.value}`,
                        quote: `${quoteInput.value}`
                        };

    quotesArray.unshift(newQuoteInfo);
    
    console.log(quotesArray);

    quoteInput.value = "";
    quoteSpeakerInput.value = "";
    showQuotes();
}

function clearQuoteDisplay(){
    quotesDisplaySettings.innerHTML = "";
}

function applyQuote(quoteItem, speakerItem){
    quoteDisplay.innerHTML = quoteItem.textContent;
    quoteSpeaker.innerHTML = `${speakerItem.textContent}
                <i class="fa-regular fa-heart" style="color: #ffffff;"></i>
                <img src="./images/icons8-skip-14.png">
                <i class="fa-brands fa-twitter" style="color: #ffffff;"></i>`;
}

function removeQuote(element){
    element.remove()
}