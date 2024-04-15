"use client";
import {
  emailSelector,
  fetchMessages,
  setLoading,
  todoSelector,
  useAppDispatch,
  useAppSelector,
} from "@/store/Store";
import React, { useEffect } from "react";

export default function Header() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.todoReducer.loading);
  const email = useAppSelector(emailSelector);
  useEffect(() => {
    return () => {
      dispatch(fetchMessages());
    };
  }, []);
  return (
    <header className="text-xl font-bold flex flex-col gap-3">
      {/* <h1>{loading ? "Loading..." : "Everything Loaded"}</h1> */}
      <button
        onClick={() => dispatch(setLoading())}
        className="bg-rose-400 text-black font-bolder py-1 px-4 rounded-md"
      >
        Change the Loading State
      </button>
      {/* <ul className="flex flex-col gap-4 text-xl">
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul> */}
    </header>
  );
}
