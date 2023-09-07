import * as modal from "./modale.js"

/*
// 		VARIABLE GLOBALE
// */
// // constante pour stocker la liste des travaux (un Set n'a pas de doublon)
// const allWorks = new Set()
// const allCats = new Set()

// //constante des elements html
// const gallery = document.querySelector(".gallery")
// const btnfiltres = document.querySelector(".btnfiltres")

// /*
// 		INIT
// */

// // fonction d'initialisation, elle permet de preparer les Set et d'appeler les fonction du code
// async function init() {
// 	//on appel la fonction qu'on a crée (pour appeler une fonciton "async", il faut etre dans une fonction "async" et utilisé "await"
// 	const works = await getDatabaseInfo("works")

// 	//pour chaque travaux de la liste, on les rajoute a notre constante allWorks
// 	for (const work of works) {
// 		allWorks.add(work)
// 	}
// 	const cats = await getDatabaseInfo("categories")

// 	//pour chaque catégorie de la liste, on les rajoute a notre constante allCats
// 	for (const cat of cats) {
// 		allCats.add(cat)
// 	}
// 	//on appel la fonction les plus importantes (quon regroupe)
// 	displayWorks()
// 	displayButton()
// 	isAdmin()
// 	setupModal()
// 	await display() // changer de nom
// 	categorySelect()
// 	setUpModalAddWork()
// 	// modal.deleteWork()
// 	setDeleteListener()
// }
// init()


// /*
// 		API FONCTION
// 		(add/get/delete, tous ce qui contient un fetch)
// */

// //fonction pour contacter la base de donnée pour récupéré des info, le paraméttre type est du texte qui va se rajouter dans le lien
// async function getDatabaseInfo(type) {
// 	//on enregistre dans response la réponse du serveur sur le lien donnée
// 	const response = await fetch(`http://localhost:5678/api/${type}`)
// 	//si il n'ya pas d'erreur
// 	if (response.ok) {
// 		//on renvoie la réponse sous format json
// 		return response.json()
// 	} else {
// 		// sinon on affiche un log de la response pour trouver d'ou vient l'erreur
// 		console.log("echec du fetch", response)
// 	}
// }

/*
		GALLERY FONCTION
		(toutes les fonction qui concernent la gallerie principal (hors modal) et les filtresn)
*/

/*
		ADMIN FUNCTION
		function qui gere l'affichage admin)
*/

/*
		MODAL FONCTION
		fonciton qui gere l'affichage des modales
*/

/*
		LISTERNER FONCTION
		toutes les fonciton qui contienne les eventListener
*/

function setDeleteListener() {
	const deleteIcon = document.querySelectorAll(".delete-icon")
	console.log(deleteIcon);
	for (const icon of deleteIcon) {
		icon.addEventListener("click", async (e) => {
			const id = e.target.dataset.id
			const tryDelete = await deleteWork(id)
			if (tryDelete) {
				for (const work of allWorks) {
					if (work.id == id) {
						allWorks.remove(work)
						break
					}
				}
				displayWorks()
				modal.display()
			}
		})
	}
	//fonciton qui va faire les eventListener delete de la modal et modifié allWork a la fin
}
async function deleteWork(id) {
	const response = fetch("link", {
		headers
	})
	if (response.ok) {
		return true
	} else {
		return false
	}
}

// //fonction qui permettra d'afficher les images(travaux=works) sur la page.
// function displayWorks(filtre = "0") {

// 	// supprime la gallerie du HTML grace aux "" vide en disant que la galerie de l'html est égale à un vide .
// 	gallery.innerHTML = "";

// 	//Triage des filtres en fonction du categoryID ( si filtres est different à 0 alirs on prends categoryId qui est = aux autres filtres.
// 	let selectedWorks = allWorks
// 	if (filtre != "0") {
// 		console.log(selectedWorks);
// 		selectedWorks = [...selectedWorks].filter((work) => work.categoryId == filtre)
// 	}
// 	//Création de la gallerie via JVS => html ( juste src et figcaption necessaire = figure)
// 	const fragment = document.createDocumentFragment()
// 	for (const work of selectedWorks) {
// 		const figure = document.createElement("figure")
// 		figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}">
// 							<figcaption>${work.title}</figcaption>`
// 		//Parent tous regroupés dans "fragment"
// 		fragment.appendChild(figure)
// 	}
// 	gallery.appendChild(fragment)
// }
// //fonction "on" des boutons.
// function displayButton() {
// 	const fragment = document.createDocumentFragment()

// 	//Bouton Tous 
// 	const buttonTous = document.createElement("button")
// 	buttonTous.dataset.id = "0"
// 	buttonTous.textContent = "Tous"
// 	buttonTous.className = "filtres"
// 	buttonTous.classList.add("active")//ajouter la classe active au btn Tous (+css)

// 	fragment.appendChild(buttonTous)

// 	// Création des autres boutons avec une boucle for.
// 	for (const category of allCats) {
// 		const buttonOthers = document.createElement("button")
// 		buttonOthers.textContent = category.name
// 		buttonOthers.dataset.id = category.id
// 		buttonOthers.className = "filtres"
// 		fragment.appendChild(buttonOthers)
// 	}
// 	btnfiltres.appendChild(fragment)

// 	//Ajout de l'écoute des filtres
// 	addFilterListener()

// }

// //Ecoute des filtres créer en "function" par rapport au click by Id 
// function addFilterListener() {
// 	const filters = document.querySelectorAll(".filtres")
// 	for (const filter of filters) {
// 		filter.addEventListener("click", (e) => {
// 			const button = e.target
// 			const id = button.dataset.id

// 			//Si le bouton est actif on remove les autres filtres
// 			document.querySelector(".active").classList.remove("active")
// 			button.classList.add("active")
// 			displayWorks(id)
// 		})
// 	}
// }

/* Mode edition si token et ID valides
 affichage de la banniere mode édition et apparition des boutons LogOut et modifier
disparition de Login et des filtres
*/
// function isAdmin() {
// 	let userId = sessionStorage.getItem("userId")
// 	let token = sessionStorage.getItem("token")

// 	if (userId != null & token != null) {
// 		let banner = document.querySelector(".overlay")
// 		banner.style.display = null

// 		// button login disparait 
// 		let connexion = document.getElementById("connexion")
// 		connexion.style.display = "none"
// 		connexion.style.padding = "0px"

// 		// bouton logout apparait
// 		let deconnexion = document.getElementById("deconnexion")
// 		deconnexion.style.display = null

// 		//apparitions des boutons
// 		let upChange = document.querySelector(".upChange")
// 		let buttonModal = document.getElementById("buttonModal")
// 		let logoMod = document.querySelector(".logoMod")
// 		upChange.style.display = null
// 		buttonModal.style.display = null
// 		logoMod.style.display = null


// 		//disparition des filtres 
// 		let filtre = document.querySelector(".btnfiltres")
// 		filtre.style.display = "none"
// 	}
// }



