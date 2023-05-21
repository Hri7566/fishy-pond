import React, { useState } from "react";
import { wsLink } from "@trpc/react-query";
import { reactAPI } from "./api/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Main } from "./Main";
import { wsClient } from "./api/websocket";

export const App = () => {
    const [queryClient] = useState(() => new QueryClient());

    const [apiClient] = useState(() =>
        reactAPI.createClient({
            links: [
                wsLink({
                    client: wsClient
                })
            ]
        })
    );

    return (
        <reactAPI.Provider client={apiClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Main />
            </QueryClientProvider>
        </reactAPI.Provider>
    );
};
