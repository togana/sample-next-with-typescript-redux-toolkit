import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { RootState } from '../reducers';

const asyncMessage = (message: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, 1000);
  });
};

export const asyncAddTodo = createAsyncThunk(
  'asyncAddTodo',
  async (message: string, { getState, requestId }) => {
    const { currentRequestId, loading } = (getState() as RootState).asyncTodoList
    if (!loading || requestId !== currentRequestId) {
      throw new Error('Promise resolution is not finished.');
    }
    const result = await asyncMessage(message);
    return result;
  }
);

const asyncTodoListSlice = createSlice({
  name: "asyncTodoList",
  initialState: {
    loading: false,
    currentRequestId: undefined as string | undefined,
    error: null as SerializedError | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncAddTodo.pending, (state, action) => {
      if (!state.loading) {
        state.loading = true
        state.currentRequestId = action.meta.requestId
      }
    })
    builder.addCase(asyncAddTodo.fulfilled, (state, action) => {
      const { requestId } = action.meta
      if (state.loading && state.currentRequestId === requestId) {
        state.loading = false;
        state.currentRequestId = undefined;
      }
    })
    builder.addCase(asyncAddTodo.rejected, (state, action) => {
      const { requestId } = action.meta
      if (state.loading && state.currentRequestId === requestId) {
        state.loading = false;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    })
  }
});

export default asyncTodoListSlice.reducer;
