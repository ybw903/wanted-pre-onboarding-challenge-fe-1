import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { localStorageManager } from "../../utils";
import "./Header.scss";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorageManager.removeToken();
    navigate("/auth");
  };
  return (
    <header className="todo-header">
      <span className="title">Todo List</span>
      <div className="btn-group">
        <Button onClick={logout}>Logout</Button>
      </div>
    </header>
  );
};
export default Header;
