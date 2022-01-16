import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../images/logo.png';
import { useState } from 'react';

const MENU_ITEMS = [
    "Market", "Exchange", "Tutorial", "Wallets"
]

const NavbarItem = ({ title, classProps }) => {
    return (
        <li className={ `mx-4 cursor-pointer ${ classProps }` }>
            { title }
        </li>
    )
}

const Navbar = () => {

    const [ toggleMenu, setToggleMenu ] = useState(false);

    return (
        <nav className='w-full flex md:justify-center pt-4 justify-between px-5 md:px-0'>
            <div className="md:flex-[0.5] flex-initial flex items-center">
                <img src={ logo } alt="Logo" className='cursor-pointer w-32' />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between flex-initial items-center">
                { MENU_ITEMS.map( ( singleItem, i ) => (
                    <NavbarItem
                        key={ i }
                        title={ singleItem }
                        classProps='hover:scale-105 transition' />
                ) ) }
                <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                    Login
                </li>
            </ul>

            <div className="flex relative">
                <ul className={ `text-white z-10 fixed top-0 p-3 w-[70vw] h-screen shadow-2xl
                    md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism transition-all duration-300 ${ toggleMenu ? '-right-2' : '-right-[100%]' }` }>
                    <li className='text-xl w-full my-2'>
                        <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer hover:scale-125 transition' onClick={ () => setToggleMenu( false ) } />
                    </li>
                    { MENU_ITEMS.map( ( singleItem, i ) => (
                        <NavbarItem
                            classProps='my-2 text-lg hover:scale-105 transition'
                            key={ i }
                            title={ singleItem } />
                    ) ) }
                </ul>
                <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer hover:scale-125 transition' onClick={ () => setToggleMenu( true ) }/>
            </div>
        </nav>
    )
}

export default Navbar;