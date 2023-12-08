import React from 'react'
import css from './Header.module.scss'
const Header = () => {
  return (
    <div className={`paddings ${css.wrapper}`}>
        <div className={`flexCenter innerWidth ${css.container}`}>
            <div className={css.logo}>
                <img src="./public" alt="logo" />
            </div>
        </div>
    </div>
  )
}

export default Header