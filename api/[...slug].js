// api/[...slug].js

/* =====================================
   MOCK DATA
===================================== */

const categories = [
  { id: 1, name: "T-Shirts" },
  { id: 2, name: "Jeans" },
  { id: 3, name: "Jackets" },
  { id: 4, name: "Sneakers" },
  { id: 5, name: "Hoodies" },
  { id: 6, name: "Accessories" },
];

const sampleNames = {
  1: ["Basic Tee", "Graphic Tee", "Oversized Tee"],
  2: ["Slim Fit Jeans", "Ripped Jeans", "Straight Jeans"],
  3: ["Denim Jacket", "Leather Jacket", "Bomber Jacket"],
  4: ["Running Shoes", "Casual Sneakers", "High Tops"],
  5: ["Pullover Hoodie", "Zip Hoodie", "Oversized Hoodie"],
  6: ["Cap", "Backpack", "Watch"],
};

const products = Array.from({ length: 100 }, (_, i) => {
  const categoryId = (i % 6) + 1;

  const category = categories.find(
    item => item.id === categoryId
  );

  const names = sampleNames[categoryId];

  return {
    id: i + 1,
    name: `${names[i % names.length]} ${i + 1}`,
    categoryId,
    categoryName: category.name,
    price: (10 + (i % 50)) * 2,
    stock: Math.floor(Math.random() * 100),
    rating: Number(
      (Math.random() * 2 + 3).toFixed(1)
    ),
  };
});

/* =====================================
   HANDLER
===================================== */

export default function handler(
  req,
  res
) {
  try {
    // THIS works on Vercel
    const slug =
      req.query.slug || [];

    const resource = slug[0];
    const id = slug[1];

    /* ====================
       CATEGORIES
    ==================== */

    if (resource === "categories") {

      // /api/categories/1
      if (id) {
        const category =
          categories.find(
            item =>
              item.id ===
              Number(id)
          );

        if (!category) {
          return res.status(404).json({
            success: false,
            message:
              "Category not found",
          });
        }

        return res.status(200).json({
          success: true,
          data: category,
        });
      }

      // /api/categories
      return res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
      });
    }

    /* ====================
       PRODUCTS
    ==================== */

    if (resource === "products") {

      // /api/products/1
      if (id) {
        const product =
          products.find(
            item =>
              item.id ===
              Number(id)
          );

        if (!product) {
          return res.status(404).json({
            success: false,
            message:
              "Product not found",
          });
        }

        return res.status(200).json({
          success: true,
          data: product,
        });
      }

      let result = [...products];

      const {
        page = 1,
        limit = 10,
        search,
        category,
      } = req.query;

      // search
      if (search) {
        result = result.filter(
          item =>
            item.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
      }

      // category
      if (category) {
        result = result.filter(
          item =>
            item.categoryName.toLowerCase() ===
            category.toLowerCase()
        );
      }

      // pagination
      const pageNum =
        Number(page);

      const limitNum =
        Number(limit);

      const start =
        (pageNum - 1) *
        limitNum;

      const paginated =
        result.slice(
          start,
          start + limitNum
        );

      return res.status(200).json({
        success: true,

        pagination: {
          page: pageNum,
          limit: limitNum,
          total: result.length,
        },

        data: paginated,
      });
    }

    return res.status(404).json({
      success: false,
      message:
        "Route not found",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
}