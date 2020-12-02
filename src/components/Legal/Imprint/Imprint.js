import React from "react"
import './Imprint.css'

export default function Imprint() {




    return (
        <React.Fragment>
            <div className="imprint">
                <h1 className="imprint__title">Imprint</h1>
                <p className="imprint__content">
                    filmably.com is an independent, collaborative project brought to life by an ever-evolving group of Berlin-based volunteers. All content on this website was sourced or created by volunteers from the Filmably community. Unless otherwise specified, all imagery was sourced from www.imdb.com. We are not currently registered as a legal entity, company, or organisation. Hence, Filmably does accept any liability for content published on our site. If you have any questions or concerns, please send an email to filmably.info@gmail.com so we can manage your request.
  </p>

                <h2 className="imprint__subTitle">Project Meeting Spaces </h2>
                <p className="imprint__content">
                    Online: learn-react-hq.slack.com
                </p>

                <h2 className="imprint__subTitle">Contact </h2>

                <ul className="imprint__content">
                    <li> W: filmably.com</li>
                    <li> E: filmably.info@gmail.com</li>
                </ul>
                <h1 className="imprint__title">Privacy Policy</h1>

                <h2 className="imprint__subTitle">What data do we collect?</h2>

                <p className="imprint__content">  We receive, collect and store any information you enter on our website or provide us in any other way. Here is an overview of forms on our site where you may submit your data to us:  </p>
                <ul className="imprint__content">
                    <li> - Register: your email address, first name, last name and password</li>
                    <li> - Login: your email address and password</li>
                    <li> - Profile: your location, your description, your filters, your matches, your likes, your picture </li>
                    <li>  - Contact us: your first name, last name and email address, a personalised message</li>
                </ul>
                <p className="imprint__content"> We may use software tools to measure and collect session information, including page response times, length of visits to certain pages, page interaction information, and methods used to browse away from the page.</p>


                <h2 className="imprint__subTitle">How do we collect this data? </h2>

                <p className="imprint__content">   We utilise MongoDB database and Cloudify to gather and store your data safely  </p>

                <ul className="imprint__content">
                    <li>- Register: a sign-up form</li>

                    <li>- Login: your email address and password </li>

                    <li>- Profile: a form via button</li>

                    <li>- Profile: a form via button</li>

                    <li>- Contact us: a sign-up form</li>
                </ul>


                <h2 className="imprint__subTitle">Why do we collect this data? </h2>

                <p className="imprint__content"> We collect personal and non-personal information to run our algorithm based on user preferences and friendship. Here is an overview of the reasons why we collect the different types of data specified above:</p>
                <ul className="imprint__content">
                    <li>- Register/ login: to keep session active and identify user</li>
                    <li>- Profile: to display the information you want to share on your profile to other users</li>
                    <li>- Contact us: to make it easy for you to contact us with questions, ideas, or concerns</li>
                </ul>

                <h2 className="imprint__subTitle">Where do we store this data? </h2>

                <ul className="imprint__content">
                    <li>  - Register: to our database hosted by Heroku.com </li>
                    <li>  - Login: to our database hosted by Heroku.com</li>
                    <li>   - Profile: to our database hosted by Heroku.com</li>
                    <li>  - Contact us:to our database hosted by Heroku.com</li>

                </ul>

                <h2 className="imprint__subTitle">Cloudify, Heroku hosting & your data </h2>

                <p className="imprint__content">Our website is hosted on Cloudify for the front-end and Heroku for the back-end.</p>

                <h2 className="imprint__subTitle">Access/correct/amend/delete your data</h2>

                <p className="imprint__content">If you don’t want us to process your data anymore, please contact us at filmably.info@gmail.com so we can handle your request. Likewise, if you would like to: access, correct, amend or delete any personal information we have about you, you are invited to contact us at filmably.info@gmail.com</p>



                <h2 className="imprint__subTitle"> Privacy policy updates </h2>

                <p className="imprint__content"> We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.</p>



            </div>
        </React.Fragment>
    )


}