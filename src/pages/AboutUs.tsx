import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Heart, 
  BookOpen, 
  Globe, 
  PenTool, 
  MessageCircle,
  Mail,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-center">
              About Us
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              We are a platform dedicated to connecting writers and readers through the power of shared imagination.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-center">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  FanFic Universe was created with a simple but powerful mission: to provide a home for fan fiction writers and readers to connect, create, and celebrate the stories they love.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  We believe that fan fiction is a unique art form that extends and enriches the worlds we love, giving characters new adventures and perspectives that official media might never explore.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our platform is designed to nurture creativity, build community, and elevate fan fiction as a legitimate and valuable form of storytelling and literary expression.
                </p>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Community of writers" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-xl p-8 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Active Members</h3>
                  <Users className="h-8 w-8" />
                </div>
                <p className="text-4xl font-bold">32,541</p>
                <p className="text-sm opacity-80">
                  From 142 countries worldwide
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl p-8 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Stories Written</h3>
                  <PenTool className="h-8 w-8" />
                </div>
                <p className="text-4xl font-bold">183,752</p>
                <p className="text-sm opacity-80">
                  Across 1,245 different fandoms
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-xl p-8 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Words Written</h3>
                  <BookOpen className="h-8 w-8" />
                </div>
                <p className="text-4xl font-bold">1.2B+</p>
                <p className="text-sm opacity-80">
                  Equivalent to 15,000+ novels
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-xl p-8 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Reader Favorites</h3>
                  <Heart className="h-8 w-8" />
                </div>
                <p className="text-4xl font-bold">42.7M</p>
                <p className="text-sm opacity-80">
                  Stories marked as favorites
                </p>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Story</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-muted-foreground mb-4">
                FanFic Universe began in 2019 when a group of passionate fan fiction writers and readers came together with a shared vision: to create a platform that truly understood and celebrated fan fiction as an art form.
              </p>
              <p className="text-muted-foreground mb-4">
                Frustrated by limitations on existing platforms and inspired by the creative potential of fan communities, our founders set out to build something different - a space where writers could thrive, readers could discover amazing stories, and communities could form around shared interests.
              </p>
              <p className="text-muted-foreground mb-4">
                What started as a small community has grown into a vibrant ecosystem of storytellers, artists, and enthusiasts from around the world. Today, FanFic Universe hosts millions of stories across thousands of fandoms, but our commitment to supporting creativity and community remains unchanged.
              </p>
              <p className="text-muted-foreground">
                We continue to evolve with our community, adding new features and improvements based directly on user feedback. Every decision we make is guided by our belief that fan fiction matters - as a creative outlet, as a way to explore and process media, and as a community-building force.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Team</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8">
              Meet the passionate individuals behind our platform, dedicated to empowering creators and connecting communities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Chen",
                  title: "Founder & CEO",
                  bio: "Former fan fiction writer with a background in software development. Alex created FanFic Universe to give writers the platform he always wished for.",
                  avatar: "https://i.pravatar.cc/150?img=12",
                },
                {
                  name: "Sofia Garcia",
                  title: "Creative Director",
                  bio: "Award-winning author and long-time fan fiction advocate. Sofia oversees creative initiatives and community programming.",
                  avatar: "https://i.pravatar.cc/150?img=16",
                },
                {
                  name: "Marcus Reed",
                  title: "CTO",
                  bio: "Tech innovator with experience at major social platforms. Marcus leads our engineering team with a focus on performance and accessibility.",
                  avatar: "https://i.pravatar.cc/150?img=11",
                },
                {
                  name: "Eleanor Williams",
                  title: "Community Director",
                  bio: "Community building expert with a passion for fandom culture. Eleanor works to make FanFic Universe a welcoming space for all.",
                  avatar: "https://i.pravatar.cc/150?img=29",
                },
              ].map((member, index) => (
                <div key={member.name} className="text-center">
                  <div className="mb-4 mx-auto w-40 h-40 rounded-full overflow-hidden">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.title}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Creativity First",
                  description: "We believe in empowering creators and giving them the tools and freedom to express themselves authentically.",
                  icon: PenTool,
                },
                {
                  title: "Community Matters",
                  description: "We're committed to building a supportive, inclusive environment where fans can connect over shared interests.",
                  icon: Users,
                },
                {
                  title: "Constant Evolution",
                  description: "We listen to our users and continuously improve our platform to meet the evolving needs of fan communities.",
                  icon: Globe,
                },
                {
                  title: "Accessibility",
                  description: "We strive to make our platform accessible to everyone, regardless of background, ability, or experience level.",
                  icon: Heart,
                },
                {
                  title: "Respectful Expression",
                  description: "We encourage creative exploration while maintaining respect for creators, fans, and intellectual property.",
                  icon: MessageCircle,
                },
                {
                  title: "Literary Merit",
                  description: "We recognize fan fiction as a legitimate form of creative expression with literary and cultural value.",
                  icon: BookOpen,
                },
              ].map((value, index) => (
                <div key={value.title} className="border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="mb-8 bg-muted rounded-xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Have questions, feedback, or ideas? Our team is always happy to hear from members of our community.
            </p>
            <Button className="rounded-full px-8">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
