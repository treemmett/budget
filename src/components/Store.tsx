import { createContext, Dispatch, FC, PropsWithChildren, useContext, useReducer } from 'react';

export interface State {
  month: number;
  year: number;
}

const defaultState: State = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

export type Action = { type: 'CHANGE_MONTH'; direction: 1 | -1 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHANGE_MONTH': {
      const d = new Date();
      d.setFullYear(state.year);
      d.setMonth(state.month + action.direction);
      return {
        ...state,
        month: d.getMonth(),
        year: d.getFullYear(),
      };
    }

    default:
      return state;
  }
}

const storeContext = createContext<[State, Dispatch<Action>]>([defaultState, () => null]);

export const useDispatch = (): Dispatch<Action> => {
  const [, dispatch] = useContext(storeContext);
  return dispatch;
};

export const useStore = (): State => {
  const [store] = useContext(storeContext);
  return store;
};

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useReducer(reducer, defaultState);

  return <storeContext.Provider value={value}>{children}</storeContext.Provider>;
};
