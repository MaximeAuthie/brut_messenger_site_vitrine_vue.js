class CryptoService {

    generateKeys() {

        //? Définition de la constante Crypto
        const crypto = require('eccrypto');

        //? Génération de la paire de clé
        let privateKey = crypto.generatePrivate();
        let publicKey = crypto.getPublic(privateKey);
        

        //? Transcription des clé du format arrayBuffer au format string hexadécimal
        privateKey = Buffer.from(privateKey).toString('hex');
        publicKey = Buffer.from(publicKey).toString('hex');

        //? Retourner un objet contenant les deux clés
        return {
            private: privateKey,
            public: publicKey
        }
       
    }
}

export default new CryptoService();