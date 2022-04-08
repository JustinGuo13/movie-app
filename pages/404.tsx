import { NextPage } from 'next';
import Link from 'next/link';

const Custom404: NextPage = () => {
	return (
		<div className="flex justify-center items-center bg-gray-900 h-screen overflow-y-scroll scrollbar-hide ">
			<div className="text-yellow-300 text-4xl">
				<Link href="/">404: Go to home</Link>
			</div>
		</div>
	);
};

export default Custom404;
