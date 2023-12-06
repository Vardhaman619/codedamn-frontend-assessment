import "~/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "~/components/shared/header";
import { Toaster } from "~/components/ui/toaster";
import Footer from "~/components/shared/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Codedamn Frontend Assessment",
  description: "Built With Next.js 14 | Primsa | NextAuth",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} flex min-h-screen flex-col px-4 pt-5 md:px-10`}
      >
        <Header />
        <div className="flex-grow">{children}</div>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
