import React, { useEffect, useState } from "react";
import todoAPI from "../../api/todoAPI";
import { Button } from "../../components";

import { useRedirectByInVadlidToken } from "../../hooks";
import { Todo } from "../../types";
import TodoForm from "./TodoForm";

import "./index.scss";

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
    <div className="todo-root">
      <div className="todo-list-root">
        <header className="todo-list-header">
          <h2>할 일 목록</h2>
          <Button onClick={handleClickOpenForm}>할 일 작성</Button>
        </header>

        {todos ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <div className="todo-card-root">
                  <div>
                    <span className="subject">{"제목"}</span>
                    <span className="content">{todo.title}</span>
                    <span className="subject">{"작성일시"}</span>
                    <span className="content">{todo.createdAt}</span>
                    <span className="subject">{"수정일시"}</span>
                    <span className="content">{todo.updatedAt}</span>
                  </div>
                  <div className="button-group">
                    <Button
                      onClick={() => handleClickEditButton(todo)}
                      background={"inform"}
                    >
                      수정
                    </Button>
                    <Button
                      onClick={() => handleClickDeleteButton(todo.id)}
                      background={"danger"}
                    >
                      삭제
                    </Button>
                  </div>
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
