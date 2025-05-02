
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import Header from "./Header";
import BetSlip from "./BetSlip";
import { ToastProvider } from "@/components/ui/toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDarkMode } = useAppStore();
  
  useEffect(() => {
    // Set initial theme based on store
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <div className="fixed inset-0 z-[-1] bg-gradient-to-bl from-background to-background/95">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(155,135,245,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(126,105,171,0.08),transparent_40%)]"></div>
        </div>
        <Header />
        <div className="pt-20">{children}</div>
        <BetSlip />
      </div>
    </ToastProvider>
  );
};

export default Layout;
