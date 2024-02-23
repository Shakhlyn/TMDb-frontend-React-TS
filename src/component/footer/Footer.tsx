import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const developer_link = "https://shakhlyn.vercel.app/";

  return (
    <footer className="mt-auto">
      <div className="flex justify-center bg-rose-800 text-slate-200 text-mobile sm:text-sm py-4 ">
        <div className="flex flex-col sm:flex-row ">
          <p> &copy;TMDb {currentYear}. All rights reserved </p>
          <p className="hidden sm:block">
            <span>&nbsp;</span>|<span>&nbsp;</span>
          </p>
          <p>
            Designed and developed by <span>&nbsp;</span>
            <a href={developer_link}>
              <span className="hover:text-yellow-500 ">-- Shakhlyn</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
