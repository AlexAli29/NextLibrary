'use client'

import { selectUserData } from '@/slices/userSlice'
import React from 'react'
import { useSelector } from 'react-redux'



export default function UserProfile() {

  const userData = useSelector(selectUserData);

  return (
    <div>
      <span>Email: {userData.userEmail}</span>

    </div>
  )
}
