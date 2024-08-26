import { SpreadsheetProvider } from '../context/SpreadsheetContext';

function MyApp({ Component, pageProps }) {
    return (
        <SpreadsheetProvider>
            <Component {...pageProps} />
        </SpreadsheetProvider>
    );
}

export default MyApp;
