import { FaShare } from "react-icons/fa6";

type ShareBoxProps = {
  onShare: () => void;
};

function ShareBox({ onShare }: ShareBoxProps) {
  return (
    <button
      className="bg-green-600 p-2 rounded-lg transition-colors border-3 border-slate-800 hover:bg-emerald-800"
      onClick={onShare}
    >
      <p className="flex items-center gap-2">
        <FaShare />
        Share
      </p>
    </button>
  );
}

export default ShareBox;
