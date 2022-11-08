import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { CssBaseline } from '@mui/material';
import { JsonViewerExample } from './JsonViewerExample';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <CssBaseline>
                    <JsonViewerExample />
                </CssBaseline>
            </main>
        </div>
    );
}
