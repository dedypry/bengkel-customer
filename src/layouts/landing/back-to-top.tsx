import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Muncul jika scroll lebih dari 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Button
      isIconOnly
      className={`
        fixed right-6 z-50 shadow-lg transition-all duration-500 ease-in-out
        bg-danger text-white rounded-full w-12 h-12 hover:bg-[#0B1C39]
        ${
          isVisible
            ? "bottom-6 opacity-100 translate-y-0"
            : "-bottom-20 opacity-0 translate-y-10 pointer-events-none"
        }
      `}
      onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={24} />
    </Button>
  );
}
