import React from 'react';
import css from './Footer.module.scss';
import { motion } from 'framer-motion';
import { footerVariants, staggerChildren } from '../../utils/motion';

const Footer = () => {
    return (
        <motion.section
            variants={{ staggerChildren }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`yPaddings ${css.wrapper}`}
            >
            <div
                variants={footerVariants}
                className={`${css.footer}`} >

                <div className={css.waves}>
                    <div className={css.wave} id="wave1"></div>
                    <div className={css.wave} id="wave2"></div>
                    <div className={css.wave} id="wave3"></div>
                </div>
                <div className={`flexCenter ${css.logo}`}>
                    <img src="/logo-white.svg" alt="Logo" />
                </div>
                <ul className={css.social_icon}>
                    <li className={css.social_icon__item}>
                        <a className={css.social_icon__link} href="https://github.com/piyushchugeja">
                            <i className="devicon-github-plain"></i>
                        </a>
                    </li>
                    <li className={css.social_icon__item}>
                        <a className={css.social_icon__link} href="https://linkedin.com/in/piyushchugeja">
                            <i className="devicon-linkedin-plain"></i>
                        </a>
                    </li>
                </ul>
                <p>&copy; 2023 Piyush Chugeja | All Rights Reserved</p>
            </div>

        </motion.section>
    );
};

export default Footer;