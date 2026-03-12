const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expenses');
const transactionListEl = document.getElementById('transaction-list');
const formEl = document.getElementById('transaction-item');
const descriptionInputEl = document.getElementById('description');
const amountInputEl = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// save transactions to local storage
formEl.addEventListener("submit", addTransactions);

function addTransactions(e) {
  e.preventDefault();
  // form values
  const description = descriptionInputEl.value.trim();
  const amount = parseFloat(amountInputEl.value);

  transactions.push({
    id: Date.now(),
    description,
    amount
  });
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
  updateSummary();
  descriptionInputEl.value = "";
  amountInputEl.value = "";
}

// update the UI on transactions list
function updateUI() {
  transactionListEl.innerHTML = "";
  const sortedTransaction = [...transactions].reverse();
  sortedTransaction.forEach((transaction) => {
    const transactionEl = createTransactionElement(transaction);
    transactionListEl.appendChild(transactionEl);
  });
}

function createTransactionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction-item");
  li.classList.add(transaction.amount > 0 ? "income" : "expenses");

  li.innerHTML = `<span class="description">${transaction.description}</span>
  <span class="amount">${transaction.amount}
  <button class="delete-btn" onclick="removeItem(${transaction.id})">
    x</button>
  </span>`;
  return li;
}

// updating the summary
function updateSummary() {
  // updating balance
  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const expenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // update UI
  balanceEl.textContent = formatCurrency(balance);
  incomeEl.textContent = formatCurrency(income);
  expenseEl.textContent = formatCurrency(expenses);
}

// Initialize UI on page load
updateUI();
updateSummary();

// formatting currency
function formatCurrency(number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function removeItem(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
  updateSummary();
} 

