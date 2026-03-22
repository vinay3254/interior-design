import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const springConfig = {
  stiffness: 160,
  damping: 18,
  mass: 0.35,
};

function MagneticButton({
  children,
  className = "",
  href,
  icon = true,
  disabled = false,
  type = "button",
  ...props
}) {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const glowX = useTransform(springX, [-18, 18], ["42%", "58%"]);
  const glowY = useTransform(springY, [-18, 18], ["42%", "58%"]);
  const highlight = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.28), rgba(255,255,255,0) 62%)`;

  const sharedProps = {
    className: `group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.02em] transition-colors duration-300 ${disabled ? "pointer-events-none opacity-60" : ""} ${className}`,
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
    onMouseMove: (event) => {
      if (disabled || !containerRef.current) {
        return;
      }

      const bounds = containerRef.current.getBoundingClientRect();
      const offsetX = event.clientX - (bounds.left + bounds.width / 2);
      const offsetY = event.clientY - (bounds.top + bounds.height / 2);
      x.set(offsetX * 0.14);
      y.set(offsetY * 0.14);
    },
    ref: containerRef,
    style: {
      x: springX,
      y: springY,
    },
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
    whileTap: disabled
      ? undefined
      : {
          scale: 0.98,
          y: 1,
        },
    ...props,
  };

  const content = (
    <>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundImage: highlight }}
      />
      <span className="relative z-10">{children}</span>
      {icon ? (
        <ArrowUpRight
          aria-hidden="true"
          className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          size={18}
          weight="regular"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...sharedProps}>
      {content}
    </motion.button>
  );
}

export default MagneticButton;
