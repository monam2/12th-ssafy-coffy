"use client";
import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <ClipLoader size={120} color="#8a8a8a" />
    </div>
  );
};

export default Loading;
