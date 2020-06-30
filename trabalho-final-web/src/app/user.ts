export class User {
    constructor(
       public name: string,
       public email: string,
       public password: string,
       public admin: boolean,
       public address: string,       
       public phone: string
    ){}
 }  