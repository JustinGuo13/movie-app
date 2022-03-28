declare global {
	namespace NodeJS {
		interface ProcessEnv {
			THE_MOVIE_DB_API_KEY: string | undefined;
			NODE_ENV: 'development' | 'production';
			PORT?: string;
			PWD: string;
		}
	}
}
