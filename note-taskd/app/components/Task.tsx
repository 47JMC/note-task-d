import type { ChangeEvent, ReactNode } from "react";
import { TiDelete } from "react-icons/ti";

type TaskProps = {
  children: ReactNode;
  completed: boolean;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
};

function Task({ children, completed, change, onDelete }: TaskProps) {
  return (
    <div className="p-3 border-2 transition-all border-blue-800 hover:border-blue-600 rounded-lg flex justify-between items-center m-2">
      <p className="text-xl font-outfit">{children}</p>
      <div>
        <button
          className="p-2 m-1 hover:bg-slate-800 transition-all rounded-lg"
          onClick={onDelete}
        >
          <TiDelete className="fill-red-500" />
        </button>
        <input
          type="checkbox"
          className="checked:bg-green-500"
          id="completedCheck"
          onChange={change}
          defaultChecked={completed}
        />
      </div>
    </div>
  );
}

export default Task;
