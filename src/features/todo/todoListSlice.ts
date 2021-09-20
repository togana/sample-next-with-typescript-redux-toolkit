import {
  createSlice,
  createSelector,
  createEntityAdapter,
  nanoid,
  EntityState,
  EntityId,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type TodoType = {
  id: EntityId;
  message: string;
  createdAt: number;
};

const initialState: EntityState<TodoType> = {
  ids: [],
  entities: {},
};

const todoListAdapter = createEntityAdapter<TodoType>({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const todoListSlice = createSlice({
  name: 'todo',
  initialState: todoListAdapter.getInitialState(initialState),
  reducers: {
    addTodo: {
      reducer: todoListAdapter.addOne,
      prepare: (message: string) => {
        return { payload: { id: nanoid(), message, createdAt: Date.now() } };
      },
    },
    updateTodo: {
      reducer: todoListAdapter.updateOne,
      prepare: (payload: Omit<TodoType, 'createdAt'>) => {
        const { id, ...ignoreIdPayload } = payload;
        return { payload: { id, changes: { ...ignoreIdPayload } } };
      },
    },
    delTodo: todoListAdapter.removeOne,
  },
});

const stateSelector = (state: RootState) => state.todoList;

export const selectors = {
  todoListSelector: createSelector(
    stateSelector,
    todoListAdapter.getSelectors().selectAll
  ),
};

export const actions = todoListSlice.actions;
export default todoListSlice.reducer;
