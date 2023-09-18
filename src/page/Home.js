import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import Header from '../component/Header'
import { debounce } from 'lodash';
import Footer from "../component/Footer";

const Home = () => {
    const divStyle = {
        width: '18rem',
        height: '550px',
        padding: '10px',
        marginTop: '10px',
    };

    const [movieData, setMovieData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [favourites, setFavourites] = useState([]);

    const isFavorite = (movie) => favourites.some((favMovie) => favMovie.imdbID === movie.imdbID);

    const toggleFavorite = (movie) => {
        if (isFavorite(movie)) {
            removeMovieFromFavorites(movie);
        } else {
            addFavouriteMovie(movie);
        }
    };

    const removeMovieFromFavorites = (movieToRemove) => {
        const updatedFavourites = favourites.filter((movie) => movie.imdbID !== movieToRemove.imdbID);
        setFavourites(updatedFavourites);
        saveToLocalStorage(updatedFavourites);
    };

    const addFavouriteMovie = (movieToAdd) => {
        const updatedFavourites = [...favourites, movieToAdd];
        setFavourites(updatedFavourites);
        saveToLocalStorage(updatedFavourites);
    };

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    };

    const debouncedGetSearchData = useCallback(
        debounce(async (searchTerm) => {
            try {
                const apiUrl = `http://www.omdbapi.com/?s=${searchTerm}&apikey=f49fe4b2`;
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                const data = await response.json();
                if (data.Response === 'True') {
                    setMovieData(data.Search || []);
                } else {
                    console.error('No movies found or API error:', data.Error);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }, 500),
        []
    );

    const getData = async () => {
        try {
            let res = await fetch('http://www.omdbapi.com/?s=batman&apikey=f49fe4b2');
            const data = await res.json();
            setMovieData(data.Search || []);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        debouncedGetSearchData(searchQuery);
    }, [searchQuery, debouncedGetSearchData]);

    useEffect(() => {
        const movieFavourites = JSON.parse(localStorage.getItem('favourites')) ?? [];
        if (movieFavourites) {
            setFavourites(movieFavourites);
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <Header/>
            <div className="container">
                <div className='row'>
                    <div className="mt-3 mb-3">
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
                <div className='row'>
                    {movieData.map((data, index) => (
                        <div key={index} className="col-md-3">
                            <div className="card" style={divStyle}>
                                <img src={data.Poster} className="card-img-top" alt={data.Title} />
                                <div className="card-body">
                                    <div className="movie-info">
                                        <p className="card-title">{data.Title}</p>
                                        <p className="card-title">{data.Year}</p>
                                    </div>
                                    <div className="favorite-icon" onClick={() => toggleFavorite(data)}>
                                        <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {favourites.length > 0 && (
                    <>
                        <div className='row d-flex align-items-center mt-4 mb-4'>
                            <h2>Favourites</h2>
                        </div>
                        <div className='row'>
                            {favourites.map((movie, index) => (
                                <div key={index} className="col-md-3">
                                    <div className="card" style={divStyle}>
                                        <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                                        <div className="card-body">
                                            <div className="movie-info">
                                                <p className="card-title">{movie.Title}</p>
                                                <p className="card-title">{movie.Year}</p>
                                            </div>
                                            <div className="favorite-icon" onClick={() => toggleFavorite(movie)}>
                                                <FontAwesomeIcon icon={solidHeart} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer/>
        </>
    );
};

export default Home;