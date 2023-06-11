const apiBaseUrl = "http://localhost:8080/api"

export const getUserHistory = async (id: number): Promise<Response> => {
    return fetch(`${apiBaseUrl}/users/${id}/history`);
};

