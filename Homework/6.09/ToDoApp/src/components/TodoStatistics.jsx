export default function TodoStatistics(props) {
  return (
    <div className="statistics__container">
      <div>
        <p>Total</p>
        <p> {props.totalTodos}</p>
      </div>
      <div>
        <p>Completed</p>
        <p> {props.completedToDos}</p>
      </div>
      <div>
        <p>Active</p>
        <p> {props.totalTodos - props.completedToDos}</p>
      </div>
      <progress max={props.totalTodos} value={props.completedToDos} className="statistics__progress"></progress>
    </div>
  );
}
