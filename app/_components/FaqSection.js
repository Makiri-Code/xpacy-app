import FaqToggle from "./FaqToggle";


export default function FaqSection({faqs}){

    return (
      <div className="container flex flex-col items-center space-y-6 ">
        {faqs?.map((faq) => (
          <FaqToggle key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    );
}