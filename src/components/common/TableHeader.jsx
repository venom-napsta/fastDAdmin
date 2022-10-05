import React from 'react';

// Interface
// 1. columns array
// 2. sortColumn: object
// 3. onSort: fn

function TableHeader(props) {
  const raiseSort = (path) => {
    // sort asc by default else desc on 2nd click

    // const sortColumn = { ...this.props.sortColumn }
    const sortColumn = { ...props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    //raise sort event
    props.onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    const { sortColumn } = props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  return (
    <thead className="clickable">
      <tr>
        {props.columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
