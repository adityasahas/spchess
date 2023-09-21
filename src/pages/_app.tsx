import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/components/layout";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider>
      <main className="dark text-foreground bg-background">
              <Layout >

        <Analytics/>
        <Component {...pageProps} />
              </Layout>

      </main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
