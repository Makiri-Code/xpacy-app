import { FaCheck } from "react-icons/fa6";

const progressBarSteps = [
    { step: 1, label: "Owner Info" },
    { step: 2, label: "Property Overview" },
    { step: 3, label: "Property info" },
    { step: 4, label: "Media" },
];
const ProgressBar = ({activeStep, setActiveStep}) => {
    return (
        <div className="flex  justify-between text-center font-mono w-[503px] mx-auto">
            {progressBarSteps.map((item, index) => (
                <div onClick={() => setActiveStep(prev => prev === item.step ? prev : item.step)} key={index} className="flex cursor-pointer flex-col items-center justify-center w-20 gap-2">
                    <div className={`relative flex w-7 h-7 rounded-full  items-center justify-center ${activeStep >= item.step ? 'bg-primary text-white' : 'bg-primary-100 text-primary'}`}>
                        <span>{activeStep > item.step ? <FaCheck /> : item.step}</span>
                        {index > 0 && index < 4 && <div className={` ${activeStep >= item.step ? 'bg-primary' : 'bg-primary-200'} h-1  w-[113px] absolute top-1/2 right-1/1`} ></div>}
                    </div>
                    <p className="flex-1">{item.label}</p>
                </div>)
            )}
        </div>
    );
};

export default ProgressBar;