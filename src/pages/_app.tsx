import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/components/layout";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Layout>
      <NextThemesProvider>
      <main className="dark text-foreground bg-background">

        <Component {...pageProps} />
      </main>
      </NextThemesProvider>
      </Layout>
    </NextUIProvider>
  );
}
