import type { ChangeEvent, FormEvent } from "react";

type AddBoxProps = {
  submit: (e: FormEvent) => void;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
};

function AddBox({ submit, change }: AddBoxProps) {
  return (
    <form
      onSubmit={(e) => {
        submit(e);
        e.currentTarget.reset();
      }}
      className="flex rounded-lg justify-center items-center *:transition-colors m-2 font-fredoka"
    >
      <input
        type="text"
        className="bg-indigo-950 m-2 rounded-sm p-2"
        placeholder="Type Something..."
        onChange={change}
      />
      <button
        type="submit"
        className="p-2 rounded-lg bg-green-700 hover:bg-green-900 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}

export default AddBox;
