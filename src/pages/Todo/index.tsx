import { useRedirectByInVadlidToken } from "../../hooks";

const TodoPage: React.FC = () => {
  useRedirectByInVadlidToken();
  return <div></div>;
};

export default TodoPage;
