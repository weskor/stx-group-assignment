import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import order, { storeName as orderStoreName } from './modules/order'
import clients, { storeName as clientsStoreName } from './modules/clients'
import contacts, { storeName as contactsStoreName } from './modules/contacts'
import employees, { storeName as employeesStoreName } from './modules/employees'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    [orderStoreName]: order,
    [clientsStoreName]: clients,
    [contactsStoreName]: contacts,
    [employeesStoreName]: employees
  }
})
