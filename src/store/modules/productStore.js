import ProductService from "../../services/productServices/productService";

const productService = new ProductService();

const state = {
  products: {
      products: [],
      pageCount: 0
  }
};

const getters = {
  getProduct: state => id => {
    const index = state.products.products.findIndex(item => item.id === id);
    return state.products.products[index];
  }
};

const mutations = {
  get_products(state, products) {
    state.products = products;
  },

  get_product_full_info(state, product) {
      if(state.products.products.length > 0) {
        const index = state.products.products.findIndex(
            item => item.id === product.id
          );
          state.products.products[index].fullInfo = product;
      } else {
          const item = {
              id: product.id,
              fullInfo: product
          }
        state.products.products.push(item);
      }
  },

  add_product(state, product) {
    state.products = product;
  }
};

const actions = {
  getProducts({ commit }, page = 0) {
      commit("CHANGE_LOADING_STATE");
    productService.getProducts(page).then(
      response => {
        commit("get_products", response.data);
      },
      errorResponse => {
        const message = errorResponse.response.data;
        alert(message);
      }
    ).finally(() => {
        commit("CHANGE_LOADING_STATE")
    });
  },
  getProduct({ commit }, id) {
    productService.getProduct(id).then(response => {
      commit("get_product_full_info", response.data);
    });
  },
  addProduct({ commit }, product) {
      productService.addProduct(product).then(response => {
          commit("add_product", response.data)
      })
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
