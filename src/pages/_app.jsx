import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { Octokit } from "@octokit/rest";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
