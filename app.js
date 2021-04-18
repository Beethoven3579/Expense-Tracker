const expenseArray = JSON.parse(localStorage.getItem('expenseArray')) || [];

document.getElementById('add-btn')
.addEventListener('click', (e) => {
    e.preventDefault();

  addExpense();
})



function newExpense(expenseItem) {
    
    const date = document.getElementById('expense-date');
    const type = document.getElementById('expense-type');
    const description = document.getElementById('expense-description');
    const amount = document.getElementById('expense-amount');
   
    const expenseList = document.getElementById('expense-list');
    const row = expenseList.insertRow(1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.textContent = type.value;
    cell2.textContent = date.value;
    cell3.textContent = description.value;
    cell4.textContent = `$${amount.value}`;
    cell4.style.color = 'red';
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.setAttribute('id', 'dlt-btn');
    row.appendChild(deleteButton);

    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        deleteExpense(deleteButton, expenseItem);
    })

     type.value = '';
     date.value = '';
     description.value = '';
     amount.value = '';
}

function addExpense(expense) {
    const expenseItem = {
        id: Math.random(),
        expense: expense
    }
    newExpense(expenseItem);
    expenseArray.push(expenseItem);
    addToLocalStorage(expenseItem);
}

function deleteExpense(deleteButton, expenseItem) {
    deleteButton.parentElement.remove();
    for (let i = 0; i < expenseArray.length; i++) {
        if (expenseArray[i].id === expenseItem.id) {
        expenseArray.splice(i, 1);
        localStorage.setItem('expenseArray', JSON.stringify(expenseArray));
        }
    }
}

function addToLocalStorage(expenseItem) {
    localStorage.setItem('expenseArray', JSON.stringify(expenseArray));
}

//THIS Logic was not working. I wonder what I have missed here!!!

window.addEventListener('load', (e) => {
    e.preventDefault();
    expenseArray.forEach(expense => {
        newExpense(expense);
    })
 })