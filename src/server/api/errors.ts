export interface ServerError {
    status: string;
    reason: string;
}

export const ErrorNotAuthenticated: ServerError = {
    status: "error",
    reason: "not authenticated"
};

export const ErrorNoChannel: ServerError = {
    status: "error",
    reason: "no channel"
};
