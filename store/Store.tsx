import {
  Tuple,
  configureStore,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

interface todoState {
  loading: boolean;
  todos: Array<any>;
  email: Array<any>;
}

const initialState = {
  loading: false,
  todos: [],
  email: [],
} as todoState;

export const fetchMessages = createAsyncThunk(
  "/message/fetchMessage",
  async () => {
    const data = await fetch("https://flipkart-email-mock.now.sh");
    const { list } = await data.json();
    return list;
  }
);

const storeSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = !state.loading;
      state.todos = ["abhi", "new"];
    },
    setTodos: (state) => {
      state.todos = ["abhi", "new"];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.email = [...action.payload];
      //   console.log(state.email);
    });
  },
});

const persistConfig = {
  key: "todoSlice",
  blacklist: ["loading", "email"],
  storage,
};

export const store = configureStore({
  reducer: {
    todoReducer: persistReducer(persistConfig, storeSlice.reducer),
  },
  middleware: () => new Tuple(thunk),
});

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const { setLoading, setTodos } = storeSlice.actions;

export const persistor = persistStore(store);

export const emailSelector = createSelector(
  (state) => state.todoReducer.email,
  (email) => {
    const newArr = [...email];
    console.log("let's see how many times it's rerendered");
    return newArr;
  }
);
