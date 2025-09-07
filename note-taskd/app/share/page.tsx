"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Task from "../components/Task";

type Task = {
  id: string;
  content: string;
  completed: boolean;
};

function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Get tasks from URL params
    const urlParams = new URLSearchParams(window.location.search).get("tasks");

    const storedTasks = urlParams ? decodeURIComponent(urlParams) : null;
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Failed to parse tasks from parameters:", error);
      }
    }
  }, []);

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

  return (
    <>
      <div className="m-2">
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
      </div>
    </>
  );
}

export default Page;
