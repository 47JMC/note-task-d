import TaskBox from "./components/TaskBox";
import UserProfile from "./components/UserProfile";

function page() {
  return (
    <>
      <div className="flex justify-center items-center"></div>
      <UserProfile />
      <TaskBox />
    </>
  );
}

export default page;
