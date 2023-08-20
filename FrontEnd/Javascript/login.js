
/* Fonction de validation du mail*/

function validateMail(email) {
    const regexMail = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+$");
    return regexMail.test(email)
}

async function sendLogin(data){
    let response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    if (response.ok) {
        return {"error": false, "data":await response.json()}
    } else {
        return {"error": true, "data":await response.json()}
    }
}

/* Listener sur le submit pour se connecter à son espace */

const form = document.querySelector("form");
const errorLabel = document.querySelector("#errorMsg")

form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#email").value;
        if(!validateMail(email)){     
            errorLabel.textContent = `L'email "${email}" n'est pas valide.`;
        }
        const password = document.querySelector("#password").value

        const body = {
            "email": email,
            "password": password,
        }

        /* traitement du formulaire */
        const testLogin = await sendLogin(body)

        if (!testLogin.error) {

            // La demande de connexion a réussi
            // Récupèration les données JSON - pr la réponse */
            let data = testLogin.data;

            // Récupère l'userId et l'accessToken depuis les données du backend et les stocke dans des variables & dans le local storage
            const userId = data.userId;
            const token = data.token;

            // Enregistre les données userId et token dans le local storage
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("token", token);

            console.log('ID de l\'utilisateur:', userId);
            console.log('Jetons d\'accès:', token);

            // Poursuivre pour rediriger l'utilisateur vers une autre page
            window.location.href = "index.html";

        } else {
            // La demande de connexion a échoué
            console.log(testLogin);
            errorLabel.textContent = `Erreur durant la connexion : ${testLogin.data.message}`
        }
});