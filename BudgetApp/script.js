let totalAmount = document.getElementById("budget-value");
let userAmount = document.getElementById("expenses-value");
const totalAmountButton = document.getElementById("budget-button");
const checkAmountButton = document.getElementById("expenses-button");
const budgetCategory = document.getElementById("budget-category");
const category = document.getElementById("category");
const errorMessage1 = document.getElementById("budget-error");
const errorMessage2 = document.getElementById("category-error");
const totalBudget = document.getElementById("total-budget");
const totalExpenses = document.getElementById("total-expenses");
const balance = document.getElementById("total-balance");
const list = document.getElementById("list");
const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const info = document.querySelector(".info");

    

totalAmountButton.addEventListener("click",()=>{
    if(totalAmount.value === "" || totalAmount.value < 0 || budgetCategory.value === ""){
        errorMessage1.classList.remove("hide");
        budgetCategory.value = null;
        totalAmount.value = null;
        return;
    }else{
        errorMessage1.classList.add("hide");
        totalBudget.innerText = Number(totalBudget.innerText) + parseInt(totalAmount.value);
        balance.innerText = parseInt(totalBudget.innerText) - parseInt(totalExpenses.innerText);
        lists(budgetCategory.value,totalAmount.value,null,null);
        info.setAttribute("style","display: none");
        budgetCategory.value = null;
        totalAmount.value = null;
    }
});

const disableButtons = (value)=>{
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach(element=>{
        element.disabled = value;
    })
};

// untuk menangani fungsi edit dan delete sebuah elemen
const modifyElement = ((element,edit,remove) =>{
    // mencari parent element dari teks tersebut (div)
    // let parentDiv = element.parentElement;
    let currentBalance = balance.innerText;
    let currentBudget = totalBudget.innerText;
    let currentExpenses = totalExpenses.innerText;
    // let parentBudget = parentDiv.querySelector(".budget");
    let parentBudget = element.previousSibling;

    // let parentExpenses = parentDiv.querySelector(".expenses");
    let parentExpenses = element.previousSibling;

    function removeLists(){
        element.parentElement.previousSibling.remove();
        element.parentElement.remove();
    }

    if(edit === 0){
        // let parentText = parentDiv.querySelector(".category-name").innerText;
        let parentText = element.previousSibling.previousSibling.innerText;
        category.value = parentText;
        userAmount.value = parentExpenses.innerText;
        disableButtons(true);
        balance.innerText = parseInt(currentBalance) + parseInt(parentExpenses.innerText);
        
        totalExpenses.innerText = parseInt(currentExpenses) - parseInt(parentExpenses.innerText);
        removeLists();
    }
    else if(edit === 1){
        // let parentText = parentDiv.querySelector(".budget-name").innerText;
        let parentText = element.previousSibling.previousSibling.innerText;
        budgetCategory.value = parentText;
        totalAmount.value = parentBudget.innerText;
        disableButtons(true);
        balance.innerText = parseInt(currentBalance) - parseInt(parentBudget.innerText);
        totalBudget.innerText = parseInt(currentBudget) - parseInt(parentBudget.innerText);
        removeLists();
    }

    if(remove === 0){
        balance.innerText = parseInt(currentBalance) + parseInt(parentExpenses.previousSibling.innerText);  
        totalExpenses.innerText = parseInt(currentExpenses) - parseInt(parentExpenses.previousSibling.innerText);
        removeLists();
    }
    else if(remove === 1){
        balance.innerText = parseInt(currentBalance) - parseInt(parentBudget.previousSibling.innerText);
        totalBudget.innerText = parseInt(currentBudget) - parseInt(parentBudget.previousSibling.innerText);
        removeLists();
    }

    if(balance.innerText == 0){
        info.setAttribute("style","display: visible");
    }
})

// membuat log aktivitas keuangan yang berbentuk list
const lists = ((budgetCategory, budgetValue, expensesName, expensesValue)=>{
    // membuat informasi waktu (tanggal dan jam)
    let logDate = document.createElement("div");
    let date = new Date();
    logDate.innerHTML = date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear() + " | " + (date.getHours() < 10 ? "0"+date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0"+date.getSeconds() :date.getSeconds());
    logDate.classList.add("logDate");
    list.appendChild(logDate);

    // membuat element edit button
    let editButton = document.createElement("button");
    editButton.innerHTML = "<i class=\"fa-solid fa-pen-to-square\"></i>";
    editButton.classList.add("edit");
    editButton.style.fontSize = "1.2em";
    
    // membuat element delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class=\"fa-solid fa-trash\"></i>";
    deleteButton.classList.add("delete");
    deleteButton.style.fontSize = "1.2em";
    
    // cek parameter nilai
    if(budgetCategory && budgetValue){
        let budgetContent = document.createElement("div");
        budgetContent.classList.add("budget-content");
        budgetContent.innerHTML = `<p class="budget-name">${budgetCategory}</p><p class="budget">${budgetValue}</p>`;
        budgetContent.appendChild(editButton);
        budgetContent.appendChild(deleteButton);
        list.appendChild(budgetContent);
        editButton.addEventListener("click",()=>{
            modifyElement(editButton,1,null);
        });
        deleteButton.addEventListener("click",()=>{
            modifyElement(deleteButton,null,1);
        })
    }
    
    if(expensesName && expensesValue){
        let expensesContent = document.createElement("div");
        expensesContent.classList.add("expenses-content");
        expensesContent.innerHTML = `<p class="category-name">${expensesName}</p><p class="expenses">${expensesValue}</p>`;
        expensesContent.appendChild(editButton);
        expensesContent.appendChild(deleteButton);
        list.appendChild(expensesContent);
    
        editButton.addEventListener("click",()=>{
            modifyElement(editButton,0,null);
        });
        deleteButton.addEventListener("click",()=>{
            modifyElement(deleteButton,null,0);
        })        

    }
});

checkAmountButton.addEventListener("click",()=>{
    if(!userAmount.value || !category.value){
        errorMessage2.classList.remove("hide");
        return;
    }    
    disableButtons(false);

    let total = parseInt(totalExpenses.innerText) + parseInt(userAmount.value);
    totalExpenses.innerText = total;

    balance.innerText = parseInt(totalBudget.innerText) - parseInt(totalExpenses.innerText)
    
    lists(null, null, category.value, userAmount.value);

    info.setAttribute("style","display: none");
    category.value = null;
    userAmount.value = null;
});