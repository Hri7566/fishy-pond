import type { APIRouter } from "../../server/api/endpoints/main";
import {
    createTRPCProxyClient,
    createTRPCReact,
    wsLink
} from "@trpc/react-query";
import { wsClient } from "./websocket";

export const reactAPI = createTRPCReact<APIRouter>();

export const api = createTRPCProxyClient<APIRouter>({
    links: [
        wsLink({
            client: wsClient
        })
    ]
});
