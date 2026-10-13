import "./globals.css";
import Script from "next/script";
export const metadata = {
  title: "Mohamed Ayaan — Your move.",
  description:
    "Play through projects and writing in Mohamed Ayaan’s interactive portfolio.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/vendor/katex.min.css" />
      </head>
      <body>
        {children}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-WJY5P3KGHD"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
        >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-WJY5P3KGHD');`}</Script>
      </body>
    </html>
  );
}
