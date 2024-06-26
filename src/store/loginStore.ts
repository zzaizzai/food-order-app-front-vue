import { Module } from 'vuex'
import * as authApi from "@/api/auth";
import { RootState } from '.';


export type AuthState = {
    accessToken: string | null;
};


const loginStore: Module<AuthState, RootState> = {
    state: {
        accessToken: null
    },
    getters: {
        isAuthenticated(state) {
            return state.accessToken !== null;
        },
    },
    mutations: {
        setToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        clearToken(state) {
            state.accessToken = null;
        },
    },
    actions: {
        // Consider creating a separate login action for reusability
        async login({ commit }, { username, password }) {
            try {
                const response = await authApi.login(username, password);
                const accessToken = response.data.accessToken;
                console.log("accessToken:", accessToken)
                commit('setToken', accessToken);
            } catch (error: any) {
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                    console.error('Error response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
                // Handle login errors (e.g., dispatch separate action for error handling)
            }
        },
        logout({ commit }) {
            commit('clearToken');
            console.log('clear token')
        },
        signup({ commit }, { username, password }) {
            try {
                const res = authApi.signup(username, password)
            } catch (error: any) {
                if (error.response) {
                    console.error('Error message:', error.message);
                }
            }
        }
    },
    modules: {
    }
}

export default loginStore