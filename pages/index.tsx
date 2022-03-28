import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Movie from '../components/Movie';

const Home: NextPage = () => {
	const FEATURED_API = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US&page=1`;

	console.log(FEATURED_API);
	// const IMAGE_API =
	// const SEARCH_API=
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch(FEATURED_API)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setMovies(data.results);
			});
	});
	return <div>{movies.length > 0 && movies.map((movie) => <Movie />)}</div>;
};

export default Home;
