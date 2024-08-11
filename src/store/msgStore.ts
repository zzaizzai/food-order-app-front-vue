import { Module } from 'vuex'
import { RootState } from '.';
import { Message } from '@/interfaces/Message';


export type MsgState = {
    msgList: Message[]
};


const msgStore: Module<MsgState, RootState> = {
    state: {
        msgList: [{ msg: "test1", type: "error" }]
    },
    getters: {
        getMsgList(state) {
            return state.msgList
        }
    },
    mutations: {
        addMsg(state, msg: Message) {
            const msgListTemp = [...state.msgList, msg]
            state.msgList = msgListTemp
            console.log(msgListTemp)
        },
        clearMsg(state) {
            state.msgList = []
        }
    },
    actions: {
        addMsg({ commit }, { type, msg }) {
            const msgTemp: Message = { type: type, msg: msg }
            commit('addMsg', msgTemp)
        },
        clearMsg({ commit }) {
            commit('clearMsg')
        }

    },
    modules: {
    }
}

export default msgStore