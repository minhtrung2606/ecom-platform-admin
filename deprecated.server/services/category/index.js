import categories from "./mock/categories";

const getCategoriesByIds = (ids = []) => {
  return categories
    .filter(({ id }) => ids.includes(id))
    .map(category => ({ ...category }));
};

const CategoryService = {
  getCategoriesByIds,
};

export default CategoryService;
