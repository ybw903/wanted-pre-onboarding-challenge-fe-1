import { useState } from "react";
import todoAPI from "../../api/todoAPI";
import { Modal } from "../../components";
import { Todo } from "../../types";

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

  const handleChangeForm = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
      <button onClick={handleClose}>닫기</button>
      <button onClick={handleSubmit}>저장</button>
    </Modal>
  );
};

export default TodoForm;
