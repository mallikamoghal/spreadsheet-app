import Head from 'next/head';
import Header from '../components/Header';
import Toolbar from '../components/Toolbar';
import Spreadsheet from '../components/Spreadsheet';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spreadsheet App</title>
        <meta name="description" content="A simple spreadsheet application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="p-4">
        <Toolbar />
        <Spreadsheet />
      </main>
    </div>
  );
}
