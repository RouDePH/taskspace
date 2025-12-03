import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { Todo } from "~/shared";
import { classNames } from "~/utils";

const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ??
  (import.meta.env.DEV ? "http://localhost:3000/api/v1" : "/api/v1");

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setError(null);
        const response = await fetch(`${API_BASE}/todos`);
        if (!response.ok) {
          throw new Error("Failed to load todos");
        }
        const data = (await response.json()) as Todo[];
        setTodos(
          data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );

  const createTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) {
      setError("Enter a task title");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: draft }),
      });
      if (!response.ok) {
        throw new Error("Failed to create todo");
      }
      const todo = (await response.json()) as Todo;
      setTodos((prev) => [todo, ...prev]);
      setDraft("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPending(false);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    setPending(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      const updated = (await response.json()) as Todo;
      setTodos((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPending(false);
    }
  };

  const removeTodo = async (id: string) => {
    setPending(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Demo setup</p>
        <h1>Todo list with API and storage</h1>
        <div className="chips">
          <span className="chip">React</span>
          <span className="chip">NestJS</span>
          <span className="chip">Postgres + TypeORM</span>
        </div>
      </header>

      <section className="panel">
        <form className="composer" onSubmit={createTodo}>
          <div>
            <label htmlFor="newTodo">New task</label>
            <input
              id="newTodo"
              name="newTodo"
              type="text"
              placeholder="For example: build docker image"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              disabled={pending}
            />
          </div>
          <button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Add"}
          </button>
        </form>
        {error ? <p className="error">{error}</p> : null}
        <div className="meta">
          <span>Total: {todos.length}</span>
          <span>Done: {completedCount}</span>
        </div>
        {loading ? (
          <p className="muted">Loading todos...</p>
        ) : todos.length === 0 ? (
          <p className="muted">List is empty — time to add a task.</p>
        ) : (
          <ul className="list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={classNames("list-item", todo.completed && "done")}
              >
                <label className="todo-title">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(event) =>
                      toggleTodo(todo.id, event.target.checked)
                    }
                  />
                  <span>{todo.title}</span>
                </label>
                <div className="actions">
                  <span className="timestamp">
                    {new Date(todo.createdAt).toLocaleString()}
                  </span>
                  <button
                    className="ghost"
                    onClick={() => removeTodo(todo.id)}
                    disabled={pending}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
