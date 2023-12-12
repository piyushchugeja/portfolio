import React, { useRef } from 'react';
import css from './Contact.module.scss';
import { motion } from 'framer-motion';
import { fadeIn, staggerChildren } from '../../utils/motion';
import emailjs from '@emailjs/browser';

const Contact = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_j521j67', 'template_57ela9l', form.current, 'c7qEP0VudMogVNxlb')
            .then((result) => {
                console.log(result.text);
                alert("Message sent successfully!");
                form.current.reset();
            }, (error) => {
                console.log(error.text);
                alert("Message not sent. Please try again later.");
            });
    }

    return (
        <motion.section
            variants={{ staggerChildren }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`paddings ${css.wrapper}`}>

            <a className="anchor" id="contact"></a>

            <div className={`innerWidth yPaddings flexCenter ${css.container}`}>
                <motion.div
                    variants={fadeIn("right", "tween", 0.1, 0.5)}
                    className={css.leftSide}>
                    <span className="primaryText">
                        Let's make something <br /> amazing together.
                    </span>
                    <span className="secondaryText">
                        Start by <a href="mailto:piyushchugeja@gmail.com">saying hi</a> or filling out the form.
                    </span>
                </motion.div>
                <motion.div
                    variants={fadeIn("left", "tween", 0.1, 0.5)}
                    className={`innerWidth ${css.rightSide}`}>

                    <form ref={form} onSubmit={sendEmail}>
                        <div className={css.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="from_name" required />
                        </div>
                        <div className={css.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="from_email" required />
                        </div>
                        <div className={css.formGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" cols="30" rows="10" required></textarea>
                        </div>
                        <div className={css.formGroup}>
                            <button type="submit">Send</button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default Contact;