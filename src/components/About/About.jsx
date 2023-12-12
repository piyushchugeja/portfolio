import React from 'react';
import css from './About.module.scss';
import { aboutMe } from '../../utils/data';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/motion';

const About = () => {
    return (
        <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={css.wrapper}>

            <a className="anchor" id="about"></a>

            <div className={`paddings yPaddings innerWidth flexCenter ${css.container}`}>
                <div className={css.leftSide}>
                    <motion.img variants={fadeIn("right", "tween", 0.2, 0.5)} src="/about2.png" alt="About" />
                </div>
                <motion.div
                    variants={fadeIn("left", "tween", 0.2, 0.5)}
                    className={css.rightSide}>
                    <span className="primaryText">About</span>
                    {
                        aboutMe.map((paragraph, index) => {
                            return (
                                <p key={index} className='secondaryText'>{paragraph}</p>
                            );
                        })
                    }
                </motion.div>
            </div>
        </motion.section>
    );
};

export default About;