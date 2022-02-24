import { Header } from "./header";
import { Footer } from "./footer";
import classNames from "classnames";

interface LayoutProps {
  children: any;
  isLightTheme?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  isLightTheme = true,
}) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main
        className={classNames("flex-grow-1", {
          "bg-dark-theme": !isLightTheme,
        })}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
