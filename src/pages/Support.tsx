import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Search, 
  HelpCircle, 
  BookOpen,
  Mail,
  Phone,
  MessageSquare,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  ChevronRight,
  ArrowRight,
  Headphones,
  ScrollText,
  Settings,
  PenTool,
  Users
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqCategories = [
  {
    id: "account",
    name: "Account & Profile",
    icon: User,
    faqs: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click on the 'Sign Up' button in the top-right corner of the page. You can register using your email address, or through your Google, Facebook, or Twitter account. Follow the prompts to set up your username, password, and profile details."
      },
      {
        question: "Can I change my username?",
        answer: "Yes, you can change your username once every 30 days. Go to your profile settings, click on the 'Edit Profile' button, and update your username. Note that if you change your username, your profile URL will also change."
      },
      {
        question: "How do I reset my password?",
        answer: "If you've forgotten your password, click on the 'Sign In' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
      },
      {
        question: "Can I have multiple accounts?",
        answer: "While our terms of service do not explicitly prohibit having multiple accounts, we recommend maintaining a single account to keep all your stories, follows, and interactions in one place. Managing multiple accounts may cause confusion and could potentially violate our community guidelines if used to circumvent restrictions."
      }
    ]
  },
  {
    id: "writing",
    name: "Writing & Publishing",
    icon: PenTool,
    faqs: [
      {
        question: "How do I publish a story?",
        answer: "To publish a story, click on the 'Write' button in the navigation bar. Create your story, add chapters, and when you're ready, click the 'Publish' button. You can choose to publish immediately or schedule it for later. You can also save drafts that aren't yet ready to be published."
      },
      {
        question: "What formats are supported for my stories?",
        answer: "Our editor supports rich text formatting including bold, italic, underline, headings, lists, and text alignment. You can also add images, dividers, and links. We support basic HTML tags for more advanced formatting needs."
      },
      {
        question: "Is there a word limit for stories or chapters?",
        answer: "There's no strict word limit for stories overall, but individual chapters are limited to 50,000 words each for performance reasons. For very long works, we recommend splitting them into multiple chapters for easier reading."
      },
      {
        question: "How do I add trigger warnings to my content?",
        answer: "When publishing your story, you'll find an option to add content tags and trigger warnings. We encourage all authors to appropriately tag their content to help readers make informed choices about what they read."
      }
    ]
  },
  {
    id: "reading",
    name: "Reading & Interaction",
    icon: BookOpen,
    faqs: [
      {
        question: "How do I save stories to read later?",
        answer: "To save a story for later reading, click on the bookmark icon on any story card or page. You can access your saved stories from your profile under the 'Bookmarks' tab. You can also create custom reading lists to organize your bookmarks."
      },
      {
        question: "Can I download stories to read offline?",
        answer: "Premium members can download stories in PDF, EPUB, or MOBI formats for offline reading. Look for the download icon on story pages. Please respect authors' rights and do not redistribute downloaded content without permission."
      },
      {
        question: "How do I leave a review or comment?",
        answer: "Scroll to the bottom of any chapter to find the comment section. You can leave general comments, or highlight specific passages to comment on. For a full review, visit the story's main page and click on the 'Write a Review' button."
      },
      {
        question: "What are reading lists and how do I create one?",
        answer: "Reading lists are personalized collections of stories. To create one, go to your profile, select the 'Reading Lists' tab, and click 'Create New List'. You can make lists public or private, and add stories to them by clicking the bookmark icon and selecting your list."
      }
    ]
  },
  {
    id: "community",
    name: "Community & Guidelines",
    icon: Users,
    faqs: [
      {
        question: "What content is prohibited on FanFic Universe?",
        answer: "FanFic Universe prohibits content that promotes hate speech, harassment, explicit sexual content involving minors, copyright infringement without fair use justification, doxxing, and other forms of harmful content. Please review our full Community Guidelines for detailed information."
      },
      {
        question: "How do I report inappropriate content or behavior?",
        answer: "To report content that violates our guidelines, click the three dots (...) next to any story, comment, or profile, then select 'Report'. Fill out the form with details about the violation. Our moderation team reviews all reports within 48 hours."
      },
      {
        question: "How can I block another user?",
        answer: "To block a user, visit their profile and click the three dots (...) in the top right corner, then select 'Block User'. Blocked users cannot interact with your content, message you, or see your profile. You also won't see their content in your feeds."
      },
      {
        question: "What happens if my content is reported?",
        answer: "If your content is reported and found to violate our guidelines, you'll receive a notification explaining which guideline was violated. Depending on the severity, consequences may range from a warning to content removal or account suspension. Repeated violations may result in permanent account termination."
      }
    ]
  },
  {
    id: "technical",
    name: "Technical Issues",
    icon: Settings,
    faqs: [
      {
        question: "The site is loading slowly. What can I do?",
        answer: "If the site is loading slowly, try clearing your browser cache and cookies, using a different browser, or checking your internet connection. If problems persist, it might be a temporary issue on our end. You can check our status page at status.fanficuniverse.com for any ongoing service disruptions."
      },
      {
        question: "How do I enable dark mode?",
        answer: "To enable dark mode, click on your profile picture in the top-right corner, select 'Settings', then 'Display'. You can choose between light mode, dark mode, or automatic (which follows your system settings)."
      },
      {
        question: "Is there a mobile app available?",
        answer: "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the Apple App Store or Google Play Store. The mobile apps offer additional features like offline reading and push notifications."
      },
      {
        question: "Why can't I upload images to my story?",
        answer: "If you're having trouble uploading images, check that the file is in a supported format (JPG, PNG, GIF) and under the 5MB size limit. Also ensure you're not exceeding the limit of 10 images per chapter. If problems persist, try using a different browser or contact our support team."
      }
    ]
  },
];

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log({ name, email, subject, message });
    // Reset form fields
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    // Show success message (would be handled with a toast in a real app)
    alert("Your message has been sent! We'll get back to you soon.");
  };

  const filteredFAQs = searchTerm ? 
    faqCategories.flatMap(category => 
      category.faqs
        .filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(faq => ({ ...faq, category: category.name }))
    ) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              How Can We Help?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions or reach out to our support team for personalized assistance.
            </p>
            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for answers, e.g., 'How do I reset my password?'"
                className="pl-10 rounded-full h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {searchTerm && (
              <div className="mt-6 max-w-2xl mx-auto text-left">
                <h2 className="text-lg font-semibold mb-3">
                  {filteredFAQs.length} results for "{searchTerm}"
                </h2>
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:border-primary transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="mb-2">{faq.category}</Badge>
                          <h3 className="font-bold mb-1">{faq.question}</h3>
                          <p className="text-muted-foreground line-clamp-2">{faq.answer}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground mt-1" />
                      </div>
                    </div>
                  ))}
                  {filteredFAQs.length === 0 && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>No results found</AlertTitle>
                      <AlertDescription>
                        We couldn't find any matches for "{searchTerm}". Try different keywords or contact our support team directly.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <ScrollText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Knowledge Base</CardTitle>
                  <CardDescription>Browse our comprehensive guides and tutorials</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="rounded-full">
                    View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Community Forum</CardTitle>
                  <CardDescription>Connect with other users and share solutions</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="rounded-full">
                    Visit Forums <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <Headphones className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get personalized help from our team</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                  <Button className="rounded-full">
                    Get Help <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {faqCategories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex flex-col gap-1 py-3 h-auto"
                  >
                    <category.icon className="h-5 w-5" />
                    <span>{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqCategories.map(category => (
                <TabsContent key={category.id} value={category.id} className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
              <Button className="rounded-full">
                View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Contact Form */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to help. Fill out the form and we'll respond to your inquiry as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="rounded-full w-full">
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div className="lg:pl-8">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  We offer multiple ways to reach our team. Choose the option that works best for you.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Email Support</h3>
                      <p className="text-muted-foreground mb-1">For general inquiries:</p>
                      <a href="mailto:support@fanficuniverse.com" className="text-primary hover:underline">
                        support@fanficuniverse.com
                      </a>
                      <p className="text-muted-foreground mt-2 mb-1">For technical issues:</p>
                      <a href="mailto:tech@fanficuniverse.com" className="text-primary hover:underline">
                        tech@fanficuniverse.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Phone Support</h3>
                      <p className="text-muted-foreground mb-1">Customer Service:</p>
                      <p className="font-medium mb-2">+1 (555) 123-4567</p>
                      <p className="text-xs text-muted-foreground">
                        Available Monday-Friday, 9am-5pm EST
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Response Times</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Email Support:</span>
                          <span className="font-medium">Within 24 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Phone Support:</span>
                          <span className="font-medium">Under 10 minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Community Forum:</span>
                          <span className="font-medium">Within 48 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-secondary rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-bold">System Status</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    All systems are currently operational. Check our status page for any updates or maintenance notifications.
                  </p>
                  <Button variant="outline" className="rounded-full w-full">
                    <div className="flex-1 flex items-center justify-center">
                      View System Status
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Self-Help Resources */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Self-Help Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Getting Started
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    New to FanFic Universe? Learn the basics with our beginner guides.
                  </p>
                  <ul className="space-y-2">
                    {["Creating Your Account", "Setting Up Your Profile", "Finding Stories to Read", "Publishing Your First Story"].map((item, index) => (
                      <li key={index} className="text-sm">
                        <Link to="#" className="flex items-center hover:text-primary transition-colors">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Writing Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Improve your writing skills with our comprehensive guides.
                  </p>
                  <ul className="space-y-2">
                    {["Character Development", "Plotting and Structure", "Writing Dialogue", "World Building Techniques"].map((item, index) => (
                      <li key={index} className="text-sm">
                        <Link to="#" className="flex items-center hover:text-primary transition-colors">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Technical Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Solve common technical issues with our step-by-step guides.
                  </p>
                  <ul className="space-y-2">
                    {["Image Upload Troubleshooting", "Browser Compatibility", "Mobile App Setup", "Offline Reading Mode"].map((item, index) => (
                      <li key={index} className="text-sm">
                        <Link to="#" className="flex items-center hover:text-primary transition-colors">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Video Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Visual learner? Check out our video tutorial series.
                  </p>
                  <ul className="space-y-2">
                    {["Using the Story Editor", "Customizing Your Profile", "Interacting With Communities", "Advanced Search Techniques"].map((item, index) => (
                      <li key={index} className="text-sm">
                        <Link to="#" className="flex items-center hover:text-primary transition-colors">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
