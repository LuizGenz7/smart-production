// /api/categories.js

const categories = [
  { id: 1, name: "T-Shirts" },
  { id: 2, name: "Jeans" },
  { id: 3, name: "Jackets" },
  { id: 4, name: "Sneakers" },
  { id: 5, name: "Hoodies" },
  { id: 6, name: "Accessories" },
];

export default function handler(req, res) {
  const { id } = req.query;

  if (id) {
    const category = categories.find(c => c.id === Number(id));

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.json({
      success: true,
      data: category,
    });
  }

  res.json({
    success: true,
    data: categories,
  });
}