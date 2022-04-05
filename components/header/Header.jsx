import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import logo from '../../image/logo.png';
import Image from 'next/image';

const headerNav = [
	{
		display: 'Home',
		path: '/',
	},
	{
		display: 'Movies',
		path: '/movie',
	},
	{
		display: 'TV Series',
		path: '/tv',
	},
];

const Header = () => {
	const router = useRouter();
	const navRef = useRef(null);
	const active = headerNav.findIndex((e) => e.path === router.pathname);

	return (
		<div
			href={navRef}
			className="h-32 fixed top-0 left-0 w-full z-50 transition ease-in-out duration-300 bg-black"
		>
			<div className="flex items-center justify-between h-full px-8">
				<div className="flex text-lg items-center">
					<div className=" mr-3 h-16 w-16 relative ">
						<Image src={logo} alt="logo" layout="fill" objectFit="cover" />
					</div>

					<Link href="/">Movies</Link>
				</div>
				<ul className="">
					{headerNav.map((e, i) => (
						<li key={i} className={`${i === active ? 'active' : ''}`}>
							<Link href={e.path}>{e.display}</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
export default Header;
