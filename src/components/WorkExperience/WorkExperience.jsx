import React from 'react';
import css from './WorkExperience.module.scss';
import { motion } from 'framer-motion';
import { staggerChildren, textVariant2, zoomIn, fadeIn } from '../../utils/motion';
import { workDetails } from '../../utils/data';

const WorkExperience = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`paddings ${css.wrapper}`}>

            <a className="anchor" id="experience"></a>

            <div className={`flexCenter innerWidth ${css.container}`}>
                <span className="primaryText yPaddings">
                    Work Experience
                </span>
                <div className={`flexCenter ${css.timeline}`}>
                    {
                        workDetails.map((workDetail, index) => {
                            return (
                                <motion.div
                                    variants={textVariant2}
                                    className={`flexCenter ${css.timelineComponent}`}
                                    key={index}>
                                    <div className={css.organization}>
                                        <h1>
                                            {workDetail.organization}
                                        </h1>
                                        <p>
                                            {workDetail.duration}
                                        </p>
                                    </div>
                                    <div className={css.role}>
                                        <h1>
                                            {workDetail.role}
                                        </h1>
                                        {workDetail.details.map((detail, index) => {
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
                            workDetails.map((work) => {
                                return (
                                    <div>
                                        <div className={css.circle} style={{ background: work.color }} ></div>
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

export default WorkExperience;