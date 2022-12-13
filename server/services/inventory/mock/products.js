import Product from "../models/Product";

const products = [];

const prod1 = new Product();
prod1.id = 1;
prod1.code = 1;
prod1.name = 'Giai điệu tình yêu';
prod1.desc = 'Hoa hồng và hoa bi là hai loài hoa chính xuất hiện trong giỏ hoa Giai Điệu Tình Yêu cực thu hút lại mang nhiều thông điệp gửi gắm bên trong. Bạn đang không biết nên tặng hoa tươi gì vào những dịp lễ, hay mua về nhà trưng bày? Giỏ hoa tươi Giai Điệu';
prod1.md = 1;
prod1.deliveryNote = 'Chỉ giao trong nội thành TPHCM';
prod1.price = 150_000;
prod1.images = []; // Array of image url
prod1.categories = [1, 2]; // Array of Category
products.push(prod1);

const prod2 = new Product();
prod2.id = 2;
prod2.code = 2;
prod2.name = 'Ngày Tươi Xinh';
prod2.desc = '';
prod2.md = 2;
prod2.deliveryNote = 'Chỉ giao trong nội thành TPHCM';
prod2.price = 150_000;
prod2.images = []; // Array of image url
prod2.categories = [2]; // Array of Category
products.push(prod2);

export default products;
