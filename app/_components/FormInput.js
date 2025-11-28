

export default function FormInput({label, children, id}){
    return (
        <div className=" flex flex-col space-y-2 font-mono">
            <label htmlFor={id} className="text-sm text-black">{label}</label>
            {children}
        </div>
    )
}