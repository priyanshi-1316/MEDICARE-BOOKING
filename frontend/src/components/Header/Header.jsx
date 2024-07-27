import React, { useEffect, useRef} from 'react';
import logo from "../../assets/images/logo.png";

import {NavLink, Link} from "react-router-dom";
import {BiMenu} from "react-icons/bi";
import { authContext } from '../../context/authContext.jsx';
import { useContext } from 'react';


const navLinks=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/doctors',
    display:'Find the Doctor'
  },
  {
    path:'/services',
    display:'Services'
  },
  {
    path:'/contact',
    display:'Contact'
  },
];

const Header = () => {
  const { user, role, token } = useContext(authContext); 
  console.log('user:',user);
  console.log('Token:',token);


  const headerRef=useRef(null)
  const menuRef=useRef(null)

  const handleStickyHeader=()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
        headerRef.current.classList.add('sticky_header')
      }else{
        headerRef.current.classList.remove('sticky_header')
      }
    })
  }

  useEffect(()=>{
    handleStickyHeader()

    return ()=>window.removeEventListener('scroll',handleStickyHeader)
  });

  const toggleMenu = ()=>menuRef.current.classList.toggle('show__menu')

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
       <div className='flex items-conter justify-between'>
        {/*=====logo=======*/}
        <div>
          <img src={logo} alt=""/>
        </div>
        {/*=====menu=====*/}
        <div className='navigation' ref={menuRef} onClick={toggleMenu}>
          <ul className='menu flex items-center gap-[2.7rem]'>
            {
              navLinks.map((Link,index)=>(
                <li key={index}>
                  <NavLink
                  to={Link.path}
                  className={navClass=>
                  navClass.isActive
                  ? "text-primaryColor text-[16px] leading-7 font-[600]"
                : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"}
                >
                    {Link.display}
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </div>

        {/*======nav right=====*/}
        
        <div className="flex items-center gap-4 ">

          {token && user ? (
            <div>
            <Link to={`${role==='doctor' ? '/doctor/profile/me' : '/users/profile/me'}`}>
              <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                <img  className="w-full rounded-full" alt=""/>
              </figure>
             
             
            </Link>
          </div>
          ) : (
            <Link to='/login'>
        <buttton className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">Login</buttton>
        </Link>
          )}
          
         

        <span className="md:hidden" onClick={toggleMenu}>
          <BiMenu className="w-6 h-6 cursor-pointer"/>
        </span>

        </div>

       </div>
      </div>
    </header>
  )
}

export default Header
