import { NetworkError } from "../errors/NetworkError";

/**
 * Lightweight fetch wrapper for future service integrations.
 */
export async function httpGet<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new NetworkError(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}
