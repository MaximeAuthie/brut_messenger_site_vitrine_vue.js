class UserDataService {
    
    async addUser(userData) {
        let message = {};
        const bodyJson = JSON.stringify(userData);
        const response = await fetch('https://127.0.0.1:8000/api/user/add', {
            method:'POST',
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: bodyJson,
        })

        switch (response.status) {
            case 200:
                message = {code: response.status, text: 'Félicitations ' + userData.firstName + '. Votre compte a bien été créé! Un mail de confirmation vient de vous être envoyé.'};
                break;
            case 206:
                message = {code: response.status, text: 'L\'adresse mail ' + userData.email + ' est déjà associée à un autre compte.'};
                break;
            case 422:
                message = {code: response.status, text: 'Le formal de l\'adresse ' + userData.email + ' n\'est pas correct'};
                break;
            default:
                message = {code: response.status, text: 'Erreur de connexion au serveur. Veuillez réessayer plus tard.'};
        }
        
        return message;

    }
}

export default new UserDataService();