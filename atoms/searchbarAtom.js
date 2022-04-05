import { atom } from 'recoil';

export const isSearchingState = atom({
	key: 'isSearchingState',
	default: false,
});

export const searchTermState = atom({
	key: 'searchTermState',
	default: '',
});
