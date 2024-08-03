import { IProduct } from "./ProductCard.tsx";

type ConfirmationItemProps = {
  product: IProduct;
  quantity: number;
};

export default function ConfirmationItem({
  product,
  quantity,
}: ConfirmationItemProps) {
  return (
    <>
      <div className="flex items-center border-b gap-2 border-custom-100 py-4">
        <img src={product.image.thumbnail} className="rounded-lg w-16" />
        <div className="grid gap-2">
          <h4>{product.name}</h4>
          <div className="flex gap-2">
            <p className="text-primary">{quantity}x</p>
            <p className="text-custom-400">@ ${product.price.toFixed(2)}</p>
          </div>
        </div>
        <p className="text-custom-900 ms-auto">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>
    </>
  );
}
