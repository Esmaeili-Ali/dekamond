import { Metadata, Viewport } from "next";
import "@/styles/globals.scss";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `کالری ای آی`,
    description: `دستیار رژیم هوشمند شما`,
    openGraph: {
      title: `کالری ای آی`,
      description: `دستیار رژیم هوشمند شما`,
      siteName: "KaleriAi",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `کالری ای آی`,
      description: `دستیار رژیم هوشمند شما`,
    },
  };
}
export const viewport: Viewport = {
  themeColor: "#0AB54E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body>{children}</body>
    </html>
  );
}
