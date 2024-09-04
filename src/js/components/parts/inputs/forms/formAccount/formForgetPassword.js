import React, { useState } from 'react'
import LogoWebsite from '@components/logo/logoWebsite/LogoWebsite'
import FormAccount from '../formAccount/FormAccount.module.scss'
import { createRequest } from '@utils/requests'
function RestorePass() {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const handleRestorePass = async function (e) {
    e.preventDefault()
    const res = await createRequest('POST', '/auth/restore-pass', {
      body: { password, email },
    })

    if ('ok' === res.mess) {
      window.location.href = '/CheckCodeEmail'
    }
  }
  return (
    <div className={FormAccount.wrapper}>
      {/* <img src="https://toptechmakers.com/wp-content/uploads/2022/04/social-media-marketing-services.png" alt=""></img> */}
      <section className={FormAccount.register__form}>
        <LogoWebsite />
        <h1>Hello, welcome back</h1>
        <form className="" onSubmit={handleRestorePass}>
          <div
            className={[FormAccount.field, FormAccount.input__text].join(' ')}
          >
            <input
              type="text"
              name="email"
              placeholder="Enter email address"
              onChange={(e) => {
                setemail(e.currentTarget.value)
              }}
            />
          </div>
          <div
            className={[FormAccount.field, FormAccount.input__text].join(' ')}
          >
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              onChange={(e) => {
                setPassword(e.currentTarget.value)
              }}
            />
            {/* <VisibilityIcon/> */}
          </div>
          <div className={[FormAccount.field, FormAccount.button].join(' ')}>
            <input type="submit" name="submit" value="Restore" />
          </div>
        </form>
        {/* <div className="link">Create new account? <Link to="/signup">Register</Link ></div>
    <Routes>
      <Route path="/signup" element={<Register/>}></Route>
    </Routes> */}
      </section>
    </div>
  )
}

export default RestorePass
