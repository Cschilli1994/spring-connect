import { HandThumbUpIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

type RegisterFormProps = {
  afterSubmit: () => void;
};

export default function RegisterForm({ afterSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const { register: accountRegister, errors: registerError } = useAuthContext();

  function onSubmit(data: FormData) {
    setIsLoading(true);
    accountRegister(data.email, data.password)
      .then(() => {
        afterSubmit();
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <div>
          <div className="w-full flex justify-center">
            <HandThumbUpIcon className="h-12 fill-blue-300" />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Please Provide Info to Register
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative -space-y-px rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="px-1 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="px-1 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                {...register("password")}
              />
            </div>
          </div>
          <p className="text-red-500 p-2">
            {registerError && "Failed to register!"}
          </p>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Loading" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
