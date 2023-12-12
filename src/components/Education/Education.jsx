import React from 'react';
import css from './Education.module.scss';
import { motion } from 'framer-motion';
import { staggerChildren, textVariant2, zoomIn, fadeIn } from '../../utils/motion';
import { educationDetails } from '../../utils/data';

const Education = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`paddings ${css.wrapper}`}>

            <a className="anchor" id="education"></a>

            <div className={`flexCenter innerWidth ${css.container}`}>
                <span className="primaryText yPaddings">
                    Education
                </span>
                <div className={`flexCenter ${css.timeline}`}>
                    {
                        educationDetails.map((education, index) => {
                            return (
                                <motion.div
                                    variants={textVariant2}
                                    className={`flexCenter ${css.timelineComponent}`}
                                    key={index}>
                                    <div className={css.institute}>
                                        <h1>
                                            {education.institute}
                                        </h1>
                                        <p>
                                            {education.duration}
                                        </p>
                                    </div>
                                    <div className={css.course}>
                                        <h1>
                                            {education.course}
                                        </h1>
                                        {education.details.map((detail, index) => {
                                            return (
                                                <p key={index} className={css.details}>
                                                    {detail}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )
                        })
                    }
                    <motion.div
                        variants={zoomIn(1, 1)}
                        className={css.progressBar}>
                        <motion.div
                            variants={fadeIn("down", "tween", 2, 1)}
                            className={css.line}>
                         </motion.div>
                        {
                            educationDetails.map((education) => {
                                return (
                                    <div>
                                        <div className={css.circle} style={{ background: education.color }} ></div>
                                    </div>
                                )
                            })
                        }
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Education;