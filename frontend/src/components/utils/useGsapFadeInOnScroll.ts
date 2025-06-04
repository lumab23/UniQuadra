import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsapFadeInOnScroll = (ref: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    return () => {
      if (ref.current) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [ref]);
};

export default useGsapFadeInOnScroll; 