import { NextPage } from 'next';
import { Key, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import Movie from '../components/Movie';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid';

const Home: NextPage = () => {
	const [movies, setMovies] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	const [searchState, setSearchState] = useState(false);
	const MOVIE_API = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
	const FEATURED_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API}&language=en-US&page=${currentPage}`;
	const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API}&language=en-US&page=${currentPage}&query=`;

	useEffect(() => {
		if (!searchState) {
			getMovies(FEATURED_API);
		} else {
			getMovies(SEARCH_API + searchTerm);
		}
	}, [currentPage]);

	const getMovies = (API: RequestInfo) => {
		const controller = new AbortController();
		const signal = controller.signal;
		fetch(API, { signal: signal })
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setMovies(data.results);
				setTotalPages(data.total_pages);
				console.log(totalPages);
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

	const handleOnSubmitPage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentPage(page);
	};
	// Debounce movie search after 1 second
	const debouncedSearch = useRef(
		debounce(async (searchTerm) => {
			if (searchTerm !== '') {
				setSearchTerm(searchTerm);
				getMovies(SEARCH_API + searchTerm);
				setCurrentPage(1);
				setSearchState(true);
			} else {
				getMovies(FEATURED_API);
				setSearchState(false);
			}
		}, 500)
	).current;

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	async function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
		debouncedSearch(e.target.value);
	}

	return (
		<>
			<div className="bg-gray-900 h-screen  overflow-y-scroll scrollbar-hide">
				<header className="flex justify-center bg-gray-800 p-4">
					<form onSubmit={handleOnSubmit}>
						<div className="relative text-yellow-300 focus-within:text-yellow-300">
							<span className="absolute inset-y-0 left-0 flex items-center pl-2">
								<svg
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									className="w-6 h-6"
								>
									<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
								</svg>
							</span>
							<input
								type="search"
								onChange={handleSearchChange}
								className="py-2 pl-10 bg-gray-900 rounded-lg p-2 text-yellow-300 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
								placeholder="Search Movies"
							/>
						</div>
					</form>
				</header>

				<div className="flex flex-wrap justify-center  text-yellow-300">
					{movies.length > 0 &&
						movies.map((movie) => <Movie key={movie.id} {...movie} />)}
				</div>

				<div className="flex items-center justify-center space-x-2 text-yellow-300">
					{/* Previous Page */}
					{currentPage > 1 && (
						<button
							onClick={() =>
								currentPage > 1
									? setCurrentPage((currentPage) => currentPage - 1)
									: currentPage
							}
							type="button"
						>
							<ChevronDoubleLeftIcon className="h-10 w-10 text-yellow-300 hover:scale-125 transition duration-300 ease-in-out" />
							<p>{currentPage - 1}</p>
						</button>
					)}
					{/* Next Page */}
					{currentPage < totalPages && (
						<button
							onClick={() =>
								currentPage < totalPages
									? setCurrentPage((currentPage) => currentPage + 1)
									: currentPage
							}
							type="button"
						>
							<ChevronDoubleRightIcon className="h-10 w-10 text-yellow-300 hover:scale-125 transition duration-300 ease-in-out" />
							<p>{currentPage + 1}</p>
						</button>
					)}
					<form onSubmit={handleOnSubmitPage}>
						<input
							className="bg-gray-800 rounded-lg p-2 text-yellow-300 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
							type="string"
							placeholder="Go to page"
							value={page || ''}
							onChange={(e) => setPage(Number(e.target.value))}
						/>
					</form>
					<p>{`Total Pages: ${totalPages}`}</p>
				</div>
			</div>
		</>
	);
};

export default Home;
