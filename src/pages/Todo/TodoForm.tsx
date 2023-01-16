import { useState } from "react";
import todoAPI from "../../api/todoAPI";
import { Button, Modal, TextArea } from "../../components";
import Input from "../../components/Input";
import { Todo } from "../../types";

import "./TodoForm.scss";

interface TodoFormProps {
  visible: boolean;
  handleClose: () => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | undefined>>;
  editableTodo: Todo | null;
}

const TodoForm: React.FC<TodoFormProps> = ({
  visible,
  handleClose,
  setTodos,
  editableTodo,
}) => {
  const [form, setForm] = useState({
    title: editableTodo?.title ?? "",
    content: editableTodo?.content ?? "",
  });

  const { title, content } = form;

  const handleChangeForm = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCreateForm = () => {
    todoAPI.createTodo(form).then((todo) => {
      setTodos((prev) => {
        if (!prev) return;
        return [...prev, todo];
      });
      handleClose();
    });
  };

  const handleSubmitUpdateForm = () => {
    if (!editableTodo) return;
    todoAPI.updateTodo(editableTodo.id, form).then((updatedTodo) => {
      setTodos((prev) => {
        if (!prev) return;
        const updatedTodos = prev?.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
        return updatedTodos;
      });
      handleClose();
    });
  };

  const handleSubmit = () => {
    if (editableTodo) handleSubmitUpdateForm();
    else handleSubmitCreateForm();
  };

  return (
    <Modal visible={visible} closeHandler={handleClose}>
      <div className="todo-form-root">
        <header>
          <h2>할 일 작성</h2>
        </header>
        <div className="form-body">
          <div className="input-container-root">
            <label htmlFor="title">제목</label>
            <Input
              type={"text"}
              value={title}
              name={"title"}
              onChange={handleChangeForm}
            />
          </div>
          <div className="input-container-root">
            <label>내용</label>
            <TextArea
              value={content}
              name={"content"}
              onChange={handleChangeForm}
              rows={20}
            />
          </div>
        </div>
        <div className="button-group-root">
          <Button onClick={handleClose} background={"inform"}>
            닫기
          </Button>
          <Button onClick={handleSubmit}>저장</Button>
        </div>
      </div>
    </Modal>
  );
};

export default TodoForm;
