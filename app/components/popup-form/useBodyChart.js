"use client";
import { useEffect, useRef, useState } from "react";

export function useBodyChart(formData, onPathClick, pathSelector = 'path[id^="mfb_"]') {
  const [selectedPaths, setSelectedPaths] = useState(new Set());
  const tipRef = useRef(null);

  // Initialize selectedPaths based on bodyPositionImage from formData
  useEffect(() => {
    const initialSelections = formData.bodyPositionImage
      ? new Set(formData.bodyPositionImage.split(",").map((item) => item.trim()))
      : new Set();
    setSelectedPaths(initialSelections);

    document.querySelectorAll(pathSelector).forEach((path) => {
      const className = path.getAttribute("class");
      if (initialSelections.has(className)) {
        path.style.fill = "rgba(255, 0, 0, 0.7)";
      } else {
        path.style.fill = "transparent";
      }
    });
  }, [formData.bodyPositionImage, pathSelector]);

  const handleMouseEnter = (e) => {
    const path = e.target;
    path.style.fill = "rgba(255, 0, 0, 0.3)";
    if (tipRef.current) {
      tipRef.current.style.display = "block";
      tipRef.current.innerHTML = path.getAttribute("class") || "Unknown";
      updateTipPosition(e);
    }
  };

  const handleMouseLeave = (e) => {
    const path = e.target;
    if (!selectedPaths.has(path.getAttribute("class"))) {
      path.style.fill = "transparent";
    }
    if (tipRef.current) {
      tipRef.current.style.display = "none";
    }
  };

  const updateTipPosition = (e) => {
    if (tipRef.current) {
      let x = e.pageX + 10;
      let y = e.pageY + 15;
      const tipWidth = tipRef.current.offsetWidth || 100;
      const tipHeight = tipRef.current.offsetHeight || 50;

      x = x + tipWidth > window.scrollX + window.innerWidth ? x - tipWidth - 40 : x;
      y = y + tipHeight > window.scrollY + window.innerHeight ? window.scrollY + window.innerHeight - tipHeight - 10 : y;

      tipRef.current.style.left = `${x}px`;
      tipRef.current.style.top = `${y}px`;
    }
  };

  const handlePathClick = (e) => {
    const path = e.target;
    const className = path.getAttribute("class");
    if (!className) return;

    const newSelectedPaths = new Set(selectedPaths);
    if (newSelectedPaths.has(className)) {
      newSelectedPaths.delete(className);
      path.style.fill = "transparent";
      if (onPathClick) onPathClick(className, true);
    } else {
      newSelectedPaths.add(className);
      path.style.fill = "rgba(255, 0, 0, 0.7)";
      if (onPathClick) onPathClick(className, false);
    }
    setSelectedPaths(newSelectedPaths);
  };

  return {
    tipRef,
    handlePathClick,
    handleMouseEnter,
    handleMouseLeave,
    updateTipPosition,
  };
}