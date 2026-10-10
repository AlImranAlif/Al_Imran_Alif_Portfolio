"use client";
import { useRef, type ReactNode } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
} from "framer-motion";
// Content is never hidden: readable without JavaScript and safe for reduced motion.
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30px 0px" });
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="h-full"
        ref={ref}
        initial={false}
        animate={{ y: !reduce && !inView ? 10 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}