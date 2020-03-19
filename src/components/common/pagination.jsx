import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  // console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize); //Math.ceil because pagesCount becomes a float. We need integer values to check how many items in page (to render the page number at all or not)
  // console.log(pagesCount);
  if (pagesCount === 1) return null;
  //[1 to pagesCount].map()
  const pages = _.range(1, pagesCount + 1); //range function from lodash, to return an array with the numbers from 1 to (pagesCount + 1). +1 because range returns one less than pagesCount

  return (
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : " page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

//Type checking with PropTypes package

/*Adding all the props for our component in an object. We add
 all the props, their corresponding types and whether they're 
required or not. .number, .func, .boolean are validators to 
indicate wheter the prop should number, function or a string */
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
