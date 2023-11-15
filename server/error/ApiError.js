class APiError extends  Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message){
        return new APiError(404, message)
    }
    static internal(message){
        return new APiError(500, message)
    }

    static forbiden(message){
        return new APiError(403, message)
    }
}

module.exports = APiError