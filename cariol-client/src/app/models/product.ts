export class Product{
    constructor(
        public _id: any,
        public name: string,
        public amount: number,
        public price: number,
        public description: string,
        public image: string[],
        public categoryName: string,
        public color: string,
        public size: string
    ){}
}