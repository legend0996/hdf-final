import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>

        <footer style={{
          textAlign: "center",
          padding: "20px",
          marginTop: "40px",
          borderTop: "1px solid #ddd"
        }}>
          © 2026 Human Dignity Foundation
        </footer>
      </body>
    </html>
  );
}