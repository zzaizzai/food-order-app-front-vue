import { Module } from 'vuex'
import * as authApi from "@/api/auth";
import store, { RootState } from '.';
import { AxiosError } from 'axios';


export type AuthState = {
    accessToken: string | null;
    username: string | null;
};


const loginStore: Module<AuthState, RootState> = {
    state: {
        accessToken: null,
        username: null
    },
    getters: {
        isAuthenticated(state) {
            return state.accessToken !== null;
        },
        getUsername(state) {
            return state.username
        }
    },
    mutations: {
        setToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        setUsername(state, username) {
            state.username = username
        },
        clearToken(state) {
            state.accessToken = null;
        },
        clearUsername(state) {
            state.username = null;
        }
    },
    actions: {
        // Consider creating a separate login action for reusability
        async login({ commit }, { username, password }) {
            try {
                const response = await authApi.login(username, password);
                const accessToken = response.data.accessToken;
                console.log("accessToken:", accessToken)
                commit('setToken', accessToken);
                commit('setUsername', username);
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
            commit('clearUsername');
            console.log('clear token')
            console.log('clear Username')
        },
        signup({ commit }, { username, password }) {
            try {
                const res = authApi.signup(username, password)
            } catch (error: any) {
                if (error.response) {
                    console.error('Error message:', error.message);
                }
            }
        },
        async checkToken({ commit }) {

            try {
                const response = await authApi.checkToken();
                console.log("check token", response.status)

                // Token is OK
                if (response.status == 200) {
                    return
                }
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    const data = error.response?.data
                    if (data.message === "Unauthorized") {
                        console.log(data)
                        // Token is expired
                        commit("clearToken")
                        commit("clearUsername")
                    }
                }
            }
        }
    },
    modules: {
    }
}

export default loginStore