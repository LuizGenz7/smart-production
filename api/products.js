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
  1: ["Basic Tee", "Graphic Tee", "Oversized Tee", "Slim Fit Tee"],
  2: ["Slim Fit Jeans", "Ripped Jeans", "Straight Jeans", "Baggy Jeans"],
  3: ["Denim Jacket", "Leather Jacket", "Bomber Jacket", "Windbreaker"],
  4: ["Running Sneakers", "Casual Sneakers", "High Top Sneakers", "Street Sneakers"],
  5: ["Pullover Hoodie", "Zip Hoodie", "Oversized Hoodie", "Fleece Hoodie"],
  6: ["Baseball Cap", "Backpack", "Wrist Watch", "Sunglasses"],
};

const products = Array.from({ length: 80 }, (_, i) => {
  const category = categories[i % categories.length];
  const names = sampleNames[category.id];
  const name = names[i % names.length];

  const imgId = (i % 1000) + 1;

  return {
    id: i + 1,
    name: `${name} ${i + 1}`,

    categoryId: category.id,
    categoryName: category.name,

    price: 10 + i,
    rating: Number((Math.random() * 2 + 3).toFixed(1)),

    /* =========================
       SAFE WORKING IMAGES
       (picsum.photos)
    ========================= */

    mainImage: `https://picsum.photos/seed/product-${imgId}/600/600`,

    images: [
      `https://picsum.photos/seed/product-${imgId}-1/600/600`,
      `https://picsum.photos/seed/product-${imgId}-2/600/600`,
      `https://picsum.photos/seed/product-${imgId}-3/600/600`,
    ],
  };
});

/* =========================
   HANDLER
========================= */

export default function handler(req, res) {
  try {
    const {
      id,
      page = 1,
      limit = 10,
      search,
      category,
      sort,
    } = req.query;

    let result = [...products];

    /* =========================
       SINGLE PRODUCT
    ========================= */
    if (id) {
      const product = products.find(
        (p) => p.id === Number(id)
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

    /* =========================
       SEARCH
    ========================= */
    if (search) {
      result = result.filter((p) =>
        p.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    /* =========================
       CATEGORY FILTER
    ========================= */
    if (category) {
      result = result.filter(
        (p) =>
          p.categoryName.toLowerCase() ===
          category.toLowerCase()
      );
    }

    /* =========================
       SORTING
    ========================= */
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    /* =========================
       PAGINATION
    ========================= */
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const start = (pageNum - 1) * limitNum;

    const paginated = result.slice(
      start,
      start + limitNum
    );

    return res.status(200).json({
      success: true,

      pagination: {
        page: pageNum,
        limit: limitNum,
        total: result.length,
        pages: Math.ceil(result.length / limitNum),
      },

      data: paginated,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}