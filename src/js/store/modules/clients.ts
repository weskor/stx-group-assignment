// Services
import { getClients } from '@/services/api'

export const storeName = 'clientsStore'

export interface Client {
  id: number;
  name: string;
}

export interface State {
  clients: Client[];
}

export const types = {
  mutations: {
    SET_CLIENTS: 'SET_CLIENTS'
  },
  getters: {
    ALL_CLIENTS: 'ALL_CLIENTS'
  },
  actions: {
    GET_CLIENTS: 'GET_CLIENTS'
  }
}

const state: State = {
  clients: []
}

const mutations = {
  [types.mutations.SET_CLIENTS](state: State, payload: Client[]) {
    state.clients = payload
  }
}

const actions = {
  async [types.actions.GET_CLIENTS]({ commit }: { commit: Function }) {
    const clients = await getClients()
    commit(`${types.mutations.SET_CLIENTS}`, clients)
  }
}

const getters = {
  [types.getters.ALL_CLIENTS]: (state: State) => state.clients
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
