import { Flame } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">
              SexTool<span className="text-primary">Store</span>
            </span>
          </div>

          {/* Info */}
          <p className="text-sm text-muted-foreground text-center">
            Anonymous. Secure. Pleasure.
          </p>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SexToolStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
