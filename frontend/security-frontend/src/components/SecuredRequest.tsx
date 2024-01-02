import { useState } from "react";

export const SecuredRequest = () => {
  const [status, setStatus] = useState("None");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onClick() {
    setStatus("Loading...");
    fetch("http://localhost:8080/api/v1/demo/hello", {
      credentials: "include",
    })
      .then((resp) => {
        console.log({ resp });

        if (resp.ok) {
          setStatus("Success");
        } else {
          setStatus("Failed");
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("Failed");
      });
  }
  return (
    <div className="flex flex-col border-2 ">
      <div>Secured Request Status: {status}</div>
      <button onClick={onClick} className="cursor-pointer border">
        Send
      </button>
    </div>
  );
};
