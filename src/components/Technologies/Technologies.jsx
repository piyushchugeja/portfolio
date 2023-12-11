import React from 'react';
import css from './Technologies.module.scss';
import { skills } from '../../utils/data';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/motion';

function Skill({ source, alt, title }) {
    return <img src={source} alt={alt} title={title} />
}

const Technologies = () => {
    return (
        <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={css.wrapper}>
            <div className={`paddings yPaddings innerWidth flexCenter ${css.container}`}>
                <motion.div 
                variants={fadeIn("right", "tween", 0.2, 0.5)}
                className={css.leftSide}>
                    <span className="primaryText">
                        Technologies
                    </span>
                    <p className="secondaryText">
                        I am not an expert but here are a few technologies I have worked with and I am comfortable with. I am always learning new things and I am open to learning new technologies.
                    </p>
                </motion.div>
                <motion.div
                    variants={fadeIn("left", "tween", 0.2, 0.5)}
                    className={css.rightSide}>
                    <div className={css.skills}>
                        <div className={css.skillsGrid}>
                            {
                                skills.map((skill, index) => {
                                    return (
                                        <Skill key={index} source={skill.imageUrl} alt={skill.alt} title={skill.name} />
                                    );
                                })
                            }
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Technologies;