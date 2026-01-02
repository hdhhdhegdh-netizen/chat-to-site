import { Link } from "react-router-dom";
import { Bot } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
              <Bot className="w-4 h-4 text-foreground" />
            </div>
            <span className="font-bold text-xl">Chat2Site</span>
          </div>
          
          {/* Links */}
          <nav className="flex items-center gap-8 text-sm">
            <Link to="/" className="text-background/70 hover:text-background transition-colors">
              الرئيسية
            </Link>
            <Link to="/pricing" className="text-background/70 hover:text-background transition-colors">
              الأسعار
            </Link>
            <Link to="/docs" className="text-background/70 hover:text-background transition-colors">
              المساعدة
            </Link>
          </nav>
          
          {/* Copyright */}
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Chat2Site. جميع الحقوق محفوظة.
          </p>
        </div>
        
        {/* Positioning statement */}
        <div className="mt-8 pt-8 border-t border-background/10 text-center">
          <p className="text-background/60 text-sm">
            Chat2Site ليس أداة بناء مواقع — هو <span className="text-background font-medium">وكيلك الذكي</span> الذي يبني وينشر بدلاً عنك
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
