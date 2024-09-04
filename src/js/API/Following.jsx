import { createRequest } from '@utils/requests'
const Following = {
  getFollowing: async (id) => {
    const path = '/following/:id'
    return await createRequest('GET', path, { query: { id } })
  },

  getStatusFollowing: async (query) => {
    const path = '/following'
    return await createRequest('GET', path, { query })
  },

  postStatusFollowing: async (query) => {
    const path = '/following'
    return await createRequest('POST', path, { query })
  },
}

export default Following
