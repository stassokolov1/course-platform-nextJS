import '../styles/globals.css';
import {AppProps} from "next/dist/shared/lib/router/router";
import Head from "next/head";

function MyApp({Component, pageProps}: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>MyTop</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"/>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
