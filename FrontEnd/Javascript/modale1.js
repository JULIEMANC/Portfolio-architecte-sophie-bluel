
let modal = null


// recuperer la modal
const modal1 = document.getElementById("modal1")

// recuperation de la div qui accueille les photos 
const gallery = document.querySelector(".galleryPhoto")

// // Fonction pour actualiser la page
// function refreshPage() {
//   const mainGallery = document.querySelector('.gallery')
//   mainGallery.innerHTML = '';
//   loadGallery(mainGallery);
// }
// Fonction pour supprimer 
 function DeleteWork(event) {
  DeleteWork(this.dataset);
//Suppression de la figure
  let figure = this.parentNode.parentNode;
  figure.parentNode.removeChild(figure);
  const figureMainGallery = document.querySelector('[data-id="' + this.dataset.id + '"]');
  figureMainGallery.remove();
}

// Récupération des projets via l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      let figure = document.createElement("figure")
      let img = document.createElement("img")
      let deleteIcon = document.createElement("i")
      let figcaption = document.createElement("figcaption")
      

      img.src = data[i].imageUrl;
      img.alt = data[i].title;

      figcaption.textContent = "éditer";
      deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon")
      deleteIcon.setAttribute("data-id", data[i])
      // deleteIcon.addEventListener("click", DeleteWork)
  
 
      figcaption.appendChild(deleteIcon)
      figure.appendChild(img)
      figure.appendChild(figcaption)
      figure.classList.add("figure-modal-add")

      gallery.appendChild(figure)
    }

  })
  .catch(error => console.error(error))

// // a href supprimer la gallerie
// let delectGal=document.querySelector(".delectGal")
//deleteAll(".delectGal")

// recuperation du bouton buttonAddPhotos de la modal1
const buttonAddPhotos=document.querySelector(".buttonAddPhotos")


/*On ouvre la modal */
const openModal = function (e) {
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


/*Pour fermer boite modal avec button */
const closeModal = function (e) {
  if (modal == null) return
  e.preventDefault()
  modal.style.display = "none"
  // refreshPage()
  modal.removeAttribute('aria-hidden', 'true')
  modal.removeAttribute('arria-modal')
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
  modal = null


}
/* Pour pas que la boite se ferme si on appuie dessus hors le button */
const stopPropagation = function (e) {
  e.stopPropagation()

}
document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener("click", openModal)
})

