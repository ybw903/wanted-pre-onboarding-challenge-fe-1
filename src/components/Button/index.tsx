import "./index.scss";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  background?: "primary" | "inform" | "danger";
};

const Button: React.FC<ButtonProps> = (props) => {
  const { background = "primary" } = props;

  return <button className={`button-root ${background}`} {...props}></button>;
};

export default Button;
