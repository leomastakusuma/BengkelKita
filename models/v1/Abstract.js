
export class Abstract {
    constructor(db){
        import dbConfig from "../../library/database"
        this.db =  dbConfig
    }

    static dbConfig(){
        return this
    }
}