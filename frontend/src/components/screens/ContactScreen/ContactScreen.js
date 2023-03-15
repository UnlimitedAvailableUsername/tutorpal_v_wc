import React from 'react'
import '../../../assets/components/screens/ContactScreen/Contact.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


function ContactScreen() {
  return (
    <div>
        <section className="contact">
            <div className="contact-heading">
                <h2>Contact Us</h2>
            </div>

            <div className="container">
                <div className="row">

                    <div className="column">
                    <div className="contact-widget">

                        <div className="contact-widget-item">
                            <div className="icon">
                            <FontAwesomeIcon icon={ faLocationDot } />  
                            </div> 
                            <div className="text">
                                <h5>Address</h5>
                                <p>#1 Holy Angel Avenue, Sto. Rosario St. Angeles City 2009</p>
                            </div>
                        </div>

                        <div className="contact-widget-item">
                            <div className="icon">
                            <FontAwesomeIcon icon={ faPhone } />
                            </div>
                            <div className="text">
                                <h5>Contact Us</h5>
                                <p>0961-739-2086</p>
                            </div>
                        </div>

                        <div className="contact-widget-item">
                            <div className="icon">
                            <FontAwesomeIcon icon={ faEnvelope } />   
                            </div>
                            <div className="text">
                                <h5>Mail</h5>
                                <p>Tutorpal@Gmail.com</p>
                            </div>
                        </div>
                    
                    </div>
                    </div>

                    <div className="column">
                        <div className="contact-form">
                            <form action="#">
                                <input type="text" placeholder='Name'></input>
                                <input type="email" placeholder='Email'></input>
                                <textarea placeholder='Comment'></textarea>
                                <button type='submit' className='site-btn'>Send Message</button>
                            </form>
                        </div>
                    </div>


                </div>

                <div className="row">
                    <div className="map-column">
                        <div className="contact-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.459608021156!2d120.58782231528241!3d15.133083167861306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f24ec2f5a1f9%3A0x5e0af8a6aaab2282!2sHoly%20Angel%20University!5e0!3m2!1sen!2sph!4v1675455294635!5m2!1sen!2sph" 
                        width="600" 
                        height="450" 
                        style={{border:0}} 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
  )
}

export default ContactScreen; 