import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useSetRecoilState } from 'recoil';

// Debounce movie search after 1 second
const debouncedSearch = useRef(
	debounce(async (searchTerm) => {
		if (searchTerm !== '') {
			useSetRecoilState(isSearchingState, true);
			useSetRecoilState(searchTermState, searchTerm);
			useSetRecoilState(currentPageState, 1);
			getMovies(SEARCH_API + searchTerm);
		} else {
			useSetRecoilState(isSearchingState, false);
			useSetRecoilState(currentPageState, 1);
			getMovies(FEATURED_API);
		}
	}, 500)
).current;

useEffect(() => {
	return () => {
		debouncedSearch.cancel();
	};
}, [debouncedSearch]);

async function handleSearchChange(e) {
	debouncedSearch(e.target.value);
}

const SearchBar = () => {
	return (
		<header className="flex justify-center bg-gray-800 p-4">
			<div className="relative text-yellow-300 focus-within:text-yellow-300">
				<span className="absolute inset-y-0 left-0 flex items-center pl-2">
					<SearchIcon className="w-6 h-6" />
				</span>
				<input
					type="search"
					onChange={handleSearchChange}
					className="py-2 pl-10 bg-gray-900 rounded-lg p-2 text-yellow-300 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
					placeholder="Search Movies"
				/>
			</div>
		</header>
	);
};
export default SearchBar;
