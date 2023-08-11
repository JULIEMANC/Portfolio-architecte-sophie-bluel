// constante pour stocker la liste des travaux (un Set n'a pas de doublon)
const allWorks = new Set()

//fonction pour contacter la base de donnée pour récupéré des info, le paraméttre type est du texte qui va se rajouter dans le lien
async function getDatabaseInfo(type){
	//on enregistre dans response la réponse du serveur sur le lien donnée
	const response = await fetch(`http://localhost:5678/api/${type}`)
	//si il n'ya pas d'erreur
	if(response.ok){
		//on renvoie la réponse sous format json
		return response.json()
	} else {
		// sinon on affiche un log de la response pour trouver d'ou vient l'erreur
		console.log(response)
	}
}

// fonction d'initialisation, elle permet de preparer les Set et d'appeler les fonction du code
async function init(){
	//on appel la fonction qu'on a crée (pour appeley uen fonciton "async", il faut etre dans une fonction "async" et utilisé "await"
	const works = await getDatabaseInfo("works")
	//pour chaque travaux de la liste, on les rajoute a notre constante allWorks
	for(const work of works){
		allWorks.add(work)
	}
	//on appel la fonction qui va tout afficher
	displayWorks()
}
init()

//fonction qui permettra d'afficher les works sur la page
function displayWorks(filtre = 0){
	console.log(allWorks)
	//fonction a complété pour afficher les travaux en utilisant allWorks
}

// supprime la gallerie du HTML
const gallery = document.querySelector(".gallery")
const galleryImages= [...gallery.querySelectorAll("figure")]
for(const image of galleryImages){
	image.remove()
}

//Création de la gallerie via JVS
const newGalleryImages = await getDatabaseInfo("works")
for (const work of newGalleryImages){
	const figure = document.createElement("figure")
	const image = document.createElement("img")
	const figcaption = document.createElement("figcaption")

	image.src = work.imageUrl 
	image.alt= work.title 
	figcaption.innerHTML = work.title
	
	figure.appendChild(image)
	figure.appendChild(figcaption)
    gallery.appendChild(figure)

}
 //recuperation des infos des works pr les trier
let herWorks = [
	{
	id: 1,
	name:"abajour Tahina"
	},
	{ 
	id : 2,
	name:"appartement Paris"},
	{
     id : 3,
	 name: "restaurant Sushishen"
	},
	{
	id : 4,
	name: "Villa la balisiere"
	},
	{
	id: 5,
	name: "structure thermopolis"	
	},
	{
	id:6,
	name:"appartement Paris X"	
	},
	{
	id:7,
	name:"pavillon le coteau"
    },
   {
	id:8,
    name:"villa Ferneze" 
   },
   {
	id:9,
	name:"appartement Paris"
   },
   {
	id:10,
	name: "bar"
   },
   {
	id:11,
	name:"hotel"
   }

];



//Bouton Tous 


//Bouton objets
const btnOjets =document.getElementById("objets")
const deleteWorks =(id)=>{
herWorks = herWorks.filter (herWorks=> herWorks.id !== id);
}
deleteWorks(3,4,5,6,7,8,9,10,11);
console.log(btnOjets)









//Bouton appartemements



//bouton hotels et restaurants









