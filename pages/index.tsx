import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid';

const Home: NextPage = () => {
	const [movies, setMovies] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);

	const MOVIE_API = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
	const FEATURED_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API}&language=en-US&page=${page}`;
	const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API}&language=en-US&page=1&query=`;

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
			.catch((error) => {
				if (error.name === 'AbortError') {
					console.log('successfully aborted');
				} else {
					setError(error);
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

	const previousPage = () => {
		if (page > 1) {
			setPage(page - 1);
			getMovies(FEATURED_API);
		}
	};

	const nextPage = () => {
		setPage(page + 1);
		getMovies(FEATURED_API);
	};

	return (
		<>
			<div className="bg-gray-900 h-screen  overflow-y-scroll scrollbar-hide">
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
				<div className="flex flex-wrap justify-center  text-yellow-300">
					{movies.length > 0 &&
						movies.map((movie) => <Movie key={movie.id} {...movie} />)}
				</div>

				<div className="flex items-center justify-center space-x-2 text-yellow-300">
					<button onClick={previousPage}>
						<ChevronDoubleLeftIcon className="h-10 w-10 text-yellow-300" />
						<p>{page}</p>
					</button>
					<button onClick={nextPage}>
						<ChevronDoubleRightIcon className="h-10 w-10 text-yellow-300" />
						<p>{page + 1}</p>
					</button>
				</div>
			</div>
		</>
	);
};

export default Home;
