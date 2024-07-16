import { useDispatch, useSelector } from "react-redux";
import {
  addPerson,
  deletePersonAsync,
} from "./store/reducers/person.reducer.js";

export default function App() {
  const people = useSelector((state) => state.people);
  const dispatch = useDispatch();
  return (
    <>
      {people.map((person) => {
        return <p>{person.name}</p>;
      })}
      <button onClick={() => dispatch(deletePersonAsync({ name: "James" }))}>
        Delete
      </button>
      <button onClick={() => dispatch(addPerson({ name: "James", age: 22 }))}>
        Add
      </button>
    </>
  );
}
