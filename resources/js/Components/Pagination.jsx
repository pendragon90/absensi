import React from "react";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";

function Pagination({ meta, onPageChange }) {
  const { current_page, last_page } = meta;

  // Function to handle page change
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  // Generate page numbers
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const totalPages = last_page;

    // If total pages is less than or equal to 10, display all page numbers
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // If total pages is greater than 10, display 3 page numbers before current page,
      // current page, 3 page numbers after current page, and ellipsis
      let startPage = current_page - 3;
      let endPage = current_page + 3;

      if (startPage < 1) {
        startPage = 1;
        endPage = startPage + 6;
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - 6;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageChange(current_page - 1)}
              disabled={current_page === 1}
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
            </a>
            {generatePageNumbers().map((pageNumber) => (
              <a
                key={pageNumber}
                href="#"
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${current_page === pageNumber ? 'bg-blue-500 text-white focus:outline focus:ring-2 focus:ring-indigo-500' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </a>
            ))}
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageChange(current_page + 1)}
              disabled={current_page === last_page}
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
