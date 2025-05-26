import { JobType } from "@/types/job";

export const mockJobs: JobType[] = [
  {
    id: "job-1",
    title: "Senior Fantasy Writer",
    company: "Mythical Stories",
    location: "Remote",
    type: "full-time",
    category: "writing",
    description: "We're looking for an experienced fantasy writer to create engaging series for our premium readers. You'll be responsible for crafting immersive worlds, developing complex characters, and plotting intricate storylines that keep readers coming back for more.",
    requirements: [
      "5+ years of experience writing fantasy fiction",
      "Published works with positive reader feedback",
      "Strong understanding of fantasy tropes and subversions",
      "Excellent worldbuilding skills",
      "Ability to meet deadlines and maintain consistent output",
      "Familiarity with popular fantasy series and current trends"
    ],
    responsibilities: [
      "Create original fantasy series with compelling characters and worlds",
      "Develop detailed outlines and story bibles for long-form narratives",
      "Produce 10,000-15,000 words of polished content weekly",
      "Collaborate with editors to refine and improve storylines",
      "Engage with readers through Q&A sessions and comments",
      "Participate in FanVerse community events and workshops"
    ],
    salary: "$70,000 - $90,000/year",
    posted: "2 days ago",
    deadline: "Jun 15, 2023",
    logo: "/placeholder.svg",
    featured: true,
    tags: ["Fantasy", "Worldbuilding", "Character Development", "Series Writing"]
  },
  {
    id: "job-2",
    title: "Fan Fiction Editor",
    company: "FanTales Publishing",
    location: "New York, NY (Hybrid)",
    type: "full-time",
    category: "editing",
    description: "FanTales Publishing is seeking a detail-oriented editor specializing in fan fiction across multiple fandoms. The ideal candidate will have a deep understanding of popular media franchises and the ability to help writers enhance their stories while respecting the source material.",
    requirements: [
      "Bachelor's degree in English, Creative Writing, or related field",
      "3+ years of editing experience, preferably with fan fiction",
      "Exceptional grasp of grammar, storytelling principles, and character development",
      "Familiarity with major fandoms (Marvel, Star Wars, Harry Potter, etc.)",
      "Understanding of copyright considerations in fan fiction",
      "Excellent communication and feedback skills"
    ],
    responsibilities: [
      "Review and edit fan fiction submissions for grammar, style, and narrative quality",
      "Provide constructive feedback to help writers improve their stories",
      "Ensure content adheres to platform guidelines and legal considerations",
      "Curate featured fan fiction collections for monthly showcases",
      "Develop editing guides and resources for the community",
      "Organize writing workshops and editing sessions for members"
    ],
    salary: "$55,000 - $65,000/year",
    posted: "1 week ago",
    deadline: "Jun 20, 2023",
    logo: "/og-image.png",
    featured: false,
    tags: ["Editing", "Fan Fiction", "Fandoms", "Storytelling"]
  },
  {
    id: "job-3",
    title: "Community Manager - Romance Writers Circle",
    company: "HeartPages",
    location: "Remote",
    type: "full-time",
    category: "community",
    description: "HeartPages is looking for a passionate Community Manager to lead our Romance Writers Circle, a vibrant community of romance authors and readers on FanVerse. You'll foster engagement, organize events, and create a supportive environment for writers to share their work and grow their skills.",
    requirements: [
      "Previous community management experience, preferably in a literary context",
      "Strong understanding of the romance genre and its various subgenres",
      "Excellent interpersonal and conflict resolution skills",
      "Experience with social media management and community platforms",
      "Event planning and facilitation abilities",
      "Empathetic and supportive personality"
    ],
    responsibilities: [
      "Moderate discussions and ensure a safe, inclusive environment",
      "Organize weekly writing prompts, challenges, and feedback sessions",
      "Plan and host virtual events, including author Q&As and workshops",
      "Create and curate content for community resources",
      "Collaborate with the marketing team to grow membership",
      "Gather feedback and implement improvements to enhance community experience"
    ],
    posted: "3 days ago",
    deadline: "Jun 10, 2023",
    logo: "/placeholder.svg",
    tags: ["Community Building", "Romance Genre", "Event Planning", "Moderation"]
  },
  {
    id: "job-4",
    title: "Character Artist - Anime Fandoms",
    company: "AniCreate Studios",
    location: "Los Angeles, CA (On-site)",
    type: "full-time",
    category: "design",
    description: "AniCreate Studios is seeking a talented Character Artist specialized in anime and manga art styles to join our team. You'll create original character designs and fan art illustrations for popular anime fandoms on FanVerse, working closely with writers to bring their stories to life.",
    requirements: [
      "Strong portfolio demonstrating anime and manga art styles",
      "Proficiency with digital illustration tools (Procreate, Photoshop, Clip Studio Paint)",
      "Understanding of character design principles and visual storytelling",
      "Knowledge of popular anime series and artistic conventions",
      "Ability to adapt to different anime art styles",
      "Strong communication skills and ability to incorporate feedback"
    ],
    responsibilities: [
      "Create character designs and illustrations for fan fiction stories",
      "Develop original character concepts for FanVerse original content",
      "Collaborate with writers to visualize their characters accurately",
      "Create cover art and promotional illustrations for featured stories",
      "Participate in live drawing streams and tutorial sessions",
      "Contribute to art style guides and resources for the community"
    ],
    salary: "$60,000 - $75,000/year",
    posted: "5 days ago",
    deadline: "Jun 20, 2023",
    logo: "/placeholder.svg",
    featured: true,
    tags: ["Character Design", "Anime", "Digital Illustration", "Fan Art"]
  },
  {
    id: "job-5",
    title: "Fan Theory Content Creator",
    company: "TheoryVerse",
    location: "Remote",
    type: "part-time",
    category: "content",
    description: "TheoryVerse is looking for creative thinkers to develop engaging fan theory content for popular TV shows, movies, books, and games. You'll research existing lore, develop original theories, and create compelling content that sparks discussion in the FanVerse community.",
    requirements: [
      "Deep knowledge of popular media franchises and storytelling",
      "Excellent research skills and attention to detail",
      "Strong analytical thinking and pattern recognition",
      "Engaging writing style that can explain complex ideas clearly",
      "Experience creating content for online platforms (blogs, videos, social media)",
      "Ability to respond to community feedback and questions"
    ],
    responsibilities: [
      "Research source material for potential theory connections",
      "Develop well-reasoned fan theories backed by textual evidence",
      "Create written articles, graphics, or video scripts presenting theories",
      "Engage with community discussions about theories",
      "Keep up with latest releases and update theories accordingly",
      "Collaborate with other creators on crossover theory content"
    ],
    posted: "1 week ago",
    deadline: "Jun 5, 2023",
    logo: "/placeholder.svg",
    tags: ["Fan Theories", "Content Creation", "Analysis", "Research"]
  },
  {
    id: "job-6",
    title: "Sci-Fi Narrative Designer",
    company: "Quantum Stories",
    location: "Chicago, IL (Hybrid)",
    type: "contract",
    category: "writing",
    description: "Quantum Stories is seeking a Narrative Designer specializing in science fiction to help develop interactive stories and branching narratives for our upcoming collection on FanVerse. This 6-month contract position will involve creating immersive sci-fi worlds and stories where reader choices impact the narrative.",
    requirements: [
      "Experience with interactive fiction or game narrative design",
      "Strong background in science fiction writing and worldbuilding",
      "Understanding of branching narrative structures",
      "Familiarity with interactive fiction platforms (Twine, Ink, etc.)",
      "Ability to balance player agency with compelling storytelling",
      "Knowledge of sci-fi subgenres and tropes"
    ],
    responsibilities: [
      "Design branching narrative structures for interactive stories",
      "Create compelling sci-fi worlds, characters, and storylines",
      "Write multiple narrative paths and endings based on reader choices",
      "Collaborate with developers to implement stories on the platform",
      "Test stories for narrative consistency and engagement",
      "Revise content based on user feedback and analytics"
    ],
    salary: "$4,000 - $6,000/month",
    posted: "2 weeks ago",
    deadline: "May 25, 2023",
    logo: "/placeholder.svg",
    tags: ["Interactive Fiction", "Sci-Fi", "Branching Narratives", "Game Writing"]
  },
  {
    id: "job-7",
    title: "Social Media Specialist - Fandom Engagement",
    company: "FanReach Media",
    location: "Remote",
    type: "full-time",
    category: "marketing",
    description: "FanReach Media is looking for a Social Media Specialist to manage our clients' fandom engagement strategies on FanVerse and other platforms. You'll develop creative campaigns to connect fan communities with content creators, publishers, and entertainment companies.",
    requirements: [
      "2+ years of experience in social media management",
      "Strong understanding of fandom culture and community dynamics",
      "Experience with content planning, creation, and analytics",
      "Familiarity with major social platforms and their algorithms",
      "Excellent copywriting and communication skills",
      "Ability to develop authentic voice for different brands"
    ],
    responsibilities: [
      "Develop and implement social media strategies for fandom engagement",
      "Create content calendars aligned with release schedules and fan events",
      "Manage daily posting and community interaction across platforms",
      "Collaborate with influencers and community leaders",
      "Monitor trends and conversations in target fandoms",
      "Analyze performance metrics and optimize strategies accordingly"
    ],
    posted: "3 days ago",
    deadline: "Jun 15, 2023",
    logo: "/placeholder.svg",
    tags: ["Social Media", "Fandom Marketing", "Community Engagement", "Content Strategy"]
  },
  {
    id: "job-8",
    title: "Podcast Producer - Fiction Fandoms",
    company: "EchoVerse Studios",
    location: "Austin, TX (Hybrid)",
    type: "full-time",
    category: "development",
    description: "EchoVerse Studios is seeking a creative Podcast Producer to develop and produce fiction-focused podcast content for major fandoms. You'll work with voice actors, writers, and sound designers to create immersive audio experiences ranging from discussion shows to audio dramas based on popular franchises.",
    requirements: [
      "3+ years of experience in podcast or audio production",
      "Strong understanding of storytelling in audio format",
      "Technical proficiency with audio recording and editing software",
      "Project management skills and ability to coordinate remote teams",
      "Knowledge of licensing and copyright considerations for fan content",
      "Passion for fiction fandoms and audience engagement"
    ],
    responsibilities: [
      "Develop podcast concepts for various fandom audiences",
      "Recruit and direct voice talent for audio productions",
      "Edit and mix audio content to professional standards",
      "Coordinate with writers to adapt stories to audio format",
      "Manage production schedules and release calendars",
      "Analyze listener data and implement improvements"
    ],
    salary: "$65,000 - $80,000/year",
    posted: "1 week ago",
    deadline: "Jun 25, 2023",
    logo: "/placeholder.svg",
    featured: true,
    tags: ["Podcast Production", "Audio Drama", "Voice Direction", "Sound Design"]
  },
  {
    id: "job-9",
    title: "YA Fiction Sensitivity Reader",
    company: "Inclusive Pages",
    location: "Remote",
    type: "freelance",
    category: "editing",
    description: "Inclusive Pages is expanding our team of sensitivity readers focusing on Young Adult fiction on FanVerse. We're seeking readers with diverse lived experiences who can provide thoughtful feedback to help writers create authentic, respectful representations in their stories.",
    requirements: [
      "Strong understanding of issues related to your area of expertise/lived experience",
      "Excellent critical reading and analytical skills",
      "Ability to provide constructive, specific feedback",
      "Familiarity with YA fiction conventions and audience expectations",
      "Strong written communication skills",
      "Professional approach to potentially sensitive content"
    ],
    responsibilities: [
      "Review manuscripts for issues related to your area of expertise",
      "Provide detailed notes on problematic content, stereotypes, or misrepresentations",
      "Suggest possible alternatives or improvements when appropriate",
      "Complete readings within agreed timeframes",
      "Maintain confidentiality of all materials reviewed",
      "Participate in occasional group discussions about sensitivity reading best practices"
    ],
    posted: "5 days ago",
    deadline: "Ongoing",
    logo: "/placeholder.svg",
    tags: ["Sensitivity Reading", "YA Fiction", "Diversity", "Manuscript Review"]
  },
  {
    id: "job-10",
    title: "Virtual Reality Narrative Architect",
    company: "Immersive Tales",
    location: "San Francisco, CA (Hybrid)",
    type: "full-time",
    category: "development",
    description: "Immersive Tales is pioneering VR storytelling experiences based on popular fandoms and original content. We're seeking a Narrative Architect to design immersive stories specifically for virtual reality, translating fan fiction and original narratives into interactive VR experiences on the FanVerse platform.",
    requirements: [
      "Experience in narrative design for games, VR, or interactive media",
      "Understanding of spatial storytelling and VR-specific narrative techniques",
      "Familiarity with VR development workflows and limitations",
      "Strong creative writing and worldbuilding skills",
      "Knowledge of popular fandoms and adaptation principles",
      "Ability to collaborate with technical teams and translate ideas across disciplines"
    ],
    responsibilities: [
      "Design narrative frameworks optimized for VR experiences",
      "Develop story bibles and narrative design documents",
      "Write dialogue and scene descriptions for VR implementation",
      "Collaborate with 3D artists, developers, and sound designers",
      "Test narrative elements in VR and iterate based on user feedback",
      "Present concepts to stakeholders and incorporate feedback"
    ],
    salary: "$90,000 - $120,000/year",
    posted: "2 weeks ago",
    deadline: "Jun 30, 2023",
    logo: "/placeholder.svg",
    tags: ["Virtual Reality", "Narrative Design", "Spatial Storytelling", "Interactive Fiction"]
  },
  {
    id: "job-11",
    title: "Fanfiction Writing Coach",
    company: "WriteRight Academy",
    location: "Remote",
    type: "part-time",
    category: "writing",
    description: "WriteRight Academy is looking for experienced fiction writers to join our team as Writing Coaches specializing in fanfiction. You'll work directly with FanVerse community members to help them improve their writing skills through personalized feedback, workshops, and one-on-one coaching sessions.",
    requirements: [
      "Published author or professional writing experience",
      "Strong understanding of narrative craft and genre conventions",
      "Experience with teaching or mentoring writers",
      "Excellent communication and feedback skills",
      "Familiarity with fanfiction communities and best practices",
      "Patient and encouraging teaching style"
    ],
    responsibilities: [
      "Provide detailed feedback on members' writing submissions",
      "Conduct virtual workshops on specific writing techniques",
      "Host one-on-one coaching sessions with aspiring writers",
      "Develop educational resources and writing guides",
      "Lead writing sprints and creative challenges",
      "Track student progress and adjust teaching approaches accordingly"
    ],
    salary: "$25-40/hour",
    posted: "1 week ago",
    deadline: "Jun 5, 2023",
    logo: "/placeholder.svg",
    tags: ["Writing Coach", "Education", "Mentorship", "Craft Development"]
  },
  {
    id: "job-12",
    title: "Mythology Research Consultant",
    company: "Legendary Lore",
    location: "Remote",
    type: "freelance",
    category: "other",
    description: "Legendary Lore is seeking Mythology Research Consultants to support writers on FanVerse working on fantasy and mythology-inspired stories. You'll provide specialized knowledge about world mythologies, folklore traditions, and authentic cultural elements to help writers create rich, well-researched fantastical worlds.",
    requirements: [
      "Academic background or equivalent knowledge in mythology, folklore, anthropology, or related fields",
      "Specialized expertise in one or more mythological traditions",
      "Research skills and ability to find reliable sources",
      "Talent for explaining complex concepts clearly",
      "Understanding of how mythology is used in modern storytelling",
      "Respectful approach to diverse cultural traditions"
    ],
    responsibilities: [
      "Respond to specific research queries from writers",
      "Provide factual information about mythological figures, stories, and traditions",
      "Suggest authentic mythological elements that could enhance stories",
      "Review content for mythological accuracy when requested",
      "Create educational resources about specific mythological traditions",
      "Participate in Q&A sessions and workshops about mythological worldbuilding"
    ],
    posted: "3 days ago",
    deadline: "Jun 20, 2023",
    logo: "/placeholder.svg",
    tags: ["Mythology", "Research", "Cultural Consultation", "Worldbuilding"]
  }
];
