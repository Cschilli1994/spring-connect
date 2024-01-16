import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useGameContext } from "../../../contexts/GameProvider";
import { useState } from "react";

type FormData = {
  user: string;
};

export default function InvitationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { callSecuredEndpoint, user } = useAuthContext();
  const { game } = useGameContext();

  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(data: FormData) {
    setIsLoading(true);
    callSecuredEndpoint("/invitation", "POST", {
      to: data.user,
      from: user.id,
      game: game.id,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Invitation Failed");
        }
      })
      .finally(() => setIsLoading(false));
  }
  if (game.playerTwoId) {
    return null;
  }
  return (
    <form className="flex p-1" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="user"
          name="user"
          type="text"
          required
          className="px-1 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Username"
          {...register("user")}
        />
      </div>
      <input
        type="submit"
        value={isLoading ? "Loading" : "Send"}
        className="cursor-pointer border rounded-md hover:bg-slate-400"
      />
    </form>
  );
}
