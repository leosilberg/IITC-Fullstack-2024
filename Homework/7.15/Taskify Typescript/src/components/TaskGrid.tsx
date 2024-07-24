import TaskCard from "./TaskCard.jsx";

export default function TaskGrid({ tasks }) {
  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] items-start gap-8">
        {tasks?.map((task) => {
          return (
            <li key={task._id}>
              <TaskCard task={task} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
