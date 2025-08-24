import "./globals.css";

export const metadata = {
  title: "Events App",
  description: "Events with Supabase + Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
