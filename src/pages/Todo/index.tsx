import React, { useEffect, useState } from "react";
import todoAPI from "../../api/todoAPI";

import { useRedirectByInVadlidToken } from "../../hooks";
import { Todo } from "../../types";
import TodoForm from "./TodoForm";

const TodoPage: React.FC = () => {
  const [editableTodo, setEditableTodo] = useState<Todo | null>(null);
  const [visibleForm, setVisibleForm] = useState(false);
  const [todos, setTodos] = useState<Todo[]>();

  useRedirectByInVadlidToken();

  const handleClickEditButton = (todo: Todo) => {
    setEditableTodo(todo);
    setVisibleForm(true);
  };

  const handleClickDeleteButton = (id: string) => {
    todoAPI.deleteTodo(id).then((_) => {
      const withoutDeletedTodos = todos?.filter((todo) => todo.id === id);
      if (!withoutDeletedTodos) return;
      setTodos(withoutDeletedTodos);
    });
  };

  const handleClickOpenForm = () => {
    setVisibleForm(true);
  };

  const handleCloseForm = () => {
    setVisibleForm(false);
    if (editableTodo) setEditableTodo(null);
  };

  useEffect(() => {
    todoAPI.getTodos().then((todos) => setTodos(todos));
  }, []);

  return (
    <div>
      <div>
        <button onClick={handleClickOpenForm}>할 일 작성</button>
        {todos ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <div>
                  <span>{todo.title}</span>
                  <span>{todo.createdAt}</span>
                  <span>{todo.updatedAt}</span>
                  <button onClick={() => handleClickEditButton(todo)}>
                    수정
                  </button>
                  <button onClick={() => handleClickDeleteButton(todo.id)}>
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
      </div>
      <div></div>
      {visibleForm && (
        <TodoForm
          visible={visibleForm}
          handleClose={handleCloseForm}
          setTodos={setTodos}
          editableTodo={editableTodo}
        />
      )}
    </div>
  );
};

export default TodoPage;
