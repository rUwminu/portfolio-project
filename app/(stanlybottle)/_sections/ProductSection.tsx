"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import BottleImg from "../_assets/images/black-bottle.png";

const ProductSection = () => {
  const products = [
    {
      name: "black",
      type: "casual",
      tag: "lat:// black series",
      image: BottleImg.src,
      target: ["low profile"],
    },
    {
      name: "navy blue",
      type: "balance",
      tag: "lat:// navy blue series",
      image: BottleImg.src,
      target: ["low profile", "energetic"],
    },
    {
      name: "crimson ",
      type: "outdoor",
      tag: "lat:// crimson series",
      image: BottleImg.src,
      target: ["energetic"],
    },
  ];

  useGSAP(() => {
    // When enter this section
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".product-section",
          start: "top 40%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        },
      })
      .to(".body-bg", {
        backgroundColor: "#000000",
        duration: 0.6,
        ease: "power1.inOut",
      })
      .to(
        ".card-wrapper",
        {
          backgroundColor: "#303035",
          ease: "power1.inOut",
        },
        "<",
      )
      .to(
        ".card-text",
        {
          color: "#ffffff",
          ease: "power1.inOut",
        },
        "<",
      );
  });

  return (
    <section className="product-section relative w-full min-h-dvh">
      <div
        className="flex flex-wrap items-center justify-between gap-6 pb-14 md:pb-20 lg:pb-40 pl-4 md:pl-8 lg:pl-14 pr-8 md:pr-20 lg:pr-40"
        style={{ mixBlendMode: "difference" }}
      >
        <h1
          className="text-8xl  text-nowrap font-medium tracking-tighter"
          style={{
            color: "white",
          }}
        >
          Standy Bottles
        </h1>

        <p className="text-white text-nowrap">
          we add new designs to our range of formulations every season. <br />
          to get them ahead of genaral release, sign up for our pioneer <br />
          program. you can find out more here.
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 md:px-8 lg:px-14">
        {products.map((x, idx) => (
          <ProductCard key={idx} {...x} />
        ))}
      </div>
    </section>
  );
};

interface ProductCardProps {
  name: string;
  type: string;
  tag: string;
  image: string;
  target: Array<string>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  type,
  tag,
  image,
  target,
}) => {
  return (
    <div
      className="card-wrapper w-full h-full flex flex-col p-4 bg-white rounded-md"
      style={{
        boxShadow: "0px 0px 26px -8px rgba(0,0,0,0.2)",
      }}
    >
      <h1 className="card-text text-6xl text-black tracking-tight">{name}</h1>

      <div className="flex items-center justify-between">
        <span className="card-text text-black">{tag}</span>

        <span className="card-text text-black">{type}</span>
      </div>

      <div className="flex items-center justify-center w-full h-[400px] xl:h-[500px] 2xl:h-[600px]">
        <img
          src={image}
          className="h-full aspect-square object-cover"
          alt="product-bottle"
        />
      </div>

      <div className="flex items-center justify-between py-2 border-t border-zinc-400">
        <span className="text-zinc-400">
          target state:{" "}
          <span className="card-text text-black">
            {target.map((t, idx) => {
              return idx > 0 ? ` + ${t}` : t;
            })}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProductSection;
