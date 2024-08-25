import { createRequest } from '@utils/requests'

const Users_Activity = {
  getUsersActivity: async (id) => {
    const path = '/users_activity/:id'
    return await createRequest('GET', path, { query: { id } })
  },

  postActivityFollowing: async (query) => {
    const path = '/users_activity/following'
    return await createRequest('POST', path, { query })
  },

  deleteActivityUnfollowing: (query) => {
    const path = '/users_activity/unfollowing'
    return createRequest('delete', path, { query })
  },

  detailPost: async (query) => {
    const path = '/users_activity/'
    return await createRequest('GET', path, { query })
  },

  deletePost: (query) => {
    const path = '/users_activity/delete/post'
    return createRequest('delete', path, { query })
  },
}

export default Users_Activity
