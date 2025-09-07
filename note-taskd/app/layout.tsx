import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "NoteTaskD",
  description: "a simple task manager app",
};

const nunitoSansFont = localFont({
  src: "./fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
  weight: "400",
  variable: "--font-sans",
});

const nunitoFont = localFont({
  src: "./fonts/Nunito-Regular.ttf",
  weight: "400",
  variable: "--font-nunito",
});

const fredokaFont = localFont({
  src: "./fonts/Fredoka-Regular.ttf",
  weight: "400",
  variable: "--font-fredoka",
});

const outfitFont = localFont({
  src: "./fonts/Outfit-Regular.ttf",
  weight: "400",
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoFont.variable} ${nunitoSansFont.variable} ${fredokaFont.variable} ${outfitFont.variable} antialiased`}
      >
        <p className="font-nunito font-bold text-3xl text-indigo-300 text-center m-1.5">
          NoteTaskD
        </p>
        {children}
      </body>
    </html>
  );
}
