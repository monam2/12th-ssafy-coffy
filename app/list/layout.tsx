import Footer from "@/components/elements/footer/Footer";
import Header from "@/components/elements/header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
