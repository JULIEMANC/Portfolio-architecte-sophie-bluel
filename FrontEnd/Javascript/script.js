/*VARIABLE GLOBALE
*/
/*recuperation de la du token de la session storage */
let token = sessionStorage.token
/*constante pour stocker la liste des travaux (un Set n'a pas de doublon)*/
const allWorks = new Set()
const allCats = new Set()
/*Pour pas avoir d'apparition non demandée */
let modal = null
let modalAddwork = null
/*constante des elements html*/
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
const formAddWork = document.getElementById("form-addwork")
const categoryInput = document.getElementById("category-option")
let messageErrorTitle = document.createElement("span")
const buttonValidate = document.querySelector("#submit-work")
const imgSelect = document.querySelector(".img-select")
const omgContainer = document.querySelector('#img-container')
let messageModal = document.getElementById("messageModal")
/*
        INIT
*/
/*fonction d'initialisation, elle permet de preparer les Set et d'appeler les fonction du code*/
async function init() {
    /*on appel la fonction qu'on a crée (pour appeler une fonciton "async", il faut etre dans une fonction "async" et utilisé "await"*/
    const works = await getDatabaseInfo("works")

    /*pour chaque travaux de la liste, on les rajoute a notre constante allWorks*/
    for (const work of works) {
        allWorks.add(work)
    }
    const cats = await getDatabaseInfo("categories")

    /*pour chaque catégorie de la liste, on les rajoute a notre constante allCats*/
    for (const cat of cats) {
        allCats.add(cat)
    }
    /*on appel la fonction les plus importantes (quon regroupe)*/
    displayWorks()
    displayButton()
    isAdmin()
    setupModal()
    displayModal()
    setDeleteListener()
    categorySelect()
    setUpModalAddWork()
    checkInput()
    resetForm()

}
init()
/*
        API FONCTION
        (add/get/delete, tous ce qui contient un fetch)
*/
/*fonction pour contacter la base de donnée pour récupéré des info, le paraméttre type est du texte qui va se rajouter dans le lien */
async function getDatabaseInfo(type) {
    //on enregistre dans response la réponse du serveur sur le lien donnée
    const response = await fetch(`http://localhost:5678/api/${type}`)
    /*si il n'ya pas d'erreur*/
    if (response.ok) {
        /*on renvoie la réponse sous format json*/
        return response.json()
    } else {
        /* sinon on affiche un log de la reponse pour trouver d'ou vient l'erreur*/
        console.log("echec du fetch", response)
    }
}
/*
        GALLERY FONCTION
        (toutes les fonctions qui concernent la gallerie principale (hors modal) et les filtres)
*/
/*fonction qui permettra d'afficher les images(travaux=works) sur la page. */
function displayWorks(filtre = "0") {

    // supprime la gallerie du HTML grace aux "" vide en disant que la galerie de l'html est égale à un vide .
    gallery.innerHTML = "";

    /*Triage des filtres en fonction du categoryID ( si filtres est different à 0 alirs on prends categoryId qui est = aux autres filtres.*/
    let selectedWorks = allWorks
    if (filtre != "0") {
        console.log(selectedWorks)
        selectedWorks = [...selectedWorks].filter((work) => work.categoryId == filtre)
    }
    /*Création de la gallerie via JVS => html */
    const fragment = document.createDocumentFragment()
    for (const work of selectedWorks) {
        const figure = document.createElement("figure")
        figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}">
							<figcaption>${work.title}</figcaption>`
        /*Parent tous regroupés dans "fragment"*/
        fragment.appendChild(figure)
    }
    gallery.appendChild(fragment)
}
/*fonction "play" des filtres*/
function displayButton() {
    const fragment = document.createDocumentFragment()
    /*Filtre Tous */
    const buttonTous = document.createElement("button")
    buttonTous.dataset.id = "0"
    buttonTous.textContent = "Tous"
    buttonTous.className = "filtres"
    buttonTous.classList.add("active")//ajouter la classe active au btn Tous (+css)

    fragment.appendChild(buttonTous)

    /* Création des autres filtres avec une boucle for*/
    for (const category of allCats) {
        const buttonOthers = document.createElement("button")
        buttonOthers.textContent = category.name
        buttonOthers.dataset.id = category.id
        buttonOthers.className = "filtres"
        fragment.appendChild(buttonOthers)
    }
    btnfiltres.appendChild(fragment)
    /*Ajout de l'écoute des filtres*/
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

        /* button login disparai*/
        let connexion = document.getElementById("connexion")
        connexion.style.display = "none"
        connexion.style.padding = "0px"

        /* bouton logout apparait*/
        let deconnexion = document.getElementById("deconnexion")
        deconnexion.style.display = null
        deconnexion.addEventListener("click", function () {
            sessionStorage.clear()
            window.location.reload()
        })

        /*apparitions des boutons*/
        let upChange = document.querySelector(".upChange")
        let buttonModal = document.getElementById("buttonModal")
        let logoMod = document.querySelector(".logoMod")
        upChange.style.display = null
        buttonModal.style.display = null
        logoMod.style.display = null

        /*disparition des filtres */
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
        /* recupere href:modifier qui ouvre la modal */
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
    const modals = document.querySelectorAll(".js-modal") //
    modals.forEach(a => {
        a.addEventListener("click", openModal)
    })
}
/* cration de la gallery de la modal 1 */
/* MENTOR : si je deplace dans API fonction en haut ca fait tout bugger */
async function displayModal() {
    galleryModal.innerHTML = ""
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

        /* ajout des parents aux nvx éléments*/
        figcaption.appendChild(deleteIcon)
        figure.appendChild(img)
        figure.appendChild(figcaption)
        figure.classList.add("figure-modal-add")
        figure.dataset.figureModal = work.id
        galleryModal.appendChild(figure)
    }
    setDeleteListener()
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
                    "Authorization": `Bearer ${token}` // declarer en haut de page
                }
            })
            if (response.ok) {
                console.log(`image supprimé`)
                for (const work of allWorks) {
                    if (work.id == id) {
                        allWorks.delete(work)
                        break
                    }
                }
                displayWorks()
                displayModal()

            } else {
                throw new Error(`Impossible de supprimer l'image `)
            }
        })
    }
}
// // // // MODAL ADDWORK//
function setUpModalAddWork() {
    /*récuperation du bouton  modal 1 à modal addwork*/
    const buttonAddPhotos = document.querySelector(".buttonAddPhotos")
    /*ajout d'un evenement click au btn ajouter photo modal 1 qui ouvre la 2*/
    buttonAddPhotos.addEventListener("click", () => {
        modalAddwork.style.display = "grid" //apparaitre modaladdWork
        modal1.style.display = "none"//disparaitre modal 1 au click de la seconde
    })
    /* Récupérer la modal-addwork*/
    const modalAddwork = document.querySelector(".modal-addwork")

    /* Récuperer fleche retour.*/
    const backArrow = document.querySelector(".fa-solid.fa-arrow-left")

    /*Ajout element click a la fleche retour.*/
    backArrow.addEventListener("click", function (e) {
        e.preventDefault()
        modalAddwork.style.display = "none" //Masquer modalAddwork.
        modal1.style.display = "grid"
    })
    /*Récuperation croix close modalAddwork.*/
    // const closeModal = function (e) {
    // const stopPropagation = function (e) {
    //     e.stopPropagation()
    // }
    // e.preventDefault()
    // modalAddwork.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    const closeIcon = document.querySelector("#close2")
    /*Ajout dun listener sur le bouton pr fermer la modal.*/
    closeIcon.addEventListener("click", function (e) {
        e.preventDefault()
        modalAddwork.style.display = "none"
    })
}
/*On recupère la liste déroulante de catégorie option.*/
async function categorySelect() {
    const categorySelect = document.getElementById("category-option")
    /*Récupere les categories depuis l'api.*/
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
/*Ecoute du click sur le bouton ajout photo */
function previewSelectedImage() {
    const file = imageInput.files[0]
    // Test image (taille <4mo) else alert()
    if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
            previewImage.src = e.target.result
        }
        const fileSize = imageInput.files[0].size
        const maxSize = 4 * 1024 * 1024
        if (fileSize > maxSize) {
            alert("Le fichier doit être inférieur ou égal à 4 Mo.")
            return
        }
        const beforeImg = document.querySelector(".before-img-select")
        beforeImg.style.display = "none"
        const imgSelect = document.querySelector(".img-select")
        imgSelect.style.display = "grid"
    }
}
function checkInput() {
    /*récuperation des elements de la modalAddWork*/
    if (titleInput.value !== "" && categoryInput.value !== "" && imageInput.value !== "") {
        buttonValidate.style.background = "#1D6154"
    }
}

function resetForm() {
    if (imgSelect !== null) {
        formAddWork.reset()
    }
    document.querySelector("#img-container ").style.display = ""
    document.querySelector(".img-select").style.display = ""
    document.querySelector(".before-img-select").style.display = "block"
}

/*Ajouter un événement pour gérer les messages d'erreur*/
formAddWork.addEventListener("submit", async function (event) {
    event.preventDefault() // Empêcher le rechargement de la page
    try {
        /* Vérifier si l'image est charger*/
        if (imageInput.value === "") {
            messageModal.innerHTML = "Veuillez mettre un image."
            messageModal.style.color = "red"
            return
        }

        /*Vérifier si le champ titre est rempli*/
        if (titleInput.value === "") {
            messageModal.innerHTML = "Veuillez mettre un titre valide."
            messageModal.style.color = "red"
            return
        }

        /* Vérifier si la catégorie est selectionner*/
        if (categoryInput.value === "") {
            messageModal.innerHTML = "Veuillez sélectionner une catégorie."
            messageModal.style.color = "red"
            return
        }

        /*Récupérer le token depuis la sessionStorage en haut et créer les données à envoyer à l'API*/
        const formData = new FormData()
        formData.append("image", imageInput.files[0])
        formData.append("title", titleInput.value)
        formData.append("category", categoryInput.value)

        const newWork = await addNewWork(formData)
        /*creer les elements à ajouter ds le DOM */
        allWorks.add(newWork)
        displayWorks()
        displayModal()
        /*Réinitialiser le formulaire*/
        resetForm()
        /*Ajouter un message de succès (compris dans la fonction plus haut )*/
        messageModal.innerHTML = "L'image a été envoyée avec succès!", "success";
        messageModal.style.color = "#000"
    } catch (error) {
        console.log(error)
    }
})
async function addNewWork(data) {
    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: data
    })
    if (response.ok) {
        return response.json()
    } else {
        console.log(response)
    }
}
/*  LISTERNER FONCTION
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
/*Pour ajouter dans la modaladdwork l'image sélectionner */
imageInput.addEventListener('change', previewSelectedImage)
/*Ajouter des écouteurs d'événements pour les champs de saisie*/
titleInput.addEventListener("change", checkInput)
categoryInput.addEventListener("change", checkInput)
imageInput.addEventListener("change", checkInput)
