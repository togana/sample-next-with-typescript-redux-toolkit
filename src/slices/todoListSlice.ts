import { createSlice, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from '../reducers';

let nextId = 0

export type TodoType = {
  id: number;
  message: string;
};

const initialState: TodoType[] = [];

const todoListAdapter = createEntityAdapter<TodoType>({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => a.id - b.id
})

const todoListSlice = createSlice({
    name: "todo",
    initialState: todoListAdapter.getInitialState(initialState),
    reducers: {
      addTodo: {
        reducer: todoListAdapter.addOne,
        prepare: (message: string) => {
          return { payload: { id: nextId++, message } }
        }
      },
      updateTodo: {
        reducer: todoListAdapter.updateOne,
        prepare: (payload: TodoType) => {
          const { id, ...ignoreIdPayload } = payload;
          return { payload: { id, changes: { ...ignoreIdPayload } } }
        }
      },
      delTodo: todoListAdapter.removeOne
    },
});

const stateSelector = (state: RootState) => state.todoList;

export const selectors = {
  todoListSelector: createSelector(
    stateSelector,
    todoListAdapter.getSelectors().selectAll,
  ),
};

export const { addTodo, updateTodo, delTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
