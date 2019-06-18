import HTTP from '../http';

export default {
    state: {
        ladles: [],
        ladlesFetching: false,
    },
    mutations: {
        setLadles(state, ladles) {
            state.ladles = ladles;
        },
        setLadlesFetching(state, value) {
            state.ladlesFetching = value
        },
    },
    actions: {
        updateLadles({commit}) {
            commit('setLadlesFetching', true);
            HTTP.get('/bd/ladles').then(response => {
                commit('setLadlesFetching', false);
                commit('setLadles', response.data.result);
            }).catch(() => {
                commit('setLadlesFetching', false);
            })
        },
        saveLadle({dispatch}, ladle) {
            return HTTP.post('/bd/ladles', ladle).then(() => {
                dispatch('updateLadles')
            })
        },
        editLadle({dispatch}, ladle) {
            return HTTP.put('/bd/ladles', ladle).then(() => {
                dispatch('updateLadles')
            })
        },
        deleteLadle({dispatch}, ladle) {
          return HTTP.delete(`/bd/ladles/${ladle.id}`).then(() => {
              dispatch('updateLadles')
          })
        },
    },
    getters: {
        ladles: state => {
            return state.ladles;
        },
        ladlesFetching: state => {
            return state.ladlesFetching
        },
    }
}
