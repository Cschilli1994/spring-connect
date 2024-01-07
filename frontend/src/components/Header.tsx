import { BriefcaseIcon } from "@heroicons/react/20/solid";

import { useAuthContext } from "../contexts/AuthProvider";
import { Login } from "./authentication/Login/Login";

import Logout from "./authentication/Logout";
import HomeIcon from "./HomeIcon";

export const Header = () => {
  const { user, callSecuredEndpoint } = useAuthContext();

  return (
    <div className="grid grid grid-cols-3 w-full">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {user}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div
            onClick={() => {
              callSecuredEndpoint("/demo/test", "GET").then((resp) => {
                console.log(resp);
              });
            }}
            className="mt-2 flex items-center text-sm text-gray-500 cursor-pointer"
          >
            <BriefcaseIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            Test
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <HomeIcon />
      </div>
      <div className="flex w-full justify-end">
        <>
          {user ? (
            <Logout />
          ) : (
            <>
              <Login />
            </>
          )}
        </>
      </div>
    </div>
  );
};
