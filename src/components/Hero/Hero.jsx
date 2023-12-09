import React from 'react';
import css from './Hero.module.scss';
import { BiMapPin, BiEnvelope } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer } from '../../utils/motion';

const Hero = () => {
    return (
        <section className={`paddings ${css.wrapper}`}>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className={`innerWidth ${css.container}`}>
                <div className={css.upperElements}>
                    <motion.span
                        variants={fadeIn("right", "tween", 0.2, 1)}
                        className='primaryText'>
                        Hey there, <br /> I am <span className={css.highlight}> Piyush </span>
                    </motion.span>

                    <motion.span
                        variants={fadeIn("left", "tween", 0.4, 1)}
                        className='secondaryText'>
                        <div className={css.highlight}> A Web Developer</div>
                        <div>&amp; an AI enthusiast.</div>
                    </motion.span>
                </div>

                <motion.div
                    variants={fadeIn("up", "tween", 0.3, 1)}
                    className={css.person}>
                    <motion.img src="/person2.png" variants={slideIn("up", "tween", 0.5, 1)} alt="Piyush Chugeja" />
                </motion.div>

                <div className={css.lowerElements}>
                    <motion.div 
                    variants={fadeIn("right", "tween", 0.2, 1)}
                    className={css.location}>
                        <div className="primaryText">
                            <BiMapPin />
                        </div>
                        <div className="secondaryText">
                            <div>Mumbai,</div>
                            <div>India</div>
                        </div>
                    </motion.div>
                    <motion.div 
                    variants={fadeIn("left", "tween", 0.2, 1)}
                    className={css.emailContainer}>
                        <div className="primaryText">
                            <BiEnvelope />
                        </div>
                        <div className="secondaryText">
                            <div><a className={css.email} href="mailto:piyushchugeja@gmail.com">
                                piyushchugeja@gmail.com
                            </a>
                            </div>
                            <div><a className={css.email} href="mailto:chugejapiyush@gmail.com">
                                chugejapiyush@gmail.com
                            </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
};

export default Hero;