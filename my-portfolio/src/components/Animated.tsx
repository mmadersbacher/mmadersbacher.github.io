import { LazyMotion, domAnimation, m } from "framer-motion";

export const FadeInUp: React.FC<
  React.PropsWithChildren<{ delay?: number }>
> = ({ children, delay = 0 }) => (
  <LazyMotion features={domAnimation}>
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  </LazyMotion>
);

export const StaggerContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <LazyMotion features={domAnimation}>
    <m.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {children}
    </m.div>
  </LazyMotion>
);

export const StaggerItem: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <m.div
    variants={{
      hidden: { opacity: 0, y: 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }}
  >
    {children}
  </m.div>
);
