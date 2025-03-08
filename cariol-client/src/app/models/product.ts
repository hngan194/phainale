export class Product{
    constructor(
        public _id: any,
        public name: string,
        public amount: number,
        public price: number,
        public image: string,
        public description: string,
        public categoryId: string
    ){}
}