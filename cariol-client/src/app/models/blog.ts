export class Blog{
    constructor(
        public _id: any,
        public title: string,
        public content: string,
        public author: any,
        public image: string[] = []
    ){}
}