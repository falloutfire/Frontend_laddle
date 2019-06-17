import HTTP from '../http';

export default {
    state: {
        shops: [],
        shopsFetching: false,
    },
    mutations: {
        setShops(state, shops) {
            state.shops = shops;
        },
        setShopsFetching(state, value) {
            state.shopsFetching = value
        },
    },
    actions: {
        updateShops({commit}) {
            commit('setShopsFetching', true);
            HTTP.get('/bd/shops').then(response => {
                commit('setShopsFetching', false);
                commit('setShops', response.data.result);
            }).catch(() => {
                commit('setShopsFetching', false);
            })
        },
        saveShop({dispatch}, shop) {
            return HTTP.post('/bd/shops', shop).then(() => {
                dispatch('updateShops')
            })
        },
        editShop({dispatch}, shop) {
            return HTTP.put('/bd/shops', shop).then(() => {
                dispatch('updateShops')
            })
        },
        deleteShop({dispatch}, shop) {
          return HTTP.delete(`/bd/shops/${shop.id}`).then(() => {
              dispatch('updateShops')
          })
        },
    },
    getters: {
        shops: state => {
            return state.shops;
        },
        shopsFetching: state => {
            return state.shopsFetching
        }
    }
}
