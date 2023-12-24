import React from 'react'
import Button from '../button/Button'

export type UserData = {
  username: string,
  email: string
}

const HeaderUser = ({username, email}: UserData) => {
  return (
    <>
        <p>{username}</p>
        <Button>Log out</Button>
    </>
  )
}

export default HeaderUser;