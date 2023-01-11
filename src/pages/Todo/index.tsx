import { useEffect, useState } from "react";
import todoAPI from "../../api/todoAPI";
import { useRedirectByInVadlidToken } from "../../hooks";
import { Todo } from "../../types";

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  useRedirectByInVadlidToken();

  useEffect(() => {
    todoAPI.getTodos().then((todos) => setTodos(todos));
  }, []);

  console.log(todos);
  return (
    <div>
      <div>
        {todos ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <div>
                  <span>{todo.title}</span>
                  <span>{todo.createdAt}</span>
                  <span>{todo.updatedAt}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default TodoPage;
