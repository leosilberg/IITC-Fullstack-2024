import { clearCart } from "@/store/reducers/cart.reducer.ts";
import { RootState } from "@/store/store.ts";
import { DialogClose } from "@radix-ui/react-dialog";
import { CircleCheckIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationItem from "./ConfirmationItem.tsx";
import { Button } from "./ui/button.tsx";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog.tsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "./ui/drawer.tsx";

type ConfirmationProps = {};

export default function Confirmation({}: ConfirmationProps) {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function resetCart() {
    dispatch(clearCart({}));
  }
  if (isMobile) {
    return (
      <>
        <Drawer onClose={resetCart}>
          <DrawerTrigger asChild>
            <Button className="rounded-full" size={"lg"}>
              Confirm Order
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-8 gap-4">
            <ConfirmationContent />
            <DrawerClose asChild>
              <Button className="rounded-full">Start New Order</Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  return (
    <>
      <Dialog onOpenChange={(open) => !open && resetCart()}>
        <DialogTrigger asChild>
          <Button className="rounded-full" size={"lg"}>
            Confirm Order
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ConfirmationContent />
          <DialogClose asChild>
            <Button className="rounded-full">Start New Order</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ConfirmationContent({}: ConfirmationProps) {
  const cart = useSelector((state: RootState) => state.cart);
  const total = useMemo(() => {
    return cart.reduce(
      (prev, item) => prev + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <div className="grid gap-4">
      <CircleCheckIcon color="#1EA575" size={"32px"} />
      <h1 className="text-4xl font-bold">Order Confirmed</h1>
      <p>We hope you enjoy your food</p>
      <div className="bg-custom-50 p-4 rounded-lg grid gap-2">
        <ul>
          {cart.map((item) => {
            return (
              <li key={item.product.name}>
                <ConfirmationItem
                  product={item.product}
                  quantity={item.quantity}
                />
              </li>
            );
          })}
        </ul>
        <div className="flex justify-between items-center">
          <p>Order Total</p>
          <h3 className="font-bold text-2xl">${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}
