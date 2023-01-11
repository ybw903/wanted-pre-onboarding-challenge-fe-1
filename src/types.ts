export type User = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  token: string;
};

export type LoginRequest = User;
export type LoginResponse = AuthResponse;

export type SignUpReqest = User;
export type SignUpResponse = AuthResponse;

export type Todo = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type TodoCreateRequest = Pick<Todo, "title" | "content">;
export type TodoUpdateRequest = Pick<Todo, "title" | "content">;

export type TodoResponse = { data: Todo };
export type TodosResponse = { data: Todo[] };
