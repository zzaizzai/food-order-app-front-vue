import { createStore } from 'vuex'
import * as authApi from "@/api/auth";
import createPersistedState from 'vuex-persistedstate'
import loginStore, { AuthState } from './loginStore'

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
