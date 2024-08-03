import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "@/store/reducers/cart.reducer.ts";
import {
  CircleMinusIcon,
  CirclePlusIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button.tsx";
type ProductCardProps = {
  product: IProduct;
  quantity?: number;
};

export type IProduct = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};

export default function ProductCard({ product, quantity }: ProductCardProps) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center w-fit">
      <picture>
        <source srcSet={product.image.tablet} media="(min-width:720px)" />
        <source srcSet={product.image.desktop} media="(min-width:1025px)" />
        <img src={product.image.mobile} className="object-cover rounded-lg" />
      </picture>
      {quantity ? (
        <Button
          size={"lg"}
          className="w-fit -translate-y-1/2 rounded-full gap-12 px-2 hover:bg-primary"
        >
          <CircleMinusIcon
            className="hover:text-primary hover:fill-white "
            onClick={(event) => {
              event.stopPropagation();
              dispatch(
                quantity > 1
                  ? updateProduct({ product, quantity: -1 })
                  : deleteProduct({ product })
              );
            }}
          />
          <p> {quantity}</p>
          <CirclePlusIcon
            className="hover:text-primary hover:fill-white "
            onClick={(event) => {
              event.stopPropagation();
              dispatch(updateProduct({ product, quantity: 1 }));
            }}
          />
        </Button>
      ) : (
        <Button
          size={"lg"}
          className="gap-4 w-fit -translate-y-1/2 rounded-full border-custom-300 hover:border-primary"
          variant={"outline"}
          onClick={() => dispatch(addProduct({ product }))}
        >
          <ShoppingCartIcon className="text-primary" />
          <p className="font-semibold"> Add to Cart</p>
        </Button>
      )}
      <div className="self-start grid">
        <p className="text-custom-400 ">{product.category}</p>
        <p className="font-bold text-custom-900 ">{product.name}</p>
        <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
