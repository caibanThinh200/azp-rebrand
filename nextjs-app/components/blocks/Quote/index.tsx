import { Quote as QuoteBlock } from "@/sanity.types";

interface QuoteProps {
  block: QuoteBlock;
}

const Quote: React.FC<QuoteProps> = ({ block }) => {
  return (
    <div
      style={{
        background: block?.backgroundColor?.hex || "#fff",
      }}
      className="lg:p-20 lg:pt-20 lg:pb-10 lg:px-36 p-10 pt-20 relative rounded-xl"
    >
      <p className="font-bold text-[100px] absolute -top-0 text-white">
        &#x201F;
      </p>
      <p className="text-xl text-yellow">{block?.quote}</p>
    </div>
  );
};
export default Quote;
