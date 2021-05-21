const expenseArray = JSON.parse(localStorage.getItem('expenseArray')) || [];

const date = document.getElementById('expense-date');
const type = document.getElementById('expense-type');
const description = document.getElementById('expense-description');
const vendor = document.getElementById('expense-location');
const amount = document.getElementById('expense-amount');

document.getElementById('add-btn')
.addEventListener('click', (e) => {
    e.preventDefault();

    const expenseItem = {
        id: Date.now(),
        expenseType: type.value, 
        expenseDate: date.value,
        expenseDescription: description.value,
        expenseLocation: vendor.value,
        expenseAmount: formatAmount(amount.value)
    }

    isValidateForm() ?
    alert('Please fill out all fields') : 
    addExpense(expenseItem); 
        
});



function newExpense(expense) {
   
    const expenseList = document.getElementById('expense-list');
    const row = expenseList.insertRow(1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = expense.expenseType;
    cell2.textContent = expense.expenseDate;
    cell3.textContent = expense.expenseDescription;
    cell4.textContent = expense.expenseLocation;
    cell5.textContent = `$${expense.expenseAmount}`;
    cell5.style.color = 'red';
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.setAttribute('id', 'dlt-btn');
    row.appendChild(deleteButton);

    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        deleteExpense(deleteButton, expense);
    })

    document.getElementById('form').reset();
 }

function addExpense(expense) {
    
    newExpense(expense);
    expenseArray.push(expense);
    addToLocalStorage(expense);
}

function deleteExpense(deleteButton, expense) {
    deleteButton.parentElement.remove();
    for (let i = 0; i < expenseArray.length; i++) {
        if (expenseArray[i].id === expense.id) {
        expenseArray.splice(i, 1);
        localStorage.setItem('expenseArray', JSON.stringify(expenseArray));
        }
    }
}

function addToLocalStorage(expense) {
    localStorage.setItem('expenseArray', JSON.stringify(expenseArray));
}
function formatAmount(amount) {
    return (amount = parseFloat(amount).toFixed(2));
}
function isValidateForm() {
    const isInputEmpty = 
    !type.value ||
    !date.value ||
    !description.value ||
    !amount.value ||
    !vendor.value;

return isInputEmpty ? true : false;

}
window.addEventListener('load', (e) => {
    e.preventDefault();
    expenseArray.forEach(expense => {
        newExpense(expense);
    })
 })