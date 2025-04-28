"use client";

import { TypeAnimation } from "react-type-animation";

interface AutotypingProps {
  sequence: Array<
    string | number | ((element: HTMLElement | null) => void | Promise<void>)
  >;
  className: string;
  wrapper:
    | "p"
    | "div"
    | "span"
    | "strong"
    | "a"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "b";
}

const AutoTyping: React.FC<AutotypingProps> = (props) => {
  return (
    <TypeAnimation
      {...props}
      cursor={true}
      repeat={Infinity}
      speed={50}
      sequence={[...props.sequence, () => {}]}
      // style={{ fontSize: "2em", display: "inline-block" }}
    />
  );
};

export default AutoTyping;
