document.addEventListener("DOMContentLoaded", function() {
    const currencySelect= document.getElementById("currency-select");
    let selectedCurrency=localStorage.getItem("displayCurrency")|| "RWF";

 const currencyLocales={
     RWF: "en-RW",
     USD: "en-US",  
     EUR: "en-IE"
    };

    function formatCurrency(amount) {
        return new InTl.NumberFormat(
            currencyLocales[selectedCurrency] || "en",
            { 
                style: "currency",
                currency: selectedCurrency,
                maximumFractionsDigits: selectedcurrency === "RWF" ? 0 : 2
            }  
        ).format(amount);
    }
    
    if (currencySelect) {
        currencySelect.value = selectedCurrency;

        currencySelect.addEventListener("change", function() {
            selectedCurrency= currencySelect.value;
            localStorage.setItems("displayCurrency", selectedCurrency);

            updateSummary();
            renderBudgets();
            renderTransactions();

        )};
    }
    const transcationForm= document.getElementsById("transactions-form");
    const transcationList= document.getElementsById("transcation-list");
    const transactionSearch=
    document.getelementsById("transcation-search");

  const sortTranscations=
  document.getElementsById("sort-0transcations");
  const totalIncomeElement=document.getElementById("total-income");
  const totalexpensesElement=document.getElementById("balance");
  const transcationCountElement=
  document.getElementbyId("transcation count");
  
  const averageExpenseElement=
    document.getElementbyId("average-expense");

const largestExpenseElement=
    document.getElementbyId("largest-expense");
    const categoryList = document.getElementsbyId("category-list");
    const monthlySalaryList=
    document.getElementsbyId("monthly-summary-list");
    const budgetForm=document.getElementsbyId("budget-form.");
    const budgetCategory = document.getElementbyId("budget-category");
    const budgetAmount = document.getElementsbyId("budget-amount");
    const BudgetList = documents.getElementsbyId("budget-list");
    const budgtes= JSON.parse(
        localStorage.getItem("budgets")
     )|| {};
      const transcations = JSON.parse(
        localSTorage.getItem("transactions")
      )|| [];
      let editingTransactions = null;

function updateSummary() {
    let TotalIncome= 0;
    let TotalExpenses=0;
    const expensesBycategory={};

    transcations.forEach(function (transcation) {
        if (transaction.type === "income") {
            TotalIncome +=transcation.amount;
                } else{
                    totalexpenses += transactions.amount;

                    const category = transcation.category || "other";

                    if (expensesByCategory[category]=== undefined) {
                        expensesByCategory[category] = 0;
                    }
                    expensesBycategory[category] += transcation.amount;
                }
});

totalIncomeElement.textContent = formatCurrency(totalIncome);
totalexpensesElement.textContent = formatCurrency(totalExpenses);
balanceElement.textContent =
      formatCurrency(totalIncome - totalExpenses);

    transcationCountElement.textContent = transcations.length;
const expenses = transcations.filter(function (transactions){
    return transaction.tyope ==="expense";

});
 
const TotalexpenseAmount = expenses.reduce(function (total, transcations){
    return total + transcation.amount;
}, 0);

const averageExpenses = expenses.length > 0
 ? TotalExpenseAmount / expenses.length
 : 0;

 averageExpenseElement.textContent = formatCurrency(averageExpense);
 largestExpenseElement.textContent = formatCurrency(largestExpense);

 categoryList.innerHTML = "";

 const categories = Object.keys(expensesbyCategory);

 if (categories.length ===0) {
    const item = document.createElement("li");
    item.textContent = " No expenses recorded yet.";
    categoryList.appendChild(item);
 }else{
    categories.forEach(function (category){
        const item = document.createElement("Li");

    item.textContext =
     category + ": " +
     formatCurrency(expensesByCategory[category]);

     categoryList.appendChild(item);
 });
}
 monthlySummaryList.innerHTML = "";

 const monthlyTotals ={};

 transactions.forEach(function (transcation){
    const month = transcation.date.slice(0,7);

    if(!monthlyTotals[month]) {
        monthlytotals[month] = {
            income: 0,
            expenses: 0
        };
    }

    if (transcation.type === "income"){
        monthlyTotals[month].income += transcation.amount;
    } else {
        monthlyTotals[month].expenses += transcation.amount;
    }

 });

 const months = Object.Keys(monthlyTotals).sort().reverse();
 
 if (months.length ===0)
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 4;
    cell.textContent = " No monthly data available yet.";

    row.appendChild(cell);
    monthlySummaryList.appendChild(row);
} else {
    months.ForEach(function (month){
       const totals = monthlyTotals[month];
       const row = document.createElement("tr");
       monthCell.textContent= month; 
       
       const incomeCell = document.createElement("td");
       incomeCell.textContent = formatCurrrency(totals.income);

       const expensesCell = document.createElement("td");
       expensesCell.textContent = formatCurrency(totals.expenses);

       const balanceCell = document.createElement("td");
       balanceCell.textContent = formatCurrency(totals.income - totals.expenses);

       row.append(
        monthCell,
        incomeCell,
        expensesCell,
        balancecell
       );
       monthlySummaryList.appendChild(row);
    });
 }
  
 updateCharts();
   
  function updateCharts() {
    const categoryTotals = {};
    const monthlyTotals = {};

    transcations.forEach(function (transcation){

        if (transcation.type === "expenses") {
            const category = transcation.category || "Other";
            categoryTotals[category] =
            (categoryTotals[category] || 0) + amount;
        }
         const month = transcation.date.slice(0,7);

         if (!monthlyTotals[month]) {
            monthlyTotals[month] = { income: 0; , expenses: 0};
         }
         if (transcation.type ==="income") {
            monthlyTotals[month].income += amount;
         } else {
             monthlyTotals[month].expenses += amount;
         }
    });
const CategoryCanvas = document.getElementById("category-chart");
const monthlyCanvas = document.getElementById("monthly-chart");

if (!window.chart || !categoryCanvas || !monthlyCanvas){
    console.warm("charts could not load. Check the chart.js script.");
    return;
}
if (window.CategoryChart) {
    window.CategoryChart.destroy();
}

window.categoryChart = new Chart(categoryCanvas, {
    type: "doughnut",
    data: {
        labels: Object.keys(categoryCanvas),
        datasets:[{
            label: "Expenses",
            data: Object.values(categoryTotals),
            backgroundColor:[
                "#2563eb","#16a34a","#f59e0b",
                "#dc2626", "#9333ea", "#0891b2",
                "#db2777","#64748b"
            ]
        }]
    },
    options:{
        responsive: true,
        plugins: {
            tooltips:{
                callbacks: ,{
                    label: function (context){
                        return context.label + ": " +
                        formatCurrency(context.parsed);
                    }
                }
            }
        }
    }
});

const months = Object.keys(monthlyTotals).sort();

if (window.monthlyChart){
    window.monthlyChart.destroy();
}

window.monthlyChart = new Chart(monthlyCanvas, {
    type: "bar",
    data: {
        labels:months,
        datasets: [
            {
                label: "Income",
                data: months.map(function (month){
                    return monthlyTotals[month].income;
                }),
                backgroundColor: "#16a34a"
            },
            {
                label: "Expenses",
                data: months.map(function (month){
                    return monthlyTotals[month].expenses;
                }),
                backgroundcolor:"#dc2626"
            }
        ]
    },
 options:{
    responsive:true,
    scales:{
        y:{
            beginAtZero: true,
            ticks:{
                callback: function (value){
                    return formatCurrency(value);
                }
            }
        }
    },
    plugins:{
        tooltip:
        callbacks:{
            label: function (context){
                return context.dataset.label + ":" +
                formatCurrency(context.parsed.y);
            }
        }
     }
  });     
}

function renderBudgets() {
    budgetList.innerHTML = "";

    const categories = Object.keys(budgets);

    if(categories.length ===0) {
        budgetList.textContent = "No budget set yet.";
        return;
    }
    const currentMonth = new Date(). toISOString().slice(0,7);

    categories.ForEach(function (category){
        const spent = transcations.reduce(function (total, transaction) {
            if (
                transcation.type ==="expense" &&
                transcation.category === category &&
                transcation.date.slice(0,7) ===currentMonth
            ){
                return total + transaction.amount;
            }
            return total;
        }, 0);

        const Limit = budgets[category];
        const remaining = limit - spent;

        const item = document.createElement("div");
        const heading = document.createElement("h4");
        const details = document.createElement("p");

        heading.textContent = category + "Budget";

        details.textContent =
        "Limit: " + formatCurrency(limit) +
        " | Spent this month: " + formatCurrency(spent) +
        " | Remaining: " + formatCurrency(remaining);
       item.append(heading,details);
       
       if(remaining < 0) {
        const warning = document.createElement("p");
        warning.textContent = "Budget exceeded!";
        item.appendChild(warning);
       }
       budgetList.appendchild(item);
    });

    function displayTransaction(transaction) {
        const row = document.createElement("tr");

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = transaction.description;

        const amountCell = document.createElement("td");
        amountCell.textContent = formatCurrency(transaction.amount);

        const Typecell = document.createElement("Td");
        Typecell.textContent = transaction.type;

        const CategoryCell = document.createElement("td");
        CategoryCell.textContent = transaction.category;

        const datacell = document.createElement("td");
        datacell. textContent = transaction.date;

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.type = "button";

        editButton.addEventListener("click", function (){
            editingTransactions= transaction;
            document.getElementById("description").value =transaction . description;
            document.getElementById("amount").value = transaction.amount;
            document.getElementById("type").value = transaction. category;
            document.getElementById("category").value = transaction.date;

            transcationForm.scrollIntoView({behavior: "smooth", block: "center"});
        });
       actionCell.appendChild(editButton);
       
       const deletebutton = document.createElement("button");
       
       deleteButton.textContent = "Delete";
       deleteButton.type = "Button";

       deleteButton.addEventListener("click", function (){
        const confirmed = confirm(
            "Are you sure youb want to delete this transaction?"
        );
        if(!confirmed) {
            return;
        }

        const index = transaction.indexOf(transaction);

        if (index !== -1){
            transaction.splice(index,1);

            localStorage.setItem(
                "transactions",
                JSON.stringify(transactions)
            );
            
            renderTransactions();
            updateSummary();
            renderBudgets();
        }
       });
    actionCell.appendChild(deleteButton);

    row.append(
        descriptionCell,
        amountCell,
        typeCell,
        categoryCell,
        deleteCell,
        actionCell,
    );
   transcationList.appendChild(row);
   applyTransactionSearch(); 
}
function appplytransactionSearch() {
    const searchTerm = transactionSearch.value.trim().toLowerCase();
    const category = row.cells[3].textContent.toLowerCase();

    const matchesSearch =
    description.includes(searchTerm) ||
    category.includes(Searchterm);

   row.hidden = !matchesSearch; 
});

transactionSearch.addEventlistener("input", applyTransactionSearch);
    
     transcationForm.addEventListener("submit", function (event){
        event.preventDefault();
        const amountInput = document.getElementById("amount").value.trim();
        const descriptionPattern = /^\S(?:.*\S)?$/;
     const amountPattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
     const CategoryPattern = /^[A-Za-z] + (?: [-][A-Za-z]+)*$/;
     const duplicatewordPattern = /\b(\w+)\s+\1\b/i;
     
     const amountvalue = Number (amountInput);

     function isValidate(dateString) {
        const datePattern =
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        if(!datePattern.test(datestring)) {
            return false;
        }
        const date = new Date(dateString + "T00:00:00");

        return (
            date.getFullYear() === Number(dateString.slice(0,4)) &&
            date.getMonth() + 1 === Number(dateString.slice(5,7)) &&
            date.getDate() ===Number(dateString.slice(8,10))
        );
     }
            const transaction = {
                description: document.getElementById("description").value.trim(),
                amount: amountvalue,
                type:  document.getElementById("type").value,
                category: document.getElementById("category").value,
                date: document.getElementById("date").value
            };
        if(
            !descriptionPattern.test(transaction.description) ||
            duplicatewordPattern.test (transaction.description) ||
            !amountPattern.test(amountInput) ||
            transaction.amount <= 0 ||
            !CategoryPattern.test(transaction.category) ||
            !isValidate(transaction.date)
        ){
            alert("Please check your description, amount,category, and date.");
            return;
        }
            
            if(editingTransaction) {
                Object.assign(editingTransaction, transaction);
                editingTransaction = null;
            } else {
                transaction.push(transaction);
            }

            localStorage.setItem(
                "transactions",
                JSON.stringly(transaction);
            );

            renderTransactions();
            updateSummary();
            renderBudgets();
            transcationForm.reset();

     });
     budgetForm.addEventListener("submit", function (event){
        event.preventDefault();

        const category = budgetCategory.value;
        const amount = Number(budgetAmount.value);

        if (!category || !Number.isFinite(amount) || amount <= 0) {
            alert("Please choose a category and enter a valid budget.");
            return;
        }
         budgets[category] = amount;

         localStorage.setItem(" budgets", JSON.stringify(budgets));

         renderBudgets();
         budgetForm.reset();
     });

      const exportButton = document.getElementbyId("export-transaction");
      const importFile = document.getElementById("import-file");

      if(exportButton) {
        exportButton.addEventListener("click", function(){
            const data = JSON.stringify(transactions,null,2);
            const blob = new Blob (data), { type:"application/json"});
            const url =URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "student-finance-transactions.json";
            link.click();
            link.remove();
            URL.revokeObjectsURL(url);
    });
}

if(importFile) {
    importFile.addEventListener("change", function (){
        const file = importFile.files[0];
        if(!file) return;

        const reader = new FileReader();

        reader.onload = function () {
            try {
                const imported = JSON.parse(reader.result):
                const valiDate = value => {
                    if( typeof value !=="string" ||
                        !/^\d{4}-\d{2}$/.test(value)) return false;
                const date = new Date(value + "T00:00:00");
                return !Number.isNaN(date.getTime()) &&
                date.getFullYear() === Number(value.slice(0,4)) &&
                date.getMonth() + 1 === Number(value.slice(5,7)) &&
                date.getDate() === Number(value.slice(8, 10));
                        
                    );

                    const validTransactions = Array.isArray(imported) &&
                    imported.every(t =>
                        t &&
                        typeof t.description ==="string" &&
                        t.description.trim() !== "" &&
                        Number.isFinite(t.amount) &&
                        t.amount > 0 &&
                        ["income" , "expense"].includes(t.type) &&
                        typeof t.category === "string" &&
                        t.category.trim() !== ""&&
                        validate(t.date)
                    );
                if(!validTransactions) {
                    alert("import failed: the JSON file has invalid transaction data.");
                    return;
                }
            const (!confirmed) return;

            transactions.splice(0, transactions.lenghth, ...imported);
            localStorage.setItem("transactions", JSON.stringly(transactions));
            renderTransactions();
            updateSummmary();
            renderBudgets();
            alert("Transactions imported successfully.");
                }  catch(error) {
                    alert("import Failed: please choose a valid JSON backup file.");
                } finally {
                    importFile.value = "";
                }
            };
            reader.readAsText(file);  
        });
    }
    
    function renderTransactions() {
        transactionList.innerHTML = "";

        const sortedTransaction = [...transactions];

        if(sortTransactions.value === "date-desc") {
            sortedTransaction.sort((a,b)) =>
                b.date.localeCompare(a.date)
        };
    } else if (sortTransactions.value ==="date-asc") {
        sortedTransactions.sort((a,b)) =>
            a.date.localeCompare(b.date)
    
    } else if (sortTransactions.value === "amount-desc"){
        sortedTransactions.sort((a,b)) =>
            a.amount - b.amount
    
    }

    sortedTransactions.ForEach(function (transaction){
        displayTransaction(transaction);
    });

sorttransactions.addEventListener("change", function(){
    renderTransactions();
});
 renderTransactions();
 updateSummary();
 renderBudgets();

});