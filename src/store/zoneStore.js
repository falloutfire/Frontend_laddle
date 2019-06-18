import HTTP from '../http';

export default {
    state: {
        zones: [],
        zonesFetching: false,
    },
    mutations: {
        setZones(state, zones) {
            state.zones = zones;
        },
        setZonesFetching(state, value) {
            state.zonesFetching = value
        },
    },
    actions: {
        updateZones({commit}) {
            commit('setZonesFetching', true);
            HTTP.get('/bd/zones').then(response => {
                commit('setZonesFetching', false);
                commit('setZones', response.data.result);
            }).catch(() => {
                commit('setZonesFetching', false);
            })
        },
        saveZone({dispatch}, zone) {
            return HTTP.post('/bd/zones', zone).then(() => {
                dispatch('updateZones')
            })
        },
        editZone({dispatch}, zone) {
            return HTTP.put(`/zones/${zone.id}`, zone).then(() => {
                dispatch('updateZones')
            })
        },
        deleteZone({dispatch}, zone) {
          return HTTP.delete(`/zones/${zone.id}`).then(() => {
              dispatch('updateZones')
          })
        },
    },
    getters: {
        zones: state => {
            return state.zones;
        },
        zonesFetching: state => {
            return state.zonesFetching
        }
    }
}
