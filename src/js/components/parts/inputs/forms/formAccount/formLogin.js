import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import FormAccount from '../formAccount/FormAccount.module.scss'
import FormAccount from '@components/parts/inputs/forms/formAccount/FormAccount.module.scss'
import LogoWebsite from '@components/logo/logoWebsite/LogoWebsite'
import ReCAPTCHA from 'react-google-recaptcha'
import { createRequest } from '@utils/requests'
import { SITE_KEY_RECAPTCHA } from '@config'

function Login() {
  const captchaRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSignIn = async function (e) {
    e.preventDefault()
    const recaptcha_token = captchaRef.current.getValue()
    if (recaptcha_token !== '') {
      const body = { password, email, recaptcha_token }
      const res = await createRequest('POST', '/auth/sign-in', { body })

      if (res.is_success) {
        sessionStorage.setItem('noReload', 2)
        window.location.reload()
      }
    }
    captchaRef.current.reset()
  }
  return (
    <div className={FormAccount.wrapper}>
      <div className={FormAccount.register__form}>
        <LogoWebsite />
        <h1>Hello, welcome back</h1>
        <form className="" onSubmit={handleSignIn}>
          <div
            className={[FormAccount.field, FormAccount.input__text].join(' ')}
          >
            <input
              data-testid="username-input"
              type="text"
              name="email"
              placeholder="Enter mobile number or email address"
              onChange={(e) => {
                setEmail(e.currentTarget.value)
              }}
            />
          </div>
          <div
            className={[FormAccount.field, FormAccount.input__text].join(' ')}
          >
            <input
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="Enter new password"
              onChange={(e) => {
                setPassword(e.currentTarget.value)
              }}
            />
          </div>
          <div className={FormAccount.container_ReCAPTCHA}>
            <ReCAPTCHA sitekey={SITE_KEY_RECAPTCHA} ref={captchaRef} />
          </div>
          <div className={[FormAccount.button, FormAccount.field].join(' ')}>
            <input type="submit" name="submit" value="Login" />
          </div>
        </form>

        <div className={FormAccount.link}>
          Create new account? <Link to="/signup/">Register</Link>
        </div>
        <div className={['forgetPassAcc', FormAccount.link].join(' ')}>
          Forget Password Account? <Link to="/restorePass">Restore Now!!</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
