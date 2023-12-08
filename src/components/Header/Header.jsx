import React, { useState } from "react";
import css from "./Header.module.scss";
import { motion } from "framer-motion";
import { getMenuStyles, headerVariants } from "../../utils/motion";
import { BiMenuAltRight } from "react-icons/bi";
import useHeaderShadow from "../../hooks/useHeaderShadow";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const headerShadow = useHeaderShadow();
	return (
		<motion.div
			initial="hidden"
			whileInView="show"
			variants={headerVariants}
			viewport={{ once: false, amount: 0.25 }}
			className={`paddings ${css.wrapper}`}
			style={{ boxShadow: headerShadow }}
		>
			<div className={`flexCenter innerWidth ${css.container}`}>
				<div className={css.logo}>
					<img src="/logo.svg" alt="logo" />
				</div>
				<ul className={`flexCenter ${css.menu}`}
				style={getMenuStyles(menuOpen)}>
					<li>
						<a href="">About</a>
					</li>
					<li>
						<a href="">Education</a>
					</li>
					<li>
						<a href="">Technologies</a>
					</li>
					<li>
						<a href="">Work experience</a>
					</li>
					<li>
						<a href="">Projects</a>
					</li>
					<li>
						<a href="">Contact</a>
					</li>
				</ul>

				<div className={css.menuIcon}
					onClick={() => setMenuOpen((prev) => !prev)}
				>
					<BiMenuAltRight size={30} />
				</div>
			</div>
		</motion.div>
	);
};

export default Header;