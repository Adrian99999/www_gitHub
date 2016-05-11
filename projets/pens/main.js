(function (){
	'use strict';
	
	var listePens = [
	{data_slug_hash: "XdVpMQ", 
	 href: "http://codepen.io/Adrian99999/pen/XdVpMQ/", 
	 nom: "JS Objets Passifs (Exercice)"}, 
	{data_slug_hash: "bpaRYL", 
	 href: "http://codepen.io/Adrian99999/pen/bpaRYL/", 
	 nom: "JS DOM createElement (exercice 3 )"}, 
	{data_slug_hash: "XdVWRw", 
	 href: "http://codepen.io/Adrian99999/pen/XdVWRw/", 
	 nom: "JS DOM innerHTML (exercice)"}, 
	{data_slug_hash: "MyOMXR", 
	 href: "http://codepen.io/Adrian99999/pen/MyOMXR/", 
	 nom: "JS stylage direct (exercice)"},
	{data_slug_hash: "BKRJNz", 
	 href: "http://codepen.io/Adrian99999/pen/BKRJNz/", 
	 nom: "Flexbox Exercice"},
	{data_slug_hash: "ONjWVw", 
	 href: "http://codepen.io/Adrian99999/pen/ONjWVw/", 
	 nom: "Texte CSS Exercice"},
];

var divPens = document.querySelector(".pens");
var template = divPens.firstElementChild;
divPens.innerHTML = "";

for(var i=0; i<listePens.length; i++)
	{
		var clonePen = template.cloneNode(true);
		clonePen.firstElementChild.setAttribute("data-slug-hash", listePens[i].data_slug_hash);
		clonePen.firstElementChild.firstElementChild.href = listePens[i].href;
		clonePen.firstElementChild.firstElementChild.textContent = listePens[i].nom;
		divPens.appendChild(clonePen);
	}
	
})();