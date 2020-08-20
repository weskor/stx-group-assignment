// Services
import { postOrder } from '@/services/api'

// Utils
import { sum } from '@/utils/sum'

export const storeName = 'orderStore'

export interface Seller {
  id: number | null;
  percentage: number | null;
}

export interface State {
  orderDate: Date | null;
  clientId: number | null;
  contactId: number | null;
  sellers: Seller[];
  orderDetailsSaved: boolean;
  sellerDetailsSaved: boolean;
  isLoading: boolean;
  saved: boolean;
  error: string | null;
}

export const types = {
  mutations: {
    SET_CLIENT: 'SET_CLIENT',
    SET_ORDER_DATE: 'SET_ORDER_DATE',
    SET_CONTACT: 'SET_CONTACT',
    SET_SELLERS: 'SET_SELLERS',
    SET_ORDERDETAILS_SAVE: 'SET_ORDERDETAILS_SAVE',
    SET_SELLERDETAILS_SAVE: 'SET_SELLERDETAILS_SAVE',
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_SAVED: 'SET_SAVED',
    SET_ERRROR: 'SET_ERROR'
  },
  getters: {
    GET_ORDER_DATE: 'GET_ORDER_DATE',
    GET_SELLERS: 'GET_SELLERS',
    GET_SELLERS_TOTAL_PER: 'GET_SELLERS_TOTAL_PER',
    GET_SAVED_STATUS: 'GET_SAVED_STATUS',
    GET_ERROR: 'GET_ERROR',
    GET_ORDER_SAVED: 'GET_ORDER_SAVED'
  },
  actions: {
    POST_ORDER: 'POST_ORDER'
  }
}

const state: State = {
  orderDate: null,
  clientId: null,
  contactId: null,
  sellers: [],
  orderDetailsSaved: false,
  sellerDetailsSaved: false,
  isLoading: false,
  saved: false,
  error: null
}

const mutations = {
  [types.mutations.SET_CLIENT](state: State, payload: number) {
    state.clientId = payload
  },

  [types.mutations.SET_ORDER_DATE](state: State, payload: Date) {
    state.orderDate = payload
  },

  [types.mutations.SET_CONTACT](state: State, payload: number) {
    state.contactId = payload
  },

  [types.mutations.SET_SELLERS](state: State, payload: Seller[]) {
    state.sellers = payload
  },

  [types.mutations.SET_ORDERDETAILS_SAVE](state: State, payload: boolean) {
    state.orderDetailsSaved = payload
  },

  [types.mutations.SET_SELLERDETAILS_SAVE](state: State, payload: boolean) {
    state.sellerDetailsSaved = payload
  },

  [types.mutations.SET_IS_LOADING](state: State, payload: boolean) {
    state.isLoading = payload
  },

  [types.mutations.SET_SAVED](state: State, payload: boolean) {
    state.saved = payload
  },

  [types.mutations.SET_ERRROR](state: State, payload: string) {
    state.error = payload
  }

}

const actions = {
  async [types.actions.POST_ORDER]({ commit }: { commit: Function }) {
    commit(`${types.mutations.SET_IS_LOADING}`, true)

    const order = {
      order_date: state.orderDate,
      client: state.clientId,
      contact: state.contactId
    }

    const response = await postOrder(order)

    response.success
      ? commit(`${types.mutations.SET_SAVED}`, true)
      : commit(`${types.mutations.SET_ERRROR}`, response.message || 'Saving failed, please try again')

    commit(`${types.mutations.SET_IS_LOADING}`, false)
  }
}

const getters = {
  [types.getters.GET_ORDER_DATE]: (state: State) => state.orderDate,
  [types.getters.GET_SELLERS]: (state: State) => state.sellers,
  [types.getters.GET_SELLERS_TOTAL_PER]: (state: State) => sum(state.sellers, 'percentage'),
  [types.getters.GET_SAVED_STATUS]: (state: State) => {
    return { order: state.orderDetailsSaved, seller: state.sellerDetailsSaved }
  },
  [types.getters.GET_ORDER_SAVED]: (state: State) => state.saved,
  [types.getters.GET_ERROR]: (state: State) => state.error
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
