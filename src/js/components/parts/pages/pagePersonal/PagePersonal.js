// import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import PagePersonalStyles from '../pagePersonal/PagePersonal.module.css'
import { Fragment, useEffect, useState } from 'react'
import PagePersonalHeader from '../../subHeaders/pagePersonalHeader/PagePersonalHeader'
import { createContext } from 'react'
import { NoResult } from '../../inputs/forms/formSearch/FormSearch'

import AccountAPI from '@api/AccountAPI'
import Users_Activity from '@api/UsersActivity'
import { useStore } from '@store/'
import PropTypes from 'prop-types'
// import { createRequest } from '@utils/requests'

export const Context_PagePersonal = createContext()
function PagePersonal({ slugs }) {
  const [stateAccount, set_stateAccount] = useState(null)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   var fetchAPI = async () => {
  //     if (slugs) {
  //       // const data = await createRequest(
  //       //   'GET',
  //       //   `/${slugs.map((slug) => slug).join('/')}`,
  //       // )
  //       // navigate(
  //       //   `/${slugs
  //       //     .map((slug) => {
  //       //       return slug
  //       //     })
  //       //     .join('/')}`,
  //       //   { replace: true },
  //       // )
  //       // if (data.result) {
  //       //   set_stateAccount(
  //       //     Object.assign(
  //       //       { id_chatPersonalPage: data.id_chatPersonalPage },
  //       //       data.result,
  //       //     ),
  //       //   )
  //       // }
  //     }
  //   }

  //   fetchAPI()
  // }, [])
  /* eslint-disable no-unused-vars */
  const [user, set_user] = useState({})
  const [state, dispatch] = useStore()
  const [user_activity, set_user_activity] = useState({})

  const [check_list_image, set_check_list_image] = useState(false)
  /* eslint-disable no-unused-vars */
  useEffect(() => {
    const fetchData = async () => {
      const response = await AccountAPI.getBySlug(
        slugs[slugs.indexOf('personal') + 1],
      )

      const data = response.data

      if (data.result) {
        set_stateAccount(
          Object.assign(
            { id_chatPersonalPage: data.id_chatPersonalPage },
            data.result,
          ),
        )
      }

      set_user(data)
    }

    fetchData()
  }, [state.account._id])

  useEffect(() => {
    const fetch_users_activity = async () => {
      const response = await Users_Activity.getUsersActivity(state.account._id)
      set_user_activity(response)

      if (response?.list_image.length > 0) {
        set_check_list_image(true)
      } else {
        set_check_list_image(false)
      }
    }

    fetch_users_activity()
  }, [state.account._id])
  return (
    // <BrowserRouter key={3}>

    <Fragment>
      {stateAccount ? (
        <Context_PagePersonal.Provider
          value={{
            stateAccount,
            set_stateAccount,
            slugs,
          }}
        >
          <div className={PagePersonalStyles['container-pagePersonal']}>
            <div className={PagePersonalStyles['main-pagePersonal']}>
              <div className={PagePersonalStyles['body-pagePersonal']}>
                <div className={PagePersonalStyles['header-pagePersonal']}>
                  {stateAccount && (
                    <PagePersonalHeader stateAccount={stateAccount} />
                  )}
                </div>
                <div className={PagePersonalStyles['content-pagePersonal']}>
                  {/* <Outlet/> */}
                  {user_activity?.list_image &&
                    user_activity?.list_image.map((value) => (
                      <div
                        className={
                          PagePersonalStyles['content-pagePersonal-post-img']
                        }
                        key={value.id_image_post}
                      >
                        <Link
                          to={`/post/${value.id_image_post}_${user_activity?.id_user}`}
                        >
                          <img
                            src={value.image_body}
                            alt=""
                            className={PagePersonalStyles['image_personal_all']}
                          />
                        </Link>
                      </div>
                    ))}
                </div>
                <div
                  className="text-center"
                  style={{ color: 'gray', textAlign: 'center' }}
                >
                  ----- © Website Social - Music -----
                </div>
              </div>
            </div>
          </div>
        </Context_PagePersonal.Provider>
      ) : (
        <NoResult />
      )}
    </Fragment>
    // </BrowserRouter >
  )
}

PagePersonal.propTypes = {
  slugs: PropTypes.array.isRequired,
}

export default PagePersonal
