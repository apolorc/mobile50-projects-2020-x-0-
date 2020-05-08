const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
  //add Element
  let index = modTODO.addTODO();
  itemCountSpan.textContent = index;
  createTODO(classNames.TODO_ITEM);
  uncheckedCountSpan.textContent = modTODO.checkInTODO();
}


function removeElement(id){
  let element = document.getElementById(id);
  let chk = element.firstChild;
  if (!chk.checked) {uncheckedCountSpan.textContent = modTODO.checkOutTODO();}
  element.parentNode.removeChild(element);
  itemCountSpan.textContent = modTODO.decTODO();
}


function createTODO(classN){
  // Create id according to elements added
  let lastID = list.lastChild != null ? list.lastChild.id : 0;
  let index =  parseInt(lastID) + 1;
  //Create li
  let li = document.createElement("li");
  li.setAttribute('class', classN);
  li.setAttribute("id", index); 
  //Create checkbox
  var checkbox = CreateCHKBOX(index);
  li.appendChild(checkbox);
  //Create text 
  let text = document.createElement('span');
  text.textContent = 'TODO - ' + index;
  li.appendChild(document.createTextNode(text.textContent));
  //Create delete link 
  var linkDEL = CreateLink(index);
  li.appendChild(linkDEL);

  list.appendChild(li);
}
 

function CreateCHKBOX(ind){
  var chk = document.createElement('input');
  chk.type = "checkbox";
  chk.name = classNames.TODO_CHECKBOX;
  chk.setAttribute('id', 'chk'+ind);
  chk.setAttribute('class', classNames.TODO_CHECKBOX)
  chk.addEventListener( 'change', function() {
    if(this.checked) {
        // Checkbox is checked..
        uncheckedCountSpan.textContent = modTODO.checkOutTODO(); 
    } else {
        // Checkbox is not checked..
        uncheckedCountSpan.textContent = modTODO.checkInTODO();
    }
  });
  return chk;
}


function CreateLink(){
  // Create anchor element. 
  var a = document.createElement('a');  
  // Create the text node for anchor element. 
  var link = document.createTextNode("Delete"); 
  // Append the text node to anchor element. 
  a.appendChild(link);  
  // Set the title. 
  a.title = "Delete";  
  // Set the href property. 
  a.href = "#";  
  a.setAttribute('class', classNames.TODO_DELETE);
  a.addEventListener( 'click', function() {
    removeElement(this.parentNode.id);
  });
  return a;
}

//Module to work with counters
var modTODO = (function(){
  var counter = 0
  , checked = 0
  ,plusTODO = function(){ counter++; return counter; }
  ,minusTODO = function(){ if (counter>0) {counter--}; return counter; }
  ,checkIN = function(){ checked++; return checked;}
  ,checkOUT = function(){ if (checked>0){checked--};return checked;}
  return {
       addTODO: function(){ return plusTODO(); }
      ,decTODO: function(){ return minusTODO(); }
      ,checkInTODO: function(){ return checkIN(); }
      ,checkOutTODO: function(){ return checkOUT(); }
  } 
})();
