<div className="bg-gray-900 h-screen  overflow-y-scroll scrollbar-hide">
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

	<div className="flex flex-wrap justify-center  text-yellow-300">
		{movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
	</div>

	<div className="flex flex-wrap items-center justify-center space-x-2 text-yellow-300">
		{/* Previous Page */}
		{currentPage > 1 && (
			<button
				onClick={() =>
					currentPage > 1 ? setCurrentPage((currentPage) => currentPage - 1) : currentPage
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
				type="text"
				placeholder="Go to page"
				value={page || ''}
				onChange={(e) => setPage(Number(e.target.value))}
			/>
		</form>
	</div>
</div>;
