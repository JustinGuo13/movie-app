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
		</div>
	);
};
export default Movie;
