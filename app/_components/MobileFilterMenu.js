
"use client"
import { cloneElement, createContext, useContext, useState } from 'react';
import { IoClose } from 'react-icons/io5';


const FilterMenuContext = createContext();


const MobileFilterMenu = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(prev => !prev);
    const value = {isOpen, open}
    return (
        <FilterMenuContext.Provider value={value}>{children}</FilterMenuContext.Provider>
    )
}


const Open = ({children}) => {
    const {open, isOpen} = useContext(FilterMenuContext)
    return cloneElement(children, {onClick: open})
}


const Window = ({children}) => {
    const {isOpen, open} = useContext(FilterMenuContext)
    return (
        <div className={`absolute top-12 z-50 left-0  w-full p-6 flex flex-col gap-4 text-center ${isOpen ? "translate-x-0" : "-translate-x-[120%]"} transition-transform duration-300 ease-in-out`}>
            <div className=' flex px-6 py-2 items-center justify-center bg-white border border-primary-100 rounded-2xl'>
                <button onClick={open} className='flex flex-col items-center gap-2 text-error font-mono'>
                    <span><IoClose/></span>
                    <span>Close</span>
                </button>
            </div>
            {children}
        </div>
    )
}

MobileFilterMenu.Open = Open;
MobileFilterMenu.Window = Window;

export default MobileFilterMenu;
