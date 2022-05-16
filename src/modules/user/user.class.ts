export class User{
    private username;
    private email;
    private password;

    constructor(username:string, email:string, password:string){
        this.username = username;
        this.email = email;
        this.password = password
    }

    getUsername(){
        return this.username;
    }
    setUsername(value:string){
        this.username = value;
    }

    getEmail(){
        return this.email;
    }
    setEmail(value:string){
        this.username = value;
    }

    getPassword(){
        return this.password;
    }
    setPassword(value:string){
        this.password = value;
    }
}