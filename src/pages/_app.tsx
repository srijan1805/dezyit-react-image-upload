import "@/styles/index.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import SocketProvider from "@/context/SocketProvider";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session} refetchOnWindowFocus refetchInterval={60 * 5 * 1000}>
			<SocketProvider>
				<Component {...pageProps} />
			</SocketProvider>
		</SessionProvider>
	);
}
