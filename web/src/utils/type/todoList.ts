export interface Todo {
  id: number;
  text: string;
  isEditing: boolean;
}

export type TodoAction =
  | { type: "add"; payload: string }
  | { type: "delete"; payload: number }
  | { type: "edit"; payload: { id: number; text: string } };