import { createRequest } from '@utils/requests'

const Like = {
  postLike: async (query) => {
    const path = '/like/'
    return await createRequest('POST', path, { query })
  },

  putUnlike: async (query) => {
    const path = '/like/'
    return await createRequest('PUT', path, { query })
  },

  checkingLike: async (query) => {
    const path = '/like/checking'
    return await createRequest('GET', path, { query })
  },

  countLike: async (query) => {
    const path = '/like/'
    return await createRequest('GET', path, { query })
  },
}

export default Like
