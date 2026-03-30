"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-1 items-start justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-8">
          ToDo
        </h1>

        {/* 入力フォーム */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
          className="flex gap-2 mb-8"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="新しいタスクを入力..."
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm
                       outline-none transition-colors
                       focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100
                       placeholder:text-zinc-400"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white
                       transition-colors hover:bg-zinc-700 active:bg-zinc-800
                       disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!input.trim()}
          >
            追加
          </button>
        </form>

        {/* タスク一覧 */}
        {todos.length === 0 ? (
          <p className="text-center text-sm text-zinc-400 py-12">
            タスクがありません
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center gap-3 rounded-lg border border-zinc-100 bg-white px-4 py-3
                           transition-colors hover:border-zinc-200"
              >
                {/* チェックボックス */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors
                    ${
                      todo.completed
                        ? "border-zinc-900 bg-zinc-900"
                        : "border-zinc-300 hover:border-zinc-400"
                    }`}
                  aria-label={todo.completed ? "未完了にする" : "完了にする"}
                >
                  {todo.completed && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>

                {/* タスク名 */}
                <span
                  className={`flex-1 text-sm transition-colors ${
                    todo.completed
                      ? "text-zinc-400 line-through"
                      : "text-zinc-900"
                  }`}
                >
                  {todo.text}
                </span>

                {/* 削除ボタン */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 rounded p-1 text-zinc-400
                             transition-all hover:bg-zinc-100 hover:text-zinc-600"
                  aria-label="削除"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* フッター（タスクがある場合） */}
        {todos.length > 0 && (
          <p className="mt-4 text-xs text-zinc-400 text-right">
            {todos.filter((t) => !t.completed).length} 件の未完了タスク
          </p>
        )}
      </div>
    </div>
  );
}
