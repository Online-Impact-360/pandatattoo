"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hideOnBooking = pathname?.startsWith("/booking");
  if (hideOnBooking) return null;
  return <Footer />;
}
