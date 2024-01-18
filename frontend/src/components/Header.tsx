import { useAuthContext } from "../contexts/AuthProvider";
import { Login } from "./authentication/Login/Login";

import Logout from "./authentication/Logout";
import HomeIcon from "./HomeIcon";

export const Header = () => {
  const { user } = useAuthContext();

  return (
    <div className="grid grid grid-cols-3 w-full">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {user?.email}
        </h2>
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
