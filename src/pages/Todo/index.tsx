import React, { useEffect, useState } from "react";
import todoAPI from "../../api/todoAPI";
import { Button } from "../../components";

import { useRedirectByInVadlidToken } from "../../hooks";
import { Todo } from "../../types";
import TodoForm from "./TodoForm";

import "./index.scss";
import { formatter } from "../../utils";

const TodoPage: React.FC = () => {
  const [showenTodo, setShowenTodo] = useState<Todo | null>(null);
  const [editableTodo, setEditableTodo] = useState<Todo | null>(null);
  const [visibleForm, setVisibleForm] = useState(false);
  const [todos, setTodos] = useState<Todo[]>();

  useRedirectByInVadlidToken();

  const { convertLocalDateTimeFormat } = formatter;

  const handleClickTodoItem = (
    evt: React.MouseEvent<HTMLLIElement, MouseEvent>,
    todo: Todo
  ) => {
    evt.stopPropagation();
    setShowenTodo(todo);
  };

  const handleClickEditButton = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    todo: Todo
  ) => {
    evt.stopPropagation();
    setEditableTodo(todo);
    setVisibleForm(true);
  };

  const handleClickDeleteButton = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    evt.stopPropagation();
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
      <section
        className={`todo-list-root ${showenTodo ? "open-detail" : ""}`}
        onClick={() => setShowenTodo(null)}
      >
        <header className="todo-list-header">
          <h2>할 일 목록</h2>
          <Button onClick={handleClickOpenForm}>할 일 작성</Button>
        </header>

        {todos ? (
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                onClick={(evt) => handleClickTodoItem(evt, todo)}
              >
                <div className="todo-card-root">
                  <div>
                    <span className="subject">{"제목"}</span>
                    <span className="content">{todo.title}</span>
                    <span className="subject">{"작성일시"}</span>
                    <span className="content">
                      {convertLocalDateTimeFormat(todo.createdAt)}
                    </span>
                    <span className="subject">{"수정일시"}</span>
                    <span className="content">
                      {convertLocalDateTimeFormat(todo.updatedAt)}
                    </span>
                  </div>
                  <div className="button-group">
                    <Button
                      onClick={(evt) => handleClickEditButton(evt, todo)}
                      background={"inform"}
                    >
                      수정
                    </Button>
                    <Button
                      onClick={(evt) => handleClickDeleteButton(evt, todo.id)}
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
      </section>
      {showenTodo && (
        <section className="todo-detail-root">
          <header>
            <h2>{showenTodo.title}</h2>
            <div>
              <div>
                <span className="subject">작성일</span>
                <span>{convertLocalDateTimeFormat(showenTodo.createdAt)}</span>
              </div>
              <div>
                <span className="subject">수정일</span>
                <span>{convertLocalDateTimeFormat(showenTodo.updatedAt)}</span>
              </div>
            </div>
          </header>

          <div className="todo-detail-content-root">{showenTodo.content}</div>
        </section>
      )}

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
