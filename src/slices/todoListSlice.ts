import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let nextId = 0

export type TodoType = {
  id: number;
  message: string;
};

const initialState: TodoType[] = [];

const todoListSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
      addTodo: {
        reducer: (state, action: PayloadAction<TodoType>) => {
          const { id, message } = action.payload;
          state.push({ id, message })
        },
        prepare: (message: string) => {
          return { payload: { id: nextId++, message } }
        }
      },
    },
});

export const { addTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
