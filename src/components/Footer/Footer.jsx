import React from "react";
import { Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0c4428]">
      <div className="max-w-11/12 mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <NavLink to="/" className="text-xl md:text-3xl font-bold text-white mb-4">
              PlateShare
            </NavLink>
            <p className="text-white/80 text-center md:text-left text-sm">
              Connecting communities through food sharing. Reducing waste, feeding hope.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <NavLink to="/" className="text-white/80 hover:text-white transition-colors text-sm">
                Home
              </NavLink>
              <NavLink to="/available-foods" className="text-white/80 hover:text-white transition-colors text-sm">
                Available Foods
              </NavLink>
              <NavLink to="/add-food" className="text-white/80 hover:text-white transition-colors text-sm">
                Share Food
              </NavLink>
              <NavLink to="/about" className="text-white/80 hover:text-white transition-colors text-sm">
                About Us
              </NavLink>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Info</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Mail size={16} />
                <span>info@plateshare.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin size={16} />
                <span>123 Community St, Food City, FC 12345</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/plateshare" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  className="bg-white w-7 h-7 rounded-full box-border p-1"
                >
                  <path
                    fill="black"
                    d="M18.244 2H21.5l-7.59 8.67L22 22h-5.828l-4.573-6.236L6.234 22H3l8.083-9.22L2 2h5.828l4.167 5.736L18.244 2z"
                  />
                </svg>
              </a>

              <a 
                href="https://facebook.com/plateshare" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Facebook className="bg-white w-7 h-7 rounded-full box-border p-1" />
              </a>

              <a 
                href="https://linkedin.com/company/plateshare" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Linkedin className="bg-white w-7 h-7 rounded-full box-border p-1" />
              </a>

              <a 
                href="https://instagram.com/plateshare" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  className="bg-white w-7 h-7 rounded-full box-border p-1"
                >
                  <path
                    fill="black"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mt-8 mb-6" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <p className="text-white/80 text-sm text-center md:text-left">
            Copyright © 2025 PlateShare - All rights reserved
          </p>
          <div className="flex gap-6 text-sm">
            <NavLink to="/privacy" className="text-white/80 hover:text-white transition-colors">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="text-white/80 hover:text-white transition-colors">
              Terms of Service
            </NavLink>
            <NavLink to="/contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
