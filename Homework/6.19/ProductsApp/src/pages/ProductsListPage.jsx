import { useEffect, useState } from "react";
import {
  Form,
  Outlet,
  redirect,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { useDebounceCallback } from "../hooks/useDebounce.jsx";
import { ProductsService } from "../services/products.service.js";
import Pagebar from "../components/Pagebar.jsx";
import Filter from "../components/Filter.jsx";

export async function productsLoader({ params, request }) {
  const { searchParams } = new URL(request.url);
  const filters = Object.fromEntries(searchParams);
  if (!filters.pageCount && !filters.pageNum) {
    searchParams.set("pageNum", 1);
    searchParams.set("pageCount", 5);
    return redirect("?" + searchParams.toString(), {
      replace: true,
    });
  }
  const abortController = new AbortController();
  try {
    console.log("Load products");
    const { data } = await ProductsService.loadProducts(
      filters,
      abortController.signal,
    );
    console.log("Finished load products");

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default function ProductsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = useSubmit();
  const debouncedFilter = useDebounceCallback((event) => {
    const filters = new FormData(event.target.form);

    submit(
      {
        ...filters
          .entries()
          .reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {}),
        pageNum: 1,
        pageCount: searchParams.get("pageCount"),
      },
      { replace: searchParams.size > 2 },
    );
  }, 500);

  const data = useLoaderData();
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-grow flex-col px-8">
      <Filter searchParams={searchParams} onChange={debouncedFilter} />

      <ul className="grid flex-grow grid-cols-[repeat(auto-fill,minmax(250px,1fr))] items-start gap-8">
        {data.products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </ul>

      <Pagebar
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onClick={(page) => {
          setSearchParams((prev) => ({
            ...Object.fromEntries(prev),
            pageNum: page,
          }));
        }}
      />
      <Outlet />
    </div>
  );
}
