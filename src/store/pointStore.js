import HTTP from '../http';

export default {
    state: {
        points: [],
        pointsFetching: false,
    },
    mutations: {
        setLadles(state, points) {
            state.points = points;
        },
        setPointsFetching(state, value) {
            state.pointsFetching = value
        },
    },
    actions: {
        updatePoints({commit}) {
            commit('setPointsFetching', true);
            HTTP.get('/bd/points').then(response => {
                commit('setPointsFetching', false);
                commit('setPoints', response.data.result);
            }).catch(() => {
                commit('setPointsFetching', false);
            })
        },
        savePoint({dispatch}, point) {
            return HTTP.post('/bd/points', point).then(() => {
                dispatch('updatePoints')
            })
        },
        editPoint({dispatch}, point) {
            return HTTP.put('/bd/points', point).then(() => {
                dispatch('updatePoints')
            })
        },
        deletePoint({dispatch}, point) {
          return HTTP.delete(`/bd/points/${point.id}`).then(() => {
              dispatch('updatePoints')
          })
        },
    },
    getters: {
        points: state => {
            return state.points;
        },
        pointsFetching: state => {
            return state.pointsFetching
        }
    }
}
