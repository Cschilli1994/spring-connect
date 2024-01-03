import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../util/settings";

type AuthContextValues = {
  user: string;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  errors: string;
};

const AuthContext = createContext<AuthContextValues>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState<string>(null);

  async function login(email: string, password: string) {
    setErrors(null);
    return fetch(`${API_URL}/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Add any other headers if needed
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((resp) => {
        console.log(resp);
        if (resp.ok) {
          setUser(email);
        } else {
          setErrors(resp.statusText);
          throw new Error("Failed to Authenticate");
        }
      })
      .catch((res) => {
        console.error(res);
        setErrors("Something went wrong");
        throw new Error("Failed to Authenticate");
      });
  }

  async function register(email: string, password: string) {
    setErrors(null);
    return fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Add any other headers if needed
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((resp) => {
        console.log(resp);
        if (resp.ok) {
          setUser(email);
        } else {
          setErrors(resp.statusText);
        }
      })
      .catch((res) => {
        console.error(res);
        setErrors("Something went wrong");
      });
  }

  function logout() {
    setUser(null);
    console.log("Logout");
  }

  useEffect(() => {
    fetch(`${API_URL}/auth/ping`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Add any other headers if needed
      },
      credentials: "include",
    }).then((resp) => {
      if (!resp.ok) {
        setUser(null);
        throw new Error("Session Expired");
      } else {
        // setUser
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, errors }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
