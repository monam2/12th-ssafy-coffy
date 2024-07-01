"use client"
import Loading from "@/components/elements/Loading";
import List from "@/components/page/list/List";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    },[])
  return (
    <div className="w-full h-full flex justify-center items-center">
        {isLoading ? <Loading /> : <List />}
    </div>
  );
};

export default Page;
