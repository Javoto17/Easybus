import { ClientRepository } from '../domain/ClientRepository';

const DEFAULT_HEADERS = {
  passkey: process.env.EXPO_PUBLIC_EMT_PASSKEY ?? '',
  'X-ClientId': process.env.EXPO_PUBLIC_EMT_CLIENT_ID ?? '',
};

export const generateClientRepository = (): ClientRepository => {
  return {
    get,
    post,
  };
};

async function get<T>(url: string, options: RequestInit = {}): Promise<T> {
  console.log(DEFAULT_HEADERS);
  const fetchOptions: RequestInit = {
    ...options,
    method: 'GET',
    headers: {
      ...DEFAULT_HEADERS,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

async function post<T>(
  url: string,
  data: unknown,
  options: RequestInit = {}
): Promise<T> {
  const fetchOptions: RequestInit = {
    ...options,
    method: 'POST',
    headers: {
      ...DEFAULT_HEADERS,
      ...(options.headers || {}),
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
