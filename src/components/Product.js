import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { Prime } from "../assets";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);

  const [hasPrime, setIsPrimeEnabled] = useState(0);

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setIsPrimeEnabled(Math.random() < 0.5);
  }, []);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };

  return (
    <div className="priority={true} relative z-30 m-5 flex flex-col items-center bg-white p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image
        src={image}
        height={200}
        width={200}
        alt="image"
        objectFit="contain"
      />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => {
            <StarIcon className="h-5 text-yellow-500" />;
          })}
      </div>

      <p className="my-2 text-xs line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>

      {hasPrime && (
        <div className="-mt-5 flex items-center space-x-2">
          <Image width={70} height={70} src={Prime} alt="prime" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="button mt-auto">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
