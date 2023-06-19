import React from 'react'
import Layout from '../Layout'
import { useRouter } from 'next/router';


export default function SpecificJob() {

    const router = useRouter();
    const { jTi, jB, jTT, jD, pAuth, jTF, jOM } = router.query;
    
    return (
        <Layout>
            <div>
                <h2><u>Job Title: {jTi}</u></h2>
                <div>Budget: {jB}</div>
                <div>Job Timeframe: {jTF}</div>
                <div>Details: {jD}</div>
                <div>Authorization status: {pAuth}</div>
                <div>I am looking for a {jTT}.</div>
                <div>Contact me at: {jOM}</div>
            </div>
        </Layout>
    )
}
