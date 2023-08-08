import React, { useState } from 'react'
import { useRouter } from 'next/router';
import styles from '../../styles/Searchbar.module.css'
export default function SearchBar() {

    const [tradeType, setTradeType] = useState(null);

    
    return (
        <div className={styles.container}>
            <div className={styles.SearchBar}>
            <div>
            <h2 className={styles.searchtextheading}><u>Search First Choice</u></h2>
            <h3>Find the best local tradesperson for you!</h3>
            </div>
                <div className={styles.selectContainer}>
                <div className={styles.selectWrapper}>
                        <label className={styles.selectLabel} htmlFor='TradeType'>What trade are you looking for?</label>
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
            </div>
        </div>
    )
}

export function SecondSearch({ trade }) {
    const [jobType, setJobType] = useState(null);
    
    if (!trade) {
        return (
            <>
                <div>
                    <label>What type of job?</label>
                    <div className={styles.selectWrapper}>
                    <select className={styles.select} defaultValue='Choose here'>
                        <option defaultValue='' disabled hidden>Choose here</option>
                    </select>
                    </div>
                </div>
                <SearchBarLocation tradeType={trade} jobType={jobType}/>
            </>
        )
    }
    if (trade === 'electrician') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <div className={styles.selectWrapper}>
                        <select className={styles.select} defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='access control'>Access Control</option>
                            <option value='aerial satellite dish installation'>Aerial and Satelite Dish Installation </option>
                            <option value='air conditioning'>Air Conditioning</option>
                            <option value='domestic appliance repair'>Domestic Appliance Repair</option>
                            <option value='electric oven and hob installation'>Electric Oven and Hob Installation</option>
                        </select>
                        </div>
                </div>
                <SearchBarLocation tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'plumber') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <div className={styles.selectWrapper}>
                        <select className={styles.select} defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='bathroom installation'>Bathroom Installation</option>
                            <option value='guttering and pipes repair'>Guttering/Pipes Repair</option>
                            <option value='plumbing repair'>Plumbing repair</option>
                            <option value='twenty four hour plumber'>Emergency/24 hour plumber</option>
                            <option value='kitchen plumbing'>Kitchen Plubming</option>
                        </select>
                        </div>
                </div>
                <SearchBarLocation tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'bathroom fitter') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <div className={styles.selectWrapper}>
                        <select className={styles.select} defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='bathroom resurfacing'>Bathroom Resurfacing</option>
                            <option value='bathroom installation'>Bathroom Installation</option>
                            <option value='bathroom repair'>Bathroom Repair</option>
                            <option value='bathroom tiling'>Bathroom Tiling</option>
                            <option value='complete bathroom refurbashing'>Complete Bathroom Refurbashing</option>
                        </select>
                        </div>
                </div>
                <SearchBarLocation tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'cleaner') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <div className={styles.selectWrapper}>
                        <select className={styles.select} defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='carpet cleaning'>Carpet Cleaning</option>
                            <option value='window cleaning'>Window Cleaning</option>
                            <option value='conservatory cleaning'>Conservatory Cleaning</option>
                            <option value='domestic deep cleaning'>Domestic Deep Cleaning</option>
                            <option value='domestic house cleaning'>Domestic House Cleaning</option>
                        </select>
                        </div>
                </div>
                <SearchBarLocation tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'builder') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <div className={styles.selectWrapper}>
                        <select className={styles.select} defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='cavity wall installation'>Cavity Wall Installation</option>
                            <option value='conservatory'>Conservatory</option>
                            <option value='suspended ceiling'>Suspended Ceiling</option>
                            <option value='cladding'>Cladding</option>
                            <option value='loft convertion'>Loft Convertion</option>
                        </select>
                        </div>
                </div>
                <SearchBarLocation tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'roofer') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <div className={styles.selectWrapper}>
                        <select className={styles.select} defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='roof cleaning'>Roof Cleaning</option>
                            <option value='roof insulation'>Roof Insulation</option>
                            <option value='slate and tiled work'>Slate and Tiled Work</option>
                            <option value='leadwork'>Leadwork</option>
                            <option value='zinc metal roof'>Zinc/Metal Roof</option>
                        </select>
                        </div>
                </div>
                <SearchBarLocation tradeType={trade} jobType={jobType}/>
            </>
        )
    } else if (trade === 'locksmith') {
        return (
            <>
                <div>
                <label htmlFor='jobType'>What type of job?</label>
                        <div className={styles.selectWrapper}>
                        <select className={styles.select} defaultValue='Choose here' name='jobType' onChange={(e) => setJobType(e.target.value)}>
                            <option value='Choose here' disabled hidden>Choose here</option>
                            <option value='burglar repair'>Burglar Repair</option>
                            <option value='door opening'>Door Opening</option>
                            <option value='door replacement'>Door Replacement</option>
                            <option value='emergency twenty four hour locksmith'>Emergency 24 hour locksmith</option>
                            <option value='lock fitting repair'>Lock Fitting/Repair</option>
                        </select>
                        </div>
                </div>
                <SearchBarLocation tradeType={trade} jobType={jobType}/>
            </>
        )
    }
}

function SearchBarLocation({ tradeType, jobType }) {
    const [location, setLocation] = useState(null);

    if (!tradeType && !jobType) {
        return (
            <>
            <div>
                <label htmlFor='jobLocation'>Where are you?</label>
                <div className={styles.selectWrapper}>
                <select className={styles.select} defaultValue='Choose here' name='jobLocation' onChange={(e) => setLocation(e.target.value)}>
                    <option defaultValue='' disabled hidden>Choose here</option>
                </select>
                </div>
            </div>
            <div className={styles.containerButton}>
            <SearchButton tradeType={tradeType} jobType={jobType} location={location}/>
            </div>
            </>
        )
    }

    return (
        <>
            <div>
                <label htmlFor='jobLocation'>Where are you?</label>
                <div className={styles.selectWrapper}>
                <select className={styles.select} defaultValue='Choose here' name='jobLocation' onChange={(e) => setLocation(e.target.value)}>
                    <option value='Choose here' disabled hidden>Choose here</option>
                    <option value='Adamsdown'>Adamsdown</option>
                    <option value='Butetown'>Butetown</option>
                    <option value='Caerau, Cardiff'>Caerau, Cardiff</option>
                    <option value='Canton, Cardiff'>Canton, Cardiff</option>
                    <option value='Castle, Cardiff'>Castle, Cardiff</option>
                    <option value='Cathays'>Cathays</option>
                    <option value='Cyncoed'>Cyncoed</option>
                    <option value='Ely, Cardiff'>Ely, Cardiff</option> 
                    <option value='Fairwater, Cardiff'>Fairwater, Cardiff</option>
                    <option value='Gabalfa'>Gabalfa</option>
                    <option value='Grangetown, Cardiff'>Grangetown, Cardiff</option>
                    <option value='Heath, Cardiff'>Heath, Cardiff</option>
                    <option value='Lisvane'>Lisvane</option>
                    <option value='Llandaff'>Llandaff</option>
                    <option value='Llandaff North'>Llandaff North</option>
                    <option value='Llanedeyrn'>Llanedeyrn</option>
                    <option value='Llanishen'>Llanishen</option>
                    <option value='Llanrumney'>Llanrumney</option>
                    <option value='Old St Mellons'>Old St Mellons</option>
                    <option value='Pentwyn, Cardiff'>Pentwyn, Cardiff</option>
                    <option value='Pentyrch'>Pentyrch</option>
                    <option value='Penylan'>Penylan</option>
                    <option value='Pontcanna'>Pontcanna</option>
                    <option value='Pontprennau'>Pontprennau</option>
                    <option value='Radyr and Morganstown'>Radyr and Morganstown</option>
                    <option value='Rhiwbina'>Rhiwbina</option>
                    <option value='Riverside, Cardiff'>Riverside, Cardiff</option>
                    <option value='Roath'>Roath</option>
                    <option value='Rumney, Cardiff'>Rumney, Cardiff</option>
                    <option value='Splott'>Splott</option>
                    <option value='St Fagans'>St Fagans</option>
                    <option value='Thornhill, Cardiff'>Thornhill, Cardiff</option>
                    <option value='Tongwynlais'>Tongwynlais</option>
                    <option value='Tremorfa'>Tremorfa</option>
                    <option value='Trowbridge, Cardiff'>Trowbridge, Cardiff</option>
                    <option value='Whitchurch, Cardiff'>Whitchurch, Cardiff</option>
                </select>
                </div>
            </div>
            <div className={styles.containerButton}>
            <SearchButton tradeType={tradeType} jobType={jobType} location={location}/>
            </div>
        </>
    )
}

function SearchButton({ tradeType, jobType, location }) {

    const router = useRouter()

    const searchTradesPeople = (tradeType, jobType, location) => {
        console.log('Trade type '+tradeType)
        console.log('Job type ' + jobType)
        router.push(`/jobs/${encodeURIComponent(jobType)}?loc=${encodeURIComponent(location)}`)
    }

    return (
        <>
            {jobType && tradeType && location ? <button className={styles.searchButton} onClick={() => searchTradesPeople(tradeType, jobType, location)}>Search</button> : <button className={styles.searchButtonDisabled} disabled>Search</button>}
        </>
    )
    
}