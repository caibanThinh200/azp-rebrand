import { Map as IMap } from "@/sanity.types";

interface MapProps {
  block: IMap;
}

const Map: React.FC<MapProps> = ({ block }) => {
  return (
    <div className="rounded-20 overflow-hidden">
      <iframe
        src={block?.code}
        className="w-full"
        width="600"
        height="450"
        // style="border:0;"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
