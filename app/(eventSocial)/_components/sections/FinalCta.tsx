"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../_context/AuthContext";

gsap.registerPlugin(ScrollTrigger);

const FinalCta = () => {
  const { user } = useAuth();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-in", {
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className=" px-6 pt-[20vh] pb-0 text-center">
      <h2 className="cta-in text-[clamp(40px,5vw,64px)] leading-[1.1] font-extrabold tracking-[-0.03em]">
        Ready to pack the room?
      </h2>

      <div className="cta-in mt-8 flex justify-center">
        <Button asChild size="lg" className="gradient-cta">
          <Link
            href={user ? "/eventsocial/events/create" : "/eventsocial/login"}
          >
            Get started — it&apos;s free
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>

      <p className="mt-30 pb-6 text-xs text-muted-foreground">
        EventSocial — bring people together.
      </p>
    </section>
  );
};

export default FinalCta;
