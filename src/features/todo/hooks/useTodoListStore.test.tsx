import { FC, ReactNode } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import { rootReducer } from '../../../store';
import { useTodoListStore } from './useTodoListStore';

let wrapper: FC<{ children: ReactNode }>;

beforeEach(() => {
  // store を毎回生成し直す
  const store = configureStore({
    reducer: rootReducer,
  });

  // eslint-disable-next-line react/display-name
  wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
});

describe('useTodoListStore', () => {
  test('todoList の初期値は空で isPending はfalse', () => {
    const { result } = renderHook(() => useTodoListStore(), { wrapper });

    expect(result.current.todoList).toStrictEqual([]);
    expect(result.current.isPending).toBeFalsy();
  });

  test('addTodo を行うことで todoList に値が追加される', () => {
    const { result } = renderHook(() => useTodoListStore(), { wrapper });
    const addMessage = 'add todo!!!';
    result.current.addTodo(addMessage);

    // 1つ追加するのでリストは1つ
    expect(result.current.todoList).toHaveLength(1);

    result.current.addTodo(addMessage);

    // 1つ追加するのでリストは2つ
    expect(result.current.todoList).toHaveLength(2);
    result.current.todoList.forEach((todo) => {
      // id は 21 文字であること
      expect(todo.id).toHaveLength(21);
      // message は追加した文字であること
      expect(todo.message).toBe(addMessage);
    });
  });

  test('updateTodo を行うことで todoList の値が更新される', () => {
    const { result } = renderHook(() => useTodoListStore(), { wrapper });
    const addMessage = 'add todo!!!';
    result.current.addTodo(addMessage);

    // 1つ追加するのでリストは1つ
    expect(result.current.todoList).toHaveLength(1);

    const updateMessage = 'update todo!!!';
    result.current.updateTodo({
      id: result.current.todoList[0].id,
      message: updateMessage,
    });

    // すでにある値を更新したのでリストは1つ
    expect(result.current.todoList).toHaveLength(1);
    result.current.todoList.forEach((todo) => {
      // id は 21 文字であること
      expect(todo.id).toHaveLength(21);
      // message は更新した文字であること
      expect(todo.message).toBe(updateMessage);
    });
  });

  test('delTodo を行うことで todoList の値が削除される', () => {
    const { result } = renderHook(() => useTodoListStore(), { wrapper });
    const addMessage = 'add todo!!!';
    result.current.addTodo(addMessage);
    result.current.addTodo(addMessage);

    // 2つ追加するのでリストは2つ
    expect(result.current.todoList).toHaveLength(2);
    const ids = result.current.todoList.map((todo) => todo.id);

    result.current.delTodo(ids[0]);

    // 1つ削除するのでリストは1つ
    expect(result.current.todoList).toHaveLength(1);

    // 削除に利用しなかった id が残っている
    expect(result.current.todoList[0].id).toBe(ids[1]);
  });

  test('asyncAddTodo を行うことで isPending の値に変化がおき Promise が解決されると todoList の値が追加される', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTodoListStore(), {
      wrapper,
    });
    const addMessage = 'add todo!!!';

    await act(async () => {
      result.current.asyncAddTodo(addMessage);

      // 実行してすぐは値が追加されないこと
      expect(result.current.todoList).toHaveLength(0);

      // isPending は update がくるまで更新されないこと
      expect(result.current.isPending).toBeFalsy();

      await waitForNextUpdate();

      // isPending が更新されPromiseの解決を待つ
      expect(result.current.isPending).toBeTruthy();

      await waitForNextUpdate();

      // isPending が更新されPromiseが解決された
      expect(result.current.isPending).toBeFalsy();

      // 実行完了後1つ追加するのでリストは1つ
      expect(result.current.todoList).toHaveLength(1);
    });
  });
});
