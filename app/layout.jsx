import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "GlowAura. - Shop smarter",
  description: "GlowAura. - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', (event) => {
                if (event.message && event.message.includes('ChunkLoadError')) {
                  window.location.reload();
                }
              }, true);
              window.addEventListener('unhandledrejection', (event) => {
                if (event.reason && event.reason.message && event.reason.message.includes('ChunkLoadError')) {
                  window.location.reload();
                }
              });
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.className} antialiased`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <StoreProvider>
            <Toaster />
            {children}
          </StoreProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
