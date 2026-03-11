const balanceEl = document.getElementById('balance');
 const incomeEl = document.getElementById('income');
 const expenseEl = document.getElementById('expense');
    const transactionListEl = document.getElementById('transaction-list');
    const formEl = document.getElementById('transaction-item');
    const descriptionInputEl = document.getElementById('description');
    const amountInputEl = document.getElementById('amount');
    
     let transactions =     JSON.parse(localStorage.getItem("transactions")) ||[]; 
         
      formEl.addEventListener("submit" , addTransactions );  
       function addTransactions(e){ 
        e.preventDefault() ;
         // form values// 
         const description =  descriptionInputEl.value.trim(); 
         const amount = parseFloat(amountInputEl.value);
        
          transactions.push({ 
            id:Date.now(), 
             description,
             amount
                }) 
localStorage.setItem( "transactions", JSON.stringify((transactions)))
                         updateUI();
                          updateSummary();
                          descriptionInputEl.value = "";
                          amountInputEl.value = "";
       } 
        
       function updateUI(){
       transactionListEl.innerHTML ="";
        const sortedTransaction = [...transactions].reverse() ;
           sortedTransaction.forEach((transaction)=>{ 
              const transactionEl = createTransactionElement(transaction);
         transactionListEl.appendChild(transactionEl);

           }); 
         
    
        } 
        function createTransactionElement(transaction) {
             const li = document.createElement("li"); 
             li.classList.add("transaction-item");
        li.classList.add(transaction.amount > 0 ? "income" : "expenses" ); 
               
        li.innerHTML = `<span class="description">${transaction.description}</span>
         <span class="amount">${transaction.amount} 
         
         <button class="delete-btn" onclick="removeItem()">
          x</button> 
         </span>`;
             return li;
        }
