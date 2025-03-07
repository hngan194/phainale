export class User {
    constructor(
        public _id:string,
        public firstName: string,
        public lastName: string,
        public phonenumber:number,
        public email:string,
        public password:string,
        public token: string,
    ){}   
}

