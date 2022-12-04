export const API_ROOT =
    import.meta.env.VITE_API_ROOT ?? 'http://localhost:3000/api/v1/';

export const api = (
    url: string,
    body?: any,
    method?: string,
    headers?: HeadersInit
) => {
    let options: RequestInit = {
        method: method || 'GET',
        headers,
    };

    if (body) {
        options = {
            method: method || 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...options.headers,
            },
            cache: 'no-cache',
            body: JSON.stringify(body),
        };
    }

    return fetch(API_ROOT + url, options).then((response) => response.json());
};
