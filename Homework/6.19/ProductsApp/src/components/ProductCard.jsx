import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <>
      <li
        className="flex flex-col gap-4 rounded-lg px-8 py-8 shadow-lg"
        onClick={() => navigate("/products/" + product._id)}
      >
        <img src="https://placehold.co/200" alt="" className="object-contain" />
        <p className="text-lg font-bold">{product.name}</p>
        <p>{product.price}</p>
        <p>{product.quantity}</p>
        <p>{product.category}</p>
      </li>
    </>
  );
}
