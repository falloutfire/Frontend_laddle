import tokenStore from './tokenStore';
import usersStore from './userStore';
import shopsStore from './shopStore';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store(
    {
        modules: {
            tokenStore: tokenStore,
            usersStore: usersStore,
            shopsStore: shopsStore,
        }
    }
);

export {store};
