"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { SiMattermost } from "react-icons/si";


const Footer = () => {

  const moveTo = (path: string) => {
    switch (path) {
      case "github":
        window.open('https://github.com/monam2', '_blank');
        break;
      case "instagram":
        window.open('https://instagram.com/wxooo_kk', '_blank');
        break;
      case "mattermost":
        window.open('https://meeting.ssafy.com/s11public/messages/@kangcw0107', '_blank');
        break;
    }
  };
  return (
    <div className="w-full h-16 flex justify-end pr-10 items-center gap-6 bg-slate-200 dark:bg-slate-600">
      <FaGithub
        onClick={() => moveTo("github")}
        className="w-7 h-7 opacity-50 cursor-pointer"
      />
      <FaInstagram
        onClick={() => moveTo("instagram")}
        className="w-7 h-7 opacity-50 cursor-pointer"
      />
      <SiMattermost
        onClick={() => moveTo("mattermost")}
        className="w-6 h-6 opacity-50 cursor-pointer"
      />
    </div>
  );
};

export default Footer;
