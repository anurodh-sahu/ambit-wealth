"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoginForm from "@/features/auth/components/LoginForm";
import { Button } from "@/components/ui/button";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "@/store/features/auth/authHook";
import { cn } from "@/lib/utils";

const quotes = [
  "Partnering in your growth. Guided by wisdom.",
  "Every sapling of growth springs from the soil of thought.",
  "Foresight is our first investment.",
];
export default function LoginPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState("");
  const [isLoingFormVisible, setIsLoingFormVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { loading, error, isAuthenticated } = useLogin();
  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   setCurrentView("login");
    // }, 3000);
    // return () => clearTimeout(timeout);
    setCurrentView("prelogin");
  }, []);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (!loading && !error && isAuthenticated && currentView === "login") {
      setCurrentView("welcome");

      timeout = setTimeout(() => {
        router.replace("/dashboard/home");
      }, 3000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [loading, error, currentView, isAuthenticated, router]);

  const handleSignInClick = () => {
    videoRef.current?.play();
    setIsVideoPlaying(true);
  };
  const handleVideoEnd = () => {
    setIsLoingFormVisible(true);
    setCurrentView("login");
    setIsVideoPlaying(false);
  };
  const renderQuote = (quote: string) => {
    return (
      <p
        className="text-xs font-normal text-popover-foreground"
        style={{ letterSpacing: "0.2em", wordSpacing: "0.2em" }}
      >
        {quote}
      </p>
    );
  };
  const getPageBg = () => {
    switch (currentView) {
      case "login":
        return "/tree.png";
      case "welcome":
        return "/tree-welcome.png";
      default:
        return "/tree-sappling.png";
    }
  };
  const renderView = () => {
    switch (currentView) {
      case "login":
        return (
          <div className="flex flex-1 h-full flex-col md:flex-row justify-between items-end gap-2 fade-in">
            {renderQuote(quotes[0])}
            <LoginForm />
          </div>
        );
      case "welcome":
        return (
          <div className="flex flex-1 h-full flex-col md:flex-row justify-between items-end gap-2 ">
            {renderQuote(quotes[2])}
            <div className="uppercase">
              <div className="uppercase text-xl">Welcome</div>
              <div> {user?.name} </div>
              {user?.inceptionDate && (
                <div className="text-primary">
                  PORTFOLIO INCEPTION DATE {user?.inceptionDate}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div
            className={cn(
              "flex  gap-2 items-end align-center justify-center h-full"
            )}
          >
            <div className="flex flex-col md:flex-row gap-5 h-full md:h-auto justify-between items-end md:items-center md:justify-center align-center md:align-center">
              {renderQuote(quotes[1])}
              <div
                className={cn(
                  "flex gap-2 items-center align-middle justify-end",
                  isVideoPlaying && "fade-out"
                )}
              >
                <div className="bg-primary w-[44px] h-[44px] rounded-full"></div>
                <Button
                  className=" h-11 rounded-full px-[47px] "
                  onClick={() => handleSignInClick()}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };
  return (
    <div className="relative w-full h-screen px-6 py-[41px] md:py-[19px]">
      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        playsInline
        muted
        className="absolute top-0 left-0 object-cover w-full h-full z-0"
      >
        <source src="/tree-animation.mp4" type="video/mp4" />
      </video>
      {/* <Image
        src={getPageBg()}
        alt="tree-animation"
        width={400}
        height={400}
        className="absolute top-0 left-0 object-cover w-full h-full z-0"
      /> */}

      <div className="relative max-w-screen-2xl mx-auto z-10 flex flex-col items-center md:items-end justify-center md:justify-between w-full h-full  max-h-[800px]">
        <header className="hidden md:block">
          <Image src="/logo.svg" alt="logo" width={180} height={99} />
        </header>
        <div className="flex flex-1 items-end justify-center  md:justify-end min-w-full md:min-w-[802px] ">
          {renderView()}
        </div>
      </div>
    </div>
  );
}
