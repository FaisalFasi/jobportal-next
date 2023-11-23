import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Setup from "@/components/setup/Setup";
import { Providers } from "./GlobalRedux/Features/provider";

const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <Setup />
          <Navbar />
          <div className="pt-[88px]">{children}</div>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
