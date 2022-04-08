import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid';
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
				setMovies(data.results);
				setTotalPages(data.total_pages);
			});
	};

	const handleOnClick = () => {
		setSearchState(false);
		setCurrentPage(1);
		getMovies(FEATURED_API);
	};

	const handleOnSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearchState(true);
		setSearchTerm(searchTerm);
		setCurrentPage(1);
		getMovies(SEARCH_API + searchTerm);
	};

	const handleOnSubmitPage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentPage(page);
	};

	const handleOnChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(e.target.value) > totalPages) {
			setPage(totalPages);
		} else {
			setPage(Number(e.target.value));
		}
	};

	// Debounce movie search after .5 second
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
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta property="og:title" content="MovieDB" key="title" />
				<meta name="searchterm" content={searchTerm || ''} />
				<title>{searchTerm === '' ? `MovieDB` : `${searchTerm} | MovieDB`}</title>
			</Head>
			<div className="bg-gray-900 h-screen overflow-y-scroll scrollbar-hide">
				<header className="flex flex-wrap items-center justify-center bg-gray-900 shadow-md shadow-black p-4 gap-3">
					<Image src={logo} width={60} height={60} />
					<h1 className="text-yellow-300 text-3xl p-2" onClick={handleOnClick}>
						MovieDB
					</h1>
					<form onSubmit={handleOnSubmitSearch}>
						<input
							type="search"
							onChange={handleSearchChange}
							className="h-10 w-40 bg-gray-800 rounded-lg text-yellow-300 pl-2 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
							placeholder="Search Movies"
						/>
					</form>
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
						className="bg-gray-800 rounded-lg p-2 w-24 h-10 text-yellow-300 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
						type="text"
						placeholder="Go to page"
						value={page || ''}
						onChange={handleOnChangePage}
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
				<footer className="text-center p-2 text-yellow-300">
					{'Copyright © '}MovieDB {new Date().getFullYear()}
				</footer>
			</div>
		</>
	);
};

export default Home;
