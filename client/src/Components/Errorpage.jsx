import React from "react";

export default function Errorpage() {
  return (
    <div className="bg-black">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center bg-black justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h3 className="text-[#e36414] font-semibold">404 Error</h3>
          <p className="text-white text-4xl font-semibold sm:text-5xl">
            Page not found
          </p>
          <p className="text-white">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/"
              className="block py-2 px-4 text-white font-medium bg-[#e36414] hover:bg-[#fb8b24] active:bg-[#e36414] rounded-lg"
            >
              Go back
            </a>
            <a
              href="javascript:void(0)"
              className="block py-2 px-4  hover:bg-gray-700 font-medium duration-150 active:bg-gray-100 border text-white rounded-lg"
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


