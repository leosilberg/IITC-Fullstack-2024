import { Form } from "react-router-dom";
import Input from "./ui/Input.jsx";

export default function Filter({ searchParams, onChange }) {
  return (
    <>
      <Form
        key={searchParams}
        className="flex items-center justify-center gap-4 py-4"
      >
        <Input
          type="text"
          name="name"
          placeholder="Search"
          defaultValue={searchParams.get("name")}
          onChange={onChange}
        />
        <Input
          type="text"
          name="priceMin"
          placeholder="Price (Min)"
          defaultValue={searchParams.get("priceMin")}
          onChange={onChange}
        />
        <Input
          type="text"
          name="priceMax"
          placeholder="Price (Max)"
          defaultValue={searchParams.get("priceMax")}
          onChange={onChange}
        />
        <input
          type="checkbox"
          name="quantity"
          placeholder="Quantity"
          defaultChecked={searchParams.get("quantity")}
          value={searchParams.get("quantity") ? "" : "1"}
          onChange={onChange}
        />
        <Input
          type="text"
          name="category"
          placeholder="Category"
          defaultValue={searchParams.get("category")}
          onChange={onChange}
        />
      </Form>
    </>
  );
}
