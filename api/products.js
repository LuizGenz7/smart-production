/* =========================
   MOCK DATA
========================= */

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
  const category = categories.find((c) => c.id === categoryId);

  const names = sampleNames[categoryId];
  const name = names[i % names.length];

  return {
    id: i + 1,
    name: `${name} ${i + 1}`,
    categoryId,
    categoryName: category.name,
    price: (10 + (i % 50)) * 2,
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
    stock: Math.floor(Math.random() * 100),
    brand: "SmartWear",
    isNew: i % 7 === 0,
    isFeatured: i % 5 === 0,
    discount: i % 5 === 0 ? 10 : 0,
  };
});

/* =========================
   API CONTROLLER
========================= */

const handler = (req, res) => {
  try {
    const {
      id,
      page = 1,
      limit = 10,
      search,
      category,
      sort,
      featured,
      newest,
      all,
    } = req.query;

    /* =========================
       GET SINGLE PRODUCT
    ========================= */
    if (id) {
      const product = products.find(
        (item) => item.id === Number(id)
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    }

    let result = [...products];

    /* =========================
       FILTERS
    ========================= */

    // Search
    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category) {
      result = result.filter(
        (item) =>
          item.categoryName.toLowerCase() ===
          category.toLowerCase()
      );
    }

    // Featured
    if (featured === "true") {
      result = result.filter((item) => item.isFeatured);
    }

    // New
    if (newest === "true") {
      result = result.filter((item) => item.isNew);
    }

    /* =========================
       SORTING
    ========================= */

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    /* =========================
       GET ALL
    ========================= */

    if (all === "true") {
      return res.status(200).json({
        success: true,
        categories,
        count: result.length,
        data: result,
      });
    }

    /* =========================
       PAGINATION
    ========================= */

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const start = (pageNumber - 1) * limitNumber;
    const paginatedData = result.slice(
      start,
      start + limitNumber
    );

    return res.status(200).json({
      success: true,

      categories,

      pagination: {
        currentPage: pageNumber,
        limit: limitNumber,
        totalItems: result.length,
        totalPages: Math.ceil(
          result.length / limitNumber
        ),
      },

      data: paginatedData,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server crashed",
      error: error.message,
    });
  }
};

export default handler;