class ContactService {

    async sendContactMail(contactData) {

        let message         = {};
        const bodyJson      = JSON.stringify(contactData);
        const response      = await fetch('https://127.0.0.1:8000/api/contact', {
            method:'GET',
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: bodyJson,
        })

        switch (response.status) {
            case '200' : 
            message = {code: response.status, text: "Votre message a bien été envoyé au support BRUT MESSENGER"};
            break;

            case '422' : 
            message = {code: response.status, text: "Votre message n'a pas pu être envoyé car le format de l'adresse email n'est pas correct"};
            break;

            default :
            message = {code: response.status, text: 'Erreur de connexion au serveur. Veuillez réessayer plus tard.'};
        }

        return message;
    }
}

export default new ContactService;