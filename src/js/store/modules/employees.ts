// Services
import { getEmployees } from '@/services/api'

export const storeName = 'employeesStore'

export interface Employee {
    id: number;
    name: string;
}

export interface State {
  employees: Employee[];
}

export const types = {
  mutations: {
    SET_EMPLOYEES: 'SET_EMPLOYEES'
  },
  getters: {
    ALL_EMPLOYEES: 'ALL_EMPLOYEES'
  },
  actions: {
    GET_EMPLOYEES: 'GET_EMPLOYEES'
  }
}

const state: State = {
  employees: []
}

const mutations = {
  [types.mutations.SET_EMPLOYEES](state: State, payload: Employee[]) {
    state.employees = payload
  }
}

const actions = {
  async [types.actions.GET_EMPLOYEES]({ commit }: { commit: Function }) {
    const employees = await getEmployees()
    commit(`${types.mutations.SET_EMPLOYEES}`, employees)
  }
}

const getters = {
  [types.getters.ALL_EMPLOYEES]: (state: State) => state.employees
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
