import "./index.scss";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props) => {
  return <input {...props} className={"input-root"}></input>;
};

export default Input;
