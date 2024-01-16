import { createContext, useContext, useEffect, useState } from "react";
import { ApiHandler } from "../util/ApiHandler";
import { User } from "../types/User";

type AuthContextValues = {
  user: User;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  errors: string;
  callSecuredEndpoint: (
    path: string,
    method: "POST" | "GET",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any
  ) => Promise<Response>;
};

const AuthContext = createContext<AuthContextValues>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [errors, setErrors] = useState<string>(null);

  async function login(email: string, password: string) {
    setErrors(null);
    return ApiHandler.post("/auth/authenticate", { email, password })
      .then((resp) => {
        console.log(resp);
        if (resp.ok) {
          return resp.json();
        } else {
          setErrors(resp.statusText);
          throw new Error("Failed to Authenticate");
        }
      })
      .then((respJson: User) => {
        setUser(respJson);
      })
      .catch((res) => {
        console.error(res);
        setErrors("Something went wrong");
        throw new Error("Failed to Authenticate");
      });
  }

  async function register(email: string, password: string) {
    setErrors(null);
    return ApiHandler.post("/auth/register", { email, password })
      .then((resp) => {
        console.log(resp);
        if (resp.ok) {
          return resp.json();
        } else {
          setErrors(resp.statusText);
          throw new Error("Failed to Register");
        }
      })
      .then((respJson: User) => {
        setUser(respJson);
      })
      .catch((res) => {
        console.error(res);
        setErrors("Something went wrong");
      });
  }

  async function logout() {
    setErrors(null);
    return ApiHandler.get("/auth/logout")
      .then((resp) => {
        console.log(resp);
        if (resp.ok) {
          setUser(null);
        } else {
          setErrors(resp.statusText);
        }
      })
      .catch((res) => {
        console.error(res);
        setErrors("Something went wrong");
      });
  }

  useEffect(() => {
    ApiHandler.get("/user/ping")
      .then((resp) => {
        if (!resp.ok) {
          setUser(null);
          throw new Error("Session Expired");
        } else {
          return resp.json();
        }
      })
      .then((respJson: User) => {
        setUser(respJson);
      });
  }, []);
  async function callSecuredEndpoint(
    path: string,
    method: "POST" | "GET",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any = null
  ) {
    switch (method) {
      case "POST":
        return ApiHandler.post(path, body).then((resp) => {
          if (resp.status === 403) {
            setUser(null);
          }
          return resp;
        });
      case "GET":
        return ApiHandler.get(path).then((resp) => {
          if (resp.status === 403) {
            setUser(null);
          }
          return resp;
        });
    }
  }
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, errors, callSecuredEndpoint }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
