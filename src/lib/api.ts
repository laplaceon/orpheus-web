const apiBaseUrl = "http://127.0.0.1:8080/v1"

export const createUserWithEmail = (email: string, cfToken: string): Promise<Response> => {
    const payload = {
        "email": email,
        "cf_token": cfToken
    }

    return fetch(`${apiBaseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export const getUserWithEmail = (email: string): Promise<Response> => {
    return fetch(`${apiBaseUrl}/users/auth/${email}`);
};

export const getUserHistory = (id: number): Promise<Response> => {
    return fetch(`${apiBaseUrl}/users/${id}/history`);
};

export const getUserHistoryItem = (id: number): Promise<Response> => {
    return fetch(`${apiBaseUrl}/history/${id}`);
};

export const getActions = (): Promise<Response> => {
    return fetch(`${apiBaseUrl}/actions`);
};

export const pushGenreTransferActionRequest = (user_id: number, url: any): Promise<Response> => {
    const payload = {
        "user_id": user_id,
        "data": url
    }

    return fetch(`${apiBaseUrl}/actions/genretransfer`, {
        method: "POST",
        body: JSON.stringify(payload),
    }); 
};

export const pushContinuationActionRequest = (user_id: number, url: any): Promise<Response> => {
    const payload = {
        "user_id": user_id,
        "data": url
    }

    return fetch(`${apiBaseUrl}/actions/continuation`, {
        method: "POST",
        body: JSON.stringify(payload),
    }); 
};


