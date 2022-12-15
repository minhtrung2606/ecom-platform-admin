import ProductMd from "../models/ProductMd";

const productMds = [];

const prodMd1 = new ProductMd();
prodMd1.id = 1;
prodMd1.productId = 1;
prodMd1.color = 'Đỏ, Trắng';
prodMd1.material = 'Hoa Baby, Hoa Hồng';
prodMd1.wrapperMaterial = 'Giỏ nhựa';
prodMd1.width = 45;
prodMd1.height = 35;
productMds.push(prodMd1);

const prodMd2 = new ProductMd();
prodMd2.id = 2;
prodMd2.productId = 2;
prodMd2.color = 'Vàng, Xanh';
prodMd2.material = 'Hoa Cát Tường, Hoa Hồng, Hoa Lan Bò cạp';
prodMd2.wrapperMaterial = 'Giỏ mây';
prodMd2.width = 30;
prodMd2.height = 40;
productMds.push(prodMd2);

export default productMds;
