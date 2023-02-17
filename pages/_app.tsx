import "../styles/globals.css"
import type { AppProps, NextWebVitalsMetric } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { supabase } from "../utils/supabase"
import { useEffect } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import useStore from "../store"

export function reportWebVitals(metric: NextWebVitalsMetric) {
	switch (metric.name) {
		case "FCP":
			console.log(`FCP: ${Math.round(metric.value * 10) / 10}`)
			break
		case "LCP":
			console.log(`LCP: ${Math.round(metric.value * 10) / 10}`)
			break
		case "TTFB":
			console.log(`TTFB: ${Math.round(metric.value * 10) / 10}`)
			break
		case "Next.js-hydration":
			console.log(
				`Hydration: ${Math.round(metric.value * 10) / 10} -> ${
					Math.round((metric.startTime + metric.value) * 10) / 10
				}`
			)
			break
		default:
			break
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
})

function MyApp({ Component, pageProps }: AppProps) {
	const { push, pathname } = useRouter()
	const { isAuthenticated } = useStore()
	const validateSession = async () => {
		if (isAuthenticated && pathname === "/") {
			push("/top")
		} else if (!isAuthenticated && pathname !== "/") {
			await push("/")
		}
	}
	useEffect(() => {
		validateSession()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])

	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default MyApp
