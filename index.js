let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn= document.getElementById("input-btn")
const ulEl= document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")

const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
  
})
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    JSON.stringify("myLeads")
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

function render(leads){
    let listItems= ""
    for(let idx=0;idx<leads.length;idx++){
        listItems+=`
        <li>
        <a href='${leads[idx]}' target='_blank'> 
        ${leads[idx]}
        </a>
        </li>
        `
        // alternative for the above statement: create element; set text content; append to ul
        // const li= document.createElement("li")
        // li.textContent=myLeads[idx]
        // ulEl.append(li)
    }
     
        ulEl.innerHTML=listItems
}


