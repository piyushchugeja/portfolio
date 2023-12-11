import React from 'react';
import css from './Projects.module.scss';
import { motion } from 'framer-motion';
import { projects } from '../../utils/data';
import { fadeIn, staggerChildren } from '../../utils/motion';

const Projects = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`paddings ${css.wrapper}`}>
            <div className={`innerWidth flexCenter ${css.container}`}>
                <div className={`flexCenter ${css.heading}`}>
                    <div>
                        <span className='primaryText'>
                            My Projects
                        </span>
                        <p style={{ marginTop: "10px" }}>
                            Here are some of my noteworthy projects.
                        </p>
                    </div>
                    <a href="https://github.com/piyushchugeja" target="_blank" className="secondaryText">
                        Explore all of my work
                    </a>
                </div>

                <div className={`flexCenter ${css.showCase}`}>
                    {
                        projects.map((project, index) => {
                            return (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    className={css.cardContainerAnchor}
                                    key={index}>
                                    <motion.div
                                        key={index}
                                        className={css.card}
                                        variants={fadeIn("up", "tween", 0.1 * index, 0.5)}
                                    >
                                        <div className={css.card__header}>
                                            <img src={project.imageUrl} alt={project.title} className={css.card__image} width="600" />
                                        </div>
                                        <div className={css.card__body}>
                                            <div className={css.tagContainer}>
                                                {
                                                    project.techStack.map((tech, index) => {
                                                        return (
                                                            <span key={index} className={css.tag}>{tech}</span>
                                                        );
                                                    })
                                                }
                                            </div>
                                            <h4>{project.title}</h4>
                                            <p>{project.description}</p>
                                        </div>
                                    </motion.div>
                                </a>
                            );
                        })
                    }
                </div>
            </div>
        </motion.section>
    );
};

export default Projects;
