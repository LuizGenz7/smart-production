// /api/products.js

const categories = [
  { id: 1, name: "T-Shirts" },
  { id: 2, name: "Jeans" },
  { id: 3, name: "Jackets" },
  { id: 4, name: "Sneakers" },
  { id: 5, name: "Hoodies" },
  { id: 6, name: "Accessories" },
];

const products = Array.from({ length: 50 }, (_, i) => {
  const category = categories[i % categories.length];

  return {
    id: i + 1,
    name: `Product ${i + 1}`,
    categoryId: category.id,
    categoryName: category.name,
    price: 10 + i,
  };
});

export default function handler(req, res) {
  const { id, page = 1, limit = 10, search, category } = req.query;

  // GET /api/products/1 (NOT supported here unless separate file)
  if (id) {
    const product = products.find(p => p.id === Number(id));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      data: product,
    });
  }

  let result = [...products];

  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    result = result.filter(
      p => p.categoryName.toLowerCase() === category.toLowerCase()
    );
  }

  const start = (page - 1) * limit;

  res.json({
    success: true,
    page: Number(page),
    total: result.length,
    data: result.slice(start, start + Number(limit)),
  });
}