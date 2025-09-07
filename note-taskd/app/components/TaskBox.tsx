"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import AddBox from "./AddBox";
import Task from "./Task";
import ShareBox from "./ShareBox";

type Task = {
  id: string;
  content: string;
  completed: boolean;
};

function TaskBox() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputState, setInputState] = useState<string>("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAdd = (e: FormEvent) => {
    e.preventDefault();

    if (inputState.trim() === "") return;

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: crypto.randomUUID(), content: inputState.trim(), completed: false },
    ]);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setInputState("");
  };

  // Toggle Task completed status
  const handleTaskComplete =
    (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: e.target.checked } : task
        )
      );
    };

  // Handle task deletion
  const handleTaskDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleShareTasks = async () => {
    const url = new URL(window.location.href + "share");
    url.searchParams.set("tasks", encodeURIComponent(JSON.stringify(tasks)));
    await navigator.clipboard.writeText(url.toString());
  };

  return (
    <div className="m-2">
      <AddBox
        submit={handleTaskAdd}
        change={(e: ChangeEvent<HTMLInputElement>) =>
          setInputState(e.target.value)
        }
      />
      {tasks.map((task: Task) => (
        <Task
          key={task.id}
          completed={task.completed}
          change={handleTaskComplete(task.id)}
          onDelete={() => handleTaskDelete(task.id)}
        >
          {task.content}
        </Task>
      ))}
      <div className="flex justify-center">
        <ShareBox onShare={handleShareTasks}></ShareBox>
      </div>
    </div>
  );
}

export default TaskBox;
