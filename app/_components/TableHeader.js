

export default function TableHead({headingsArray, tableCol = "grid-cols-[2fr_1fr_2fr_1fr_1fr_0.5fr]"}) {

    return (
        <div className={`hidden lg:grid ${tableCol}  text-neutrals-900 text-sm font-mono font-bold border-b border-primary-100`}>
            {headingsArray.map((heading, i) => (
                <p className={`p-4 ${heading.center ? "text-center" : ""}`}>{heading.heading}</p>
            ))}
        </div>
    )
}