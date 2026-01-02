import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
              <span className="text-foreground font-bold text-sm">C2S</span>
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
            Chat2Site ليس Website Builder — هو <span className="text-background font-medium">وكيل رقمي</span> ينفذ بدلاً عنك
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
