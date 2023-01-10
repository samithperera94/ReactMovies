import React,{useState,useEffect, useCallback}from 'react';

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
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState(false);
  // const [btnClicked,setBtnClicked] = useState(false);

  

const  fetchMovieHandler = useCallback(async() => {
   setIsLoading(true);
   setError(false)
   try{
    const response = await fetch("https://swapi.dev/api/films/");

    if(!response.ok){
      throw new Error("something went wrong");
    }

    const data = await response.json();
 
    const transformedMovies = data.results.map((movie)=>{
      return{
        id: movie.episode_id,
        title:movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date
      }
    });
 
    setMovies(transformedMovies);
   }catch(error){
      setError(error.message);
   }
   setIsLoading(false);

},[]);

useEffect(()=>{
  fetchMovieHandler();
},[fetchMovieHandler]);


  let content =  <p>Found no movies</p>;
  if(movies){
    content = <MoviesList movies={movies} />
  }
  if(error){
    content = <p>{error}</p>
  }
  if(isLoading){
    content =<p>Loading ...</p>
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}        
      </section>
    </React.Fragment>
  );
}

export default App;
