"use client"
import { cloneElement, createContext, useContext, useState } from 'react';
import { useCloseModal } from '../_hooks/useCloseModal';
const FilterMenuContext = createContext();

const FilterMenu = ({children}) => {
    const [filterByName, setFilterByName] = useState("");
     const onOpen = setFilterByName; 
     const close = () => setFilterByName("")
    return (
        <FilterMenuContext.Provider value={{filterByName, close, onOpen}}>{children}</FilterMenuContext.Provider>
    )
}

const Open = ({name, children}) => {
    const {onOpen} = useContext(FilterMenuContext)
    const handleClick = () => {
        onOpen(name)
    }
    return cloneElement(children, {onClick: handleClick})
}


const Window = ({name, children, top="top-[100%]", right="-right-4"}) => {
    const {close, filterByName} = useContext(FilterMenuContext);
    const ref = useCloseModal(close)
    if(name !== filterByName) return null
    return(
        <div ref={ref} className={`absolute z-30 bg-white ${top} ${right} w-max `}>
            {cloneElement(children, {onClose: close})}
        </div>
    )
}

FilterMenu.Open = Open;
FilterMenu.Window = Window;


export default FilterMenu;