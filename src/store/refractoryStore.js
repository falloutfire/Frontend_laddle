import HTTP from '../http';

export default {
    state: {
        refractories: [],
        refractoriesFetching: false,
    },
    mutations: {
        setRefractories(state, refractories) {
            state.refractories = refractories;
        },
        setRefractoriesFetching(state, value) {
            state.refractoriesFetching = value
        },
    },
    actions: {
        updateRefractories({commit}) {
            commit('setRefractoriesFetching', true);
            HTTP.get('/bd/refractories').then(response => {
                commit('setRefractoriesFetching', false);
                commit('setRefractories', response.data.result);
            }).catch(() => {
                commit('setRefractoriesFetching', false);
            })
        },
        saveRefractory({dispatch}, refractory) {
            return HTTP.post('/bd/refractories', refractory).then(() => {
                dispatch('updateRefractories')
            })
        },
        editRefractory({dispatch}, refractory) {
            return HTTP.put('/bd/refractories', refractory).then(() => {
                dispatch('updateRefractories')
            })
        },
        deleteRefractory({dispatch}, refractory) {
          return HTTP.delete(`/bd/refractories/${refractory.id}`).then(() => {
              dispatch('updateRefractories')
          })
        },
    },
    getters: {
        refractories: state => {
            return state.refractories;
        },
        refractoriesFetching: state => {
            return state.refractoriesFetching
        }
    }
}
