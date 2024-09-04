import { createRequest } from '@utils/requests'

const Favorite = {
  getAllFavorite: async (id) => {
    const path = '/favorite/:id'
    return await createRequest('GET', path, { query: { id } })
  },

  postFavorite: async (query) => {
    const path = '/favorite'
    return await createRequest('POST', path, { query })
  },

  deleteFavorite: async (query) => {
    const path = '/favorite'
    return await createRequest('DELETE', path, { query })
  },

  putFavorite: async (query) => {
    const path = '/favorite'
    return await createRequest('PUT', path, { query })
  },
}

export default Favorite
