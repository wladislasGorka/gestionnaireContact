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
