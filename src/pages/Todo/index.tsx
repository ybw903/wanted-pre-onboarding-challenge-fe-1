import React, { useEffect, useState } from "react";
import todoAPI from "../../api/todoAPI";
import { Modal } from "../../components";
import { useRedirectByInVadlidToken } from "../../hooks";
import { Todo } from "../../types";

const TodoPage: React.FC = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>();
  const [form, setForm] = useState({ title: "", content: "" });
  const { title, content } = form;

  useRedirectByInVadlidToken();

  const handleChangeForm = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = () => {
    todoAPI.createTodo(form).then((todo) => {
      setTodos((prev) => {
        if (!prev) return;
        return [...prev, todo];
      });
      setForm({ title: "", content: "" });
    });
  };

  const handleClickEditButton = (id: string) => {};

  const handleClickDeleteButton = (id: string) => {
    todoAPI.deleteTodo(id).then((_) => {
      const withoutDeletedTodos = todos?.filter((todo) => todo.id === id);
      if (!withoutDeletedTodos) return;
      setTodos(withoutDeletedTodos);
    });
  };

  const handleClickOpenModal = () => {
    setVisibleModal(true);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    todoAPI.getTodos().then((todos) => setTodos(todos));
  }, []);

  return (
    <div>
      <div>
        <button onClick={handleClickOpenModal}>할 일 작성</button>
        {todos ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <div>
                  <span>{todo.title}</span>
                  <span>{todo.createdAt}</span>
                  <span>{todo.updatedAt}</span>
                  <button onClick={() => handleClickEditButton(todo.id)}>
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
      {visibleModal && (
        <Modal visible={visibleModal} closeHandler={handleCloseModal}>
          <input
            type={"text"}
            value={title}
            name={"title"}
            onChange={handleChangeForm}
          />
          <input
            type={"text"}
            value={content}
            name={"content"}
            onChange={handleChangeForm}
          />
          <button onClick={handleCloseModal}>닫기</button>
          <button onClick={handleSubmitForm}>저장</button>
        </Modal>
      )}
    </div>
  );
};

export default TodoPage;
