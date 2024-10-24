const formContainer = document.getElementById('formulaire');
/* formContainer.addEventListener("submit", function(event){
    event.preventDefault();
    const contact ={ formContainer.el['name'].value }   
}); */
const br1 = document.createElement('br');
const br2 = document.createElement('br');
const br3 = document.createElement('br');
const br4 = document.createElement('br');
const br5 = document.createElement('br');
const br6 = document.createElement('br');
const label1 = document.createElement('label');
const label2 = document.createElement('label');
const label3 = document.createElement('label');


label1.innerHTML='Nom';
label2.innerHTML='Prénom';
label3.innerHTML='Numéro';


// Créer un élément de formulaire
const form = document.createElement('form');
form.setAttribute('method', 'post');
//form.setAttribute('action', '#');

// Créer un champ de texte
const inputNom = document.createElement('input');
inputNom.setAttribute('type', 'text');
inputNom.setAttribute('name', 'Nom');


// Créer un champ de mot de passe
const inputPrenom = document.createElement('input');
inputPrenom.setAttribute('type', 'text');
inputPrenom.setAttribute('name', 'Prénom');


const inputNumero = document.createElement('input');
inputNumero.setAttribute('type', 'text');
inputNumero.setAttribute('name', 'Numéro');
// Créer un bouton de soumission
const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.textContent = 'Valider';

// Ajouter les champs au formulaire
form.appendChild(label1);
form.appendChild(br1);
form.appendChild(inputNom);
form.appendChild(br2);
form.appendChild(label2);
form.appendChild(br3);
form.appendChild(inputPrenom);
form.appendChild(br4);
form.appendChild(label3);
form.appendChild(br5);
form.appendChild(inputNumero);
form.appendChild(br6);
form.appendChild(submitButton);

// Ajouter le formulaire au conteneur
formContainer.appendChild(form);








 