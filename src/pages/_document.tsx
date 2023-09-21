import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/react';

export default class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Chess Club website for Sierra Pacific High School Chess Club" />
          <meta name="keywords" content="Chess Club, Sierra Pacific, Sierra Pacific High School," />
          <meta name="author" content="adityasahas.tech" />

          <meta property="og:title" content="SP Chess Club" />
          <meta property="og:description" content="Chess Club website for Sierra Pacific High School Chess Club" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://spchess.org" />
          <meta property="og:image" content="https://img.freepik.com/premium-photo/gold-silver-chess-chess-board-game-business-metaphor-leadership-concept_131346-640.jpg" />

          <meta name="twitter:title" content="SP Chess Club" /> 
          <meta name="twitter:description" content="Chess Club website for Sierra Pacific High School Chess Club" />
          <Analytics/>

        </Head>
        <body>
          <Main />
          <NextScript />
          <Analytics/>
        </body>
      </Html>
    )
  }
}
