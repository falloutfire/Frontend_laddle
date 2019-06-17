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
