export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout should never be reached due to middleware
  // The middleware will redirect to the appropriate locale
  return <>{children}</>;
}
