import React from "react";
import { PaginationProps } from "../types/interface";

const Pagination: React.FC<PaginationProps> = () => {
  return (
    <>
      <div className="flex justify-center">
        <nav aria-label="Transaction pagination">
          <ul className="flex list-style-none">
            <li className="">
              <a
                className="relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                href="#top"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="">
              <a
                className="relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#top"
              >
                1
              </a>
            </li>
            <li className="">
              <a
                className="relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#top"
              >
                2
              </a>
            </li>
            <li className="">
              <a
                className="relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#top"
              >
                3
              </a>
            </li>
            <li className="">
              <a
                className="relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#top"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Pagination;