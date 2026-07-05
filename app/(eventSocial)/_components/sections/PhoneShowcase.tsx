"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import {
  CalendarDays,
  Check,
  Search,
  UserPlus,
  Users,
  X,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PhoneFrame from "./PhoneFrame";
import UserAvatar from "../UserAvatar";

gsap.registerPlugin(ScrollTrigger);

/** Static replica of NotificationBell's rows — mirrors its INVITE/RESPONSE layout, not live data. */
const NotificationsScreen = () => (
  <div className="flex h-full flex-col bg-white pt-13.5 font-sans" aria-hidden>
    <div className="flex h-13 flex-none items-center justify-between border-b border-zinc-200 px-4">
      <span className="text-base font-bold tracking-tight">EventSocial</span>
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-8 items-center justify-center rounded-full bg-zinc-100">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#09090b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 flex h-3.75 min-w-3.75 items-center justify-center rounded-full bg-red-600 px-0.75 text-[9px] font-semibold text-white">
            2
          </span>
        </span>
        <UserAvatar name="Jamie Wu" className="size-7 text-[10px]" />
      </div>
    </div>

    <div className="flex flex-none items-center justify-between px-4 pt-3 pb-2">
      <span className="text-sm font-medium">Notifications</span>
      <span className="text-xs font-medium text-zinc-900 underline underline-offset-2">
        Read all
      </span>
    </div>

    <div className="flex-1 space-y-0.5 overflow-hidden px-2">
      <div className="flex gap-2 rounded-md bg-violet-50 px-3 py-2.5">
        <UserAvatar
          name="Maya Chen"
          className="mt-0.5 size-7 shrink-0 text-[10px]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] leading-snug">
            Maya Chen invited you to “Rooftop Mixer”
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            Jul 12, 2026 9:14 AM
          </p>
          <div className="mt-1.5 flex gap-1.5">
            <span className="inline-flex h-6 items-center gap-1 rounded-md bg-blue-100 px-2 text-xs font-medium text-blue-900">
              <Check className="size-3" />
              Accept
            </span>
            <span className="inline-flex h-6 items-center gap-1 rounded-md bg-red-100 px-2 text-xs font-medium text-red-900">
              <X className="size-3" />
              Decline
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 rounded-md px-3 py-2.5">
        <UserAvatar
          name="Dev Patel"
          className="mt-0.5 size-7 shrink-0 text-[10px]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] leading-snug">
            Dev Patel accepted your invite to “Indie Game Night”
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            Jul 11, 2026 6:02 PM
          </p>
        </div>
      </div>

      <div className="flex gap-2 rounded-md px-3 py-2.5">
        <UserAvatar
          name="Lena Sato"
          className="mt-0.5 size-7 shrink-0 text-[10px]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] leading-snug">
            Lena Sato invited you to “Founder Coffee Walk”
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            Jul 11, 2026 8:40 AM
          </p>
          <Badge variant="default" className="mt-1.5">
            Accepted
          </Badge>
        </div>
      </div>

      <div className="flex gap-2 rounded-md px-3 py-2.5">
        <UserAvatar
          name="Rosa Kim"
          className="mt-0.5 size-7 shrink-0 text-[10px]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] leading-snug">
            Rosa Kim declined your invite to “Indie Game Night”
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            Jul 10, 2026 3:21 PM
          </p>
        </div>
      </div>

      <div className="flex gap-2 rounded-md bg-violet-50 px-3 py-2.5">
        <UserAvatar
          name="Omar Haddad"
          className="mt-0.5 size-7 shrink-0 text-[10px]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] leading-snug">
            Omar Haddad invited you to “Design Systems Meetup #7”
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            Jul 9, 2026 11:05 AM
          </p>
          <div className="mt-1.5 flex gap-1.5">
            <span className="inline-flex h-6 items-center gap-1 rounded-md bg-blue-100 px-2 text-xs font-medium text-blue-900">
              <Check className="size-3" />
              Accept
            </span>
            <span className="inline-flex h-6 items-center gap-1 rounded-md bg-red-100 px-2 text-xs font-medium text-red-900">
              <X className="size-3" />
              Decline
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/** Static replica of EventListPanel's cards. */
const EventsListScreen = () => (
  <div className="flex h-full flex-col bg-white pt-13.5 font-sans" aria-hidden>
    <div className="flex h-13 flex-none items-center justify-between border-b border-zinc-200 px-4">
      <span className="text-base font-bold tracking-tight">EventSocial</span>
      <div className="flex items-center gap-2.5">
        <span className="gradient-cta flex h-7.5 items-center gap-1 rounded-lg px-2.5 text-xs font-medium text-white">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Create
        </span>
        <span className="relative flex size-8 items-center justify-center rounded-full bg-zinc-100">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#09090b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 flex h-3.75 min-w-3.75 items-center justify-center rounded-full bg-red-600 px-0.75 text-[9px] font-semibold text-white">
            2
          </span>
        </span>
        <UserAvatar name="Jamie Wu" className="size-7 text-[10px]" />
      </div>
    </div>

    <div className="flex flex-none gap-2 px-3.5 pt-3 pb-2">
      <div className="relative flex h-9 flex-1 items-center rounded-lg border border-zinc-400 pl-7 text-[13px] text-zinc-500 shadow-xs">
        <Search className="absolute left-2.5 size-3.5 text-zinc-500" />
        Filter events by name…
      </div>
      <div className="flex h-9 flex-none items-center gap-1 rounded-lg bg-zinc-100 px-2.5 text-xs">
        Newest created
        <ChevronDown className="size-3.5 text-zinc-500" />
      </div>
    </div>

    <div className="flex-1 space-y-2 overflow-hidden px-3.5">
      <div className="rounded-lg border-3 border-violet-600 bg-muted/60 p-3">
        <p className="text-sm font-medium">Rooftop Mixer</p>
        <p className="mt-0.5 text-xs leading-snug text-zinc-500">
          Sunset drinks and small bites on the 12th-floor terrace.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
            <CalendarDays className="size-3" />
            Jul 18, 2026 6:00 PM
          </span>
          <Badge variant="primary">Invite only</Badge>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-400 p-3">
        <p className="text-sm font-medium">Indie Game Night</p>
        <p className="mt-0.5 text-xs leading-snug text-zinc-500">
          Couch co-op and pizza. Bring a controller.
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-zinc-500">
          <CalendarDays className="size-3" />
          Jul 22, 2026 7:30 PM
        </span>
      </div>

      <div className="rounded-lg border border-zinc-400 p-3">
        <p className="text-sm font-medium">Founder Coffee Walk</p>
        <p className="mt-0.5 text-xs leading-snug text-zinc-500">
          One casual loop around the park. Coffee first, always.
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-zinc-500">
          <CalendarDays className="size-3" />
          Jul 25, 2026 8:00 AM
        </span>
      </div>

      <div className="rounded-lg border border-zinc-400 p-3">
        <p className="text-sm font-medium">Design Systems Meetup #7</p>
        <p className="mt-0.5 text-xs leading-snug text-zinc-500">
          Lightning talks on tokens, theming and handoff.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
            <CalendarDays className="size-3" />
            Jul 30, 2026 6:30 PM
          </span>
          <Badge variant="primary">Invite only</Badge>
        </div>
      </div>
    </div>
  </div>
);

/** Static replica of EventDetailCard's layout. */
const EventDetailScreen = () => (
  <div className="flex h-full flex-col pt-13.5 font-sans" aria-hidden>
    <div className="flex h-13 flex-none items-center justify-between border-b border-zinc-200 px-4">
      <span className="text-base font-bold tracking-tight">EventSocial</span>
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-full bg-zinc-100">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#09090b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </span>
        <UserAvatar name="Jamie Wu" className="size-7 text-[10px]" />
      </div>
    </div>

    <div className="flex-1 overflow-hidden px-4 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-[22px] font-semibold tracking-tight">
          Rooftop Mixer
        </h3>
        <Badge variant="primary">Invite only</Badge>
      </div>

      <div className="mt-2.5 flex flex-col gap-1">
        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
          <CalendarDays className="size-3.5" />
          Jul 18, 6:00 PM → Jul 18, 10:00 PM
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
          <Users className="size-3.5" />8 participants
        </span>
      </div>

      <span className="gradient-cta mt-3.5 flex h-11 items-center justify-center gap-1.5 rounded-lg text-sm font-medium text-white">
        <UserPlus className="size-4" />
        Join event
      </span>

      <Separator className="my-4" />

      <p className="text-xs font-medium text-zinc-500">Description</p>
      <p className="mt-1 text-[13.5px] leading-snug">
        Sunset drinks and small bites on the 12th-floor terrace. Bring a plus
        one — golden hour starts at seven.
      </p>

      <p className="mt-4 text-xs font-medium text-zinc-500">Participants (8)</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {["Maya Chen", "Dev Patel", "Lena Sato", "Omar Haddad"].map((name) => (
          <div
            key={name}
            className="flex w-fit items-center gap-1.5 rounded-2xl border border-zinc-400 py-0.5 pr-2.5 pl-0.5 text-[12.5px]"
          >
            <UserAvatar name={name} className="size-5.5 text-[9px]" />
            {name}
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs font-medium text-zinc-500">Invites (2)</p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <div className="flex w-fit items-center gap-1.5 rounded-2xl border border-zinc-400 p-0.5 text-[12.5px]">
          <UserAvatar name="Rosa Kim" className="size-5.5 text-[9px]" />
          <span>Rosa Kim</span>
          <Badge variant="secondary">pending</Badge>
        </div>
        <div className="flex w-fit items-center gap-1.5 rounded-2xl border border-zinc-400 p-0.5 text-[12.5px]">
          <UserAvatar name="Felix Tan" className="size-5.5 text-[9px]" />
          <span>Felix Tan</span>
          <Badge variant="destructive">declined</Badge>
        </div>
      </div>
    </div>
  </div>
);

const PhoneShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(".pin-copy-l, .pin-copy-r", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.to(
        ".phone-l",
        { y: -320, opacity: 0, ease: "power1.in", duration: 1 },
        0.15,
      )
        .to(
          ".phone-r",
          { y: 320, opacity: 0, ease: "power1.in", duration: 1 },
          0.15,
        )
        .to(
          ".phone-c",
          { scale: 1.05, duration: 1.3, ease: "power1.inOut" },
          0.15,
        )
        .fromTo(
          ".pin-copy-l",
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          1.05,
        )
        .fromTo(
          ".pin-copy-r",
          { opacity: 0, y: -44 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          1.2,
        )
        .to({}, { duration: 0.6 });

      const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => clearTimeout(refreshTimer);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden "
    >
      <div className="absolute inset-y-0 left-[5%] z-1 flex items-center">
        <div className="pin-copy-l opacity-0">
          <div className="text-[clamp(32px,3.2vw,50px)] leading-[1.12] font-extrabold tracking-[-0.03em]">
            No feeds.
            <br />
            No noise.
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-[5%] z-1 flex items-center">
        <div className="pin-copy-r text-right opacity-0">
          <div className="text-[clamp(32px,3.2vw,50px)] leading-[1.12] font-extrabold tracking-[-0.03em]">
            Just
            <br />
            <span className="bg-linear-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
              your people.
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-2 flex items-center gap-11">
        <div className="phone-l h-144.25 w-66.5 flex-none will-change-transform">
          <div
            className="h-218.5 w-100.5 origin-top-left"
            style={{ transform: "scale(0.66)" }}
          >
            <PhoneFrame>
              <NotificationsScreen />
            </PhoneFrame>
          </div>
        </div>

        <div className="phone-c h-157.5 w-72.5 flex-none will-change-transform">
          <div
            className="h-218.5 w-100.5 origin-top-left"
            style={{ transform: "scale(0.72)" }}
          >
            <PhoneFrame>
              <EventsListScreen />
            </PhoneFrame>
          </div>
        </div>

        <div className="phone-r h-144.25 w-66.5 flex-none will-change-transform">
          <div
            className="h-218.5 w-100.5 origin-top-left"
            style={{ transform: "scale(0.66)" }}
          >
            <PhoneFrame>
              <EventDetailScreen />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneShowcase;
