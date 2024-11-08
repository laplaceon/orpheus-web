const apiHost =  false ? "api.tuneforge.ai" : "127.0.0.1:8080"
// const apiHost = "49.13.83.144:8080"
const apiBaseUrl = `http://${apiHost}/v1`

export const createUserWithEmail = (email: string, password: string, cf_token: string): Promise<Response> => {
    const payload = {
        "email": email,
        "password": password,
        "cf_token": cf_token
    }

    return fetch(`${apiBaseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export const getUserWithEmail = (email: string, password: string, cf_token: string): Promise<Response> => {
    const payload = {
        "email": email,
        "password": password,
        "cf_token": cf_token
    }

    return fetch(`${apiBaseUrl}/users/auth`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
};

export const getUserWithId = (id: number, jwt: string): Promise<Response> => {
    return fetch(`${apiBaseUrl}/users/${id}`, {
        headers: { "Authorization": `Bearer ${jwt}` }
    });
};

export const getActionHistory = (id: number, jwt: string): Promise<Response> => {
    return fetch(`${apiBaseUrl}/users/${id}/history`, {
        headers: { "Authorization": `Bearer ${jwt}` }
    });
};

export const getActionHistoryItem = (id: number, jwt: string): Promise<Response> => {
    return fetch(`${apiBaseUrl}/history/${id}`, {
        headers: { "Authorization": `Bearer ${jwt}` }
    });
};

export const getPurchaseHistory = (id: number, jwt: string): Promise<Response> => {
    return fetch(`${apiBaseUrl}/users/${id}/history`, {
        headers: { "Authorization": `Bearer ${jwt}` }
    });
};

export const getPurchaseHistoryItem = (id: number, jwt: string): Promise<Response> => {
    return fetch(`${apiBaseUrl}/history/${id}`, {
        headers: { "Authorization": `Bearer ${jwt}` }
    });
};

export const getActions = (): Promise<Response> => {
    return fetch(`${apiBaseUrl}/actions`);
};

export const pushGenreTransferActionRequest = (user_id: number, url: any, jwt: string): Promise<Response> => {
    const payload = {
        "action_id": 1,
        "user_id": user_id,
        "data": url
    }

    return fetch(`${apiBaseUrl}/actions`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Authorization": `Bearer ${jwt}` },
    }); 
};

export const pushContinuationActionRequest = (user_id: number, url: any, jwt: string): Promise<Response> => {
    const payload = {
        "action_id": 2,
        "user_id": user_id,
        "data": url
    }

    return fetch(`${apiBaseUrl}/actions`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Authorization": `Bearer ${jwt}` },
    }); 
};