import React, { useRef, useState } from "react";
import css from "./Header.module.scss";
import { motion } from "framer-motion";
import { getMenuStyles, headerVariants } from "../../utils/motion";
import { BiMenuAltRight } from "react-icons/bi";
import useHeaderShadow from "../../hooks/useHeaderShadow";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const Header = () => {
	const [menuOpened, setMenuOpened] = useState(false);
	const headerShadow = useHeaderShadow();
	const menuRef = useRef(null);
	useOutsideAlerter({ menuRef, setMenuOpened });

	return (
		<motion.div
			initial="hidden"
			whileInView="show"
			variants={headerVariants}
			viewport={{ once: false, amount: 0.25 }}
			className={`bg-primary paddings ${css.wrapper}`}
			style={{ boxShadow: headerShadow }}
		>
			<div className={`flexCenter innerWidth ${css.container}`}>
				<a href="#" className={css.logo}>
					<img src="/logo.svg" alt="logo" />
				</a>
				<ul
					className={`flexCenter ${css.menu}`}
					ref={menuRef}
					style={getMenuStyles(menuOpened)}>
					<li>
						<a href="#about">About</a>
					</li>
					<li>
						<a href="#education">Education</a>
					</li>
					<li>
						<a href="#tech">Technologies</a>
					</li>
					<li>
						<a href="#experience">Work experience</a>
					</li>
					<li>
						<a href="#projects">Projects</a>
					</li>
					<li>
						<a href="#contact">Contact</a>
					</li>
				</ul>

				<div
					className={css.menuIcon}
					onClick={() => setMenuOpened((prev) => !prev)}
				>
					<BiMenuAltRight size={30} />
				</div>
			</div>
		</motion.div>
	);
};

export default Header;