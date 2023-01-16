import React from "react";

import "./index.scss";

type textAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const TextArea: React.FC<textAreaProps> = (props) => {
  return <textarea className={"textarea-root"} {...props}></textarea>;
};

export default TextArea;
