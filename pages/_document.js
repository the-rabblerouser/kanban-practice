import Document, { Html, Head, Main, NextScript } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';

class MyDocument extends Document {
	/* 
    The resetServerContext function should be used when server side rendering (SSR). 
    It ensures context state does not persist across multiple renders on the server which would 
    result in client/server markup mismatches after multiple requests are rendered on the server.

    Use it before calling the server side render method

    fixes the error:
    Warning: Prop `data-rbd-draggable-context-id` did not match. Server: "1" Client: "0" div
    */

	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		resetServerContext();
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
