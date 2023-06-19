const apiBaseUrl = "http://localhost:8080/v1"

export const getUser = (email: string): Promise<Response> => {
    return fetch(`${apiBaseUrl}/users/${email}`);
};

export const getUserHistory = (id: number): Promise<Response> => {
    return fetch(`${apiBaseUrl}/users/${id}/history`);
};

export const getActions = (): Promise<Response> => {
    return fetch(`${apiBaseUrl}/actions`);
};

