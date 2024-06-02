import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import loginStore from './loginStore'

const PERSISTENCE_KEY = 'my-app-state';

export type RootState = {
  loginStore: any;
}


export default createStore<RootState>({
  plugins: [
    createPersistedState({
      paths: ['loginStore']
    })
  ],
  modules: {
    loginStore
  }
})
