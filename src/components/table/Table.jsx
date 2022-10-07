import React, { useEffect, useState } from 'react';
// import { FaFilter, FaSortAlphaUpAlt } from 'react-icons/fa';

import './table.css';

const Table = (props) => {
  const initDataShow =
    props.limit && props.bodyData
      ? props.bodyData.slice(0, Number(props.limit))
      : props.bodyData;

  const [sortOption, setSortOption] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [tableFilter, setTableFilter] = useState([]);
  const [dataShow, setDataShow] = useState(initDataShow);
  const [searchValue, setSearchValue] = useState('');
  const [currPage, setCurrPage] = useState(0);

  let pages = 1;

  let range = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.bodyData.slice(start, end));

    setCurrPage(page);
  };

  const handleSearch = (e) => {
    let searchString = e.target.value;
    e.preventDefault();
    if (searchString !== '') {
      setSearchValue(searchString);
      const searchTable = dataShow.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(searchString.toLowerCase())
        )
      );
      setTableFilter([...searchTable]);
    } else if (searchString === '') {
      setSearchValue(searchString);
      setDataShow([...dataShow]);
    }
  };

  const handleFilter = (e) => {
    let filterValue = e.target.value;
    e.preventDefault();
    if (filterValue !== 'all') {
      setSearchValue(filterValue);
      const searchTable = dataShow.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(filterValue.toLowerCase())
        )
      );
      setTableFilter([...searchTable]);
    } else if (filterValue === 'all') {
      setFilterValue(filterValue);
      setDataShow([...dataShow]);
    }
  };

  const sortOptions = [
    'date',
    'name',
    'trips',
    'amount',
    // { value: 'date', label: 'Date' },
    // { value: 'name', label: 'Name' },
    // { value: 'trips', label: 'Trips' },
    // { value: 'amount', label: 'Amount' },
  ];

  const handleSort = (e) => {
    let value = e.target.value;
    setSortOption(value);
    console.log('Sort Value', sortOption);
  };

  if (props.bodyData.length <= 0) return <div>No data found.</div>;
  return (
    <div>
      {/* <div className="flex flex-row mb-1 sm:mb-0 topnav__search mx-2">
        <div className="mx-3 border border-r-0 p-3 border-gray-400-200">
          <FaSortAlphaUpAlt />
        </div>
        <form className="relative flex items-center">
          <select
            name="sort"
            onChange={handleSort}
            value={sortOption}
            className="ml-2 h-full border-l-0 rounded-r border sm:border-l-0 border-r border-b block appearance-none bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
          >
            {sortOptions.map((item, idx) => (
              <option value={item} key={idx}>
                {item + ' '}
              </option>
            ))}
          </select>
        </form>
        <div className="mx-3 border border-r-0 p-3 border-gray-400-200">
          <FaFilter />
        </div>
        <div className="relative flex items-center ">
          <label htmlFor="date">Time </label>
          <select
            name="date"
            id="date"
            className="ml-2 h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option>All</option>
            <option>0-24 hrs</option>
            <option>24-48 hrs</option>
            <option>2-7 days</option>
            <option>Last 2 weeks</option>
            <option>Last 1 month</option>
          </select>
        </div>
        <div className="relative flex items-center ">
          <label htmlFor="coutry">Country </label>
          <select
            name="country"
            onChange={handleFilter}
            value={filterValue}
            className="ml-2 h-full rounded-r border sm:rounded sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
          >
            <option value=""></option>
            <option value="zw">Zimbabwe</option>
            <option value="za">South Africa</option>
          </select>
        </div>
      </div>
      <div className="relative">
        <div className="topnav__search">
          <div className="flex justify-between">
            <form className="flex items-center" onSubmit={handleSearch}>
              <input
                className="border w-full rounded-md pl-10"
                value={searchValue}
                onChange={handleSearch}
                type="text"
                placeholder="Search here..."
              />
              <i
                onClick={handleSearch}
                className="absolute left-3 bx bx-search"
              ></i>
            </form>
          </div>
          <button
            onClick={() => {
              setSearchValue('');
              setDataShow(initDataShow);
            }}
            className="border-solid border hover:bg-slate-400 p-2 px-5 rounded-md"
          >
            Reset
          </button>
        </div> */}
      <div className="table-wrapper">
        <table>
          {props.headData && props.renderHead ? (
            <thead>
              <tr>
                {props.headData.map((item, index) =>
                  props.renderHead(item, index)
                )}
              </tr>
            </thead>
          ) : null}
          {props.bodyData && props.renderBody ? (
            <>
              {searchValue.length > 0 ? (
                <tbody>
                  {tableFilter.map((item, index) =>
                    props.renderBody(item, index)
                  )}
                </tbody>
              ) : (
                <tbody>
                  {dataShow.map((item, index) => props.renderBody(item, index))}
                </tbody>
              )}
            </>
          ) : (
            <div>No data found.</div>
          )}
        </table>
      </div>
      {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index ? 'active' : ''
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
