import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { label: "Browse Stories", href: "/browse" },
        { label: "Featured Authors", href: "/authors" },
        { label: "Popular Fandoms", href: "/fandoms" },
        { label: "Recent Updates", href: "/updates" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Forums", href: "/forums" },
        { label: "Writing Contests", href: "/contests" },
        { label: "Reading Clubs", href: "/reading-clubs" },
        { label: "Watch Streams", href: "/watch-streams" },
        { label: "Support", href: "/support" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-secondary py-4 w-full text-xs">
      <div className="container content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Logo and Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-2">
              <h2 className="font-serif text-sm font-bold">
                FAN<span className="text-gradient">VERSE</span>
              </h2>
            </Link>
            <p className="text-muted-foreground mb-2 max-w-md">
              Join our newsletter for updates and exclusive content.
            </p>
            <div className="flex gap-1 max-w-md">
              <Input
                type="email"
                placeholder="Email"
                className="rounded-full text-xs"
              />
              <Button className="rounded-full px-2 text-xs">Subscribe</Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-bold text-xs mb-1">{group.title}</h3>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-4 pt-2 flex flex-col md:flex-row justify-between items-center gap-1">
          <p className="text-muted-foreground">
            © {currentYear} FANVERSE. All rights reserved.
          </p>
          <p className="text-muted-foreground flex items-center">
            Made with <Heart className="h-3 w-3 text-red-400 mx-1" /> for fans
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
