(function (){
//	'use strinct';
	
	var templateArticle = document.querySelector("template").content.firstElementChild;
	
	function enterPress(event){
	if(!event) event = window.Event;
	//event.preventDefault();
	var keyCode = event.keyCode || event.which;
		
	if(keyCode == "13" || (keyCode == "32" && this.nodeName === "IMG")){
		//alert(this.nodeName);
		switch(this.nodeName){
			case "INPUT":
				var myInput = input.value;
				if(!isEmpty(myInput))
				{
					ajouterTodo(myInput);
				}
				//vider l'inputeBox
				input.value = "";
				break;
			case "IMG":
				deleteTodo(this);
				break;
			case "DIV":
				gestionFocus(this);
				break;
		}
		return false;
	}
	
}	

function gestionFocus(element)
{
	//verifier si il y a un article qui suit, si il y a passer le focus
	if(element.parentNode.nextElementSibling)
	{
		if(element.nodeName ==="DIV") element.parentNode.nextElementSibling.querySelector("div").focus();	
		if(element.nodeName ==="IMG") element.parentNode.nextElementSibling.querySelector("img").focus();		
	}
	//il n'y a pas d'article qui suit
	else
	{
		//verifier si il y a des article qui précèdes, si il y a passer le focus 
		if(element.parentNode.previousElementSibling)
		{
			element.parentNode.previousElementSibling.querySelector("img").focus();
		}
		//si il n'y a pas d'articles qui prècédes
		 else
			 {
			//si la donelist n'est pas vide et ce n'est pas le dernier élément de la liste, alors passer le focus ou premiére enfant	 
		if(donelist.firstChild && element.parentNode !== donelist.lastElementChild)
		{
			if(element.nodeName ==="DIV") donelist.firstChild.querySelector("div").focus();
			if(element.nodeName ==="IMG") donelist.firstChild.querySelector("img").focus();
		}
		//si donelist est vide
		else
		{
			if(element.nodeName ==="IMG")
			{
				//si todolist n'est pas vide
				if(todolist.firstElementChild) //&& todolist.firstElementChild !== todolist.lastElementChild)
				{
					todolist.lastElementChild.querySelector("img").focus();
				}
				else{
					if(donelist.firstElementChild && donelist.firstElementChild !== donelist.lastElementChild)
					{
						donelist.firstElementChild.querySelector("img").focus();
					}else
					{
						if(todolist.firstElementChild && todolist.firstElementChild !== todolist.lastElementChild)
						{
							todolist.firstElementChild.querySelector("img").focus();
						}
						else
						{
							input.focus();	
						}
					}
					}
				}else
				{
					input.focus();	
				}	 
			}
				 
			 }
		} 
}

function gestionFocusImg(myImg)
{
	var parentOfImgToDelete = myImg.parentElement;
	console.log(parentOfImgToDelete);
	if(parentOfImgToDelete.nextElementSibling){
		parentOfImgToDelete.nextElementSibling.querySelector("img").focus();	
	}else{
		if(donelist.firstChild && myImg.parentNode !== donelist.lastElementChild){
			donelist.firstChild.querySelector("img").focus();
		}else{
					input.focus();	
				}	
	}
}

//-----------cocher le checkbox avec la touche SPACE---------
function spacePress(event)
{
	if(!event) event = window.Event;
	
	var keyCode = event.keyCode || event.which;
	
	if(keyCode == "32"){
		checkBoxChecked(this);
	}
}

function checkBoxChecked()
{
	this.checked = true;
}

//-------verification de la touche qui a genere l'action sur le div-----------
input.onkeypress = enterPress;

	//Checking if a string is empty, null, undefined,is blank or contains only white-space 
	function isEmpty(str) {
        return (!str || 0 === str.length || !str.trim());
    }
//-------------effacer une tache ------------------
function deleteTodo(element)
{
	gestionFocus(element);
	
	element.parentNode.outerHTML = "";	
	refreshButtonsStatus();
}

//Methode qui est apple quand le checkbox est coché
function isChecked()
{
	var myArticle = this.parentNode;
	if(this.checked == true)
		{		
			todolist.removeChild(myArticle);
			myArticle.classList.add("tacheComplete");
			
			var firstChild = donelist.firstChild;
			donelist.insertBefore(myArticle, firstChild);
			myArticle.querySelector("input").focus();
		}
	else
		{
			donelist.removeChild(myArticle);
			myArticle.classList.remove("tacheComplete");
			todolist.appendChild(myArticle);
			myArticle.querySelector("input").focus();
		}
	refreshButtonsStatus();
}

	//todolist.onchange = function(){ if (todolist.empty) alert();};
	//todolist.hasChildNodes()  verifier si la liste est vide
	
function ajouterTodo(todoText)
	{
		var cloneTemplateArticle = templateArticle.cloneNode(true);
		
//		var article = document.createElement("article");
//		
//		var input = document.createElement("input");
//		input.type = "checkbox";
//		input.classList.add("checkbox");
//		article.appendChild(input);
		
//		input.onchange = isChecked;
//		input.onkeypress = spacePress;
		
		cloneTemplateArticle.firstElementChild.onchange = isChecked;
		cloneTemplateArticle.firstElementChild.onkeypress = spacePress;
		
//		var div = document.createElement("div");
//		div.classList.add("text");
//		div.tabIndex = 0;
//		div.contentEditable = true;
//		div.textContent = todoText;
		cloneTemplateArticle.querySelector("div:nth-child(2)").textContent = todoText;
//		article.appendChild(div);
		
//		div.onkeypress = enterPress;
		cloneTemplateArticle.querySelector("div:nth-child(2)").onkeypress = enterPress;
		
//		var img = document.createElement("img");
//		img.src = "../../images/Actions-window-close-icon.png";
//		img.alt="delete";
//		img.tabIndex = 0;
//		article.appendChild(img);
		
//		img.onclick = function() {deleteTodo(this);}
//		img.onkeypress = enterPress;
		
		cloneTemplateArticle.lastElementChild.onclick = function(){deleteTodo(this);}
		cloneTemplateArticle.lastElementChild.onkeypress = enterPress;
		
		var firstChild = todolist.firstChild;
		todolist.insertBefore(cloneTemplateArticle, firstChild);
		
		// modifier etat boutons ------
		refreshButtonsStatus();
	}
//---------- ajuter une tache complete--------------------------	
function ajuterTodoTacheComplete(textTacheComplete)
{
	var article = document.createElement("article");
		
		var input = document.createElement("input");
		input.type = "checkbox";
		input.classList.add("checkbox");
		article.appendChild(input);
		
		input.onchange = isChecked;
		input.onkeypress = spacePress;
		input.checked = true;
			
			
		var div = document.createElement("div");
		div.classList.add("text");
		div.tabIndex = 0;
		div.contentEditable = true;
		div.textContent = textTacheComplete;
		article.appendChild(div);
		
		div.onkeypress = enterPress;
		
		var img = document.createElement("img");
		img.src = "../../images/Actions-window-close-icon.png";
		img.alt="delete";
		img.tabIndex = 0;
		article.appendChild(img);
		
		img.onclick = function() {deleteTodo(this);}
		
		img.onkeypress = enterPress;

		donelist.appendChild(article);
			
		article.classList.add("tacheComplete");
}
	
//------ajouter des action aux boutons d'action collective-------------------------------	
var buttonTachesCompletees = buttons.querySelector("button:nth-child(1)");

function marquerTousLesTachesAfaireCommeCompeletees()
{
	var listTodoInput = todolist.querySelectorAll("input");
	for(var index = 0; index <listTodoInput.length; index++)
		{
			listTodoInput[index].click();
		}
	buttonTachesCompletees.disabled = true;
}

buttonTachesCompletees.onclick = marquerTousLesTachesAfaireCommeCompeletees;

//------effacer tous les tâches completees--------------------
var buttonEffacerTachesCompletees = buttons.querySelector("button:nth-child(2)");

function effacerToutesTachecCompletees()
{
	var listTodoImg = donelist.querySelectorAll("img");
	for(var i = 0; i<listTodoImg.length; i++)
		{
			listTodoImg[i].click();
		}
	buttonEffacerTachesCompletees.disabled = true;
}

buttonEffacerTachesCompletees.onclick = effacerToutesTachecCompletees;

//--------activation des buttons avec chaque evenement --------------------
function refreshButtonsStatus()
{
	buttons.querySelector("button:nth-child(1)").disabled = !(todolist.hasChildNodes());
	buttons.querySelector("button:nth-child(2)").disabled = !(donelist.hasChildNodes());
}

//---------persistance des données---------------------
function dataUpdated()
{
	var listeAllTask = [];
	
	var listeTodoDiv = todolist.querySelectorAll("div");
	var listeTodo =  [];
	
	for(var i=listeTodoDiv.length-1; i>=0; i--)
		{
			listeTodo.push(listeTodoDiv[i].innerText);
		}
	listeAllTask.push(listeTodo);
	
	
	var listeDoneDiv = donelist.querySelectorAll("div");
	var listeDone =  [];
	
//	for(var i=listeDoneDiv.length-1; i>=0; i--)
	for(var i=0; i < listeDoneDiv.length; i++)
		{
			listeDone.push(listeDoneDiv[i].innerText);
		}
	listeAllTask.push(listeDone);
	listeAllTask.push(input.value);
	
	listeAllTask.push(root.className);
	listeAllTask.push(combobox.selectedIndex);
	
	return JSON.stringify(listeAllTask);
}





//	input.onblur = function(){
//		alert();
//	}
//--------------------TP5-----------------combobox---
	var root = document.querySelector("html");
	
	function setRootClass(classForRoot){
		if(classForRoot === "")
			{
				root.className = "";
			}else{
				root.className = classForRoot;
			}
	}
	
	combobox.onchange = function(){
		//alert(combobox.querySelector("option")[this.selectedIndex].value);
		var selectedOption = this.selectedIndex+1;
		console.log(selectedOption);
		console.log((combobox.querySelector("option:nth-child("+selectedOption+")")).value);
		
		var myClass = (combobox.querySelector("option:nth-child("+selectedOption+")")).value;
		
		setRootClass(myClass);
	}

	
	
	function parseQueryString(qstr){
		var query = {};
		var parameters = qstr.substring(1).split('&');
		for(var i= 0; i<parameters.length; i++)
			{
				var keyAndValue = parameters[i].split("=");
				var key = decodeURIComponent(keyAndValue[0]);
				var value = decodeURIComponent(keyAndValue[1] || '');
				query[key] = value
			}
		return query;
	}
	
//-------chargement du localStorage-------------------------
	if(localStorage.getItem("jsonAlltask"))
	{
		//recuperation de la liste 
		var listeAllTask = JSON.parse(localStorage.getItem("jsonAlltask"));
		
		listeAllTask[0].forEach((item, index) => ajouterTodo(item));
		
		listeAllTask[1].forEach((textTacheComplete, indexListe2) => ajuterTodoTacheComplete(textTacheComplete));
		
		input.value = listeAllTask[2];
		root.className = listeAllTask[3];
		combobox.selectedIndex = listeAllTask[4];
	}
else{
	var listeTodo = ["Enchore une chause à faire", "Autre chose à faire","Chose à faire" ];
	listeTodo.forEach((item, index) => ajouterTodo(item));
}
	
//------chargement du skin de query string-----------
	var qstr = window.location.search;
	if(qstr !== "")
		{
			var query = parseQueryString(qstr);
			console.log(query.skin);
			
			setRootClass(query.skin);
			
			switch(query.skin) 
				{
					case "blue-on-orange": combobox.selectedIndex = 1;
						break;
					case "my_skin": combobox.selectedIndex = 2;
						break;
					default: combobox.selectedIndex = 0;
				}
		}
	
	
	
//-------souvgarder l'object JSON dans le localStorage ou chargement de la page-----------
	//onunload
window.onbeforeunload = () => {
  	if (!todolist.querySelectorAll("div").isEmpty || !donelist.querySelectorAll("div").isEmpty)
		{
			 localStorage.setItem("jsonAlltask", dataUpdated());
		}
  };

refreshButtonsStatus();
	
})();