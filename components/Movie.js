import Image from 'next/image';

const IMAGE_API = 'https://image.tmdb.org/t/p/w1280';
const setVote = (vote) => {
	if (vote >= 8) {
		return 'text-green-300';
	} else if (vote >= 6) {
		return 'text-orange-300';
	} else {
		return 'text-red-300';
	}
};
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
				{/* FIXME: Change vote colors  */}
				<span className={`$setVote(vote_average) bg-gray-800 p-1 rounded font-bold`}>
					{vote_average}
				</span>
			</div>
		</div>
	);
};
export default Movie;
