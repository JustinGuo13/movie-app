import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid';
import { SearchIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { currentPageState, pageState } from '../atoms/pageAtom';
import { isSearchingState, searchTermState } from '../atoms/searchBarAtom';
import Movie from '../components/Movie';
import logo from '../image/logo.png';

const Home: NextPage = () => {
	const [movies, setMovies] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
	const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useRecoilState(pageState);
	const [searchState, setSearchState] = useRecoilState(isSearchingState);

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
		fetch(API)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setMovies(data.results);
				setTotalPages(data.total_pages);
			});
	};

	const handleOnSubmitPage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentPage(page);
	};

	// Debounce movie search after 1 second
	const debouncedSearch = useRef(
		debounce(async (searchTerm) => {
			if (searchTerm !== '') {
				setSearchState(true);
				setSearchTerm(searchTerm);
				setCurrentPage(1);
				getMovies(SEARCH_API + searchTerm);
			} else {
				setSearchState(false);
				setCurrentPage(1);
				getMovies(FEATURED_API);
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
			<div className="bg-gray-900 h-screen overflow-y-scroll scrollbar-hide">
				<header className="flex flex-wrap items-center justify-center bg-gray-800 p-4 gap-3">
					<Image src={logo} width={60} height={60} />
					<h1 className="text-yellow-300 text-3xl p-2">MovieDB</h1>
					<input
						type="search"
						onChange={handleSearchChange}
						className="h-10 w-40 bg-gray-900 rounded-lg text-yellow-300 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
						placeholder="Search Movies"
					/>
				</header>
				{/* Movie List */}
				<div className="flex flex-wrap justify-center flex-shrink-0  text-yellow-300">
					<div className="p-4" style={{ maxWidth: '1600px' }}>
						<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{movies.length > 0 &&
								movies.map((movie) => <Movie key={movie.id} {...movie} />)}
						</div>
					</div>
				</div>

				{/* Go to page  */}
				<form
					className="flex items-center justify-center mb-2"
					onSubmit={handleOnSubmitPage}
				>
					<input
						className="bg-gray-800 rounded-lg p-2 text-yellow-300 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
						type="text"
						placeholder="Go to page"
						value={page || ''}
						onChange={(e) => setPage(Number(e.target.value))}
					/>
				</form>

				<div className="flex flex-wrap items-center justify-center space-x-5 text-yellow-300">
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
				</div>
				<footer className="text-center p-2 bg-gray-800 text-yellow-300">
					© 2021 Copyright: MovieDB
				</footer>
			</div>
		</>
	);
};

export default Home;
