(function () {
    'use strict';
    var monImage = document.querySelector('img'), monButton = document.querySelector('button');
    
        monImage.onclick = function () {
        var maSrc = monImage.getAttribute('src');
        if (maSrc === "images/firefox-icon.png") {
            monImage.setAttribute('src', 'images/firefox.png');
        } else {
            monImage.setAttribute('src', 'images/firefox-icon.png');
        }
    };

    monButton = document.querySelector('button');
    var monTitre = document.querySelector('h1');
    
    function definirNomUtilisateur() {
        var monNom = prompt('Veuillez saisir votre nom : ');
       if ( localStorage.getItem('nom') === 'null' || isEmpty(monNom))
           {
			   
               if (!localStorage.getItem('nom')) localStorage.setItem('nom', 'Inconnu');
			   
           } else {
               localStorage.setItem('nom', monNom.trim());
           }
        monTitre.textContent = 'Mozilla est cool ' + localStorage.getItem('nom');
    }
    
    //Checking if a string is empty, null, undefined,is blank or contains only white-space 
    function isEmpty(str) {
        return (!str || 0 === str.length || !str.trim());
    }

    monButton.onclick = definirNomUtilisateur;
    
    if (!localStorage.getItem('nom') || localStorage.getItem('nom') === 'null') {
        definirNomUtilisateur();
    } else {
        var nomEnregistre = localStorage.getItem('nom');
        monTitre.textContent = 'Mozilla est cooll ' + nomEnregistre;
    }
    

})();

  