class Response {
    constructor(dados, mensagem, response) {
        this.dados = dados;
        this.mensagem = mensagem;
        this.response = response;
    }

    getResponse() {
        return {
            response: this.response || false,
            message: this.mensagem || '',
            data: this.dados || []
        };
    }
}


module.exports = Response