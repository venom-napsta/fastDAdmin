import React, { useEffect, useState } from 'react';

import './table.css';

const Table = (props) => {
  const initDataShow =
    props.limit && props.bodyData
      ? props.bodyData.slice(0, Number(props.limit))
      : props.bodyData;

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
      setDataShow([...searchTable]);
    } else if (searchString === '') {
      setSearchValue(searchString);
      setDataShow([...dataShow]);
    }
  };
  useEffect(() => {}, [searchValue]);

  if (props.bodyData.length <= 0) return <div>No data found.</div>;
  return (
    <div>
      <div className="relative">
        <div className="topnav__search">
          <div className="flex justify-between">
            <form className="flex items-center" onSubmit={handleSearch}>
              <input
                className="border w-full rounded-md"
                value={searchValue}
                onChange={handleSearch}
                type="text"
                placeholder="Search here..."
              />
              <i onClick={handleSearch} className="ml-1 bx bx-search"></i>
            </form>
          </div>
          <button
            onClick={() => {
              setSearchValue('');
              setDataShow(initDataShow);
            }}
            className="bg-slate-400 p-3 px-5 rounded-md"
          >
            Reset
          </button>
        </div>
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
              <tbody>
                {dataShow.map((item, index) => props.renderBody(item, index))}
              </tbody>
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
    </div>
  );
};

export default Table;
