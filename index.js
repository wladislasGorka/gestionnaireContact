const contactsArray = [];

document.addEventListener('DOMContentLoaded', () => {
    const icon = document.createElement('img')
    icon.src = 'https://www.freeiconspng.com/uploads/contact-icon-png-1.png'; 
    icon.alt = 'Avatar';
    icon.style.position = 'absolute';
    icon.style.top = '41%';
    icon.style.left = '42%';
    icon.style.width = '100px';
    icon.style.margin = '20px auto';
    icon.style.display = 'block';

    document.body.appendChild(icon);

    icon.addEventListener('click',(e) => {
        icon.style.display = 'none';
        createApp();

    });

    monXMLParser("contacts.xml");    
});

function createApp(){
    // Création des containers et du menu
    const appElement = document.createElement('section');
    appElement.setAttribute('id', 'app');
    const selectActionElement = document.createElement('select');
    selectActionElement.setAttribute('id', 'actionSelect');
    const contentDisplayElement = document.createElement('section');
    contentDisplayElement.setAttribute('id', 'contentDisplay');

    // OPTION 1
    const option1 = document.createElement('option');
    option1.setAttribute('value', " ");
    option1.innerHTML = "Que voulez-vous faire ?";
    // OPTION 2
    const option2 = document.createElement('option');
    option2.setAttribute('value', 'list');
    option2.innerHTML = "Lister les contacts";
    // OPTION 3
    const option3 = document.createElement('option');
    option3.setAttribute('value', 'add');
    option3.innerHTML = "Ajouter un contact";
    // OPTION 4
    const option4 = document.createElement('option');
    option4.setAttribute('value', 'count');
    option4.innerHTML = "Voir le nombre de contacts";

    selectActionElement.appendChild(option1);
    selectActionElement.appendChild(option2);
    selectActionElement.appendChild(option3);
    selectActionElement.appendChild(option4);
    appElement.appendChild(selectActionElement);
    appElement.appendChild(contentDisplayElement);
    document.body.appendChild(appElement);

    const app = document.getElementById('app');
    const selectAction = document.getElementById('actionSelect');
    const contentDisplay = document.getElementById('contentDisplay');

    // Appliquer le style global
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.backgroundColor = '#f4f4f4';
    document.body.style.margin = '0';
    document.body.style.padding = '20px';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';

    app.style.maxWidth = '400px';
    app.style.width = '100%';
    app.style.padding = '20px';
    app.style.borderRadius = '10px';
    app.style.backgroundColor = 'white';
    app.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    app.style.textAlign = 'center';

    const title = document.createElement('h1');
    title.innerText = 'Gestionnaire de contacts';
    title.style.color = '#d32f2f'; 
    app.insertBefore(title, selectAction);

    //  l'image et le style
    const avatar = document.createElement('img');

    avatar.src = 'https://www.freeiconspng.com/uploads/contact-icon-png-1.png'; 
    avatar.alt = 'Avatar';
    avatar.style.width = '100px';
    avatar.style.margin = '20px auto';
    avatar.style.display = 'block';
    app.insertBefore(avatar, selectAction);
    // fin style image 
    selectAction.style.width = '100%';
    selectAction.style.padding = '10px';
    selectAction.style.margin = '10px 0';
    selectAction.style.border = '1px solid #ddd';
    selectAction.style.borderRadius = '5px';
    selectAction.style.backgroundColor = '#d32f2f'; 
    selectAction.style.color = '#fff';

    // Gérer le changement d'option dans le menu déroulant
    selectAction.addEventListener('change', (e) => {
        const action = e.target.value;
        if (action === 'list') {
            createListeContacts();
        } else if (action === 'add') {
            createContact();
        } else if (action === 'count') {
            createNbContacts();
        } else {
            contentDisplay.innerHTML = ''; 
        }
    });
}    

async function monXMLParser(url) {
    try{
        const reponse = await fetch(url);
        //console.log(reponse);

        if(!reponse.ok) throw new Error("Le fichier XML n'a pu être trouvé");
        const xmlText = await reponse.text();
        //console.log(xmlText);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText,"text/xml");
        //console.log(xmlDoc);
        //console.log(xmlDoc.querySelectorAll("contact"));
        const contacts = xmlDoc.querySelectorAll("contact");
        //console.log(contacts);
        contacts.forEach((contact) => {
            contactsArray.push({
                nom: contact.querySelector("nom").textContent,
                prenom: contact.querySelector("prenom").textContent,
                numero: contact.querySelector("numero").textContent,
            })
        });
    }catch(error){
        console.log(error);
    }
}

function createListeContacts(){
    contentDisplay.innerHTML = '';
    //creation du container
    const contactsContainer = document.createElement("section");
    contactsContainer.setAttribute("id", "contactsContainer");

    contactsContainer.style.backgroundColor = '#f0f0f0';
    contactsContainer.style.padding = '20px';
    contactsContainer.style.borderRadius = '5px';

    const listTitle = document.createElement('h3');
    listTitle.innerText = 'Liste de vos contacts';
    listTitle.style.color = '#d32f2f'; // Titre en rouge spécifique
    contactsContainer.appendChild(listTitle);

    // Boucle pour créer chaque contact
    for(let i=0; i<contactsArray.length; i++){
        const contactContainer = document.createElement("section");
        contactContainer.setAttribute("class", "contact");
        // Elements p pour contenir les informations du contact
        const contactNom = document.createElement("p");
        contactNom.style.margin = '0px';
        contactNom.style.textAlign = 'left';
        contactNom.style.color = '#d32f2f';
        const contactNum = document.createElement("p");
        contactNum.style.margin = '0px';
        contactNum.style.marginBottom = '15px';
        contactNum.style.textAlign = 'left';
        contactNum.style.color = '#d32f2f';
        // On donne les valeurs
        //contactNom.innerHTML = "- "+contactsArray[i]['nom']+" "+contactsArray[i]['prenom'];
        contactNom.innerHTML = `- <strong>${contactsArray[i]['nom']} ${contactsArray[i]['prenom']}</strong>`;
        contactNum.innerHTML = "- "+contactsArray[i]['numero'];
        // les elements p sont ajouté à l'élément contact
        contactContainer.appendChild(contactNom);
        contactContainer.appendChild(contactNum);
        // Le contact est ajouté au container
        contactsContainer.appendChild(contactContainer);
        
    }
    // Le container est ajouté au body
    //document.body.appendChild(contactsContainer);
    contentDisplay.appendChild(contactsContainer);
}

// FORMULAIRE
function createContact(){
    contentDisplay.innerHTML = '';

    const formContainer = document.createElement('section');
    formContainer.setAttribute("id", "formulaire");
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
    // creation formulaire 
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    // Event Listener
    form.addEventListener("submit", function(event){
        event.preventDefault();
        const contactNom = document.getElementById("nom").value;
        const contactPrenom = document.getElementById("prenom").value;
        const contactNumero = document.getElementById("numero").value;
        const contact = { nom: contactNom , prenom :  contactPrenom , numero: contactNumero };
        contactsArray.push(contact);
        console.log(contactsArray);
        writeXML(contactsArray);

        // Retour a la liste des contacts apres ajout
        createListeContacts();
    }); 
    // nom
    const inputNom = document.createElement('input');
    inputNom.setAttribute('type', 'text');
    inputNom.setAttribute('id', 'nom');
    inputNom.setAttribute('required', '');
    // prenom
    const inputPrenom = document.createElement('input');
    inputPrenom.setAttribute('type', 'text');
    inputPrenom.setAttribute('id', 'prenom');
    inputPrenom.setAttribute('required', '');
    //numero
    const inputNumero = document.createElement('input');
    inputNumero.setAttribute('type', 'text');
    inputNumero.setAttribute('id', 'numero');
    inputNumero.setAttribute('required', '');
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

    contentDisplay.appendChild(formContainer);

    // Appliquer les styles du formulaire
    formContainer.style.backgroundColor = '#f0f0f0'; 
    formContainer.style.padding = '20px';
    formContainer.style.borderRadius = '5px';

    const inputs = formContainer.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.width = '90%';
        input.style.padding = '10px';
        input.style.margin = '10px 0';
        input.style.border = '1px solid #d32f2f';
        input.style.borderRadius = '5px';
        input.style.fontSize = '16px';
        input.style.backgroundColor = '#fff'; 
    });

    const submitFormButton = formContainer.querySelector('button');
    submitFormButton.style.width = '100%';
    submitFormButton.style.padding = '10px';
    submitFormButton.style.margin = '10px 0';
    submitFormButton.style.border = 'none';
    submitFormButton.style.backgroundColor = '#d32f2f'; // Rouge spécifique pour le bouton
    submitFormButton.style.color = '#fff';
    submitFormButton.style.borderRadius = '5px';
    submitFormButton.style.fontSize = '16px';
    submitFormButton.style.cursor = 'pointer';
}

function createNbContacts(){
    contentDisplay.innerHTML = '';
    //creation du container
    const nbContactsContainer = document.createElement("section");
    nbContactsContainer.setAttribute("id", "nbContactsContainer");

    nbContactsContainer.style.backgroundColor = '#f0f0f0'; // Fond gris clair
    nbContactsContainer.style.padding = '20px';
    nbContactsContainer.style.borderRadius = '5px';

    const nbContact = document.createElement("p");
    nbContact.innerHTML = `Vous avez <strong style="color: #d32f2f;">${contactsArray.length}</strong> contacts`;

    nbContactsContainer.appendChild(nbContact);

    // Le container est ajouté au body
    //document.body.appendChild(nbContactsContainer);
    contentDisplay.appendChild(nbContactsContainer);
}

// Fonction pour convertir un tableau d'objets en XML
function convertToXML(array) {
    let xml = '<contacts>\n';

    array.forEach(contact => {
        xml += '  <contact>\n';
        xml += `    <nom>${contact.nom}</nom>\n`;
        xml += `    <prenom>${contact.prenom}</prenom>\n`;
        xml += `    <numero>${contact.numero}</numero>\n`;
        xml += '  </contact>\n';
    });

    xml += '</contacts>';
    return xml;
}

function writeXML(array){
    const xmlContent = convertToXML(array);

    fetch('http://localhost:3000/write-xml', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: xmlContent,
    });
}