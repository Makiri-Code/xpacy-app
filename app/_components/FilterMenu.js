"use client"
import { cloneElement, createContext, useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useCloseModal } from '../_hooks/useCloseModal';

const FilterMenuContext = createContext();

const FilterMenu = ({children}) => {
    const [filterByName, setFilterByName] = useState("");
    const [position, setPosition] = useState(null);
    const close = () => {
        setFilterByName("");
        setPosition(null);
    }
    const onOpen = (name, rect) => {
        setPosition(rect);
        setFilterByName(name);
    }
    return (
        <FilterMenuContext.Provider value={{filterByName, close, onOpen, position}}>{children}</FilterMenuContext.Provider>
    )
}

const Open = ({name, children}) => {
    const {onOpen} = useContext(FilterMenuContext)
    const handleClick = (e) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        onOpen(name, rect)
    }
    return cloneElement(children, {onClick: handleClick})
}

const Window = ({name, children}) => {
    const {close, filterByName, position} = useContext(FilterMenuContext);
    const ref = useCloseModal(close);
    const [style, setStyle] = useState({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (name === filterByName && position && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const PADDING = 20;
            
            // Default top to directly below the trigger
            let top = position.bottom + window.scrollY;
            let left = position.left + window.scrollX;
            let right = 'auto';

            // If it goes beyond the bottom of viewport
            if (position.bottom + rect.height > window.innerHeight - PADDING) {
                // Render above the trigger
                top = position.top + window.scrollY - rect.height;
            }
            
            // If it goes beyond the right of viewport
            if (position.left + rect.width > window.innerWidth - PADDING) {
                left = 'auto';
                right = window.innerWidth - position.right; 
            }
            
            setStyle({
                top: `${top}px`,
                ...(left !== 'auto' ? { left: `${left}px` } : { right: `${right}px` })
            });
        }
    }, [name, filterByName, position]);

    if(name !== filterByName || !mounted) return null;

    return createPortal(
        <div ref={ref} className="absolute z-9999 bg-white w-max" style={style}>
            {cloneElement(children, {onClose: close})}
        </div>,
        document.body
    );
}

FilterMenu.Open = Open;
FilterMenu.Window = Window;

export default FilterMenu;