import { useSelector } from "react-redux";
import Cart from "./components/Cart.tsx";
import ProductCard from "./components/ProductCard.tsx";
import data from "./data/data.json";
import { RootState } from "./store/store.ts";
type AppProps = {};

export default function App({}: AppProps) {
  const cart = useSelector((state: RootState) => state.cart);
  return (
    <div className="p-8 sm:p-16 flex flex-wrap gap-8 items-start bg-custom-50">
      <div className="grid gap-8 flex-grow-[5]">
        <h1 className="font-bold text-4xl">Desserts</h1>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
          {data.map((product, index) => {
            const quantity = cart.find(
              (item) => item.product.name === product.name
            )?.quantity;
            return (
              <li key={index}>
                <ProductCard product={product} quantity={quantity} />
              </li>
            );
          })}
        </ul>
      </div>
      <Cart />
    </div>
  );
}
