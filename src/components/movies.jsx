import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listgroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";

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
    //In  a real world application, we get our state data from the server in this componentDidMount function of the lifecycle hook
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });

    deleteMovie(movie._id);
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

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn
    } = this.state;
    //We filter the list of movies, we check to see if selected genre is truthy. If it's truthy, we're filtering the movies,
    //so we get each movie and we make sure that the id of the genre of that movie equals the id of the selected genre
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleNewMovieSelect = () => {
    console.log("New Movie Button Pressed");
  };

  render() {
    const { length: noOfMovies } = this.state.movies;
    const {
      pageSize,
      currentPage,
      // selectedGenre,
      // movies: allMovies,
      sortColumn
    } = this.state;

    if (noOfMovies === 0) return <p>There are no movies in the database!</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onGenreSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link
              className="btn btn-primary"
              to="/movies/new"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <p>{`Showing ${totalCount} movies in the database.`}</p>

            <MoviesTable
              movies={movies} //movies here is the data from the const object that we get from getPagedData() above;
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            <Pagination
              // itemsCount={this.state.movies.length}
              //itemsCount={noOfMovies} //we used object destructuring earlier to rename this.state.movies.length as noOfMovies
              // itemsCount={filtered.length}
              itemsCount={totalCount}
              // pageSize={this.state.pageSize}
              pageSize={pageSize}
              // pageSize={10}
              onPageChange={this.handlePageChange}
              // currentPage={this.state.currentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
