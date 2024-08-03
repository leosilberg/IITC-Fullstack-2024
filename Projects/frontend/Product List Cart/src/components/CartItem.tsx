import { deleteProduct } from "@/store/reducers/cart.reducer.ts";
import { CircleX } from "lucide-react";
import { useDispatch } from "react-redux";
import { IProduct } from "./ProductCard.tsx";

type CartItemProps = {
  product: IProduct;
  quantity: number;
};

export default function CartItem({ product, quantity }: CartItemProps) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between border-b border-custom-100 py-4">
      <div className="grid gap-2">
        <h4>{product.name}</h4>
        <div className="flex gap-2">
          <p className="text-primary">{quantity}x</p>
          <p className="text-custom-400">@ ${product.price.toFixed(2)}</p>
          <p className="text-custom-500">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <CircleX
        className="cursor-pointer hover:text-custom-900 text-custom-300"
        onClick={() => dispatch(deleteProduct({ product }))}
      />
    </div>
  );
}
