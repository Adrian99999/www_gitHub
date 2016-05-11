(function () {
	'use strict';
	//grab the template script
	
	
	jQuery.getJSON("projets.json").done(function(jsonData){
		console.log(JSON.stringify(jsonData, null,4));
		var context = jsonData;
		
		var templateScript = $("#template").html();
		var template = Handlebars.compile(templateScript);
		var compiledHtml = template(context);
  		$("#ulMenu").append(compiledHtml);
		
  
	})
	.fail(function(){
		console.log("Impossible de charger le JSON");
	});
	
	//compile the template
//	var template = Handlebars.compile(templateScript);
	//the default context, which is passed to the template
//	var context = {
//		projets : [
//			{nom: "Langues", dir: "langues", description: "Pratique de l'utilisation des sélecteurs et de la mise en page avec CSS3", sujets: ["CSS", "HTML5", "Sélecteurs"]},
//			{nom: "Pens", dir: "pens", description:"Exercices que j'ai faits sur CodePen"},
//			{nom: "Youtube", dir: "youtube"},
//			{nom: "Tutoriel", dir: "tutorielJS"},
//			{nom: "Todo liste", dir:"todoListe", description:"Une liste de choses à faire"},
//			{nom: "Todo", dir:"todoListe", description:"Le skin par défaut", skin: " ", spanSkin: "classique"},
//			{nom: "Todo", dir:"todoListe", description:"Le skin blue on orange", skin: "blue-on-orange", spanSkin: "orange"},
//			{nom: "Todo", dir:"todoListe", description:"Le skin personalisé", skin: "my_skin",spanSkin: "my skin"}
//	    ]
//	};
	
//	console.log(JSON.stringify(context));
   
		
 

	var labelSourdine = document.querySelector(".retourAccueil>label");
	labelSourdine.onmouseover = () =>{
		
		if(checkboxSourdine.checked == true)
			{
				labelSourdine.setAttribute("title", "Désactiver la sourdine");
			}
		else{
			labelSourdine.setAttribute("title", "Activer la sourdine");
		}
		
		
	}
	
var audio = document.querySelector("audio");
checkboxSourdine.addEventListener("change", myFunction);

function myFunction()
{
	if(!checkboxSourdine.checked === true)
			{
				audio.load();
				audio.play();
				console.log(checkboxSourdine.checked);
			}
}

function initMenu()
{	
	projets.forEach( function (arrayItem)
	{
		var a = document.createElement("a");
		a.href = "../"+arrayItem.dir + "/index.html";
		a.textContent = arrayItem.nom;
		
		var li = document.createElement("li");
		li.appendChild(a);
		ulMenu.appendChild(li);
	});
}

//initMenu();



if(localStorage.getItem("checkBoxChecked"))
	{
		if(localStorage.getItem("checkBoxChecked") == "false"){
			checkboxSourdine.checked = false; 
		}
		else
			{
				checkboxSourdine.checked = true; 
			}
		myFunction();
	}

//
window.onbeforeunload = () => {
   localStorage.setItem("checkBoxChecked", checkboxSourdine.checked);
	colsole.log(checkboxSourdine.checked);
  };

})();

