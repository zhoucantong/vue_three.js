import Vue from "vue"
import Vuex from "vuex"
import VuexPersistence from "vuex-persist"
import Module from "@/store/modules/StoreModule"

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: "VUEX_STORE",
  storage: window.localStorage,
})

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Module,
  },
  plugins: [vuexLocal.plugin],
})
