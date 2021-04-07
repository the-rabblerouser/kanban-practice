import next from 'next';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Kanban Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
