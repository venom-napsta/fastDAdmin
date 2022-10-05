import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  // ret smallest int greater than or equal to
  // also det the # of page divisions
  // if there are 8 movies & pageSize=3 then 8/3 === 1, 2, 3 pages

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <div className="table__pagination">
        {pages.map((page) => (
          <div
            key={page}
            className={`table__pagination-item ${
              currentPage === page ? 'active' : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </div>
        ))}
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
