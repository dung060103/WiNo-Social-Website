import Users_Activity from '@api/UsersActivity'
import Following from '@api/Following'
import { createRequest } from '@utils/requests'
export function singleObj_constructor_toList(obj) {
  var init = []
  init.push(obj)
  return init
}
export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}
export function dateTo_textAgo(date) {
  var subtract = Math.abs(new Date() - date)
  if (subtract < 60 * 1000) {
    return `${parseInt(subtract / 1000)} seconds ago`
  } else if (subtract > 60 * 1000 && subtract < 60 * 60 * 1000) {
    return `${parseInt(subtract / 1000 / 60)} minutes ago`
  } else if (subtract > 60 * 60 * 1000 && subtract < 24 * 60 * 60 * 1000) {
    return `${parseInt(subtract / 1000 / 60 / 60)} hours ago`
  } else if (
    subtract > 24 * 60 * 60 * 1000 &&
    subtract < 7 * 24 * 60 * 60 * 1000
  ) {
    return `${parseInt(subtract / 1000 / 60 / 60 / 24)} days ago`
  } else if (subtract > 7 * 24 * 60 * 60 * 1000) {
    return `${parseInt(subtract / 1000 / 60 / 60 / 24 / 7)} weeks ago`
  } else if (subtract > 30 * 24 * 60 * 60 * 1000) {
    return `${parseInt(subtract / 1000 / 60 / 60 / 24 / 30)} months ago`
  }
  return 'AAAAAAAAA'
}
export function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  if (i === 0) return bytes + ' ' + sizes[i]
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}
export function get_slug(url) {
  return new URL(url).pathname.match(/[^/]+/g)
}
export function req_requestAddFriend(account) {
  createRequest('POST', '/friend/request-add-friend', {
    body: {
      slug_friend: account.slug_personal,
    },
  })
}
export const cancelRequestAddFriend = (account) => {
  createRequest('POST', '/friend/cancel-request-add-friend', {
    body: {
      slug_friend: account.slug_personal,
    },
  })
}
export const req_refuse_requestAddFriend = (account) => {
  createRequest('POST', '/friend/refuse_requestAddFriend', {
    body: {
      slug_friend: account.slug_personal,
    },
  })
}
export const req_unfriend = (account) => {
  // Lấy id params

  createRequest('POST', '/friend/unfriend', {
    body: {
      slug_unfriend: account.slug_personal,
    },
  })
}
export function req_acceptAddNewFriend(account) {
  // const [user_activity, set_user_activity] = useState({})
  // const { id} = useParams();
  createRequest('POST', '/friend/acceptAddNewFriend', {
    body: {
      data_res_new_friend: account.slug_personal,
    },
  })

  const fetchData = async (id) => {
    const query = {
      id_user: account._id,
      id_user_following: id,
    }
    await Following.postStatusFollowing(query)

    GET_API_activity()

    POST_API_Activity_Following()
  }
  fetchData()
  async function GET_API_activity(id) {
    await Users_Activity.getUsersActivity(id)
  }

  async function POST_API_Activity_Following(account, id) {
    const query = {
      id_user: account._id,
      id_user_following: id,
    }

    await Users_Activity.postActivityFollowing(query)
  }
}
