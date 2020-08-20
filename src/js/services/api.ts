import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const client = axios.create({
  baseURL: 'http://localhost:8080'
})

const mock = new MockAdapter(client)

// Clients
export async function getClients(): Promise<Response> {
  const response = await client.get('/client')
  return response.data
}

mock.onGet('/client').reply(200, [
  {
    id: 1,
    name: 'Client D'
  },
  {
    id: 2,
    name: 'Client B'
  }
])

// Contacts
export async function getContacts(clientId: number): Promise<Response> {
  const response = await client.get(`/client/${clientId}/contact`)
  return response.data
}

mock.onGet(new RegExp('client/(.*?)/contact')).reply(200, [
  {
    id: 1,
    name: 'Contact A'
  },
  {
    id: 2,
    name: 'Contact B'
  }
])

// Sellers
export async function getEmployees(): Promise<Response> {
  const response = await client.get('/seller')
  return response.data
}

mock.onGet('/seller').reply(200, [
  {
    id: 1,
    name: 'Seller 1'
  },
  {
    id: 2,
    name: 'Seller 2'
  },
  {
    id: 3,
    name: 'Seller 3'
  }
])

// Order
interface Order {
  order_date: Date | null;
  client: number | null;
  contact: number | null;
}

interface Response {
  success: boolean;
  id: number;
  message?: string;
}

export async function postOrder(order: Order): Promise<Response> {
  const response = await client.post('/order', { ...order })
  console.log(response, 'response')
  return response.data
}

mock
  .onPost('/order')
  .reply(function() {
    if (Math.random() > 0.4) {
      return [200, {
        success: true,
        id: 1
      }]
    } else {
      return [200, {
        success: false,
        message: 'Api randomly fails. Press again on finalize to get the success message'
      }]
    }
  })
