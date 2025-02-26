
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: July 15, 2023
            </p>
          </div>

          {/* Terms Alert */}
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Please read these Terms of Service carefully before using FanFic Universe. By accessing or using our service, you agree to be bound by these terms.
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
                  <a href="#definitions">2. Definitions</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#access">3. Access to the Service</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#accounts">4. Accounts</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#content">5. User Content</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#copyright">6. Copyright Policy</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#conduct">7. Code of Conduct</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#privacy">8. Privacy</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#modifications">9. Modifications</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#limitation">10. Limitation of Liability</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#termination">11. Termination</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#governing">12. Governing Law</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <a href="#contact">13. Contact Us</a>
                </Button>
              </div>
            </div>

            {/* Terms Content */}
            <div className="md:col-span-3">
              <ScrollArea className="h-[calc(100vh-250px)] pr-4">
                <div className="space-y-8">
                  <section id="introduction">
                    <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                    <p className="text-muted-foreground mb-3">
                      Welcome to FanFic Universe, a platform dedicated to fan fiction writers and readers. By accessing or using our website, mobile applications, or any other features or services we offer (collectively, the "Service"), you agree to be bound by these Terms of Service.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      These Terms of Service constitute a legally binding agreement between you and FanFic Universe, Inc. ("we," "us," or "our"). If you do not agree to these terms, please do not use the Service.
                    </p>
                    <p className="text-muted-foreground">
                      We may update these Terms of Service from time to time. The most current version will always be posted on this page. Your continued use of the Service after any changes indicates your acceptance of the modified Terms of Service.
                    </p>
                  </section>

                  <Separator />

                  <section id="definitions">
                    <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
                    <p className="text-muted-foreground mb-3">
                      <strong>Service:</strong> All features, applications, content, and other services provided by FanFic Universe.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      <strong>User:</strong> Any individual who accesses or uses the Service, whether registered or not.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      <strong>Account:</strong> A registered profile created by a User to access certain features of the Service.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      <strong>Content:</strong> Any text, images, videos, comments, or other material uploaded, shared, or created by Users on the Service.
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Fan Fiction:</strong> Creative works based on existing copyrighted material, created by fans rather than the original copyright holders.
                    </p>
                  </section>

                  <Separator />

                  <section id="access">
                    <h2 className="text-2xl font-bold mb-4">3. Access to the Service</h2>
                    <p className="text-muted-foreground mb-3">
                      We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Service for personal, non-commercial purposes in accordance with these Terms of Service.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      You agree not to (a) use the Service for any illegal purpose; (b) attempt to gain unauthorized access to any part of the Service; (c) interfere with the operation of the Service; (d) scrape, data-mine, or otherwise extract data from the Service without our express written permission; or (e) use the Service in any manner that could damage, disable, or impair the Service.
                    </p>
                    <p className="text-muted-foreground">
                      We reserve the right to restrict, suspend, or terminate your access to the Service at any time for any reason without notice or liability.
                    </p>
                  </section>

                  <Separator />

                  <section id="accounts">
                    <h2 className="text-2xl font-bold mb-4">4. Accounts</h2>
                    <p className="text-muted-foreground mb-3">
                      To access certain features of the Service, you may need to create an account. When you create an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We cannot and will not be liable for any loss or damage arising from your failure to comply with these requirements.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      You must be at least 13 years old to create an account. If you are under 18, you represent that you have your parent's or legal guardian's permission to use the Service and that they have read and agree to these Terms of Service.
                    </p>
                    <p className="text-muted-foreground">
                      We reserve the right to delete your account or limit your access to certain features if you violate these Terms of Service or our Community Guidelines.
                    </p>
                  </section>

                  <Separator />

                  <section id="content">
                    <h2 className="text-2xl font-bold mb-4">5. User Content</h2>
                    <p className="text-muted-foreground mb-3">
                      By posting, uploading, or otherwise making available any Content on the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, create derivative works from, distribute, publicly display, and publicly perform such Content on and through the Service.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      You represent and warrant that: (a) you own the Content posted by you or have the right to grant the license set forth above; (b) your Content does not violate the privacy rights, publicity rights, intellectual property rights, or any other rights of any person; and (c) the posting of your Content does not violate these Terms of Service or any applicable law.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      You acknowledge that fan fiction often involves the use of characters, settings, and other elements from copyrighted works. While we support fan fiction as a creative medium, we caution users to be respectful of original creators and copyright holders. The fair use doctrine may protect certain fan works, but users remain ultimately responsible for their own Content.
                    </p>
                    <p className="text-muted-foreground">
                      We do not claim ownership of your Content, but the license you grant us is necessary to operate and improve the Service. This license continues even if you stop using the Service, but we will make reasonable efforts to remove Content upon request, except as required by law or for legitimate business purposes.
                    </p>
                  </section>

                  {/* ... Additional sections would continue ... */}

                  <Separator />

                  <section id="contact">
                    <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
                    <p className="text-muted-foreground mb-3">
                      If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <p className="text-muted-foreground mb-5">
                      legal@fanficuniverse.com
                    </p>
                    
                    <p className="text-muted-foreground">
                      FanFic Universe, Inc.<br />
                      123 Storyteller Lane<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </section>
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 p-8 rounded-xl bg-muted text-center">
            <h3 className="text-xl font-bold mb-2">Have Questions About Our Terms?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              If you need clarification on any part of our Terms of Service or have concerns about your rights and responsibilities, our support team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="rounded-full px-8">
                Contact Support
              </Button>
              <Link to="/privacy-policy">
                <Button variant="outline" className="rounded-full px-8">
                  View Privacy Policy
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

export default TermsOfService;
