export class Product {
  constructor(
    public _id: string,
    public name: string,
    public price: number,
    public imagePath: string,
    public category: string
  ) {}
}
