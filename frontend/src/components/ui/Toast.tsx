import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ToastProps {
  message: string;
  type?: "error" | "success";
  onClose?: () => void;
  duration?: number; // ms
}

const Toast = ({ message, type = "error", onClose, duration = 3000 }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
    const timer = setTimeout(() => {
      if (toastRef.current) {
        gsap.to(toastRef.current, {
          y: -40,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: onClose
        });
      } else {
        onClose && onClose();
      }
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      ref={toastRef}
      className={`toast ${type}`}
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        minWidth: 260,
        maxWidth: 400,
        padding: "16px 28px 16px 20px",
        borderRadius: 10,
        background: type === "error" ? "#fee2e2" : "#d1fae5",
        color: type === "error" ? "#b91c1c" : "#065f46",
        boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        fontWeight: 600,
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        gap: 12,
        border: type === "error" ? "1.5px solid #fecaca" : "1.5px solid #6ee7b7"
      }}
    >
      <span style={{ fontSize: 20 }}>
        {type === "error" ? "❌" : "✅"}
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Toast; 