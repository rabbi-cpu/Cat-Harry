import Link from "next/link";
import { Aperture } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#05070c] border-t border-white/8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Logo & Narrative */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <Aperture className="h-4 w-4" />
              </div>
              <span>Studio<span className="text-cyan-400">Space</span></span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Peer-to-peer workspace platform for creative filmmakers, audio engineers, and visual directors.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/studios" className="hover:text-white transition">Browse Studios</Link></li>
              <li><Link href="/add-studio" className="hover:text-white transition">List Your Space</Link></li>
              <li><Link href="/manage-studios" className="hover:text-white transition">Host Dashboard</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Spaces</h4>
            <ul className="space-y-2">
              <li><Link href="/studios?category=Photo%20Studio" className="hover:text-white transition">Photo Studios</Link></li>
              <li><Link href="/studios?category=Film%20Production" className="hover:text-white transition">Film Soundstages</Link></li>
              <li><Link href="/studios?category=Podcast%20Suite" className="hover:text-white transition">Podcast Suites</Link></li>
            </ul>
          </div>

          {/* Social Channels (Inline SVG to prevent module errors) */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Connect</h4>
            <p className="text-xs text-slate-400">Dhaka, Bangladesh</p>
            <div className="flex items-center gap-3 pt-2">
              {/* GitHub */}
              <a
                href="https://github.com/rabbi-cpu"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition"
                title="GitHub"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <span className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition cursor-pointer" title="X">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </span>

              {/* LinkedIn */}
              <span className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition cursor-pointer" title="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 0 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 StudioSpace Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}