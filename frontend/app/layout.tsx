import "@radix-ui/themes/styles.css"
import "@/styles/index_header_styles.css"
import "@/styles/gui.css"

import type { Metadata } from "next"
import Providers from "./providers"
import { ViewTransitions } from "next-view-transitions"

export const metadata: Metadata = {
  title: "Logitrac",
  description: "Logitrac is a tool",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body style={{ padding: 0, margin: 0 }}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
