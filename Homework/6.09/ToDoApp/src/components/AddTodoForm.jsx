import { useRef } from "react";

function AddTodoForm(props) {
  const newTitleRef = useRef(null);
  function onSubmit(event) {
    event.preventDefault();
    console.log(newTitleRef.current.value);
    props.createToDo(newTitleRef.current.value);
    newTitleRef.current.value = "";
    newTitleRef.current.focus();
  }
  return (
    <form onSubmit={onSubmit} className="form__container">
     <div>
        <label className="form__title">Title</label>
        <input type="text" ref={newTitleRef} />
     </div>
      <button className="form__button">Add</button>
    </form>
  );
}

export default AddTodoForm;
