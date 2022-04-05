import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import Movie from '../components/Movie';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid';
import { SearchIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { currentPageState, pageState } from '../atoms/pageAtom';
import { isSearchingState, searchTermState } from '../atoms/searchBarAtom';
import Header from '../components/header/Header';

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
				console.log(totalPages);
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
			<div className="text-white">
				<Header />
			</div>
		</>
	);
};

export default Home;
