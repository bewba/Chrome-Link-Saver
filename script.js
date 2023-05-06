const inputBtn = document.getElementById("input-btn");
const inputText = document.getElementById("input-el");
const ulEL = document.getElementById("ul-el");
const clearBtn = document.getElementById("clear-btn");
const saveTab = document.getElementById("save-tab");
let clearSomeElements = document.getElementById("clear-stuff");
let myLeads = [];
let listItems = "";

//window.localStorage.clear(); 

console.log(myLeads);
inputBtn.addEventListener("click", buttonClick);
clearBtn.addEventListener("click", clear);
saveTab.addEventListener("click", savetheTab);
clearSomeElements.onclick =  deleteSomeElements;

function deleteSelectElements(){
    console.log('hello');
    clearSomeElements.onclick =  deleteSomeElements;
    clearSomeElements.textContent = "Remove Some Elements!";
    renderLeads(myLeads);   
}

function deleteSomeElements() {
    listItems = '';
    ulEL.textContent = '';
    console.log(listItems);
    if(myLeads.length != 0){
    for(let i = 0; i < myLeads.length;i+= 1){
        listItems+= `
        <div class = "checkbox-container">
        <input type = "checkbox" name = "selectElements" class = "selectElements" value = '${myLeads[i]}'>${myLeads[i]}
        </div>`;
    }
        ulEL.innerHTML = listItems;
        console.log(listItems);
        clearSomeElements.textContent = "Clear!";
        clearSomeElements.onclick = deleteSelectElements;
    } else {
        ulEL.innerHTML = "No Links";
    }
}


function savetheTab(){
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if(!(myLeads.includes(tabs[0].url))){
        myLeads.push(tabs[0].url)
        localStorage.setItem("MyLeads",JSON.stringify(myLeads));
        renderLeads(myLeads);
        }
    });
}


function buttonClick(){
    let tempText = inputText.value;
    tempText = tempText.replace(/\s+/g, ' ').trim()
    if(tempText != ''){
        myLeads.push(inputText.value);
        localStorage.setItem("MyLeads",JSON.stringify(myLeads));
        inputText.value = "";
        renderLeads(myLeads);
    }
}   

function clear(){
    localStorage.clear();
    ulEL.textContent = 'No Links';
    myLeads = [];   
}

function renderLeads(LinkList){
    listItems= "";
    if(LinkList.length != 0){
    for(let i = 0; i < LinkList.length;i+= 1){
        listItems+= `
        <li id = 'linkList'>
        <a href = ${LinkList[i]} target= '_blank' id = "links"> ${LinkList[i]}</a>
        </li>
        `;
        }
        ulEL.innerHTML = listItems;
    } else {
        ulEL.innerHTML = "No Links";
    }
}

function boot(){
    let temp = JSON.parse(localStorage.getItem("MyLeads"));
    if (temp){
    myLeads = temp; 
    console.log(myLeads);
    renderLeads(myLeads);
    } else {
        ulEL.textContent = 'No Links'
    }
}

boot();