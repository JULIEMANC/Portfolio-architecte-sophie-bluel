/*
        VARIABLE GLOBALE
*/
//recuperation de la du token de la session storage 
let token = sessionStorage.token
// constante pour stocker la liste des travaux (un Set n'a pas de doublon)
const allWorks = new Set()
const allCats = new Set()
// Pour pas avoir d'apparition non demandée 
let modal = null
let modalAddwork = null
//constante des elements html
const gallery = document.querySelector(".gallery ")
const btnfiltres = document.querySelector(".btnfiltres")
const projectandMod = document.querySelector(".projectandMod")
const modal1 = document.getElementById("modal1")
const galleryModal = document.querySelector(".galleryModal")
const form = document.getElementById("modalAddwork")
const previewImage = document.getElementById("preview-image")
const titleInput = document.getElementById("title-img")
const imageInput = document.getElementById("add-imgbutton")
const validFile = document.getElementById("input-container")
const submitWork = document.getElementById("submit-work")
const categoryInput = document.getElementById("category-option")
let messageErrorTitle = document.createElement("span")

/*
        INIT
*/
// fonction d'initialisation, elle permet de preparer les Set et d'appeler les fonction du code
async function init() {
    //on appel la fonction qu'on a crée (pour appeler une fonciton "async", il faut etre dans une fonction "async" et utilisé "await"
    const works = await getDatabaseInfo("works")

    //pour chaque travaux de la liste, on les rajoute a notre constante allWorks
    for (const work of works) {
        allWorks.add(work)
    }
    const cats = await getDatabaseInfo("categories")

    //pour chaque catégorie de la liste, on les rajoute a notre constante allCats
    for (const cat of cats) {
        allCats.add(cat)
    }
    //on appel la fonction les plus importantes (quon regroupe)
    displayWorks()
    displayButton()
    isAdmin()
    setupModal()
    displayModal()
    setDeleteListener()
    categorySelect()
    setUpModalAddWork()
    checkInput()
  showMessage()
    createGalleryItem()
    //addNewImgData()
    //messageError()
}
init()


/*
        API FONCTION
        (add/get/delete, tous ce qui contient un fetch)
*/

//fonction pour contacter la base de donnée pour récupéré des info, le paraméttre type est du texte qui va se rajouter dans le lien
async function getDatabaseInfo(type) {
    //on enregistre dans response la réponse du serveur sur le lien donnée
    const response = await fetch(`http://localhost:5678/api/${type}`)
    //si il n'ya pas d'erreur
    if (response.ok) {
        //on renvoie la réponse sous format json
        return response.json()
    } else {
        // sinon on affiche un log de la reponse pour trouver d'ou vient l'erreur
        console.log("echec du fetch", response)
    }
}

/*
        GALLERY FONCTION
        (toutes les fonctions qui concernent la gallerie principale (hors modal) et les filtres)
*/
//fonction qui permettra d'afficher les images(travaux=works) sur la page.
function displayWorks(filtre = "0") {

    // supprime la gallerie du HTML grace aux "" vide en disant que la galerie de l'html est égale à un vide .
    gallery.innerHTML = "";

    //Triage des filtres en fonction du categoryID ( si filtres est different à 0 alirs on prends categoryId qui est = aux autres filtres.
    let selectedWorks = allWorks
    if (filtre != "0") {
        console.log(selectedWorks)
        selectedWorks = [...selectedWorks].filter((work) => work.categoryId == filtre)
    }
    //Création de la gallerie via JVS => html ( juste src et figcaption necessaire = figure)
    const fragment = document.createDocumentFragment()
    for (const work of selectedWorks) {
        const figure = document.createElement("figure")
        figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}">
							<figcaption>${work.title}</figcaption>`
        //Parent tous regroupés dans "fragment"
        fragment.appendChild(figure)
    }
    gallery.appendChild(fragment)
}
//fonction "play" des filtres.
function displayButton() {
    const fragment = document.createDocumentFragment()

    //Filtre Tous 
    const buttonTous = document.createElement("button")
    buttonTous.dataset.id = "0"
    buttonTous.textContent = "Tous"
    buttonTous.className = "filtres"
    buttonTous.classList.add("active")//ajouter la classe active au btn Tous (+css)

    fragment.appendChild(buttonTous)

    // Création des autres filtres avec une boucle for.
    for (const category of allCats) {
        const buttonOthers = document.createElement("button")
        buttonOthers.textContent = category.name
        buttonOthers.dataset.id = category.id
        buttonOthers.className = "filtres"
        fragment.appendChild(buttonOthers)
    }
    btnfiltres.appendChild(fragment)

    //Ajout de l'écoute des filtres
    addFilterListener()

}


/*
        ADMIN FUNCTION
        (function qui gere l'affichage admin)  Mode edition si token et ID valides
 affichage de la banniere mode édition et apparition des boutons LogOut et modifier
disparition de Login et des filtres
*/
function isAdmin() {
    let userId = sessionStorage.getItem("userId")
    let token = sessionStorage.getItem("token")

    if (userId != null & token != null) {
        let banner = document.querySelector(".overlay")
        banner.style.display = null

        // button login disparait 
        let connexion = document.getElementById("connexion")
        connexion.style.display = "none"
        connexion.style.padding = "0px"

        // bouton logout apparait
        let deconnexion = document.getElementById("deconnexion")
        deconnexion.style.display = null

        //apparitions des boutons
        let upChange = document.querySelector(".upChange")
        let buttonModal = document.getElementById("buttonModal")
        let logoMod = document.querySelector(".logoMod")
        upChange.style.display = null
        buttonModal.style.display = null
        logoMod.style.display = null

        //disparition des filtres 
        let filtre = document.querySelector(".btnfiltres")
        filtre.style.display = "none"
    }
}


/*
        MODAL FONCTION
        fonciton qui gere l'affichage des modales
*/
function setupModal() {
    const openModal = function (e) {

        /*Pour fermer boite modal avec button */
        const closeModal = function (e) {
            if (modal == null) return
            e.preventDefault()
            modal.style.display = "none"
        }

        /* Pour pas que la boite se ferme si on appuie dessus hors le button */
        const stopPropagation = function (e) {
            e.stopPropagation()
        }
        e.preventDefault()

        // recupere href:modifier qui ouvre la modal 
        const target = document.querySelector(e.target.getAttribute('href'))
        target.style.display = null

        target.removeAttribute('aria-hidden')
        target.setAttribute('arria-modal', 'true')

        modal = target

        modal.addEventListener('click', closeModal)
        modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
        modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    }
    // sinon créer une boucle infini, car la on récupére les modal et on leur donne le open en listener, donc faut pas etre dans le open 
    const modals = document.querySelectorAll(".js-modal") // mettre en haut dans variable globale ???
    modals.forEach(a => {
        a.addEventListener("click", openModal)
    })
}
/* cration de la gallery de la modal 1 */
/* MENTOR : si je deplace dans API fonction en haut ca fait tout bugger */
async function displayModal() {
    for (const work of allWorks) {

        let figure = document.createElement("figure") // nous avons effacer et la nous recreons les img and comment
        let img = document.createElement("img")
        let figcaption = document.createElement("figcaption")
        figcaption.textContent = "éditer"// commentaire sous img editer
        img.src = work.imageUrl
        img.alt = work.title

        /* deletIcon*/
        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon") // src icone
        deleteIcon.dataset.id = work.id

        // ajout des parents aux nvx éléments
        figcaption.appendChild(deleteIcon)
        figure.appendChild(img)
        figure.appendChild(figcaption)
        figure.classList.add("figure-modal-add")
        figure.dataset.figureModal = work.id
        galleryModal.appendChild(figure)
    }
}
/* delete icone poubelle dans le back */
function setDeleteListener() {
    const deleteIcon = document.querySelectorAll(".delete-icon")
    for (const icon of deleteIcon) {

        icon.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;
            const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}` // declarer en haut de page 
                }
            })
            if (response.ok) {
                console.log(`image supprimé`)
                document.querySelector(`[data-figure-modal="${id}"]`).remove()

            } else {
                throw new Error(`Impossible de supprimer l'image `)
            }

        })
    }
}
// // // // MODAL ADDWORK//  

// const openAddModal=function(e) {
//  const stopPropagation = function (e) {
//         e.stopPropagation()
//     }
//     e.preventDefault()
// }
function setUpModalAddWork() {
    //récuperation du bouton  modal 1 à modal addwork
    const buttonAddPhotos = document.querySelector(".buttonAddPhotos")
    //ajout d'un evenement click au btn ajouter photo modal 1 qui ouvre la 2
    buttonAddPhotos.addEventListener("click", () => {
        modalAddwork.style.display = "grid" //apparaitre modaladdWork
        modal1.style.display = "none"//disparaitre modal 1 au click de la seconde
    })
    // Récupérer la modal-addwork
    const modalAddwork = document.querySelector(".modal-addwork");

    // recuperer fleche retour 
    const backArrow = document.querySelector(".fa-solid.fa-arrow-left")

    //ajout element click a la fleche retour
    backArrow.addEventListener("click", function () {
        modalAddwork.style.display = "none" //masquer modalAddwork
        modal1.style.display = "grid"
    })
    //recuperation croix close modalAddwork
    const closeIcon = document.querySelector("#close2")

    //ajout dun listener sur le bouton pr fermer la modal
    closeIcon.addEventListener("click", function () {
        modalAddwork.style.display = "none"
        // //Reinitialiser le champs du formulaire
        // document.getElementById("form-addWork").reset()

    }
    )
}
//on recupere la liste déroulante de catégorie option 
async function categorySelect() {
    const categorySelect = document.getElementById("category-option")
    //récupere les categories depuis l'api
    await fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement("option")
                option.value = data[i].id
                option.text = data[i].name
                categorySelect.appendChild(option)
            }
        })
        .catch(error => console.error(error))
}

// //Ecoute du click sur le bouton ajout photo 
function previewSelectedImage() {
    const file = imageInput.files[0]
    if (file) {
        // console.log(previewImage, "ok")
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
            previewImage.src = e.target.result
        }
        const beforeImg = document.querySelector(".before-img-select")
        // console.log(beforeImg, "beforeImg")
        beforeImg.style.display = "none"

        const imgSelect = document.querySelector(".img-select")
        imgSelect.style.display = "grid"
    }
}

//   // Afficher un message d'erreur
//   let showErreurMessage = document.createElement("span")
//   showErreurMessage.innerText = "Veuillez sélectionner une image au format JPG ou PNG, et d'une taille maximale de 4MB."
//   showErreurMessage.style.color = "red"
//   showErreurMessage.id = "showErreurMessage"
// //   form.appendChild(showErreurMessage)

//Fonction pour creer les elements dans le DOM
function createGalleryItem(title, imageUrl) {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")
    const deleteIcon = document.createElement("i")
    const galleryModal = document.getElementById("galleryModal")

    img.src = imageUrl
    img.alt = title
    deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon")
    deleteIcon.addEventListener("click", setDeleteListener)

    figcaption.textContent = "éditer"
    figure.classList.add("figure-modal-add")

    figcaption.appendChild(deleteIcon)
    figure.appendChild(img)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
}

function checkInput() {
    //récuperation des elements de la modalAddWork
    if (titleInput.value !== "" && categoryInput.value !== "" && imageInput.value !== "") {
        // submitWork.style.color = "white"
        submitWork.style.background = "#1D6154"
    }
}
//Fonction pour affiche un message dans la modal 
function showMessage(message, type) {
    let messageElement = document.createElement("span")
    messageElement.textContent = message
    if (type === "success") {
        messageElement.classList.add("success-message")
    } else if (type === "delete") {
        messageElement.classList.add("delete-message")
    }
    addWork.appendChild(messageElement)
}
 // Ajouter un événement pour gérer les messages d'erreur
 submitWork.addEventListener("click", function (event) {
    event.preventDefault() // Empêcher le rechargement de la page

// function messageError() {
    // Vérifier si l'image est charger
    if (imageInput.value === "") {
        // Créer un message d'erreur
        let messageErrorTitle = document.createElement("span")
        messageErrorTitle.innerText = "Veuillez mettre un image."
        messageErrorTitle.style.color = "red"
        messageErrorTitle.id = "messageErrorImage"
        // Ajouter le message d'erreur au formulaire
        addWork.appendChild(messageErrorTitle)
    }
    // Vérifier si le champ titre est rempli
    if (titleInput.value === "") {
        // Créer un message d'erreur
        let messageErrorTitle = document.createElement("span")
        messageErrorTitle.innerText = "Veuillez mettre un titre valide."
        messageErrorTitle.style.color = "red"
        messageErrorTitle.id = "messageErrorTitle"
        addWork.appendChild(messageErrorTitle)
    }
    // Vérifier si la catégorie est selectionner
    if (categoryInput.value === "") {
        // Créer un message d'erreur
        let messageErrorTitle = document.createElement("span")
        messageErrorTitle.innerText = "Veuillez sélectionner une catégorie."
        messageErrorTitle.style.color = "red"
        messageErrorTitle.id = "messageErrorId"
        addWork.appendChild(messageErrorTitle)
    }

// }
//Récupérer le token depuis la sessionStorage en haut 
//Créer les données à envoyer à l'API
const formData = new FormData()
formData.append("image", imageInput.files[0])
formData.append("title", titleInput.value)
formData.append("category", categoryInput.value)


//function pour le fetch de la nouvelle image 
// async function addNewImgData() {
    //Effectuer la requête pour envoyer l'image à l'API
 fetch("http://localhost:5678/api/works", {
        method: "POST",

        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
    // .then(response => {
    // if (!response.ok) {
    throw new Error("Erreur lors de l'envoi de l'image")
    // }
    return response.json()
        // })
        .then(data => {
            // creer les elements à ajouter ds le DOM
            createGalleryItem(titleInput.value, data.imageUrl)
            //Réinitialiser le formulaire
            resetForm()
            //Masquer la modal-addwork
            modalAddwork.style.display = "none"
            //Afficher la modal1
            modal1.style.display = "block"
            //Ajouter un message de succès (compris dans la fonction plus haut )
            showMessage("L'image a été envoyée avec succès!", "success")
        })
        .catch(error => {
            console.error(error)
        })
}
// }
)
/*  LISTERNER FONCTION
  toutes les fonction qui contiennent les eventListener
  Ecoute des filtres créer en "function" par rapport au click by Id 
*/
function addFilterListener() {
    const filters = document.querySelectorAll(".filtres")
    for (const filter of filters) {
        filter.addEventListener("click", (e) => {
            const button = e.target
            const id = button.dataset.id

            //Si le bouton est actif on remove les autres filtres
            document.querySelector(".active").classList.remove("active")
            button.classList.add("active")
            displayWorks(id)
        })
    }
}
imageInput.addEventListener('change', previewSelectedImage)
  // Ajouter des écouteurs d'événements pour les champs de saisie
  titleInput.addEventListener("change", checkInput)
  categoryInput.addEventListener("change", checkInput)
  imageInput.addEventListener("change", checkInput)
