import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { useRouter } from 'next/router'
import { auth, db } from '../../../firebase';

export default function UserQuotes() {
  
  const router = useRouter();
  
  const { userQuotes } = router.query;
  
  const email = userQuotes;

  const user = auth.currentUser

  useEffect(() => {
    const getQuotes = async () => {
      try {
        

      } catch (err) {
        console.error(err);
      }
    }

    if (user) {
      getQuotes()
    }


  }, [user])

  return (
    <Layout>
      {email}
    </Layout>
  )
}
