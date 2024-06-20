import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function Pagination({ meta, onPageChange }) {
  const { current_page, last_page } = meta

  const handlePageChange = page => {
    if (page >= 1 && page <= last_page) {
      onPageChange(page)
    }
  }

  const generatePageNumbers = () => {
    const pageNumbers = []
    const totalPages = last_page
    const current = current_page
    const delta = 2
    const left = current - delta
    const right = current + delta + 1
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className='mb-3 mt-5'>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to{' '}
            <span className="font-medium">{meta.to}</span> of{' '}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageChange(current_page - 1)}
              disabled={current_page === 1}
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {generatePageNumbers().map((pageNumber, index) =>
              typeof pageNumber === 'number' ? (
                <button
                  key={index}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    current_page === pageNumber
                      ? 'bg-blue-500 text-white focus:outline focus:ring-2 focus:ring-indigo-500'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  } focus:z-20 focus:outline-offset-0`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ) : (
                <span key={index} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700">
                  {pageNumber}
                </span>
              )
            )}
            <button
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageChange(current_page + 1)}
              disabled={current_page === last_page}
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
