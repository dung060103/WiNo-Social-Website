import { createRequest } from '@utils/requests'

const Comment = {
  getAllComment: async (id) => {
    const path = '/comment/:id'
    return await createRequest('GET', path, { query: { id } })
  },

  postComment: async (query) => {
    const path = '/comment'
    return await createRequest('POST', path, { query })
  },
}

export default Comment
