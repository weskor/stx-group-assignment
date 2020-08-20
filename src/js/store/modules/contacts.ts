// Services
import { getContacts } from '@/services/api'

export const storeName = 'contactsStore'

export interface Contact {
  id: number;
  name: string;
}

export interface State {
  contacts: Contact[];
}

export const types = {
  mutations: {
    SET_CONTACTS: 'SET_CONTACTS'
  },
  getters: {
    ALL_CONTACTS: 'ALL_CONTACTS'
  },
  actions: {
    GET_CONTACTS: 'GET_CONTACTS'
  }
}

const state: State = {
  contacts: []
}

const mutations = {
  [types.mutations.SET_CONTACTS](state: State, payload: Contact[]) {
    state.contacts = payload
  }
}

const actions = {
  async [types.actions.GET_CONTACTS]({ commit }: { commit: Function }, payload: number) {
    const contacts = await getContacts(payload)
    commit(`${types.mutations.SET_CONTACTS}`, contacts)
  }
}

const getters = {
  [types.getters.ALL_CONTACTS]: (state: State) => state.contacts
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
