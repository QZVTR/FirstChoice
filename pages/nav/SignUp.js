import React, { useState } from 'react'
import SignUpCust from '../components/SignUpCust'
import SignUpTrader from '../components/SignUpTrader'
import { useRouter } from 'next/router'
import Layout from '../Layout'
export default function SignUp() {
    const [signUpOption, setSignUpOption] = useState();
    const router = useRouter();

    const handleSubmit = e => {
        e.preventDefault();
        router.push(`/components/SignUp${signUpOption}`)
    }

    

    return (
        <Layout>
            <h3>Are you a trader or a customer?</h3>
            <form onSubmit={handleSubmit}>
                <button value='Trader' onClick={e => setSignUpOption(e.target.value)}>Tradesmen</button>
                <button value='Cust' onClick={e => setSignUpOption(e.target.value)}>Customer</button>
            </form>
        </Layout>
    )
}
