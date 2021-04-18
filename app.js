const expenseArray = JSON.parse(localStorage.getItem('expenseArray')) || [];

document.getElementById('add-btn')
.addEventListener('click', (e) => {
    e.preventDefault();

    const date = document.getElementById('expense-date');
    const type = document.getElementById('expense-type');
    const description = document.getElementById('expense-description');
    const location = document.getElementById('expense-location');
    const amount = document.getElementById('expense-amount');

    const expenseItem = {
        id: Date.now(),
        expenseType: type.value,
        expenseDate: date.value,
        expenseDescription: description.value,
        expenseLocation: location.value,
        expenseAmount: amount.value
        
    }
  addExpense(expenseItem);
})



function newExpense(expense) {
   
    const expenseList = document.getElementById('expense-list');
    const row = expenseList.insertRow(1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = expense.expenseType
    cell2.textContent = expense.expenseDate
    cell3.textContent = expense.expenseDescription
    cell4.textContent = expense.expenseLocation
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

//THIS Logic was not working. I wonder what I have missed here!!!

window.addEventListener('load', (e) => {
    e.preventDefault();
    expenseArray.forEach(expense => {
        newExpense(expense);
    })
 })