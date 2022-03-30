import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Movie from '../components/Movie';

const Home: NextPage = () => {
	const MOVIE_API = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
	const FEATURED_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API}&language=en-US&page=1`;

	// const IMAGE_API =

	const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API}&language=en-US&page=1&query=`;
	const [movies, setMovies] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		getMovies(FEATURED_API);
	}, []);

	const getMovies = (API: RequestInfo) => {
		const controller = new AbortController();
		const signal = controller.signal;
		fetch(API, { signal: signal })
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setMovies(data.results);
			})
			.catch((err) => {
				if (err.name === 'AbortError') {
					console.log('successfully aborted');
				} else {
					setError(err);
				}
			});
		return () => controller.abort();
	};

	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (searchTerm) {
			getMovies(SEARCH_API + searchTerm);
			setSearchTerm('');
		}
	};

	return (
		<>
			<header className="flex justify-center bg-gray-800 p-4">
				<form onSubmit={handleOnSubmit}>
					<input
						className="bg-gray-900 rounded-lg p-2 text-yellow-300 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
						type="search"
						placeholder="Search Movies"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</form>
			</header>
			<div className="flex flex-wrap bg-gray-900 text-yellow-300">
				{movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
			</div>
		</>
	);
};

export default Home;
