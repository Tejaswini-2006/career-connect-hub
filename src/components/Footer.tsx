import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Footer = () => (
  <footer className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg text-sidebar-foreground mb-3">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-primary-foreground" />
            </div>
            Career Connect Hub
          </Link>
          <p className="text-sm text-sidebar-foreground/60 leading-relaxed">
            Connecting talented professionals with outstanding career opportunities worldwide.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3">For Job Seekers</h4>
          <ul className="space-y-2 text-sm text-sidebar-foreground/60">
            <li><Link to="/jobs" className="hover:text-sidebar-primary transition-colors">Browse Jobs</Link></li>
            <li><Link to="/companies" className="hover:text-sidebar-primary transition-colors">Top Companies</Link></li>
            <li><Link to="/register" className="hover:text-sidebar-primary transition-colors">Create Profile</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3">For Employers</h4>
          <ul className="space-y-2 text-sm text-sidebar-foreground/60">
            <li><Link to="/dashboard" className="hover:text-sidebar-primary transition-colors">Post a Job</Link></li>
            <li><Link to="/companies" className="hover:text-sidebar-primary transition-colors">Browse Talent</Link></li>
            <li><Link to="/contact" className="hover:text-sidebar-primary transition-colors">Enterprise Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3">Company & Support</h4>
          <ul className="space-y-2 text-sm text-sidebar-foreground/60">
            <li><Link to="/about" className="hover:text-sidebar-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-sidebar-primary transition-colors">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-sidebar-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-sidebar-border flex flex-col sm:flex-row items-center justify-between text-xs text-sidebar-foreground/50 gap-2">
        <p>© 2026 Career Connect Hub. All rights reserved.</p>
        <p>Created with excellence by <span className="font-semibold text-sidebar-foreground">Tejaswini Rakhunde</span></p>
      </div>
    </div>
  </footer>
);

export default Footer;
