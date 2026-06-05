import Link from "next/link";
import { getSession } from "@/lib/auth/server";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await getSession();

  const href = session?.data?.user
    ? "/eventmaster/dashboard"
    : "/eventmaster/auth/sign-in";

  return (
    <section className="flex flex-wrap-reverse gap-4 w-full h-full">
      <div className="flex-1 flex flex-col justify-center gap-6 lg:gap-8 -mt-4 lg:-mt-8">
        <h1 className="text-6xl md:text-7xl font-semibold">
          Event planning <br /> made easier for <br /> everyone
        </h1>

        <p className="font-medium text-xs md:text-base">
          Here provides guidance for anyone to setup an event <br /> and provide
          anyone who with or without account to join.
        </p>

        <Button className="w-fit h-14 px-6 text-lg text-zinc-900 font-semibold bg-amber-400 hover:bg-fuchsia-400 rounded-4xl">
          <Link href={href}>Start Planning!</Link>
        </Button>
      </div>

      <div className="flex-1"></div>
    </section>
  );
};

export default page;
