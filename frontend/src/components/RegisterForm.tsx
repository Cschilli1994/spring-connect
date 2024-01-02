import { useState } from "react";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<
    "Authenticated" | "Unauthenticated" | "Loading..."
  >("Unauthenticated");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(e: any) {
    e.preventDefault();
    setStatus("Loading...");

    fetch("http://localhost:8080/api/v1/auth/register", {
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
          setStatus("Authenticated");
        } else {
          setStatus("Unauthenticated");
        }
      })
      .catch((res) => {
        console.log(res);
        setStatus("Unauthenticated");
      });
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <h2>Register status: {status}</h2>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        className="p-2"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        className="p-2"
        placeholder="password"
      />
      <input className=" cursor-pointer  " type="submit" value="Register" />
    </form>
  );
};
