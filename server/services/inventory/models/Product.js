import PriceUnit from "./PriceUnit";
import ProductStatus from "./ProductStatus";

class Product {
  constructor() {
    this.id = null;
    this.code = null;
    this.name = '';
    this.desc = '';
    this.md = null; // Id or instance
    this.deliveryNote = null;
    this.status = ProductStatus.DRAFT;
    this.prevPrice = 0;
    this.price = 0;
    this.priceUnit = PriceUnit.VND;
    this.images = []; // Array of image url
    this.categories = []; // Array of Category
  }
}

export default Product;
