"use client"
import { cloneElement, createContext, useContext, useState } from "react"
import { useCloseModal } from "../_hooks/useCloseModal";
import { HiMiniXMark } from "react-icons/hi2";
const ModalContext = createContext();


const Modal = ({ children }) => {
    const [windowName, setWindowName] = useState("");
    const close = () => setWindowName("");
    const open = setWindowName;

    return <ModalContext.Provider value={{ windowName, close, open }}>{children}</ModalContext.Provider>
}

const Open = ({ children, name}) => {
    const { open } = useContext(ModalContext)
    return cloneElement(children, {onOpen: open})
};

const Window = ({ children, name }) => {
    const { close, windowName } = useContext(ModalContext);
    const ref = useCloseModal(close);
    if (name !== windowName) return null;
    return (
        <div className="fixed top-0 w-full left-0 bottom-0 h-screen bg-gray-0 backdrop-blur-xs z-40 transition-all duration-300 ease-in overflow-hidden">
            <div ref={ref} className="fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] mt-10 bg-gray-50 rounded-lg px-3 py-2.5 shadow-lg transition-all duration-300">
                <button onClick={close} className="bg-none p-1 text-2xl cursor-pointer text-gray-900 rounded-full absolute top-2 right-2.5 transition-all duration-300 ease-in hover:bg-gray-100">
                    <HiMiniXMark />
                </button>
                {cloneElement(children, { onClose: close })}
            </div>
        </div>
    )
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal