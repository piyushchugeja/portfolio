import React, { useRef, useState } from 'react';
import css from './Contact.module.scss';
import { motion } from 'framer-motion';
import { fadeIn, staggerChildren } from '../../utils/motion';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const Contact = () => {

    const [sending, setSending] = useState(false);

    const form = useRef();

    const sendEmail = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const result = await emailjs.sendForm('service_j521j67', 'template_57ela9l', form.current, 'c7qEP0VudMogVNxlb');
            console.log(result.text);
            Swal.fire({
                title: "Success!",
                text: "Your message has been sent successfully.",
                icon: "success",
                confirmButtonText: "Ok"
            });
            form.current.reset();
        } catch (error) {
            console.log(error.text);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again later.",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
        setSending(false);
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
                            <textarea name="message" id="message" cols="30" rows="5" required></textarea>
                        </div>
                        <div className={css.formGroup}>
                            <button name="submitButton" type="submit">
                                {
                                    sending
                                        ? "Sending..."
                                        : "Send"
                                }
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default Contact;