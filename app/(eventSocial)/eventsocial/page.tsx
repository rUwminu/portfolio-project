"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  CalendarPlus,
  ChevronDown,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../_context/AuthContext";
import BlobBackground from "../_components/BlobBackground";
import BuzzSentence from "../_components/sections/BuzzSentence";
import PhoneShowcase from "../_components/sections/PhoneShowcase";
import MascotPromo from "../_components/sections/MascotPromo";
import FinalCta from "../_components/sections/FinalCta";

const ROTATING_WORDS = [
  "meetups",
  "workshops",
  "launch parties",
  "game nights",
  "hackathons",
];

const FEATURES = [
  {
    icon: CalendarPlus,
    title: "Create",
    text: "Spin up an event in under a minute — name it, date it, done.",
  },
  {
    icon: UsersRound,
    title: "Invite",
    text: "Type a name, pick a person. Invites that work like your inbox.",
  },
  {
    icon: Sparkles,
    title: "Join",
    text: "One click and you're on the list. No forms, no fuss.",
  },
];

const LandingPage = () => {
  const { user } = useAuth();
  const mainRef = useRef<HTMLElement>(null);
  const rotatorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Headline words rise out of their clipping masks.
      gsap.from(".hero-word", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power4.out",
      });

      // Everything below the headline fades up in sequence.
      gsap.from(".hero-fade", {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.5,
      });

      // Scroll hint bounces at the bottom of the hero.
      gsap.to(".hint-chev", {
        y: 7,
        repeat: -1,
        yoyo: true,
        duration: 0.7,
        ease: "sine.inOut",
      });

      // Cycle through the rotating word.
      const rotator = rotatorRef.current;
      if (rotator) {
        const tl = gsap.timeline({ repeat: -1, delay: 1 });
        ROTATING_WORDS.forEach((word) => {
          tl.call(() => {
            rotator.textContent = word;
          })
            .fromTo(
              rotator,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
            )
            .to(
              rotator,
              { yPercent: -100, opacity: 0, duration: 0.35, ease: "power3.in" },
              "+=1.5",
            );
        });
      }
    },
    { scope: mainRef },
  );

  return (
    <main
      ref={mainRef}
      className="relative min-h-svh overflow-hidden bg-background"
    >
      <BlobBackground />

      <div className="relative mx-auto flex min-h-svh max-w-5xl flex-col px-6">
        <header className="flex h-16 items-center justify-between">
          <span className="text-lg font-bold tracking-tight">EventSocial</span>
          <Button asChild variant="outline" size="sm">
            <Link href={user ? "/eventsocial/events" : "/eventsocial/login"}>
              {user ? "Open app" : "Login"}
            </Link>
          </Button>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
            {["Create.", "Invite.", "Join."].map((word) => (
              <span
                key={word}
                className="inline-block overflow-hidden pb-1 align-bottom"
              >
                <span className="hero-word mx-2 inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-6 text-lg text-muted-foreground sm:text-xl">
            The easiest way to host{" "}
            <span className="inline-block overflow-hidden align-bottom">
              <span
                ref={rotatorRef}
                className="inline-block font-semibold text-foreground"
              >
                {ROTATING_WORDS[0]}
              </span>
            </span>
            <br className="sm:hidden" /> — and pack the room.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gradient-cta">
              <Link
                href={
                  user ? "/eventsocial/events/create" : "/eventsocial/login"
                }
              >
                {user ? "Create an event" : "Get started — it's free"}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/eventsocial/events">Browse events</Link>
            </Button>
          </div>

          <div className="hero-fade mt-16 grid w-full gap-4 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl bg-background/60 p-5 text-left shadow-lg shadow-black/10 backdrop-blur dark:ring-1 dark:ring-white/10"
              >
                <feature.icon className="size-6 text-primary" />
                <h2 className="mt-3 font-semibold">{feature.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="hero-fade flex justify-center pb-7">
          <ChevronDown className="hint-chev size-5.5 text-zinc-400" />
        </div>
      </div>

      <BuzzSentence />
      <PhoneShowcase />
      <MascotPromo />
      <FinalCta />
    </main>
  );
};

export default LandingPage;
