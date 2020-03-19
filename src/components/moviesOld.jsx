import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listgroup";
// import MoviesTable from "./moviesTable";
import _ from "lodash";
import Like from "./common/like";

//********When we update a state of a component, that component and all its children are re-rendered */

class Movies extends Component {
  state = {
    movies: [], //movies and genres set to empty arrays because it takes time to get data from the server. We want to make sure movies/genres are not undefined, otherwise we get a runtime error
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  //This method is called when an instance of this component is rendered in the DOM
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    //In  a real world application, we get our state data from the server in this componentDidMount function of the lifecycle hook.
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    // console.log("Like clicked", movie);
    const movies = [...this.state.movies]; //declare a constant movies and clone the movies array of objects in the state above
    const index = movies.indexOf(movie); //Now we have an array of objects, we dont want to modify one of those objects directly, we want to clone the object. So in this array, first we need to find the index of that object and store it in this constant index.
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    // console.log(path);
    // this.setState({ sortColumn: { path: path, order: "asc" } });
    this.setState({ sortColumn });
  };

  render() {
    const { length: noOfMovies } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn
    } = this.state;

    if (noOfMovies === 0) return <p>There are no movies in the database!</p>;

    //We filter the list of movies, we check to see if selected genre is truthy. If it's truthy, we're filtering the movies,
    //so we get each movie and we make sure that the id of the genre of that movie equals the id of the selected genre
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>{`Showing ${filtered.length} movies in the database.`}</p>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th onClick={() => this.raiseSort("title")}>Title</th>
                <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
                <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
                <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((
                movie //the movies array here on line above is the movies const above inside the render method
              ) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            // itemsCount={this.state.movies.length}
            //itemsCount={noOfMovies} //we used object destructuring earlier to rename this.state.movies.length as noOfMovies
            itemsCount={filtered.length}
            // pageSize={this.state.pageSize}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            // currentPage={this.state.currentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

// ////***************************8 Movies Table old */

// import React, { Component } from "react";
// import Like from "./common/like";
// // import TableHeader from "./common/tableHeader";
// import TableBody from "./common/tableBody";

// class MoviesTable extends Component {
//   raiseSort = path => {
//     const sortColumn = { ...this.props.sortColumn };
//     if (sortColumn.path === path) {
//       sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
//     } else {
//       sortColumn.path = path;
//       sortColumn.order = "asc";
//     }
//     this.props.onSort(sortColumn);
//   };

//   columns = [
//     { path: "title", label: "Title" },
//     { path: "genre.name", label: "Genre" },
//     { path: "numberInStock", label: "Stock" },
//     { path: "dailyRentalRate", label: "Rate" },
//     {
//       key: "like",
//       content: movie => (
//         <Like liked={movie.liked} onClick={() => onLike(movie)} />
//       )
//     },
//     {
//       key: "delete",
//       content: (
//         <button
//           onClick={() => onDelete(movie)}
//           className="btn btn-danger btn-sm"
//         >
//           Delete
//         </button>
//       )
//     }
//   ];

//   render() {
//     const { movies, onDelete, onLike, onSort, sortColumn } = this.props;

//     return (
//       <table className="table">
//         <thead className="thead-dark">
//           <tr>
//             <th onClick={() => this.raiseSort("title")}>Title</th>
//             <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
//             <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
//             <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
//             <th></th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {movies.map((
//             movie //the movies array here on line above is the movies const above inside the render method
//           ) => (
//             <tr key={movie._id}>
//               <td>{movie.title}</td>
//               <td>{movie.genre.name}</td>
//               <td>{movie.numberInStock}</td>
//               <td>{movie.dailyRentalRate}</td>
//               <td>
//                 <Like liked={movie.liked} onClick={() => onLike(movie)} />
//               </td>
//               <td>
//                 <button
//                   onClick={() => onDelete(movie)}
//                   className="btn btn-danger btn-sm"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   }
// }

// export default MoviesTable;
