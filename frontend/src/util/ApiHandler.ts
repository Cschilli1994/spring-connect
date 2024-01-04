import { API_URL } from "./settings";

export class ApiHandler {
  static rootUrl = API_URL;

  static async get(
    path: string,
    options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    }
  ) {
    return fetch(`${this.rootUrl}${path}`, options);
  }

  static async post(
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    }
  ) {
    options.body = JSON.stringify(body);

    return fetch(`${this.rootUrl}${path}`, options);
  }
}
