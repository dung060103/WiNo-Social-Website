import fetch from '../config/fetch'

const createRequest = async (
  method,
  path,
  { query = {}, body = null } = {},
  onError = (error) => error,
) => {
  try {
    var data = await fetch(method, path, {
      query,
      body,
    }).then(async (res) => res.json())

    return data
  } catch (error) {
    Promise.reject(error)
    onError(error)
  }
}

export { createRequest }
