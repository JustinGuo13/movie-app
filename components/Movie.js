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

const Movie = ({ title, poster_path, overview, vote_average }) => {
	return (
		// Container
		<div className="relative m-4 bg-gray-900 rounded-lg shadow-md shadow-black overflow-hidden w-[18.75rem] z-0 hover:opacity-50">
			<div className="w-full">
				<Image
					src={poster_path ? IMAGE_API + poster_path : placeHolder}
					width={300}
					height={400}
					objectFit="cover"
					alt={title}
				/>
			</div>

			{/* Movie Info */}
			<div className="flex p-4 items-center justify-between ">
				<h3 className="text-lg font-bold">{title}</h3>
				<span className={setVoteColor(vote_average)}>{vote_average}</span>
			</div>
		</div>
	);
};
export default Movie;
