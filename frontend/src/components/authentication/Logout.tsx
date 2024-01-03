import { useAuthContext } from "../../contexts/AuthProvider";

export default function Logout() {
  const { logout } = useAuthContext();

  return (
    <span className="sm:ml-3">
      <button
        onClick={logout}
        type="button"
        className="inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
      >
        Logout
      </button>
    </span>
  );
}
