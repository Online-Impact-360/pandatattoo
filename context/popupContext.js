"use client";
import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

	const openPopup = (data = null) => {
		setPopupData(data);
		setIsOpen(true);
	}

	const closePopup = () => {
		setIsOpen(false);
		setPopupData(null);
	}

  return (
    <PopupContext.Provider value={{ isOpen, openPopup, closePopup, popupData }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  
  return context;
}
