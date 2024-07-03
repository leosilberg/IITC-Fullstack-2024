import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { UserService } from "../services/user.service.js";
import ProductCard from "../components/ProductCard.jsx";
import UserDetails from "../components/UserDetails.jsx";
import { useUserContext } from "../contexts/UserContext.jsx";
import { useEffect } from "react";

export async function userProfileLoader({ params }) {
  try {
    const { data: products } = await UserService.getUserProducts();
    console.log(`UserProfilePage: `, products);
    return products;
  } catch (error) {
    console.log(`UserProfilePage: `, error);
    return redirect("/login");
  }
}
export default function UserProfilePage() {
  const { user } = useUserContext();

  useEffect(() => {
    console.log(`UserProfilePage: `, user);
  }, [user]);

  const products = useLoaderData();

  return (
    <>
      <div className="flex flex-col px-16">
        <UserDetails />
        <ul className="grid flex-grow grid-cols-[repeat(auto-fill,minmax(250px,1fr))] items-start gap-8">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
}
