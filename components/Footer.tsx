import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import sankalpLogo from "../public/assets/sankalp-red.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-20 pb-10 text-gray-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 pointer-events-none">
              <Image
                src={sankalpLogo}
                alt="Sankalp Constructions Logo"
                width={200}
                height={200}
                className="w-auto h-16 md:h-20 object-contain"
                priority
              />
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Experience the pinnacle of luxury living. With over two decades of experience, we build homes that redefine your lifestyle.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#711113] hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#711113] hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#711113] hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/#story" className="text-sm hover:text-[#F5C33C] transition-colors">Brand Story</Link></li>
              <li><Link href="/#projects" className="text-sm hover:text-[#F5C33C] transition-colors">Our Projects</Link></li>
              <li><Link href="/#amenities" className="text-sm hover:text-[#F5C33C] transition-colors">Amenities</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-[#F5C33C] transition-colors">Insights & Blogs</Link></li>
            </ul>
          </div>

          {/* Our Projects */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Top Projects</h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-sm hover:text-[#29B1D2] transition-colors">Sankalp Heights</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-[#29B1D2] transition-colors">Sankalp Residency</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-[#29B1D2] transition-colors">Sankalp Villas</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-[#29B1D2] transition-colors">Sankalp Greens</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#29B1D2] shrink-0 mt-1" />
                <span className="text-sm">
                  123, Premium Tower, Senapati Bapat Road, Pune - 411016
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#29B1D2] shrink-0" />
                <span className="text-sm">+91 73307 70111</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#29B1D2] shrink-0" />
                <span className="text-sm">info@sankalpconstructions.in</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Sankalp Constructions. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
