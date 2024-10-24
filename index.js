const contactsArray = [];

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

        const contacts = [...xmlDoc.querySelectorAll("contact")];
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
    //creation du container
    const contactsContainer = document.createElement("section");
    contactsContainer.setAttribute("id", "contactsContainer");

    // Boucle pour créer chaque contact
    for(let i=0; i<contactsArray.length; i++){
        const contactContainer = document.createElement("section");
        contactContainer.setAttribute("class", "contact");
        // Elements p pour contenir les informations du contact
        const contactNom = document.createElement("p");
        const contactNum = document.createElement("p");
        // On donne les valeurs
        contactNom.innerHTML = "- "+contactsArray[i]['nom']+" "+contactsArray[i]['prenom'];
        contactNum.innerHTML = "- "+contactsArray[i]['numero'];
        // les elements p sont ajouté à l'élément contact
        contactContainer.appendChild(contactNom);
        contactContainer.appendChild(contactNum);
        // Le contact est ajouté au container
        contactsContainer.appendChild(contactContainer);
    }
    // Le container est ajouté au body
    document.body.appendChild(contactsContainer);
}

function createNbContacts(){
    //creation du container
    const nbContactsContainer = document.createElement("section");
    nbContactsContainer.setAttribute("id", "nbContactsContainer");

    const nbContact = document.createElement("p");
    nbContact.innerHTML = "Vous avez "+contactsArray.length+" contacts";

    nbContactsContainer.appendChild(nbContact);

    // Le container est ajouté au body
    document.body.appendChild(nbContactsContainer);
}

async function loadPage() {
    await monXMLParser("contacts.xml");
    createListeContacts();
    createNbContacts();
}

loadPage();


//setTimeout(()=>createListeContacts(),20);
//setTimeout(()=>createNbContacts(),20);

//////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const selectAction = document.getElementById('actionSelect');
    const formAddContact = document.getElementById('addContactForm');
    const contentDisplay = document.getElementById('contentDisplay');

    let contacts = [
        { nom: 'Jean Aymare', prenom: 'Jean', tel: '06 85 45 69 95' },
        { nom: 'Léa Ricault', prenom: 'Léa', tel: '06 28 32 78 65' },
        { nom: 'Mélanie Zetteaufré', prenom: 'Mélanie', tel: '07 35 78 46 22' }
    ];

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

    const avatar = document.createElement('img');
    // Remplacer l'image souhaitée
    avatar.src = 'https://via.placeholder.com/100'; 
    avatar.alt = 'Avatar';
    avatar.style.width = '100px';
    avatar.style.margin = '20px auto';
    avatar.style.display = 'block';
    app.insertBefore(avatar, selectAction);

    selectAction.style.width = '100%';
    selectAction.style.padding = '10px';
    selectAction.style.margin = '10px 0';
    selectAction.style.border = '1px solid #ddd';
    selectAction.style.borderRadius = '5px';
    selectAction.style.backgroundColor = '#d32f2f'; 
    selectAction.style.color = '#fff';

    formAddContact.style.display = 'none';

    // Appliquer les styles du formulaire
    formAddContact.style.backgroundColor = '#f0f0f0'; 
    formAddContact.style.padding = '20px';
    formAddContact.style.borderRadius = '5px';

    const inputs = formAddContact.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.width = '100%';
        input.style.padding = '10px';
        input.style.margin = '10px 0';
        input.style.border = '1px solid #d32f2f';
        input.style.borderRadius = '5px';
        input.style.fontSize = '16px';
        input.style.backgroundColor = '#fff'; 
    });

    const submitButton = formAddContact.querySelector('button');
    submitButton.style.width = '100%';
    submitButton.style.padding = '10px';
    submitButton.style.margin = '10px 0';
    submitButton.style.border = 'none';
    submitButton.style.backgroundColor = '#d32f2f'; // Rouge spécifique pour le bouton
    submitButton.style.color = '#fff';
    submitButton.style.borderRadius = '5px';
    submitButton.style.fontSize = '16px';
    submitButton.style.cursor = 'pointer';

    // Fonction pour afficher la liste des contacts avec le style
    function renderContacts() {
        contentDisplay.innerHTML = ''; 
        const listContainer = document.createElement('div');
        listContainer.style.backgroundColor = '#f0f0f0';
        listContainer.style.padding = '20px';
        listContainer.style.borderRadius = '5px';

        const listTitle = document.createElement('h3');
        listTitle.innerText = 'Liste de vos contacts';
        listTitle.style.color = '#d32f2f'; // Titre en rouge spécifique
        listContainer.appendChild(listTitle);

        const contactList = document.createElement('ul');
        contactList.style.listStyleType = 'none'; // Pas de puces
        contactList.style.padding = '0';

        contacts.forEach(contact => {
            const contactItem = document.createElement('li');
            contactItem.innerHTML = `<strong style="color: #d32f2f;">${contact.nom}</strong><br>${contact.tel}`;
            contactItem.style.marginBottom = '10px';
            contactList.appendChild(contactItem);
        });

        listContainer.appendChild(contactList);
        contentDisplay.appendChild(listContainer);
    }

    // Fonction pour afficher le formulaire d'ajout
    function renderAddContactForm() {
        contentDisplay.innerHTML = ''; 
        formAddContact.style.display = 'block';

        // Gérer la soumission du formulaire
        formAddContact.addEventListener('submit', (e) => {
            e.preventDefault();
            const nouveauContact = {
                nom: document.getElementById('inputNom').value,
                prenom: document.getElementById('inputPrenom').value,
                tel: document.getElementById('inputTel').value
            };
            contacts.push(nouveauContact);
            formAddContact.reset();
            // Afficher les contacts après ajoute
            renderContacts(); 
        });
    }

    // Fonction pour afficher le nombre de contacts avec le style
    function renderContactCount() {
        contentDisplay.innerHTML = ''; // Vider le contenu précédent
        const countContainer = document.createElement('div');
        countContainer.style.backgroundColor = '#f0f0f0'; // Fond gris clair
        countContainer.style.padding = '20px';
        countContainer.style.borderRadius = '5px';

        const countTitle = document.createElement('h3');
        countTitle.innerHTML = `Vous avez <strong style="color: #d32f2f;">${contacts.length}</strong> contacts`; // Nombre en rouge spécifique
        countContainer.appendChild(countTitle);
        contentDisplay.appendChild(countContainer);
    }

    // Gérer le changement d'option dans le menu déroulant
    selectAction.addEventListener('change', (e) => {
        const action = e.target.value;
        formAddContact.style.display = 'none'; 
        if (action === 'list') {
            renderContacts();
        } else if (action === 'add') {
            renderAddContactForm();
        } else if (action === 'count') {
            renderContactCount();
        } else {
            contentDisplay.innerHTML = ''; 
        }
    });
});