import React from 'react';
import lodash from 'lodash';

function TableBody({ data, columns }) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return lodash.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;

// export class TableBody extends Component {
//     render() {
//         const { data, onDelete, onLike} = this.props
//         return (
//             <tbody>
//                 {
//                     // maps and displays all the movies in the state
//                     data.map(movie => (
//                         <tr key={movie._id}>
//                             <td>{movie.title}</td>
//                             <td>{movie.genre.name}</td>
//                             <td>{movie.numberInStock}</td>
//                             <td>{movie.dailyRentalRate}</td>
//                             <td><Like liked={movie.liked} onClick={() => onLike(movie)} /></td>
//                             <td><button onClick={() => onDelete(movie)} >Delete</button></td>
//                         </tr>
//                     ))}
//             </tbody>
//         )
//     }
// }
