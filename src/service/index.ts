import { baseUrl, showsPath } from "./constants";
import { type Show } from "../types";

export async function fetchShowsAPI() {
  const response = await fetch(`${baseUrl}${showsPath}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<Show[]>;
}

export async function fetchShowDetailAPI(id: string) {
  const response = await fetch(`${baseUrl}${showsPath}/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<Show>;
}
