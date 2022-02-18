import { Header } from "./header";
import { Footer } from "./footer";

export const Layout: React.FC = ({ children }: any) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};
