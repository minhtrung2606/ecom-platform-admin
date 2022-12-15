import Category from "../models/Category";

const categories = [];

const cat1 = new Category();
cat1.id = 1;
cat1.name = 'Hoa tươi';
cat1.slug = 'hoa-tuoi';
categories.push(cat1);

const cat2 = new Category();
cat2.id = 2;
cat2.name = 'Giỏ hoa';
cat2.slug = 'gio-hoa';
categories.push(cat2);

export default categories;
