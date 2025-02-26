
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: July 15, 2023
            </p>
          </div>

          {/* Privacy Alert */}
          <Alert className="mb-8">
            <Shield className="h-4 w-4" />
            <AlertTitle>Your Privacy Matters</AlertTitle>
            <AlertDescription>
              This Privacy Policy explains how we collect, use, and protect your personal information. We're committed to transparency and giving you control over your data.
            </AlertDescription>
          </Alert>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-1">
                <Button variant="ghost" className="w-full justify-start text-primary font-medium">
                  <a href="#introduction">1. Introduction</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#information">2. Information We Collect</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#how-we-use">3. How We Use Your Information</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#sharing">4. Information Sharing</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#choices">5. Your Choices & Rights</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#security">6. Data Security</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#international">7. International Transfers</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#children">8. Children's Privacy</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#updates">9. Updates to This Policy</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#contact">10. Contact Us</a>
                </Button>
              </div>
            </div>

            {/* Privacy Content */}
            <div className="md:col-span-3">
              <ScrollArea className="h-[calc(100vh-250px)] pr-4">
                <div className="space-y-8">
                  <section id="introduction">
                    <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                    <p className="text-muted-foreground mb-3">
                      At FanFic Universe, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and other services (collectively, the "Service").
                    </p>
                    <p className="text-muted-foreground mb-3">
                      Please read this Privacy Policy carefully. By using the Service, you consent to the collection, use, and sharing of your information as described in this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
                    </p>
                    <p className="text-muted-foreground">
                      This Privacy Policy applies to all users of the Service, including unregistered visitors and registered users. For the purposes of applicable data protection laws, FanFic Universe, Inc. is the "data controller" of your information.
                    </p>
                  </section>

                  <Separator />

                  <section id="information">
                    <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                    <p className="text-muted-foreground mb-3">
                      We collect several types of information from and about users of our Service, including:
                    </p>

                    <h3 className="text-lg font-semibold mb-2">2.1 Information You Provide to Us</h3>
                    <ul className="list-disc pl-5 mb-3 text-muted-foreground space-y-1">
                      <li>Account information: When you create an account, we collect your username, email address, and password.</li>
                      <li>Profile information: Any information you choose to add to your profile, such as a bio, profile picture, location, and social media links.</li>
                      <li>Content: The stories, comments, messages, and other content you post or share through the Service.</li>
                      <li>Communications: Information you provide when you contact us for support or participate in surveys or promotions.</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">2.2 Information We Collect Automatically</h3>
                    <ul className="list-disc pl-5 mb-3 text-muted-foreground space-y-1">
                      <li>Usage information: Details of your visits to the Service, including traffic data, logs, and other communication data.</li>
                      <li>Device information: Information about your device, including IP address, browser type, operating system, and device identifiers.</li>
                      <li>Location information: We may collect approximate location data based on your IP address.</li>
                      <li>Cookies and similar technologies: We use cookies and similar technologies to collect information about your browsing behavior. For more information, please see our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">2.3 Information From Third Parties</h3>
                    <p className="text-muted-foreground">
                      If you choose to sign in using a third-party account (such as Google or Twitter), we may receive certain information from that service, such as your name, email address, and profile picture, in accordance with that service's privacy policy and your privacy settings on that service.
                    </p>
                  </section>

                  <Separator />

                  <section id="how-we-use">
                    <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                    <p className="text-muted-foreground mb-3">
                      We use the information we collect for various purposes, including:
                    </p>
                    <ul className="list-disc pl-5 mb-3 text-muted-foreground space-y-1">
                      <li>Providing, maintaining, and improving the Service</li>
                      <li>Creating and managing your account</li>
                      <li>Processing and fulfilling your requests</li>
                      <li>Communicating with you about the Service, including sending notifications about activity relevant to you</li>
                      <li>Personalizing your experience and delivering content tailored to your interests</li>
                      <li>Analyzing usage patterns to improve the Service</li>
                      <li>Detecting, preventing, and addressing technical issues, security breaches, and fraudulent activities</li>
                      <li>Complying with legal obligations</li>
                    </ul>
                    <p className="text-muted-foreground">
                      We process this information based on our legitimate interest in providing and improving the Service, to perform our contractual obligations to you, with your consent when required, or to comply with legal obligations.
                    </p>
                  </section>

                  <Separator />

                  <section id="sharing">
                    <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
                    <p className="text-muted-foreground mb-3">
                      We may share your information in the following circumstances:
                    </p>
                    <ul className="list-disc pl-5 mb-3 text-muted-foreground space-y-1">
                      <li><strong>Public Content:</strong> Any content you post publicly on the Service, such as stories, comments, or profile information, will be visible to other users.</li>
                      <li><strong>Service Providers:</strong> We may share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                      <li><strong>Compliance with Laws:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities.</li>
                      <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                      <li><strong>With Your Consent:</strong> We may share information for other purposes with your consent.</li>
                    </ul>
                    <p className="text-muted-foreground">
                      We do not sell your personal information to third parties for monetary compensation. However, we may share certain information with partners for analytics, advertising, or other purposes as described in this policy.
                    </p>
                  </section>

                  {/* ... Additional sections would continue ... */}

                  <Separator />

                  <section id="contact">
                    <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                    <p className="text-muted-foreground mb-3">
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <p className="text-muted-foreground mb-5">
                      privacy@fanficuniverse.com
                    </p>
                    
                    <p className="text-muted-foreground mb-3">
                      FanFic Universe, Inc.<br />
                      123 Storyteller Lane<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                    
                    <p className="text-muted-foreground">
                      Data Protection Officer: privacy-officer@fanficuniverse.com
                    </p>
                  </section>
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 p-8 rounded-xl bg-muted text-center">
            <h3 className="text-xl font-bold mb-2">Your Privacy is Important to Us</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              If you have any questions about how we collect, use, or protect your personal information, please don't hesitate to reach out to our privacy team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="rounded-full px-8">
                Contact Privacy Team
              </Button>
              <Link to="/terms-of-service">
                <Button variant="outline" className="rounded-full px-8">
                  View Terms of Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
