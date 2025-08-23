import Footer from "./Footer";
import Navbar from "./Navbar";
import Loader from "../common/Loader"; // new loader component
import { useSelector } from "react-redux";

export default function AppLayout({ children }) {
  const { isLoading } = useSelector((state) => state.loader);

  return (
    <div className="flex flex-col min-h-screen relative">
      {isLoading && <Loader />}
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
