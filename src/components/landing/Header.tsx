import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C2S</span>
            </div>
            <span className="font-bold text-xl text-foreground">Chat2Site</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              الرئيسية
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              الأسعار
            </Link>
            <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
              كيف يعمل
            </Link>
          </nav>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link to="/dashboard">
              <Button variant="ghost">لوحة التحكم</Button>
            </Link>
            <Link to="/app">
              <Button variant="default">ابدأ الآن</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                الرئيسية
              </Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                الأسعار
              </Link>
              <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                كيف يعمل
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link to="/dashboard">
                  <Button variant="ghost" className="w-full">لوحة التحكم</Button>
                </Link>
                <Link to="/app">
                  <Button variant="default" className="w-full">ابدأ الآن</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
