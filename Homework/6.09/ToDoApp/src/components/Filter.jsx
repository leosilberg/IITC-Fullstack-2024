import { useRef } from "react";

function Filter(props) {
  const titleFilterRef = useRef(null);
  const statusFilterRef = useRef(null);
  function onFilterChange() {
    props.setFilter({
      title: titleFilterRef.current.value,
      isComplete:
        statusFilterRef.current.value === "all"
          ? [true, false]
          : [statusFilterRef.current.value==="completed"],
    });
  }

  return (
    <div className="filter__container">
      <input type="text" ref={titleFilterRef} onChange={onFilterChange} />
      <select
        onChange={onFilterChange}
        defaultValue="all"
        ref={statusFilterRef}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="active">Active</option>
      </select>
    </div>
  );
}
export default Filter;
