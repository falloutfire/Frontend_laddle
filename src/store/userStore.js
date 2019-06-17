import HTTP from '../http';

export default {
    state: {
        users: [],
        usersFetching: false,
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setUsersFetching(state, value) {
            state.usersFetching = value
        },
    },
    actions: {
        updateUsers({commit}) {
            commit('setUsersFetching', true);
            HTTP.get('users').then(response => {
                commit('setUsersFetching', false);
                commit('setUsers', response.data.result);
            }).catch(() => {
                commit('setUsersFetching', false);
            })
        },
        saveUser({dispatch}, user) {
            return HTTP.post('users', user).then(() => {
                dispatch('updateUsers')
            })
        },
        editUser({dispatch}, user) {
            return HTTP.put('users', user).then(() => {
                dispatch('updateUsers')
            })
        },
        deleteUser({dispatch}, user) {
          return HTTP.delete(`users/${user.id}`).then(() => {
              dispatch('updateUsers')
          })
        },
    },
    getters: {
        users: state => {
            return state.users;
        },
        usersFetching: state => {
            return state.usersFetching
        }
    }
}
