import React, { useState, useEffect } from 'react'
import './Gdpr.css'
import Axios from "axios"

export default function Gdpr() {
    const [radioYes, setRadioYes] = useState(false)
    const [radioNo, setRadioNo] = useState(false)
    const [error, setError] = useState(false)
    const serverUrl = process.env.REACT_APP_SERVER;
    const feUrl = process.env.REACT_APP_FE;


    useEffect(() => {

    })

    const handleGDPR = (e) => {
        console.log(e)
        if (e.target.id === 'agree') {
            console.log("yes")
            Axios({
                method: "POST",
                url: `${serverUrl}/gdpr/agree`,
            }).then((res) => {
                if (res) {
                    console.log("res in yes", res)
                } else {
                    setError(true)
                }
            })
        } else if (e.target.id === 'disagree') {
            Axios({
                method: "POST",
                url: `${serverUrl}/gdpr/disagree`
            }).then((res) => {
                if (res) {
                    console.log("res in no", res)
                } else {
                    setError(true)
                }
            })

        }

    }


    return (
        <React.Fragment>
            <div className="Gdpr">
                <div className="Gdpr__content">
                    <p>Please agree with our terms and condition. You can find more information about our Privacy Policy <a href="http://localhost:3000/imprint" target="_blank">here</a>.</p>
                </div>
                <div className="Gdpr__button" >
                    <label for="agree">Yes</label>
                    <input id="agree" type="radio" name="radio" className="Gdpr__radio" onClick={e => { handleGDPR(e) }} />
                    <labal for="disagree">No</labal>
                    <input id="disagree" type="radio" name="radio" onClick={e => { handleGDPR(e) }} />
                </div>
                {error && <div> </div>}
            </div>
        </React.Fragment>
    )

}