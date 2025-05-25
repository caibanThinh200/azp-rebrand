import ProcessStep from "@/components/ui/step-number";
import { ProcessStep as IProcessStep } from "@/sanity.types";

const Process = ({ block }: { block: IProcessStep }) => {
  return (
    <div
      style={{
        background: block?.backgroundColor?.hex || "#133955",
      }}
      className="rounded-20 p-10 bg-poseidon py-20"
    >
      <div className="flex flex-col gap-20 items-center">
        <h2 className="text-white">{block?.title}</h2>
        <div className="grid lg:grid-cols-2 gap-10 gap-y-20">
          {block?.steps?.map((step, idx: number) => (
            <div
              key={step?._key}
              className="flex flex-col lg:flex-row gap-5 items-center"
            >
              <ProcessStep number={idx + 1} />
              <div className="flex flex-col gap-5 lg:w-7/12">
                <h3 className="text-yellow font-bold text-center lg:text-left">
                  {step?.title}
                </h3>
                <p className="text-white text-center lg:text-left">
                  {step?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;
