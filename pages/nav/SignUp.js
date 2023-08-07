import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../Layout'
import styles from '../../styles/SignUpChoice.module.css'

export default function SignUp() {
    const [signUpOption, setSignUpOption] = useState();
    const router = useRouter();

    const handleSubmit = e => {
        e.preventDefault();
        signUpOption === "Cust" ? router.push(`/components/SignUp${signUpOption}`) : router.push(`/components/PickSub`)
    }

    

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.wrapper}>            
                    <h3>Are you a trades person or a customer?</h3>
                    <form onSubmit={handleSubmit}>
                        <button value='Trader' onClick={e => setSignUpOption(e.target.value)} className={styles.TradButton}>Tradesmen</button>
                        <button value='Cust' onClick={e => setSignUpOption(e.target.value)} className={styles.CustButton}>Customer</button>
                    </form>
                </div>
            </div>

        </Layout>
    )
}
