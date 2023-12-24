import React from 'react'
import Button from '../button/Button'
import { useAppDispatch } from '../../redux/hooks.redux'
import { logoutUser } from '../../redux/redux-slices/user.slice'

export type UserData = {
  username: string,
  email: string
}

const HeaderUser = ({username, email}: UserData) => {
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <>
        <p>{username}</p>
        <Button onClick={handleLogout}>Log out</Button>
    </>
  )
}

export default HeaderUser;