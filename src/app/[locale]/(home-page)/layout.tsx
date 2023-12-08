import React from "react";

import { Header } from "@/blocks/Header/Header";
import { Footer } from "@/blocks/Footer/Footer";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
