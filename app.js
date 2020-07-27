
const budgetController = (()=>{

let incomes = [];
let expenses = [];

class Income{
  constructor(id , description , value){
    this.id = id;
    this.description = description;
    this.value = value;
  }
}

class Expense{
  constructor(id , description , value){
    this.id = id;
    this.description = description;
    this.value = value;
  }
}

return {
saveData:(type , description  , value)=>{
  let incomeId;
  let expenseId;
  if(incomes.length > 0){
    incomeId = incomes[incomes.length- 1].id + 1;
  }
  else{
    incomeId = 0;
  }
  if(expenses.length > 0){
   expenseId = expenses[expenses.length- 1].id + 1;
  }
  else{
    expenseId = 0;
  }

if(type === "inc"){
  let income = new Income(incomeId, description  , value)
  incomes.push(income);
 return income;
}
else{
let expense = new Expense(expenseId ,description  , value)
  expenses.push(expense);
  return expense;
   }
},

delteItem:(type , id)=>{
if(type === "inc"){
incomes.forEach((income , incomeIndex)=>{
if(income.id === id){
  incomes.splice(incomeIndex, 1)
}
})
}

 else {
  expenses.forEach((expense , expenseIndex)=>{
  if(expense.id === id){
    expenses.splice(expenseIndex, 1)
    
  }
  })
  }
},

updateAmount:(type)=>{
let totalValue = 0;
let totalIncome = 0;
let totalExpense = 0;
if(type === "inc"){
for(let i = 0 ; i < incomes.length ; i++){
totalIncome+=incomes[i].value;
}

}

else{
for(let i = 0 ; i<expenses.length ; i++){

  totalExpense+=expenses[i].value;
}

}

return{
  totalIncome:totalIncome,
  totalExpense: totalExpense,
  
}




}






}
 
})()



const UIcontroller = (()=>{
  let isSecure = false;
return{
getData:()=>{
let type =  document.querySelector('.add__type').value;
let description =   document.querySelector('.add__description').value;
let value =   document.querySelector('.add__value').value;
return {
  type:type,
  description:description,
  value:parseInt(value)
}
},
clearFields:()=>{
document.querySelector('.add__description').value = '';
document.querySelector('.add__value').value = '';
},

displayData:(type , id  , desription , value)=>{
if(type === "inc"){
const incomeItem = `<div class="item clearfix" id="inc-${id}">
<div class="item__description">${desription}</div>
<div class="right clearfix">
    <div class="item__value">+ ${value}</div>
    <div class="item__delete">
        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
    </div>
</div>
</div>`
document.querySelector('.income__list').insertAdjacentHTML('beforeend' , incomeItem);
}
else if(type === "exp"){
const expenseItem = ` <div class="item clearfix" id="exp-${id}">
<div class="item__description">${desription}</div>
<div class="right clearfix">
    <div class="item__value">- ${value}</div>
    <div class="item__delete">
        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
    </div>
</div>
</div>`
document.querySelector('.expenses__list').insertAdjacentHTML('beforeend' , expenseItem);
}
},

displayItemValues:(type , incomeValue ,  expenseValue)=>{
  let y;
  let z;
  y = document.querySelector('.budget__income--value');
  z = document.querySelector('.budget__expenses--value');
 if(type === "inc"){
   
     y.innerHTML = incomeValue;
 }
 else 
{ 
     z.innerHTML =  expenseValue;
 }

document.querySelector('.budget__value').innerHTML = y.innerHTML - z.innerHTML;

   },

 deleteFromUI:(DeltedItemId)=>{
document.getElementById(DeltedItemId).parentNode
.removeChild(document.getElementById(DeltedItemId));
 } ,


 secureButton:()=>{

let des = document.querySelector('.add__description');
let val = document.querySelector('.add__value');
if(des.value !== '' && val.value !== '')
{ 
  console.log('Hello world')
  return true;
  
}
else{
  return false;
}
  
 }
 


  }

})()



controller = ((budgCtrl , UICtrl)=>{
  

addItem = ()=>{
  if(UICtrl.secureButton()){
    let getData = UICtrl.getData();  
    let data =  budgCtrl.saveData(getData.type , getData.description , getData.value);
    UICtrl.clearFields();
    UICtrl.displayData(getData.type, data.id ,data.description
     , data.value )
     //let values  = budgCtrl.changeItemsAmount(getData.type , data.value);
     let values = budgCtrl.updateAmount(getData.type);
    UICtrl.displayItemValues(getData.type , values.totalIncome , values.totalExpense);
    }

}


deletItem = ()=>{
  let itemStrId = event.target.parentNode.parentNode.parentNode.parentNode.id;
  let idSplit = itemStrId.split("-");
  let id =parseInt(idSplit[1]);
  let type = idSplit[0];
  budgCtrl.delteItem(type , parseInt(id)); 
  UICtrl.deleteFromUI(itemStrId); 
  let values = budgCtrl.updateAmount(type);
  UICtrl.displayItemValues(type , values.totalIncome , values.totalExpense);
}






document.querySelector('.add__btn').addEventListener('click' , ()=>{
addItem();
})

document.addEventListener('keypress' , (e)=>{
if(e.keyCode === 13){
  addItem();}
})

document.querySelector('.container').addEventListener('click' , (event)=>{ 
deletItem();
})
   
})(budgetController, UIcontroller)

 






