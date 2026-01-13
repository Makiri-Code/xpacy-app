"use client"
import { cloneElement, createContext, useContext } from 'react';
import { IoClose } from "react-icons/io5";
const CustomModalContext = createContext();

const CustomModal = ({children, isOpen, isOpenChange}) => {

    return <CustomModalContext.Provider value={{isOpen, isOpenChange}}>{children}</CustomModalContext.Provider>
}
const Open = ({children}) => {
    const {isOpenChange} = useContext(CustomModalContext);
    return cloneElement(children, {onClick: () => {isOpenChange(true)}})
}
const Window = ({children}) => {
    const {isOpen, isOpenChange} = useContext(CustomModalContext);
    if(!isOpen) return null;
    return (
        <div className='fixed left-0 right-0 w-dvw h-dvh inset-0 bg-stone-900/80 flex items-center justify-center z-40'>
            <div className='bg-white flex flex-col gap-4 rounded-2xl p-6 relative overflow-hidden'>
                <button className='self-end text-2xl cursor-pointer' onClick={() => isOpenChange(false)}><IoClose/></button>
                {children}
            </div>
            
        </div>
    )
}
CustomModal.Open = Open;
CustomModal.Window = Window;

export default CustomModal;
