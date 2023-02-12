import Footer from "./components/Footer";
import Header from "./components/Header";

function Layout({ children }: any) {
  return (
    <div className="relative h-screen">
      <Header />
      <div className="h-[calc(100vh-128px)] overflow-hidden">{children}</div>
      <div className="absolute bottom-0 w-screen">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
