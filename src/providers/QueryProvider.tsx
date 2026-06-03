import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react"


type QueryProviderTypeDefs = {
    children: ReactNode;
}

function QueryProvider({children}: QueryProviderTypeDefs) {
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions : {
                queries : {
                    staleTime: 300000,
                    retry:1,
                    refetchOnWindowFocus: false,
                }
            },
        })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider;