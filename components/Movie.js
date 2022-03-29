import Image from 'next/image';

const IMAGE_API = 'https://image.tmdb.org/t/p/w1280';
const Movie = ({ title, poster_path, overview, vote_average }) => {
	return (
		// Container
		<div className="relative m-4 bg-gray-900 rounded-lg shadow-md shadow-black overflow-hidden w-[18.75rem] z-0 ">
			<div className="max-w-full">
				<Image src={IMAGE_API + poster_path} width={300} height={400} alt={title} />
			</div>

			{/* Movie Info */}
			<div className="flex p-4 items-center justify-between ">
				<h3>{title}</h3>
				<span>{vote_average}</span>
			</div>

			{/* Overview */}
			<div className="bg-gray-900 absolute bottom-0 left-0 right-0 p-4 transform translate-y-[100%] hover:translate-y-[0%] ease-out duration-500 z-10">
				<h1>Overview:</h1>
				<p>{overview}</p>
			</div>
		</div>
	);
};
export default Movie;
