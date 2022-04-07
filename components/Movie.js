import Image from 'next/image';
import placeHolder from '../image/placeholder.png';

const IMAGE_API = 'https://image.tmdb.org/t/p/original';

const setVoteColor = (vote) => {
	if (vote >= 8) {
		return 'text-green-500 bg-gray-800 p-1 rounded font-bold';
	} else if (vote >= 6) {
		return 'text-orange-500 bg-gray-800 p-1 rounded font-bold';
	} else {
		return 'text-red-500 bg-gray-800 p-1 rounded font-bold';
	}
};

const Movie = ({ title, poster_path, release_date, overview, vote_average }) => {
	return (
		<div className="group relative m-4 bg-gray-900 rounded-lg shadow-md shadow-black overflow-hidden w-[18.75rem] z-0  ">
			<div className="w-full">
				<Image
					src={poster_path ? IMAGE_API + poster_path : placeHolder}
					width={300}
					height={400}
					objectFit="cover"
					alt={title}
				/>
			</div>
			{/* Release Year */}
			<h3 className="text-lg pl-4">{release_date?.slice(0, 4)}</h3>

			{/* Movie Info */}
			<div className="flex px-4 py-2 items-center justify-between ">
				<h3 className="text-lg font-bold">{title}</h3>

				<span className={setVoteColor(vote_average)}>{vote_average}</span>
			</div>

			{/* Overiew */}
			<div className="absolute bottom-0 left-0 right-0 bg-gray-900 p-4 overflow-auto max-h-full rounded-lg transform translate-y-full group-hover:translate-y-0 ease-in-out duration-300 scrollbar-hide">
				<h2 className="text-center font-bold text-2xl pb-1">Overview</h2>
				<p className="text-lg p-2">{overview}</p>
			</div>
		</div>
	);
};
export default Movie;
