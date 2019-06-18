import HTTP from '../http';

export default {
    state: {
        properties: [],
        propertiesFetching: false,
    },
    mutations: {
        setProperties(state, properties) {
            state.properties = properties;
        },
        setPropertiesFetching(state, value) {
            state.propertiesFetching = value
        },
    },
    actions: {
        updateProperties({commit}) {
            commit('setPropertiesFetching', true);
            HTTP.get('/bd/properties').then(response => {
                commit('setPropertiesFetching', false);
                commit('setProperties', response.data.result);
            }).catch(() => {
                commit('setPropertiesFetching', false);
            })
        },
        saveProperty({dispatch}, property) {
            return HTTP.post('/bd/properties', property).then(() => {
                dispatch('updateProperties')
            })
        },
        editProperty({dispatch}, property) {
            return HTTP.put('/bd/properties', property).then(() => {
                dispatch('updateProperties')
            })
        },
        deleteProperty({dispatch}, property) {
          return HTTP.delete(`/bd/properties/${property.id}`).then(() => {
              dispatch('updateProperties')
          })
        },
    },
    getters: {
        properties: state => {
            return state.properties;
        },
        propertiesFetching: state => {
            return state.propertiesFetching
        }
    }
}
