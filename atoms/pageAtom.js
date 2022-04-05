import { atom } from 'recoil';

export const currentPageState = atom({
	key: 'currentPageState',
	default: 1,
});

export const pageState = atom({
	key: 'pageState',
	default: 1,
});
