import React, { useState } from 'react'
import styled from 'styled-components'
//import Moviecomponent from './components/MovieComponent';
import Axios from "axios";
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';
 export const API_KEY="a9118a3a";
const Container =styled.div`
display:flex;
flex-direction:column;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  align-item:centre;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const App = () => {
  const[searchQuery, setsearchQuery] = useState();
  const [timeoutId,settimeoutId] = useState();
  const [movieList,setmovieList] = useState();
  const [selectedMovie, setselectedMovie] = useState();
  const fetchData= async(searchString)=>{
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    console.log(response);
    setmovieList(response.data.Search);
  }
  const ontextchange=(e)=>
  {
    clearTimeout(timeoutId)
    setsearchQuery(e.target.value);
     const timeout=setTimeout(()=>fetchData(e.target.value),500);
     settimeoutId(timeout);
  }
  return (
    <Container>
      <Header>
        <AppName>
          MOVIE TRACKER
        </AppName>
        <SearchBox>
           <SearchInput placeholder='Search-Movie' value={searchQuery} onChange={ontextchange}/>
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={setselectedMovie}/>}
      <MovieListContainer>
        {
          movieList?.length?movieList.map((movie,index)=><MovieComponent key={index} movie={movie} onMovieSelect={setselectedMovie}/>):
          "Search Your Favorite movie"
        }
      </MovieListContainer>
      </Container>
  )
}

export default App
