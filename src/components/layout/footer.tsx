import Link from "next/link";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-secondary bg-background/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
          <div className="flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8678F9] to-purple-500 font-bold">
              EventCraft
            </span>
            <span className="text-sm text-gray-400">
              © {new Date().getFullYear()} All rights reserved
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors"
            >
              Terms
            </Link>
          </nav>

          <a
            href="https://github.com/Amama-Fatima/event-project"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-gray-300 transition-colors"
          >
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>

      <div className="relative h-0.5 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8678F9] via-purple-600 to-[#8678F9] blur-lg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8678F9] via-purple-600 to-[#8678F9] opacity-50" />
      </div>
    </footer>
  );
};

export default Footer;
