const db = require("../models");
const slugify = require("slugify");
// const client = require("../config/configElasticSearch");
const { Op } = require("sequelize");
const limitProduct = 5;
const common_include = {
  attributes: { exclude: ["category_id"] },
  raw: false,
  order: [[db.Sequelize.col("id"), "desc"]],
  include: [
    {
      model: db.Product_Color,
      as: "product_colors",
      attributes: { exclude: ["product_id"] },
      required: true,
    },
    {
      model: db.Category,
      as: "category",
      required: true,
      attributes: { exclude: ["group_category_id"] },
      include: [
        {
          model: db.Group_Category,
          as: "group_category",
          attributes: {
            exclude: ["gender_category_id"],
          },
          include: [
            {
              model: db.Gender_Category,
              as: "gender_category",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              required: true,
            },
          ],
          required: true,
        },
      ],
    },
    // {
    //   model: db.Product_Sale,
    //   as: "product_sales",
    // },
  ],
  nest: true,
};
const countProduct = async (where) => {
  let total = await db.Product.count({
    nested: true,
    raw: false,
    include: [
      {
        model: db.Category,
        as: "category",
        attributes: [],
        include: [
          {
            model: db.Group_Category,
            as: "group_category",
            attributes: [],
            include: [
              {
                model: db.Gender_Category,
                as: "gender_category",
                attributes: [],
              },
            ],
          },
        ],
      },
    ],
    where,
  });
  return total;
};
const createFilter = (query) => {
  let {
    color,
    size,
    price,
    sortBy,
    sortType,
    pImage,
    p,
    limit,
    pSize,
    pComment,
  } = query;
  color = color ? JSON.parse(color) : [];
  size = size ? JSON.parse(size) : [];
  price = price ? JSON.parse(price) : [];
  let product_color_include = {
    model: db.Product_Color,
    as: "product_colors",
    attributes: { exclude: ["product_id"] },
    required: true,
    include: [],
  };
  let product_color_size_include = {
    model: db.Product_Color_Size,
    as: "product_color_sizes",
    attributes: {
      exclude: ["product_color_id"],
    },
    required: true,
  };
  let comment_include = {
    model: db.Comment,
    as: "comments",
    include: [
      {
        model: db.User,
        as: "user",
      },
      {
        model: db.Product,
        as: "product",
      },
      {
        model: db.Replied_Comment,
        as: "replied_comments",
        include: [
          {
            model: db.User,
            as: "user",
          },
        ],
      },
    ],
    limit: 1,
    separate: true,
    order: [["createdAt", "asc"]],
  };
  // Nếu có filter color thì thêm điều kiện where vào
  if (color.length !== 0) {
    product_color_include.where = {
      color: {
        [Op.in]: color,
      },
    };
  }
  // Nếu cần dữ liệu image thì phải có query param là pImage
  if (pImage) {
    product_color_include.include.push({
      model: db.Product_Color_Image,
      as: "product_color_images",
      attributes: {
        exclude: ["product_color_id"],
      },
      required: true,
    });
  }
  // Nếu filter size thì cần phải cho pSize bằng true để lấy dữ liệu size
  if (size.length !== 0) {
    pSize = true;
  }
  // Nếu có query param là pSize thì lấy dữ liệu size
  if (pSize) {
    // Nếu có filter size thì thêm điều kiện where vào
    if (size.length !== 0) {
      product_color_size_include.where = {
        size_text: {
          [Op.in]: size,
        },
      };
      product_color_size_include.attributes = [];
    }

    product_color_include.include.push(product_color_size_include);
  }
  let newInclude = {
    attributes: { exclude: ["category_id"] },
    raw: false,
    order: [[db.Sequelize.col("id"), "asc"]],
    // logging: console.log,
    include: [
      { ...product_color_include },
      {
        model: db.Category,
        as: "category",
        required: true,
        attributes: { exclude: ["group_category_id"] },
        attributes: ["id", "slug"],
        include: [
          {
            model: db.Group_Category,
            as: "group_category",
            attributes: {
              exclude: ["gender_category_id"],
            },
            attributes: ["id", "slug"],
            include: [
              {
                model: db.Gender_Category,
                as: "gender_category",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                required: true,
              },
            ],
            required: true,
          },
        ],
      },
      // {
      //   model: db.Product_Sale,
      //   as: "product_sales",
      // },
    ],
    nest: true,
  };
  // Nếu cần dữ liệu comment thì truyền query param là pComment
  if (pComment) {
    newInclude.include.push(comment_include);
    // newInclude.order = [
    //   ...newInclude.order,
    //   [{ model: db.Comment, as: "comments" }, "createdAt", "asc"],
    // ];
  }
  // Nếu có filter price thì thêm where vào
  if (price.length !== 0) {
    newInclude.where = {
      price: {
        [Op.gte]: price[0],
        [Op.lte]: price[1],
      },
    };
  }
  // Nếu sort thì thêm order vào
  if (sortBy && sortType && sortBy !== "") {
    newInclude.order = [...newInclude.order, [sortBy, sortType.toUpperCase()]];
  }
  return newInclude;
};
const getAll = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { p, limit } = query;
      let _limit;
      if (typeof limit !== typeof 3) {
        _limit = limit ? parseInt(limit) : limitProduct;
      } else {
        _limit = limit ? limit : limitProduct;
      }
      let products = [];
      let total;
      let _p = parseInt(p);
      if (_p <= 0) {
        products = [];
        total = 0;
      } else {
        total = await countProduct();
        const newInclude = createFilter(query);
        products = await db.Product.findAll({
          ...newInclude,
          limit: _limit,
          offset: _limit * ((!_p ? 1 : _p) - 1),
        });
      }

      // if (products.length > 0) {
      //   for (let i = 0; i < products.length; i++) {
      //     try {
      //       await client.update({
      //         index: "products",
      //         id: products[i].id,
      //         doc: products[i],
      //       });
      //     } catch (error) {
      //       await client.index({
      //         index: "products",
      //         id: products[i].id,
      //         document: products[i],
      //       });
      //     }
      //   }
      // }

      resolve({
        status: 200,
        data: {
          products: products,
          total_page: Math.ceil(total / _limit),
        },
      });
    } catch (error) {
      console.log(error);
      // await client.index({
      //   index: "products",
      //   id: products[0].id,
      //   document: products[0],
      // });
      resolve({ status: 500, data: error });
    }
  });
};

const getByStatistics = async (user, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit } = query;
      const optionCount = {
        group: "product_color_size.product_color.product.id",
        order: [[db.sequelize.fn("sum", db.sequelize.col("quantity")), "asc"]],
        include: [
          {
            model: db.Product_Color_Size,
            as: "product_color_size",
            attributes: ["id"],
            include: [
              {
                model: db.Product_Color,
                as: "product_color",
                attributes: ["id"],
                include: [
                  {
                    model: db.Product,
                    as: "product",
                    include: [
                      {
                        model: db.Product_Color,
                        as: "product_colors",
                        separate: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      const arrCount = await db.Order_Item.count(optionCount);
      let _limit;
      if (typeof limit !== typeof 3) {
        _limit = limit ? parseInt(limit) : 1;
      } else {
        _limit = limit ? limit : 1;
      }
      const products = await db.Order_Item.findAll({
        ...optionCount,
        limit: _limit,
      });
      resolve({
        status: 200,
        data: {
          products: products.map(
            (item) => item.product_color_size.product_color.product
          ),
          total_page: Math.ceil(arrCount.length / _limit),
        },
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};

const search = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { q, limit } = query;
      let _limit;
      if (typeof limit !== typeof 3) {
        _limit = limit ? parseInt(limit) : limitProduct;
      } else {
        _limit = limit ? limit : limitProduct;
      }
      // const result = await client.search({
      //   index: "products",
      //   query: {
      //     multi_match: {
      //       query: q,
      //       type: "phrase_prefix",
      //       fields: ["name", "slug", "product_colors.color"],
      //     },
      //   },
      //   size: _limit,
      // });
      resolve({
        status: 200,
        data: {
          products: result.hits.hits.map((item) => item._source),
          total_page: Math.ceil(result.hits.total.value / _limit),
        },
      });
    } catch (error) {
      // console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getByGenderCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { p, limit } = query;
      const where = {
        "$Category.Group_Category.Gender_Category.slug$": slug,
      };
      let _limit;
      if (typeof limit !== typeof 3) {
        _limit = limit ? parseInt(limit) : limitProduct;
      } else {
        _limit = limit ? limit : limitProduct;
      }
      let products = [];
      let total = await countProduct(where);
      if (p <= 0) {
        products = [];
        total = 0;
      } else {
        total = await countProduct(where);
        const newInclude = createFilter(query);
        products = await db.Product.findAll({
          ...newInclude,
          where: {
            ...newInclude.where,
            ...where,
          },
          limit: _limit,
          offset: _limit * ((!p ? 1 : p) - 1),
        });
      }
      resolve({
        status: 200,
        data: {
          products: products,
          total_page: Math.ceil(total / _limit),
        },
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getByGroupCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { p, limit } = query;
      const where = {
        "$Category.Group_Category.slug$": slug,
      };
      let _limit;
      if (typeof limit !== typeof 3) {
        _limit = limit ? parseInt(limit) : limitProduct;
      } else {
        _limit = limit ? limit : limitProduct;
      }
      let products = [];
      let total;
      let _p = parseInt(p);
      if (_p <= 0) {
        products = [];
        total = 0;
      } else {
        total = await countProduct(where);
        const newInclude = createFilter(query);
        products = await db.Product.findAll({
          ...newInclude,
          where: {
            ...where,
            ...newInclude.where,
          },
          limit: _limit,
          offset: _limit * ((!_p ? 1 : _p) - 1),
        });
      }
      resolve({
        status: 200,
        data: {
          products: products,
          total_page: Math.ceil(total / _limit),
        },
      });
    } catch (error) {
      // console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getByCollectionId = async (collection_id, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const option = { ...createFilter(query) };
      option.include.push({
        model: db.Collection_Item,
        as: "collection_items",
        include: [
          {
            model: db.Collection,
            as: "collection",
            where: {
              id: collection_id,
            },
          },
        ],
      });
      const products = await db.Product.findAll({
        ...option,
      });

      resolve({ status: 200, data: products });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getByCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { p, limit } = query;
      const where = {
        "$Category.slug$": slug,
      };
      let _limit;
      if (typeof limit !== typeof 3) {
        _limit = limit ? parseInt(limit) : limitProduct;
      } else {
        _limit = limit ? limit : limitProduct;
      }
      let products = [];
      let total = await countProduct(where);
      if (p <= 0) {
        products = [];
        total = 0;
      } else {
        total = await countProduct(where);
        const newInclude = createFilter(query);
        products = await db.Product.findAll({
          ...newInclude,
          where: {
            ...newInclude.where,
            ...where,
          },
          limit: _limit,
          offset: _limit * ((!p ? 1 : p) - 1),
        });
      }
      resolve({
        status: 200,
        data: {
          products: products,
          total_page: Math.ceil(total / _limit),
        },
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
const getBySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findOne({
        ...createFilter(query),
        where: { slug },
      });

      resolve({ status: 200, data: product });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};
const updateIndex = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findOne({
        ...createFilter({}),
        where: { id },
      });

      // try {
      //   await client.update({
      //     index: "products",
      //     id: id,
      //     doc: product,
      //   });
      // } catch (error) {
      //   await client.index({
      //     index: "products",
      //     id: id,
      //     document: product,
      //   });
      // }

      resolve({ status: 200, data: product });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};

const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name } = body;
      const slug = slugify(name.toLowerCase());
      const new_product = await db.Product.create({
        ...body,
        slug,
      });
      resolve({ status: 200, data: new_product });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, name, price } = body;
      const slug = slugify(name.toLowerCase());
      let existing_product = await db.Product.findOne({
        where: { id },
        raw: true,
      });
      if (existing_product) {
        const newProduct = {
          ...existing_product,
          ...body,
          slug,
        };
        await db.Product.update(newProduct, { where: { id } });
        // await client.update({
        //   index: "products",
        //   id: id,
        //   doc: { name, price },
        // });

        resolve({ status: 200, data: newProduct });
      }
      resolve({
        status: 404,
        data: {
          message: "Product not found",
        },
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};

const _delete = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product.destroy({
        where: {
          id,
        },
      });
      // await client.delete({ index: "products", id });
      resolve({ status: 200, data: "Deleted" });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error.response.data });
    }
  });
};

module.exports = {
  getAll,
  search,
  getByGenderCategorySlug,
  getByGroupCategorySlug,
  getByCategorySlug,
  getBySlug,
  getByCollectionId,
  create,
  update,
  _delete,
  getByStatistics,
  updateIndex,
};
