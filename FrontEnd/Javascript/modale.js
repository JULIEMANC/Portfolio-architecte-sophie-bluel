
// car si on n'appuie pas dessus elle ne s'affaiche 
let modal = null
// recuperation div projectandMod
const projectandMod = document.querySelector(".projectandMod")

// recuperer la modal
const modal1 = document.getElementById("modal1")

// recuperation de la div qui accueille les photos 
const gallery = document.querySelector(".galleryPhoto")


// Récupérer le formulaire et le bouton submit
const form = document.getElementById("modalAddwork");


/*On ouvre la modal */
export function setupModal(){
  const openModal = function (e) {
	 // MODIF : il faut mettre les 2 fonction close et stop en haut, sinon elle n'existe pas quand tu t'en servira
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
    
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null 
  
    target.removeAttribute('aria-hidden')
    target.setAttribute('arria-modal', 'true')
  
    modal = target

    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
  }
  // sinon tu vas créer une boucle infini, car la on récupére les modal et on leur donne le open en listener, donc faut pas etre dans le open 
  const modals = document.querySelectorAll(".js-modal")
  modals.forEach(a => {
    a.addEventListener("click", openModal)
  })
}


// // Fonction pour supprimer les travaux
function DeleteWork(event) {
  DeleteWork(this.dataset.id);
} 


// // Récupération des projets via l'API
export function display(){

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) { /*(const work of allWorks) {let allWorks = add(work) */
      let figure = document.createElement("figure") // nous avons effacer et la nous recreons les img and comment
      let img = document.createElement("img")
      let deleteIcon = document.createElement("i")
      deleteIcon.className = "deleteIcon" // creation de licone poubelle via ici 
      let figcaption = document.createElement("figcaption")


      img.src = data[i].imageUrl;
      img.alt = data[i].title;

      figcaption.textContent = "éditer"; // commentaire sous img editer
      deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon") // src icone

      // deleteIcon.addEventListener ("click", (event) => {  // on ecoute le clique sur icone
      // // console.log( deleteIcon,"ok")
      // event.preventDefault() 

      // récuperation de l'id du work cliqué via poubelle
    // deleteIcon.setAttribute("data-id", data[i].id)
    // console.log("deleteIcon",deleteIcon) // on voit mon console+data-id de limage
    //  const workId = deleteIcon.dataset.id
  // const authentificationToken  = sessionStorage.getItem('authentificationToken')
  // if (!workId){
  //   console.error ("l'identifiant de l'image n'est pas defini.")
  //   return;
  // }
  //  try {
  //   await deleteIcon(workId, authentificationToken)
  // console.log('image supprimée avec succes ')
  //supprime image dans le dom 
  //event.target.remove()
  //  } catch (error) {
   // console.log(error)
  //}


// //  //creation d'une fonction pour supprimer l'image sur laquelle etait la pbelle cliqué
//  function DeleteWork(event){ 
//  const DeleteWork=document.querySelectorAll("deleteIcon") //recup tout les icones
//  let figure = this.parent

//}



// deleteIcon.classList.remove("workId")
//  }

// ajout des parents des elements crées
      figcaption.appendChild(deleteIcon)
      figure.appendChild(img)
      figure.appendChild(figcaption)
      figure.classList.add("figure-modal-add")

      gallery.appendChild(figure)
    }
}
  )

  // .catch(error => console.error(error))
  }

//   )}
// export function DeleteWork(event) {
//   const DeleteWork=document.querySelectorAll("deleteIcon")

// //Suppression de la figure
//   let figure = this.parentNode.parentNode// on ele recup via les parents 
//   figure.parentNode.removeChild(figure)
//   const figureMainGallery = document.querySelector('[data-id="' + this.dataset.id + '"]')
//   figureMainGallery.remove() //on supprime via la gallerie via datasetid la figure

// // delete de l'image sur l'api
//  const deleteIcon = [...document.querySelectorAll(".deleteIcon")]
//    let token = sessionStorage.getItem("token")
//       fetch(`http://localhost:5678/api/works/${workId}`, {
//         method: "DELETE",
//         headers: {
//           "Authorization": `bearer ${token}`
//         }
//       })
//         .then(function (response) {
//           if (response.ok) {
//             updateAfterDelete(workId)
//             displayWorks() // affiche projet mis a jour dans page accueil 
//           } else {
//             console.log("Erreur lors de la suppression de l/'élément ")
//           }
//         })
//         .catch(function (error) {
//           console.log("Erreur lors de la suppresion de l/'élement", error)
//         })
// //  }

// }

// // //pr que la poubelle puisse delete en fonction d'un click (appel a l'api)
// // function deleteWork(id){
//   // const allWorks=document.querySelector(".allWorks")
//   // for (const work of allWorks){
//   //   if(work.id)allWorks.remove()
//   //   displayWorks()
 
    
// //   VERIFIER OK  
// récuperation du bouton ajouter photo de la modal 1
// const buttonAddPhotos = document.querySelector(".buttonAddPhotos")

// // //ajout d'un evenement click au btn ajouter photo modal 1
// buttonAddPhotos.addEventListener("click", () => {
//   modalAddwork.style.display = "block"
//   modal1.style.display = "none"
// })



// // // MODAL 2//  

// // Fonction pour réinitialiser le formulaire
// function resetForm() {
//   let imgPreview = document.querySelector(".img");
//   if (imgPreview !== null) {
//     imgPreview.remove();
//   }
//   document.getElementById("input-container").style.display = "";
//   document.querySelector("#img-container p").style.display = "";
//   form.reset();
// }

// // Récupérer la modal-addwork
// const modalAddwork = document.querySelector(".modal-addwork");

// // recuperer fleche retour 
// const backArrow = document.querySelector(".fa-solid.fa-arrow-left")

// //ajout element click a la fleche retour
// backArrow.addEventListener("click", function () {
//   modalAddwork.style.display = "none" //masquer modalAddwork
//   modal1.style.display = "null" //affiche modal1 apparait sur coté qd on fait retour 
// })

// //recuperation croix close modalAddwork
// const closeIcon = document.querySelector("#close2")

// //ajout dun listener sur le bouton pr fermer la modal
// closeIcon.addEventListener("click", function () {
//   modalAddwork.style.display = "none"
//   //Reinitialiser le champs du formulaire
//   // document.getElementById("form-addWork").reset()
// })

// VERIFIER OK 


// //on recupere la liste déroulante de catégorie option 
// const categorySelect=document.getElementById("category-option")

// //récupere les categories depuis l'api
// fetch ("http://localhost:5678/api/categories")
// .then (response => response.json())
// .then (data =>{ 
//   //parcourir les catégories et créer option pr chacune delles 
//   for(let i=0; i<data.length; i++){
//     let option = document.createElement("option")
//     option.value= data[i].id;
//     option.text=data[i].name;
//     categorySelect.appendChild(option)
//   }
// })
// .catch(error=> console.error(error))

// // Récupére les éléments du formulaire
// const titleInput = document.getElementById("title-img");
// const imageInput = document.getElementById("add-imgbutton");

// //ecoute du click sur le bouton ajout photo
// imgButton.addEventListener("change", ()=>{
//   const file=this.files[0];
//   const reader=new FileReader();
// // })
  
// // // Vérifier le format et la taille du fichier
// //   const allowedFormats = ["image/jpeg", "image/png"];
// //   const maxSize = 4 * 1024 * 1024; 

// //message derreur si l'image n'est pas de la bonne taille 
//  function errorMessage (){
// if (allowedFormats.includes(file.type)&& file.size <= maxSize){
//   reader.addEventListener("load",function(){
//     const imageUrl=reader.result
//     const imgPreview = document.createElement("img")
//     imgPreview.src=imageUrl
//     imgPreview.classList.add("img-preview")


//     //masquer les autres element pour afficher limage selectionnée
//     imgPreview.style.display="block"
//     imageInput.style.display="none"
//     document.getElementById("input-container").style.display="none"
//     document.querySelector("#img-container p").style.display="none"
//     document.getElementById("img-container").appendChild(imgPreview) // on lui donne un parent car on l'a creer 
//   })
// reader.readAsDataUrl(file)
// }else {
//   //affiche le message derreur si pas bonne taille ou bon format 
//   let showErreurMessage=document.createElement("span")
//   showErreurMessage.innerText= "Veuillez sélectionner une image au format JPG ou PNG, et d'une taille maximale de 4MB."
//   showErreurMessage.style.color="red"
//   showErreurMessage.id=showErreurMessage

//   modalAddwork.appendChild(showErreurMessage)// on lui donne un parent car on l'a creer 

//   // Réinitialisation la valeur de l'input de l'image
//   imageInput.value=""
// }
// }


// // Fonction pour créer les éléments à ajouter dans le DOM