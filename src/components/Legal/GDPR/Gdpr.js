import React, { useState, useEffect } from 'react'
import './Gdpr.css'
import Axios from "axios"
import CookieConsent, { Cookies } from "react-cookie-consent";

export default function Gdpr() {
    const [mustAgree, setMustAgree] = useState(false)
    const serverUrl = process.env.REACT_APP_SERVER;
    const feUrl = process.env.REACT_APP_FE

    const acceptedCookies = () => {
        console.log("madeit to accept cookie")

        Axios({
            method: "POST",
            url: `${serverUrl}/gdpr/agree`,

        }).then((res) => {
            console.log(res)
        })
    }


    const declineCookies = () => {
        console.log("made it to decline in frontend")
        setMustAgree(true)
        Axios({
            method: "POST",
            url: `${serverUrl}/gdpr/disagree`

        }).then((res) => {
            console.log(res)
        })
    }
    return (


        <React.Fragment>
            <CookieConsent location="bottom"
                buttonText="I agree"
                cookieName="myAwesomeCookieName2"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
                onAccept={() => {
                    acceptedCookies()
                }}
                enableDeclineButton
                onDecline={() => {
                    declineCookies()
                }}
            >This website uses cookies to enhance the user experience. <a href='http://localhost:3000/imprint' target="_blank">More information</a>


            </CookieConsent>

            {mustAgree && (<div>You must agree with our cookie policy to enjoy the experience!</div>)}

        </React.Fragment>
    )


}