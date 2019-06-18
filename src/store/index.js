import tokenStore from './tokenStore';
import usersStore from './userStore';
import shopsStore from './shopStore';
import ladleStore from './ladleStore'
import zoneStore from "./zoneStore";
import pointStore from "./pointStore";
import refractoryStore from "./refractoryStore";
import propertyStore from "./propertyStore";

import Vue from 'vue'
import Vuex from 'vuex'
import HTTP from "../http";

Vue.use(Vuex);

const store = new Vuex.Store(
    {
        modules: {
            tokenStore: tokenStore,
            usersStore: usersStore,
            shopsStore: shopsStore,
            ladleStore: ladleStore,
            zoneStore: zoneStore,
            pointStore: pointStore,
            refractoryStore: refractoryStore,
            propertyStore: propertyStore,
        },
        // actions: {
        //   updateLadleForZoneEditing({ state, dispatch, rootState }, ladle) {
        //       const result = {};
        //       HTTP.get(`/bd/ladles/${ladle.id}/zones`).then(response => {
        //           result.zones = response.data.result;
        //           result.zones.forEach((zone, zoneIndex) => {
        //               HTTP.get(`/bd/zone/${zone.id}/points`).then(response => {
        //                   result.zones[zoneIndex].points = response.data.result
        //               });
        //               HTTP.get(`/bd/zone/${zone.id}/refractories`).then(response => {
        //                   result.zones[zoneIndex].refractories = response.data.result
        //                   result.zones[zoneIndex].refractories.forEach((refractory, refractoryIndex) => {
        //                       HTTP.get(`/bd/zone/${refractory.id}/properties`).then(response => {
        //                           result.zones[zoneIndex].refractories[refractoryIndex].properties = response.data.result
        //                       });
        //               });
        //           })
        //
        //       })
        //   },
        // },
        // },
    }
);

export {store};
