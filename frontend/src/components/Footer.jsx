import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        
         {/* Branding * */}
        <p className="text-sm sm:text-base text-center sm:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-white">Social Analytics</span>. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex gap-4 text-sm font-medium">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link to="/support" className="hover:text-white transition-colors">Support</Link>
        </div>

      </div>
    </footer>
  );
}
