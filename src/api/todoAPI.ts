import {
  Todo,
  TodoCreateRequest,
  TodoResponse,
  TodosResponse,
  TodoUpdateRequest,
} from "../types";
import apiClient from "./apiClient";

interface ITodoAPI {
  getTodos(): Promise<Todo[]>;
  getTodoById(id: string): Promise<Todo>;
  createTodo(request: TodoCreateRequest): Promise<Todo>;
  updateTodo(id: string, request: TodoUpdateRequest): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}

const BASE_URL = "/todos" as const;

class TodoAPI implements ITodoAPI {
  async getTodos(): Promise<Todo[]> {
    const { data } = await apiClient.get<TodosResponse>(`${BASE_URL}`);
    return data.data;
  }

  async getTodoById(id: string): Promise<Todo> {
    const { data } = await apiClient.get<TodoResponse>(`${BASE_URL}/${id}`);
    return data.data;
  }

  async createTodo(request: TodoCreateRequest): Promise<Todo> {
    const { data } = await apiClient.post<TodoResponse>(`${BASE_URL}`, request);

    return data.data;
  }

  async updateTodo(id: string, request: TodoUpdateRequest): Promise<Todo> {
    const { data } = await apiClient.put<TodoResponse>(
      `${BASE_URL}/${id}`,
      request
    );
    return data.data;
  }

  async deleteTodo(id: string): Promise<void> {
    const response = await apiClient.delete(`${BASE_URL}/${id}`);
  }
}

export default new TodoAPI();
