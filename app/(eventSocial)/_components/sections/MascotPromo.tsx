"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Calendar } from "lucide-react";
import PhoneFrame from "./PhoneFrame";

gsap.registerPlugin(ScrollTrigger);

/** Static replica of the RN app's login screen (event-social/src/app/(auth)/login.tsx). */
const LoginScreen = () => (
  <div
    className="relative h-full overflow-hidden bg-white font-sans"
    aria-hidden
  >
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-30 -right-30 size-80 rounded-full bg-violet-500 opacity-14 blur-[70px]" />
      <div className="absolute top-15 -left-35 size-70 rounded-full bg-sky-500 opacity-12 blur-[65px]" />
    </div>

    <div className="relative flex h-full flex-col px-6.5 pt-29.5 pb-7">
      <div className="flex size-11.5 items-center justify-center rounded-[13px] bg-linear-to-br from-sky-500 to-violet-500 shadow-[0_8px_20px_rgba(124,58,237,0.25)]">
        <Calendar className="size-5.5 text-white" strokeWidth={2.4} />
      </div>

      <p className="mt-5.5 text-[28px] font-bold tracking-[-0.56px] text-zinc-900">
        Welcome back
      </p>
      <p className="mt-1.5 text-[14.5px] text-zinc-500">
        Log in to keep up with your events.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <div>
          <p className="text-[12.5px] font-medium text-zinc-700">Email</p>
          <div className="mt-1.5 flex h-12 items-center rounded-xl bg-zinc-100 px-3.5 text-[14.5px] text-zinc-400">
            you@example.com
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[12.5px] font-medium text-zinc-700">Password</p>
            <span className="text-xs font-semibold text-violet-600">
              Forgot?
            </span>
          </div>
          <div className="mt-1.5 flex h-12 items-center rounded-xl bg-zinc-100 px-3.5 text-[14.5px] text-zinc-400">
            Your password
          </div>
        </div>
      </div>

      <div className="mt-6 flex h-12.5 items-center justify-center rounded-2xl bg-linear-to-r from-sky-500 to-violet-500 text-[15.5px] font-semibold text-white shadow-[0_10px_24px_rgba(139,92,246,0.28)]">
        Log in
      </div>

      <div className="min-h-6 flex-1" />

      <p className="text-center text-[13.5px] text-zinc-500">
        Don&apos;t have an account?{" "}
        <span className="font-semibold text-violet-600">Sign up</span>
      </p>
    </div>
  </div>
);

const MascotPromo = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".dd-phone", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
      gsap.from(".dd-copy", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      gsap.from(".dd-bear", {
        scale: 0,
        rotation: -12,
        transformOrigin: "50% 100%",
        duration: 0.9,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
      });
      gsap.to(".dd-bear img", {
        y: -8,
        rotation: 2.5,
        transformOrigin: "50% 90%",
        repeat: -1,
        yoyo: true,
        duration: 2.4,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative bg-white px-6 py-[16vh]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[10%] -left-30 size-90 rounded-full bg-sky-500/8 blur-3xl" />
        <div className="absolute -right-25 -bottom-20 size-100 rounded-full bg-violet-500/9 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-260 flex-wrap items-center justify-center gap-[clamp(32px,6vw,96px)]">
        <div className="dd-copy w-[min(380px,90vw)]">
          <p className="text-[13px] font-semibold tracking-[0.08em] text-zinc-500 uppercase">
            Meet Evie
          </p>
          <h3 className="mt-2.5 text-[clamp(34px,3.6vw,48px)] leading-[1.1] font-extrabold tracking-[-0.03em]">
            EventSocial,
            <br />
            <span className="bg-linear-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
              in your pocket.
            </span>
          </h3>
          <p className="mt-4.5 text-[15px] leading-[1.65] text-zinc-700">
            One account for every event you host or join. Sign up in seconds —
            Evie the party bear is already holding the door.
          </p>
          <p className="mt-3 text-[15px] leading-[1.65] text-zinc-700">
            Invites answered, guest lists live, zero noise.
          </p>
        </div>

        <div className="relative flex-none pl-27.5">
          <div className="dd-phone relative z-1 h-153 w-70.5 flex-none">
            <div
              className="h-218.5 w-100.5 origin-top-left"
              style={{ transform: "scale(0.7)" }}
            >
              <PhoneFrame>
                <LoginScreen />
              </PhoneFrame>
            </div>
          </div>

          <div className="dd-bear absolute -bottom-2 -left-4 z-2 w-50">
            <Image
              src="/eventsocial/evie-bear.png"
              alt="Evie the EventSocial mascot"
              width={200}
              height={300}
              className="h-auto w-full drop-shadow-[0_16px_24px_rgba(24,24,27,0.18)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MascotPromo;
