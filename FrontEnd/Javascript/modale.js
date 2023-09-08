
// // car si on n'appuie pas dessus elle ne s'affiche 
// let modal = null
// let modalAddwork = null

// //recuperation de la du token de la session storage 
// let token = sessionStorage.token

// // recuperation div projectandMod
// const projectandMod = document.querySelector(".projectandMod")

// recuperer la modal
// const modal1 = document.getElementById("modal1")

// // recuperation de la div qui accueille les photos 
// const gallery = document.querySelector(".galleryPhoto")

// // Récupérer le formulaire et le bouton submit
// const form = document.getElementById("modalAddwork");
// const imgButton = document.getElementById("add-imgbutton")

/*On ouvre la modal */
// export function setupModal() {
//   const openModal = function (e) {

//     /*Pour fermer boite modal avec button */
//     const closeModal = function (e) {
//       if (modal == null) return
//       e.preventDefault()
//       modal.style.display = "none"
//     }

//     /* Pour pas que la boite se ferme si on appuie dessus hors le button */
//     const stopPropagation = function (e) {
//       e.stopPropagation()
//     }
//     e.preventDefault()

//     // recupere href modifier qui ouvre la modal 
//     const target = document.querySelector(e.target.getAttribute('href'))
//     target.style.display = null

//     target.removeAttribute('aria-hidden')
//     target.setAttribute('arria-modal', 'true')

//     modal = target

//     modal.addEventListener('click', closeModal)
//     modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
//     modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
//   }
//   // sinon créer une boucle infini, car la on récupére les modal et on leur donne le open en listener, donc faut pas etre dans le open 
//   const modals = document.querySelectorAll(".js-modal")
//   modals.forEach(a => {
//     a.addEventListener("click", openModal)
//   })
// }

// // Fonction pour actualiser la page
// function refreshPage() {
//   const mainGallery = document.querySelector('.gallery');
//   mainGallery.innerHTML = '';
//   loadGallery(mainGallery);
// }


// // Récupération des projets via l'API
// export async function displayModal() {

//   fetch("http://localhost:5678/api/works")
//     .then(response => response.json())
//     .then(data => {
//       for (let i = 0; i < data.length; i++) { /*(const work of allWorks) {let allWorks = add(work) */
//         let figure = document.createElement("figure") // nous avons effacer et la nous recreons les img and comment
//         let img = document.createElement("img")
//         let deleteIcon = document.createElement("i")
//         deleteIcon.className = "deleteIcon" // creation de l'icone poubelle 
//         let figcaption = document.createElement("figcaption")


//         img.src = data[i].imageUrl
//         img.alt = data[i].title


//         figcaption.textContent = "éditer"// commentaire sous img editer
//         deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon") // src icone
//         deleteIcon.dataset.id = data[i].id
//         // ajout des parents des elements crées
//         figcaption.appendChild(deleteIcon)
//         figure.appendChild(img)
//         figure.appendChild(figcaption)
//         figure.classList.add("figure-modal-add")
//         gallery.appendChild(figure)

        /*deleteIcon.addEventListener("click", (event) => {      // on ecoute le clique sur icone
          event.preventDefault()

          //récuperation de l'id du work cliqué via poubelle
          deleteIcon.setAttribute("data-id", data[i].id)
          const workId = event.target.dataset.id
          //console.log("deleteICON",deleteIcon)  // on voit recupere l'ID au click

        })*/
      // }



      // Fonction pour suppression des projets
      async function deleteWork(event) {
        console.log(event, "deleteWork")

        event.preventDefault()

        // if (event.target.classList.contains('deleteIcon')) {
        //   // let token = document.sessionStorage.getItem('token')
        //   console.log(sessionStorage.getItem('token'))  

        const response = await fetch("http://localhost:5678/api/works/${workId}", {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('token')}` // declarer en haut de page 
          }
        })
        if (response.ok) {

          //  if (confirm("Voulez-vous supprimer l'image?") == true) {
          event.target.parentElement.remove() //suppression img
          //     document.querySelector(".deleteIcon").click()
          //   }
          // } else {
          //   console.log("Une erreur s'est produite lors de la suppression du projet.")
        }
      }

//     })
// }
//  )

// }

/////////////////////////////////////////////////////////////////////////////////////////////

// // // // // MODAL ADDWORK//  
// export function setUpModalAddWork() {
//   //récuperation du bouton  modal 1 à addwork
//   const buttonAddPhotos = document.querySelector(".buttonAddPhotos")

//   // //ajout d'un evenement click au btn ajouter photo modal 1 qui ouvre la 2
//   buttonAddPhotos.addEventListener("click", () => {
//     modalAddwork.style.display = "grid" //apparaitre modaladdWork
//     modal1.style.display = "none"//disparaitre modal 1 au click de la seconde
//   })

//   // Récupérer la modal-addwork
//   const modalAddwork = document.querySelector(".modal-addwork");

//   // recuperer fleche retour 
//   const backArrow = document.querySelector(".fa-solid.fa-arrow-left")

//   //ajout element click a la fleche retour
//   backArrow.addEventListener("click", function () {
//     modalAddwork.style.display = "none" //masquer modalAddwork
//     modal1.style.display = "grid"


//   })

//   //recuperation croix close modalAddwork
//   const closeIcon = document.querySelector("#close2")

//   //ajout dun listener sur le bouton pr fermer la modal
//   closeIcon.addEventListener("click", function () {
//     modalAddwork.style.display = "none"


//     // //Reinitialiser le champs du formulaire
//     // document.getElementById("form-addWork").reset()

//   }
//   )
  // //clique a lexterieur modal, la ferme 
  // const stopPropagation = function (e) {
  //   e.stopPropagation()
  // }
  // e.preventDefault()

  // modalAddwork.getElementById('.addWork').addEventListener('click', stopPropagation)
}

//fonction qui affiche la premiere modale
// affichage uniquement, pas d'eventListener
export async function functionWithWorks(works){

}

export async function categorySelect() {
  // //on recupere la liste déroulante de catégorie option 
  const categorySelect = document.getElementById("category-option")


  // //récupere les categories depuis l'api
  await fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
      //parcourir les catégories et créer option pr chacunes d'elles  
      // for(let option of category-option){
      // for (let i=0; i<4;i++ ) {   
      for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option")
        option.value = data[i].id
        option.text = data[i].name
        categorySelect.appendChild(option)
      }
    })
    .catch(error => console.error(error))


  // Récupére les éléments du formulaire html pour télécharger une image
  const titleInput = document.getElementById("title-img")
  const imageInput = document.getElementById("add-imgbutton")

  // //ecoute du click sur le bouton ajout photo 
  imgButton.addEventListener("change", () => {
    const file = imgButton.files[0]
    const reader = new FileReader()
    // reader.readAsDataURL(file)

    // Vérifier le format et la taille du fichier
    const allowedFormats = ["image/jpeg", "image/png"]
    const maxSize = 4 * 1024 * 1024;

  })



}