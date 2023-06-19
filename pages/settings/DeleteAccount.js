import React, { useEffect } from 'react';
import Layout from '../Layout';
import { useRouter } from 'next/router';

export default function DeleteAccount() {
  const router = useRouter();
  const { u } = router.query;
  const email = u ? u : null;

  useEffect(() => {
    if (!email) {
      router.push('/nav/Login');
    }
  }, [email, router]);

  
  const handleSubmit = e => {
    
  }

  if (email) {
    return (
      <Layout>
        <div>DeleteAccount</div>
        <div>
          <form>

          </form>
        </div>
      </Layout>
    );
  }

  return null; // or a loading state if needed
}
