import React from 'react'
import Layout from '../Layout'
import { useRouter } from 'next/router'

export default function PickSub() {

    //<button value="month" onClick={e => goToPage(e.target.value)}>Buy</button>
    return (
        <Layout>
            <div>
                <p>Pick Subscription</p>
                <ul>
                    <li>
                        <div>
                            <h3>Monthly Subscription</h3>
                            <script async
                            src="https://js.stripe.com/v3/buy-button.js">
                            </script>

                            <stripe-buy-button
                            buy-button-id="buy_btn_1NbuEjCdEqeCSw4LyXkd8BUd"
                            publishable-key="pk_test_51NL78QCdEqeCSw4LUsX8t14HbXeGK8cr8NjbeZv40dx1NcKAkbEV5rIEKkWVzua01PMGDMg4HRYzDf41SiL9Tpqk00aM1fd8f1"
                            >
                            </stripe-buy-button>
                        </div>  
                    </li>
                    <li>
                        <div>
                            <h3>Annual Subscription</h3>
                            <script async
                            src="https://js.stripe.com/v3/buy-button.js">
                            </script>

                            <stripe-buy-button
                            buy-button-id="buy_btn_1NbuD7CdEqeCSw4LDgtUfwqE"
                            publishable-key="pk_test_51NL78QCdEqeCSw4LUsX8t14HbXeGK8cr8NjbeZv40dx1NcKAkbEV5rIEKkWVzua01PMGDMg4HRYzDf41SiL9Tpqk00aM1fd8f1"
                            >
                            </stripe-buy-button>
                        </div>
                    </li>
                </ul>
            </div>
        </Layout>
    )
}
