
export class User {

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public uid?: string,
        public role?: string,
        public img?: string,
        public google?: boolean,
    ){}

    
}