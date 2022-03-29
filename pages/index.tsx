import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Movie from '../components/Movie';

const Home: NextPage = () => {
	const MOVIE_API = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
	const FEATURED_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API}&language=en-US&page=1`;

	// const IMAGE_API =
	// const SEARCH_API=
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch(FEATURED_API)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setMovies(data.results);
			});
	});
	return (
		<div className="flex flex-wrap bg-gray-900 text-yellow-300">
			{movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
		</div>
	);
};

export default Home;
