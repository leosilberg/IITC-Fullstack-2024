import { RootState } from "@/store/store.ts";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import TreeIcon from "../assets/images/icon-carbon-neutral.svg";
import EmptyCart from "../assets/images/illustration-empty-cart.svg";
import CartItem from "./CartItem.tsx";
import Confirmation from "./Confirmation.tsx";
type CartProps = {};

export default function Cart({}: CartProps) {
  const cart = useSelector((state: RootState) => state.cart);
  const total = useMemo(() => {
    return cart.reduce(
      (prev, item) => prev + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <div className="bg-white grid gap-4 p-8 flex-grow rounded-lg ">
      <h2 className="text-primary text-2xl font-bold">
        Your Cart ({cart.length})
      </h2>

      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => {
              return (
                <li key={item.product.name}>
                  <CartItem product={item.product} quantity={item.quantity} />
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between items-center">
            <p>Order Total</p>
            <h3 className="font-bold text-2xl">${total.toFixed(2)}</h3>
          </div>

          <div className="bg-custom-50 p-4 flex justify-center gap-2 rounded-lg">
            <img src={TreeIcon} />
            <p>
              This is a <span className="font-bold">carbon neutral</span>{" "}
              delivery
            </p>
          </div>
          <Confirmation />
        </>
      ) : (
        <>
          <img src={EmptyCart} className="justify-self-center" />
          <p className="text-custom-500 justify-self-center">
            Your added items will appear here
          </p>
        </>
      )}
    </div>
  );
}
