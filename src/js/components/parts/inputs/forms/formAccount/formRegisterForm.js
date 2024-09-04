import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormAccount from '../formAccount/FormAccount.module.scss'
import LogoWebsite from '@components/logo/logoWebsite/LogoWebsite'
import { createRequest } from '@utils/requests'

function Register() {
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('1')
  const handleSignUp = async function (e) {
    e.preventDefault()
    const res = await createRequest('POST', '/auth/sign-up', {
      body: {
        password,
        email,
        fname,
        lname,
        birthday,
        gender,
      },
    })

    if ('ok' === res.status) {
      window.location.href = '/'
    }
  }
  console.log(FormAccount)
  return (
    <div className={FormAccount.wrapper}>
      <section className={FormAccount.register__form}>
        <LogoWebsite />
        <h1>Hello, welcome Sign up</h1>
        <form className="form_sign_up" onSubmit={handleSignUp}>
          <div className="name-details">
            <div
              className={[FormAccount.field, FormAccount.input__text].join(' ')}
            >
              <input
                type="text"
                name="fname"
                placeholder="First name"
                onChange={(e) => {
                  setfname(e.currentTarget.value)
                }}
              />
            </div>
            <div
              className={[FormAccount.field, FormAccount.input__text].join(' ')}
            >
              <input
                type="text"
                name="lname"
                placeholder="Last name"
                onChange={(e) => {
                  setlname(e.currentTarget.value)
                }}
              />
            </div>
          </div>
          <div
            className={[FormAccount.field, FormAccount.input__text].join(' ')}
          >
            <input
              type="text"
              name="email"
              placeholder="Enter mobile number or email address"
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
          <div className={FormAccount.checkbox}>
            <input
              type="radio"
              name="gender"
              id=""
              value={0}
              checked={false}
              onChange={(e) => {
                setGender(e.currentTarget.value)
              }}
            />{' '}
            <p>Female</p>
            <input
              type="radio"
              name="gender"
              id=""
              className="radio2"
              checked={true}
              value={1}
              onChange={(e) => {
                setGender(e.currentTarget.value)
              }}
            />
            <p className="male">Male</p>
          </div>
          <div
            className={[FormAccount.date, FormAccount.input__text].join(' ')}
          >
            <input
              className="ipt-birthday_formSignUp"
              type="date"
              onChange={(e) => {
                setBirthday(e.currentTarget.value)
              }}
            />
          </div>

          <div className={[FormAccount.button, FormAccount.field].join(' ')}>
            <input type="submit" name="submit" value="Create account" />
          </div>
        </form>
        <div className="link">
          Already signed up? <Link to="/signin">Login now</Link>
        </div>
      </section>
    </div>
  )
}

export default Register
