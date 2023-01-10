import React,{useState,useEffect}from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  const [movies,setMovies] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  // const [btnClicked,setBtnClicked] = useState(false);

  // useEffect(()=>{
  //   if(btnClicked){
  //     fetch("")
  //   }
  // },[])

const  fetchMovieHandler = async() => {
   setIsLoading(true);
   const response = await fetch("https://swapi.dev/api/films/");

   const data = await response.json();

   const transformedMovies = data.results.map((movie)=>{
     return{
       id: movie.episode_id,
       title:movie.title,
     
     }
   });

   setMovies(transformedMovies);
   setIsLoading(false);
}

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies && <MoviesList movies={movies} />}
        {isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
