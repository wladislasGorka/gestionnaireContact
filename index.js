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
    app.style.border =  '5px solid #000000';
    app.style.width = '100%';
    app.style.padding = '50px';
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
    avatar.src = 'https://www.freeiconspng.com/uploads/contact-icon-png-1.png'; 
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
    formAddContact.style.backgroundColor = '#dedcdc'; 
    formAddContact.style.padding = '30px';
    formAddContact.style.borderRadius = '5px';

    const inputs = formAddContact.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.width = '95%';
        input.style.padding = '7px';
        input.style.margin = '10px 0';
        input.style.border = '1px solid #d32f2f';
        input.style.borderRadius = '5px';
        input.style.fontSize = '16px';
        input.style.backgroundColor = '#fff'; 
    });

    const submitButton = formAddContact.querySelector('button');
    submitButton.style.width = '78%';
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
        countContainer.style.backgroundColor = '#f0f0f0';
        countContainer.style.padding = '20px';
        countContainer.style.borderRadius = '5px';

        const countTitle = document.createElement('h3');
        countTitle.innerHTML = `Vous avez <strong style="color: #d32f2f;">${contacts.length}</strong> contacts`; 
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
