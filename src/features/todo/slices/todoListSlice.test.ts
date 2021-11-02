import reducer, { actions, selectors } from './todoListSlice';
import {
  createTodoListState,
  createMockStore,
} from '../../../libs/createMockStore';

describe('todoListSlice', () => {
  describe('actions', () => {
    it('addTodo', () => {
      const message = 'add message';

      const result = actions.addTodo(message);

      expect(result.type).toBe('todo/addTodo');
      expect(result.payload.message).toBe(message);
      expect(result.payload.id).toHaveLength(21);
      expect(result.payload).toHaveProperty('createdAt');
    });

    it('updateTodo', () => {
      const dummyId = 'asdfghjklz12345678901';
      const message = 'add message';

      const result = actions.updateTodo({
        id: dummyId,
        message,
      });

      expect(result.type).toBe('todo/updateTodo');
      expect(result.payload.id).toBe(dummyId);
      expect(result.payload.changes.message).toBe(message);
    });

    it('delTodo', () => {
      const dummyId = 'asdfghjklz12345678901';

      const result = actions.delTodo(dummyId);

      expect(result.type).toBe('todo/delTodo');
      expect(result.payload).toBe(dummyId);
    });
  });

  describe('reducer', () => {
    it('addTodo', () => {
      const addMessage = 'add message';
      const action = actions.addTodo(addMessage);
      const initialState = createTodoListState([]);

      const result = reducer(initialState, action);

      // 作成時は ids にデータが1つ追加されること
      expect(result.ids).toHaveLength(1);
      // id は 21 文字
      expect(result.ids[0]).toHaveLength(21);
      // key と id が一致してること
      expect(result.entities[result.ids[0]]?.id).toBe(result.ids[0]);
      // 追加したメッセージであること
      expect(result.entities[result.ids[0]]?.message).toBe(addMessage);
      // createdAt が含まれていること
      expect(result.entities[result.ids[0]]).toHaveProperty('createdAt');
    });

    it('updateTodo', () => {
      const updateId = 'asdfghjklz12345678901';
      const updateMessage = 'update message';
      const action = actions.updateTodo({
        id: updateId,
        message: updateMessage,
      });
      const initialState = createTodoListState([
        {
          id: 'asdfghjklz12345678900',
          message: 'init message',
          createdAt: 1635847744000,
        },
        {
          id: updateId,
          message: 'init message',
          createdAt: 1635847744001,
        },
        {
          id: 'asdfghjklz12345678902',
          message: 'init message',
          createdAt: 1635847744002,
        },
      ]);

      const result = reducer(initialState, action);

      // 更新時は ids の変更はないこと
      expect(result.ids).toEqual(initialState.ids);
      result.ids.forEach((id) => {
        if (id === updateId) {
          // 更新対象の場合メッセージが指定したものになっていること
          expect(result.entities[id]?.message).toBe(updateMessage);
        } else {
          // 非更新対象の場合メッセージが変わらないこと
          expect(result.entities[id]?.message).toBe(
            initialState.entities[id].message
          );
        }
        // メッセージ以外は変更されないこと
        expect(id).toBe(initialState.entities[id].id);
        expect(result.entities[id]?.id).toBe(initialState.entities[id].id);
        expect(result.entities[id]?.createdAt).toBe(
          initialState.entities[id].createdAt
        );
      });
    });

    it('delTodo', () => {
      const deleteId = 'asdfghjklz12345678901';
      const action = actions.delTodo(deleteId);
      const initialState = createTodoListState([
        {
          id: 'asdfghjklz12345678900',
          message: 'init message',
          createdAt: 1635847744000,
        },
        {
          id: deleteId,
          message: 'init message',
          createdAt: 1635847744001,
        },
        {
          id: 'asdfghjklz12345678902',
          message: 'init message',
          createdAt: 1635847744002,
        },
      ]);

      const result = reducer(initialState, action);

      // 削除時は ids は2つに減ること
      expect(result.ids).toHaveLength(2);
      // entities に削除した id がないこと
      expect(result.entities).not.toHaveProperty(deleteId);
      result.ids.forEach((id) => {
        // 非削除対象の場合データが変わらないこと
        expect(result.entities[id]?.message).toBe(
          initialState.entities[id].message
        );
        expect(id).toBe(initialState.entities[id].id);
        expect(result.entities[id]?.id).toBe(initialState.entities[id].id);
        expect(result.entities[id]?.createdAt).toBe(
          initialState.entities[id].createdAt
        );
      });
    });
  });

  describe('selectors', () => {
    it('todoListSelector', () => {
      const expected = [
        {
          id: 'asdfghjklz12345678900',
          message: 'init message',
          createdAt: 1635847744000,
        },
        {
          id: 'asdfghjklz12345678901',
          message: 'init message',
          createdAt: 1635847744001,
        },
        {
          id: 'asdfghjklz12345678902',
          message: 'init message',
          createdAt: 1635847744002,
        },
      ];
      const store = createMockStore({
        todoList: createTodoListState(expected),
      });

      const result = selectors.todoListSelector(store);

      // store にある情報を配列で取得できる
      expect(result).toEqual(expected);
    });
  });
});
