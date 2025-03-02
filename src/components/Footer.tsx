
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <footer className="bg-secondary py-16 w-full">
      <div className="container content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <h2 className="font-serif text-2xl font-bold">
                FanFic<span className="text-gradient">Universe</span>
              </h2>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Join our newsletter for the latest updates, featured stories, and
              exclusive content from your favorite writers.
            </p>
            <div className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-full"
              />
              <Button className="rounded-full px-6">Subscribe</Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-bold text-base mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} FanFic Universe. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center">
            Made with <Heart className="h-3.5 w-3.5 text-red-400 mx-1" /> for
            storytellers and fans
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
