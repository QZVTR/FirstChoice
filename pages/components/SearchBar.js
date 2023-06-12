import React, { useState } from 'react'
import { useRouter } from 'next/router';
import styles from '../../styles/Searchbar.module.css'
export default function SearchBar() {

    const [tradeType, setTradeType] = useState(null);

    
    return (
        <>
            <div className={styles.SearchBar}>
                <div className={styles.selectWrapper}>
                    <label htmlFor='TradeType'>What type of trade are you looking for?</label>
                    <select className={styles.select} defaultValue='Choose here' name='TradeType' onChange={(e) => setTradeType(e.target.value)}>
                        <option defaultValue='Choose here' disabled hidden>Choose here</option>
                        <option value='electrician'>Electrician</option>
                        <option value='plumber'>Plumber</option>
                        <option value='bathroom fitter'>Bathroom Fitter</option>
                        <option value='cleaner'>Cleaner</option>
                        <option value='builder'>Builder</option>
                        <option value='roofer'>Roofer</option>
                        <option value='locksmith'>Locksmith</option>
                    </select>
                </div>
                <SecondSearch trade={tradeType} />
            </div>
        </>
    )
}

export function SecondSearch({ trade }) {
    const [jobType, setJobType] = useState(null);
    
    if (!trade) {
        return (
            <>
                <div>
                    <label>What type of job?</label>
                    <select defaultValue='Choose here'>
                        <option defaultValue='' disabled hidden>Choose here</option>
                    </select>
                </div>
                <SearchButton tradeType={trade} jobType={jobType}/>
            </>
        )
    }
    if (trade === 'electrician') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <select defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='access control'>Access Control</option>
                            <option value='aerial satellite installation'>Aerial and Satelite Dish Installation </option>
                            <option value='air conditioning'>Air Conditioning</option>
                            <option value='domestic appliance repair'>Domestic Appliance Repair</option>
                            <option value='electric oven hob installation'>Electric Oven and Hob Installation</option>
                        </select>
                </div>
                <SearchButton tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'plumber') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <select defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='bathroom installation'>Bathroom Installation</option>
                            <option value='guttering and pipes repair'>Guttering/Pipes Repair</option>
                            <option value='plumbing repair'>Plumbing repair</option>
                            <option value='twenty four hour plumber'>Emergency/24 hour plumber</option>
                            <option value='kitchen plumbing'>Kitchen Plubming</option>
                        </select>
                </div>
                <SearchButton tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'bathroom fitter') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <select defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='bathroom resurfacing'>Bathroom Resurfacing</option>
                            <option value='bathroom installation'>Bathroom Installation</option>
                            <option value='bathroom repair'>Bathroom Repair</option>
                            <option value='bathroom tiling'>Bathroom Tiling</option>
                            <option value='complete bathroom refurbashing'>Complete Bathroom Refurbashing</option>
                        </select>
                </div>
                <SearchButton tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'cleaner') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <select defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='carpet cleaning'>Carpet Cleaning</option>
                            <option value='window cleaning'>Window Cleaning</option>
                            <option value='conservatory cleaning'>Conservatory Cleaning</option>
                            <option value='domestic deep cleaning'>Domestic Deep Cleaning</option>
                            <option value='domestic house cleaning'>Domestic House Cleaning</option>
                        </select>
                </div>
                <SearchButton tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'builder') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <select defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='cavity wall installation'>Cavity Wall Installation</option>
                            <option value='conservatory'>Conservatory</option>
                            <option value='suspended ceiling'>Suspended Ceiling</option>
                            <option value='cladding'>Cladding</option>
                            <option value='loft convertion'>Loft Convertion</option>
                        </select>
                </div>
                <SearchButton tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'roofer') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <select defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='roof cleaning'>Roof Cleaning</option>
                            <option value='roof insulation'>Roof Insulation</option>
                            <option value='slate and tiled work'>Slate and Tiled Work</option>
                            <option value='leadwork'>Leadwork</option>
                            <option value='zinc metal roof'>Zinc/Metal Roof</option>
                        </select>
                </div>
                <SearchButton tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'locksmith') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <select defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='burglar repair'>Burglar Repair</option>
                            <option value='door opening'>Door Opening</option>
                            <option value='door replacement'>Door Replacement</option>
                            <option value='emergency twenty four hour locksmith'>Emergency 24 hour locksmith</option>
                            <option value='lock fitting repair'>Lock Fitting/Repair</option>
                        </select>
                </div>
                <SearchButton tradeType={trade} jobType={jobType}/>
            </>
        )
    }
}

function SearchButton({ tradeType, jobType }) {

    const router = useRouter()

    const searchTradesPeople = (tradeType, jobType) => {
        console.log('Trade type '+tradeType)
        console.log('Job type ' + jobType)
        router.push(`/jobs/${jobType}`)
    }

    return (
        <>
            {jobType && tradeType ? <button onClick={() => searchTradesPeople(tradeType, jobType)}>Search</button> : <button disabled>Search</button>}
        </>
    )
    
}