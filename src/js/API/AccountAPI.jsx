import { createRequest } from '@utils/requests'
const AccountAPI = {
  getAll: async (query = {}) => {
    const path = '/account'
    return await createRequest('GET', path, { query })
  },
  getBySlug: async (slug) => {
    const path = '/account/:slug'
    return await createRequest('GET', path, { query: { slug } })
  },

  searchAccounts: async (query = {}) => {
    const path = '/account/search/keyword'
    return await createRequest('GET', path, { query })
  },

  updateInfo: async (query = {}) => {
    const path = '/account/update/:id'
    return await createRequest('PUT', path, { query })
  },

  changeAvatar: async (query = {}) => {
    const path = '/account/update/avatar'
    return await createRequest('PUT', path, { query })
  },
}

export default AccountAPI
