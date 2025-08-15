"use client";
import { useEffect, useRef, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(null);
  const [clockState, setClockState] = useState({
    rotationOffset: 0,
    clockRadius: 125,
    isMobile: false,
  });
  const animationFrameId = useRef(null);
  const lastTime = useRef(null);

  const updateClock = () => {
    const now = new Date();
    const nowSeconds = now.getSeconds();
    const nowMinutes = now.getMinutes();
    if (!lastTime.current || nowSeconds !== lastTime.current.getSeconds() || nowMinutes !== lastTime.current.getMinutes()) {
      setTime(now);
      lastTime.current = now;
    }
    animationFrameId.current = requestAnimationFrame(updateClock);
  };

  useEffect(() => {
    setTime(new Date());
    lastTime.current = new Date();

    const handleResize = () => {
      if (typeof window !== "undefined") {
        const mobile = window.innerWidth < 768;
        setClockState((prev) => ({
          ...prev,
          isMobile: mobile,
          clockRadius: mobile ? 90 : 125,
        }));
      }
    };

    handleResize();
    animationFrameId.current = requestAnimationFrame(updateClock);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!time) {
    return (
      <div className="clock-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-72 h-72 rounded-full">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white"></div>
        </div>
      </div>
    );
  }

  const { rotationOffset, clockRadius, isMobile } = clockState;
  const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
  const minutes = time.getMinutes();
  const hours = time.getHours();
  const secondDeg = (seconds / 60) * 360 + rotationOffset;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = ((hours % 12) * 30) + (minutes / 60) * 30;

  const renderDots = () => {
    const dots = [];
    const fullCircle = 360;
    const size = isMobile ? 70 : 150;
    const outerRadius = clockRadius + size;
    const innerRadius = outerRadius;

    for (let i = 0; i < 12; i++) {
      const baseAngle = (i / 12) * fullCircle;
      for (let j = 0; j < 5; j++) {
        const angle = baseAngle + j * 6;
        const isNumber = j === 0;
        const radius = isNumber ? outerRadius : innerRadius;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        dots.push(
          <div
            key={`${i}-${j}`}
            className="absolute"
            style={{
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className={`${isNumber ? "w-3 h-3 md:w-5 md:h-5" : "w-1 h-1"} rounded-full bg-white`}></div>
          </div>
        );
      }
    }
    return dots;
  };

  return (
    <div className="clock-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="relative w-72 h-72 rounded-full">
        <div
          className="absolute bottom-1/2 left-1/2 w-1 h-[50%] md:h-[80%] bg-red-500 
                    before:absolute before:content-[''] before:w-full before:h-full before:bg-white 
                    before:bottom-[-50px] before:clip-path-[polygon(50%_0,100%_100%,0%_100%)] 
                    after:absolute after:content-[''] after:w-full after:h-full after:bg-white 
                    after:top-[-10px] after:clip-path-[polygon(50%_0,100%_50%,0%_100%)]"
          style={{
            transformOrigin: "bottom center",
            transform: `rotate(${secondDeg}deg)`,
          }}
        ></div>
        <div
          className="absolute bottom-1/2 left-1/2 h-[40%] md:h-[60%] bg-transparent"
          style={{
            width: "8px",
            transformOrigin: "bottom center",
            transform: `rotate(${minuteDeg}deg)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <div
            className="absolute w-[10px] h-[50px] bg-white"
            style={{
              left: "-3px",
              bottom: "-25px",
              clipPath: "polygon(50% 0, 100% 100%, 0% 100%)",
            }}
          ></div>
          <div
            className="absolute w-full h-full bg-white"
            style={{
              left: "-1px",
              top: "-10px",
              clipPath: "polygon(30% 0, 65% 0, 100% 100%, 0% 100%)",
            }}
          ></div>
        </div>
        <div
          className="absolute bottom-1/2 left-[calc(50%-4px)] h-[30%] md:h-[30%] bg-transparent"
          style={{
            width: "13px",
            transformOrigin: "bottom center",
            transform: `rotate(${hourDeg}deg)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <div
            className="absolute w-[18px] h-[50px] bg-white"
            style={{
              left: "-1px",
              bottom: "-35px",
              clipPath: "polygon(25% 0, 75% 0, 90% 100%, 10% 100%)",
            }}
          ></div>
          <div
            className="absolute w-full h-full bg-white"
            style={{
              left: "1px",
              clipPath: "polygon(30% 0, 65% 0, 100% 100%, 0% 100%)",
            }}
          ></div>
        </div>
        {renderDots()}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white"></div>
      </div>
    </div>
  );
}