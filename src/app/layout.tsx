import "./globals.css";
import Analytics from "@/components/home/Analytics";
import { Toaster } from "react-hot-toast";
import ThemeRegistry from "@/components/ThemeRegistry";
import { fixel } from "@/app/styles/fonts";

const _title = "Data Engineering Resources — Nata in Data";
const _descr =
  "Data, SQL, Cloud and everything you need to start and excel in your Data Engineer career";

export const metadata = {
  title: _title,
  description: _descr,
  openGraph: {
    title: _title,
    description: _descr,
    // images: "/images/site_preview.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={fixel.className}>
        <ThemeRegistry options={{ key: "mui" }}>
          <main>{children}</main>
        </ThemeRegistry>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
