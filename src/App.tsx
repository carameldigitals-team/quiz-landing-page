/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowRight, ArrowLeft, Lock, Zap, Target, Clock, DollarSign, Brain, ShieldCheck, CheckCircle2 } from 'lucide-react';

// --- Types ---
type Option = {
  icon: string;
  title: string;
  desc: string;
};

type Question = {
  text: string;
  subtext: string;
  options: Option[];
};

type Testimonial = {
  text: string;
  author: string;
  role: string;
  stars: number;
};

type ResultProfile = {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  income: string;
  timeline: string;
  difficulty: string;
  mirror: string;
  hiddenCost: string;
  insight: string;
  beliefCorrection: string;
  whatMakesSense: string;
  roadmap: { day: string; phase: string; title: string }[];
  softSellIntro: string;
  softSellBullets: string[];
  testimonials: Testimonial[];
};

// --- Data ---
const QUESTIONS: Question[] = [
  {
    text: "What's your biggest frustration with your current income situation?",
    subtext: "Be honest — this helps us find your perfect AI strategy.",
    options: [
      { icon: "😤", title: "Trading time for money", desc: "I'm working too many hours with no ceiling in sight" },
      { icon: "📉", title: "Income is unpredictable", desc: "Feast and famine cycles are driving me crazy" },
      { icon: "🚫", title: "Can't scale without hiring", desc: "I've hit a wall I can't break through alone" },
      { icon: "🔍", title: "Don't know where to start", desc: "I want to use AI but feel completely lost" }
    ]
  },
  {
    text: "How many hours per week can you commit to building your AI income?",
    subtext: "There's no wrong answer — we'll find a strategy that fits your life.",
    options: [
      { icon: "⚡", title: "1–5 hours", desc: "I need something that works around my busy schedule" },
      { icon: "🔥", title: "5–15 hours", desc: "I can dedicate some serious side-hustle time" },
      { icon: "🚀", title: "15–30 hours", desc: "This is my primary focus right now" },
      { icon: "💪", title: "30+ hours", desc: "I'm all in — ready to go full-time with AI" }
    ]
  },
  {
    text: "Which of these best describes your current skill set?",
    subtext: "AI multiplies what you already know. What are you working with?",
    options: [
      { icon: "✍️", title: "Writing & Communication", desc: "I'm good with words, copywriting, or content" },
      { icon: "🎨", title: "Creative & Design", desc: "I have an eye for visuals, branding, or media" },
      { icon: "💼", title: "Business & Marketing", desc: "I understand strategy, sales, and client acquisition" },
      { icon: "🤖", title: "Tech & Systems", desc: "I'm comfortable with tools, automation, and workflows" }
    ]
  },
  {
    text: "What's your income goal for the next 12 months using AI?",
    subtext: "Dream big — AI is the great equalizer. Where do you want to be?",
    options: [
      { icon: "🌱", title: "$2K–$5K/month", desc: "An extra $24K–$60K per year would change my life" },
      { icon: "💫", title: "$5K–$15K/month", desc: "I want to replace my 9-5 and then some" },
      { icon: "🏆", title: "$15K–$50K/month", desc: "I'm building a real, scalable AI business" },
      { icon: "👑", title: "$50K+/month", desc: "I want to build a $1M+ AI empire" }
    ]
  },
  {
    text: "Have you made any money with AI or online business before?",
    subtext: "Be real — this helps us calibrate your personalized roadmap.",
    options: [
      { icon: "🐣", title: "Complete beginner", desc: "No online income yet — starting from zero" },
      { icon: "🌊", title: "Testing the waters", desc: "Made a few hundred dollars here and there" },
      { icon: "📈", title: "Getting traction", desc: "Earning $1K–$5K/month but want to 10x it" },
      { icon: "⚡", title: "Already succeeding", desc: "I'm earning well but AI can help me scale faster" }
    ]
  },
  {
    text: "Which AI business model excites you most?",
    subtext: "All of these are proven. Which one makes your heart beat faster?",
    options: [
      { icon: "🤖", title: "AI Automation Agency", desc: "Selling AI systems and workflows to businesses" },
      { icon: "📝", title: "AI Content & Copywriting", desc: "Creating high-value content at scale with AI" },
      { icon: "🎓", title: "AI Coaching & Courses", desc: "Teaching others how to profit from AI" },
      { icon: "🛒", title: "AI Products & SaaS", desc: "Building and selling AI-powered products" },
      { icon: "🚀", title: "AI Business Scaling", desc: "Multiplying revenue in an existing business with AI" }
    ]
  },
  {
    text: "What's the #1 thing holding you back from AI success right now?",
    subtext: "This final answer shapes your entire personalized strategy.",
    options: [
      { icon: "🧠", title: "Knowledge gap", desc: "I don't know enough about AI tools and strategies" },
      { icon: "⏰", title: "Time constraints", desc: "I'm too busy with life to figure this out alone" },
      { icon: "😨", title: "Fear of failure", desc: "I've tried things before and they didn't work out" },
      { icon: "💸", title: "Need faster results", desc: "I've started but need to see real income NOW" }
    ]
  }
];

const RESULT_PROFILES: ResultProfile[] = [
  {
    id: "architect",
    emoji: "🏗️",
    title: "The AI Revenue Architect",
    subtitle: "you have the strategic mind and business instincts to build an AI automation agency. Your answers reveal someone ready to generate $10K–$50K months — not by working harder, but by selling AI-powered results to businesses.",
    income: "$12K–$50K",
    timeline: "6–8wks",
    difficulty: "7/10",
    mirror: "You have the drive. You can see exactly what needs to be built. You've probably researched the agency model, watched the YouTube videos, maybe even started a pitch deck or two. You know the numbers work. You've seen the case studies. On paper, everything makes sense. But here's what keeps happening — you get close to landing a client, and something in you stalls. You tinker with your offer instead of sending it. You revise your website instead of picking up the phone. You tell yourself it needs to be better before you put it in front of anyone. The 'closing' part — the actual delivery, the money conversation — that's where you go quiet. And every week that passes without a signed client is another week your competitors are landing the business that should be yours. The gap between you and a $10K/month agency isn't skill. It's the thirty seconds of courage it takes to send the email. You stay in 'preparation mode' to avoid the vulnerability of the actual pitch. And preparation, without a deadline, goes on forever.",
    hiddenCost: "Unbooked clients don't pay retainers. They only confirm the story that you're \"not ready yet.\" Every week spent perfecting your offer instead of sending it is a week lost in real client revenue — and real market feedback that would make you 10x better, faster than any course or revision ever could. Think about what the last 90 days of \"getting ready\" actually cost you. If your target retainer is $2,500/month and you've been preparing for three months, that's $7,500 that went to someone who was less prepared but more willing to send the email. The market doesn't reward readiness. It rewards action.",
    insight: "You are not stuck because you lack skills. You are stuck because you keep optimizing for the moment you feel 'ready' — and that moment never comes on its own. Readiness is not a feeling that arrives. It's a decision you make before the feeling does.",
    beliefCorrection: "A good offer sent today beats a perfect pitch that never leaves your laptop. A client paying you $1,500/month for an imperfect service is worth infinitely more than a $5,000/month offer still sitting in your Notion page. The market gives you nothing for preparation. It gives you everything for delivery.",
    whatMakesSense: "You don't need more knowledge. You need a forcing function — a 72-hour window that compels you to stop refining and start closing. Speed is your friend here, because it doesn't give you time to second-guess an offer that's already good enough to sell. You don't need a perfect website, a polished case study, or a fully built-out service before your first client. You need one clear offer, one targeted message, and one send button pressed. Everything else comes from the momentum of that first yes.",
    roadmap: [
      { day: "DAY 01", phase: "Phase 1", title: "Build Your $2K–$5K AI Service Offer" },
      { day: "DAY 02", phase: "Phase 2", title: "Land Your First Client With AI Copywriting" },
      { day: "DAY 03", phase: "Phase 3", title: "Deliver & Scale — The 24-Hour Offer Launch Lab" }
    ],
    softSellIntro: "AI Business Mastery 72-Hour Challenge is a guided implementation challenge built to help you skip the theory. You've identified the exact business model that matches your skills and goals. AI Business Mastery 72-Hour Challenge gives you the exact 72-hour implementation system to land your first paying client — without more theory, more waiting, or more 'almost ready.'",
    softSellBullets: [
      "The proven AI Agency offer template that closes clients at $1,500–$5,000/month",
      "Done-for-you cold outreach scripts using AI that books calls on autopilot",
      "The client delivery system that lets you serve 10+ clients without burning out",
      "Mindset module: How to stop optimizing and start closing — forever"
    ],
    testimonials: [
      { text: "I was skeptical but followed the AI agency blueprint and landed my first client in week 2. Now I have 8 clients at $2K/month each.", author: "Marcus T.", role: "Former Corporate Manager → AI Agency Owner", stars: 5 },
      { text: "The frameworks inside completely changed how I pitch AI to businesses. Closed a $6,000/month client my third week in.", author: "Priya S.", role: "Marketing Consultant", stars: 5 }
    ]
  },
  {
    id: "creator",
    emoji: "✍️",
    title: "The AI Content Powerhouse",
    subtitle: "your natural way with words combined with AI turns you into a content machine businesses will pay premium prices for. You're sitting on an income engine — you just haven't turned the key yet.",
    income: "$5K–$20K",
    timeline: "2–4wks",
    difficulty: "5/10",
    mirror: "You have a gift. You can put ideas into words that actually land. You've been told you should monetize it. Maybe you've tried. A few freelance gigs, some content work, maybe a client or two who paid you less than your time was worth. You delivered good work. They were happy. You felt underpaid. But somehow the income never matched the effort. You charge what feels safe — because charging more feels presumptuous. You take on work that doesn't excite you because the money was there. You've written things you're genuinely proud of for rates that embarrass you in hindsight. And somewhere deep down, you wonder if writing can ever really pay the bills the way you need it to. Here's what nobody told you: you're not undercharging because you lack skill. You're undercharging because you haven't paired your skill with the system that lets you deliver 10x more value in half the time — and charge accordingly. The problem was never your writing. The problem was your pricing model. You've been selling hours when the market pays for outcomes. That single shift changes everything.",
    hiddenCost: "Every month you charge $50 per piece instead of $500 per piece is $5,400 left on the table. That's $64,800 a year in invisible losses. The gap between a struggling freelancer and a $15K/month content agency isn't talent. It's leverage. AI is that leverage — and the window to use it first, before every other writer figures this out, is closing fast. The writers who combine their natural voice with AI systems right now are not just earning more — they are building assets. Retainer clients. Recurring revenue. Agencies. The ones who wait are competing on price against people half as good who got there first.",
    insight: "You are not underpaid because the market doesn't value writing. You are underpaid because you haven't built the system that lets you charge for results — not hours. The moment you stop selling words and start selling outcomes, your income doubles without a single new skill.",
    beliefCorrection: "Your writing skill multiplied by AI is worth 10x what you're currently charging. The client who pays $500/month for a content package is not paying for 10 blog posts. They're paying for more leads, more visibility, more authority in their market. That's worth $500. It's worth $2,000. Price the result, not the process.",
    whatMakesSense: "You don't need to find better clients. You need a productized content system — one that turns what you already do into a scalable offer that clients pay $500–$2,000/month for on retainer, every single month, predictably. Then AI handles the volume while you bring the voice, the strategy, and the human judgment that no algorithm can replicate. You become the thinking layer on top of an AI-powered content engine. That's a premium service. Charge for it like one.",
    roadmap: [
      { day: "DAY 01", phase: "Phase 1", title: "Build Your AI Content Package & Premium Pricing" },
      { day: "DAY 02", phase: "Phase 2", title: "The AI Copywriting System That Finds & Closes Clients" },
      { day: "DAY 03", phase: "Phase 3", title: "Deliver Premium Content at Scale — Without Burnout" }
    ],
    softSellIntro: "AI Business Mastery 72-Hour Challenge is a guided implementation challenge built to help you skip the theory. AI Business Mastery 72-Hour Challenge shows you exactly how to package your writing skills into a $5K–$20K/month AI content business — and get your first paying client within 72 hours of starting. No more undercharging. No more trading hours for disappointment.",
    softSellBullets: [
      "The AI content agency offer that commands $500–$2,000/month retainers",
      "How to use AI to produce premium content 10x faster — without losing your voice",
      "The exact outreach message that books discovery calls with paying clients",
      "Pricing psychology: why raising your rates actually increases conversions"
    ],
    testimonials: [
      { text: "I went from $50/blog post to $800/blog post in 6 weeks. Not because I got better — because I finally understood what I was actually selling.", author: "Sarah K.", role: "Freelance Writer → AI Content Agency Owner", stars: 5 },
      { text: "The productized offer framework changed everything. I stopped selling words and started selling outcomes. First retainer signed within 10 days.", author: "James R.", role: "Content Strategist → Agency Founder", stars: 5 }
    ]
  },
  {
    id: "educator",
    emoji: "🎓",
    title: "The AI Knowledge Broker",
    subtitle: "you understand things others are desperate to learn. AI lets you package that knowledge and sell it at scale — to 10, 100, or 10,000 students at once. Your expertise is the product. It always was.",
    income: "$8K–$30K",
    timeline: "4–6wks",
    difficulty: "6/10",
    mirror: "You know things. Real things. Things people would genuinely pay to learn from you. You've probably thought about a course. A coaching program. A community. Maybe you've started building one — recording a module here, drafting a curriculum there. Maybe you've even told a few people about it and watched their eyes light up. The idea is good. You know it's good. But somehow it never gets finished. Never gets launched. It lives in your Notion page, your Google Drive folder, your phone's camera roll of whiteboard notes. Every few months you open the draft, add something, feel good about it for a day, and then get busy with other things. You enjoy the creation process. But the launch — putting yourself out there, pricing it, selling it — that's where everything stalls. And so your knowledge sits locked away while others with less expertise, less experience, and less depth than you are launching inferior products and making real money. They didn't wait until it was perfect. They launched what they had and improved as they went. That's the only difference between them and you. You stay in 'building mode' because building feels productive. Launching feels like judgment.",
    hiddenCost: "An unfinished course doesn't teach anyone. It only creates a cycle of guilt, restart energy, and zero income. Every month your knowledge sits unpublished is a month someone else is charging $997 for a course that's objectively worse than what you could build this weekend — if you decided to stop perfecting and start publishing. The painful math: if your course sells for $497 and you could have launched three months ago with 20 students, you've already lost $9,940. That's not a small number. That's a mortgage payment, a holiday, a business investment — gone, not because the market didn't want what you have, but because you didn't give it to them.",
    insight: "You are not stuck because your content isn't good enough. You are stuck because you are addicted to refining and quietly terrified of the moment someone evaluates what you've built. But here is what the terror is hiding from you: the students who need you most are not waiting for perfection. They are waiting for you to show up.",
    beliefCorrection: "An imperfect course that launches makes more money than a perfect one still in your head. No one has ever bought a course you didn't publish. Every day it sits unfinished, it earns exactly zero. An imperfect course in the hands of ten paying students will teach you more in one week than ten more months of solo building ever could.",
    whatMakesSense: "You don't need six months to build the perfect program. You need 72 hours to get an MVP into the market and start collecting the one thing that improves every product faster than any amount of solo refinement: paying students giving you real, direct, specific feedback. Speed kills doubt. The moment money hits your account from your first student, the self-doubt narrative loses its power. You stop asking whether this is good enough and start asking how to make it better for the people already inside.",
    roadmap: [
      { day: "DAY 01", phase: "Phase 1", title: "Package Your Knowledge Into a Sellable Offer Fast" },
      { day: "DAY 02", phase: "Phase 2", title: "AI-Powered Copywriting That Fills Your Program" },
      { day: "DAY 03", phase: "Phase 3", title: "The 24-Hour Launch That Gets Your First Students" }
    ],
    softSellIntro: "AI Business Mastery 72-Hour Challenge is a guided implementation challenge built to help you skip the theory. AI Business Mastery 72-Hour Challenge is designed for people like you — people with valuable knowledge who keep stopping at the launch. It gives you the 72-hour framework that forces you off the preparation treadmill and into income. Your knowledge becomes a product. Your product becomes a business.",
    softSellBullets: [
      "The 72-hour MVP course creation system — from idea to sales page in 3 days",
      "AI copywriting templates that sell your program without feeling salesy or desperate",
      "The pre-launch strategy that fills your first cohort before you finish building",
      "Pricing your expertise: why $497 converts better than $97 — and how to own it"
    ],
    testimonials: [
      { text: "I'd been 'working on my course' for 11 months. I launched a beta version 3 days after joining. Made $8,400 from 28 students. Best decision I ever made.", author: "Dr. Lisa M.", role: "Professor → AI Course Creator", stars: 5 },
      { text: "The launch framework is no-fluff and no-nonsense. I signed 5 coaching clients at $1,200/month within 3 weeks. The AI copywriting alone was worth 10x the price.", author: "David C.", role: "Business Coach", stars: 5 }
    ]
  },
  {
    id: "builder",
    emoji: "⚙️",
    title: "The AI Systems Builder",
    subtitle: "you think in systems. You build things others can't. AI takes your technical instincts and turns them into scalable, recurring revenue — products and automations that make money while you sleep, with or without you.",
    income: "$15K–$60K",
    timeline: "6–10wks",
    difficulty: "8/10",
    mirror: "You can see the solution before most people even understand the problem. You've probably already built something — a tool, a workflow, an automation that saves hours. Maybe you've given it away for free because it \"wasn't ready.\" Maybe you've shared it with a few people who told you it was brilliant and asked where they could buy it. You smiled and said you'd let them know. That was months ago. Here's the painful truth: what you built last month could have been a $10,000/month SaaS product. You just didn't know how to package and sell it. So you keep building instead. More features. Cleaner code. Another version. A better UI. Anything that feels like forward progress while delaying the moment you have to put a price on it and face the market's verdict. Building is safe. Launching is exposure. Meanwhile, less technical people are charging $97/month for tools that do 20% of what yours does — because they launched before they were ready, found customers who paid, and improved from there. They didn't wait. You're still waiting.",
    hiddenCost: "Unmonetized tools don't generate revenue. They generate the slow frustration of watching less-technical people charge $97/month for something simpler than what you built for free and gave away. Every feature you add before your first sale is a feature built in the dark. You don't know if users want it. You don't know if it solves a pain point they'd pay to fix. Real product clarity comes from paying customers — not from more development time spent alone. The irony is brutal: the more you build without validation, the harder it becomes to launch — because now there's more to defend, more to be judged, more that could be found wanting. The technical perfectionist's trap gets tighter with every commit.",
    insight: "You are not stuck because your product isn't ready. You are stuck because building feels safe and selling feels vulnerable — and you have quietly confused shipping lines of code with shipping a business. A business needs customers. Code needs customers to become a product. Nothing you build matters until someone pays for it.",
    beliefCorrection: "An MVP sold to 10 paying customers teaches you more than 6 months of solo development ever will. Those 10 customers will tell you what to build next, what's broken, what they'd pay more for, and what they don't care about at all. That feedback is worth more than any amount of time you spend building features in isolation. Get paid first. Build what they ask for second.",
    whatMakesSense: "You don't need more build time. You need a 72-hour constraint that forces you to validate before you perfect. Stop building in the dark. Take what you already have, price it, and get five people to pay for it. That payment changes everything — it's no longer a side project, it's a product. That distinction is worth more than any feature you could add. The question isn't whether what you've built is good enough. It is. The question is whether you're willing to find out by putting it in front of people who might buy it.",
    roadmap: [
      { day: "DAY 01", phase: "Phase 1", title: "Package Your AI Tool Into a Validated $97/month Offer" },
      { day: "DAY 02", phase: "Phase 2", title: "AI Copy That Sells Technical Products to Non-Technical Buyers" },
      { day: "DAY 03", phase: "Phase 3", title: "Close Your First 5 Subscribers in 24 Hours" }
    ],
    softSellIntro: "AI Business Mastery 72-Hour Challenge is a guided implementation challenge built to help you skip the theory. AI Business Mastery 72-Hour Challenge gives technically-minded builders the one thing they're consistently missing: the business model, the copywriting, and the sales system that turns what you build into what people actually buy. Your technical skills are the unfair advantage. This is the sales layer that activates them.",
    softSellBullets: [
      "How to position a technical AI product so non-technical buyers get it — and buy it",
      "The validation framework: sell before you build the final version",
      "AI copywriting for SaaS and tools — turning features into emotional benefits that convert",
      "The no-code AI product stack that generates $20K+/month in recurring revenue"
    ],
    testimonials: [
      { text: "I'd built a great AI email tool and given it away free for months. After AI Business Mastery 72-Hour Challenge I relaunched at $97/month and hit $23K MRR in 4 months. I quit my job at month 3.", author: "Alex T.", role: "Developer → SaaS Founder", stars: 5 },
      { text: "The validation framework saved me from building the wrong version for a year. Get paying customers first. Everything I needed to build was already there — I just didn't know what mattered until someone paid.", author: "Nina B.", role: "Tech Consultant → AI Product Creator", stars: 5 }
    ]
  },
  {
    id: "accelerator",
    emoji: "🚀",
    title: "The AI Business Accelerator",
    subtitle: "you already have momentum — income, clients, experience, and a track record. AI doesn't replace what you've built. It multiplies it. You're one system away from doubling or tripling your revenue without adding a single extra hour to your week.",
    income: "$20K–$100K",
    timeline: "2–4wks",
    difficulty: "6/10",
    mirror: "You've already done what most people only talk about. You've built something real. You have clients. You have income. You have a reputation in your space. When you tell people what you do, they don't look at you with skepticism — they ask how you did it. You are, by almost any reasonable measure, succeeding. But if you're honest with yourself — you've also hit a ceiling. The kind that only goes up if you hire more people, hustle more hours, or somehow clone yourself. And every time you imagine those options, something in you resists. Because you didn't build this to trade one grind for a bigger one. You know AI is the answer. You've probably already experimented with it. But you're still not using it in the systematic, revenue-multiplying way that your business is ready for. Meanwhile, newer, less experienced players are using AI to do in three hours what takes your team three days — and undercutting you on price while you try to understand what's happening to your market. They don't have your depth. They don't have your relationships. But they have a speed advantage you haven't closed yet. The window to close it is right now — before it becomes a structural disadvantage.",
    hiddenCost: "Every month you run your business without AI systems is a month your competitors are compressing your margin, accelerating their output, and quietly taking the positioning that used to be yours by default. The entrepreneurs who integrate AI into their existing businesses in the next 90 days will own their market for the next decade. The ones who wait — even the experienced, successful ones — will spend that decade fighting to catch up to people who started with less and moved faster. You've done the hard part. You built something real from nothing. But the competitive landscape is shifting faster than it ever has. The advantage now goes not to whoever started first, but to whoever integrates AI first. That's a race you can win — if you start now.",
    insight: "You are not stuck because you lack opportunity. You are stuck because you are optimizing an old engine when you could be installing a new one that runs 10x more efficiently with the same fuel. Everything you've built — your clients, your reputation, your processes — becomes more valuable with AI underneath it, not less.",
    beliefCorrection: "Your existing business plus AI systems is the fastest path to $100K months that exists right now. You're not starting from zero. You're starting from ahead — with clients who trust you, with domain expertise that AI cannot replicate, with a market position that took years to build. AI doesn't compete with that. It compounds it.",
    whatMakesSense: "You don't need a full business rebuild. You don't need to scrap what's working and start over. You need 72 focused hours to identify the top three places where AI can double your output, halve your delivery time, and create a new high-margin revenue stream — without touching the foundation of what already works. The businesses that get this right don't look different from the outside. They just produce more, faster, with fewer people and less friction. The difference shows up in the bank account, not the org chart.",
    roadmap: [
      { day: "DAY 01", phase: "Phase 1", title: "AI Audit — Find the $50K Hidden in Your Current Business" },
      { day: "DAY 02", phase: "Phase 2", title: "The AI Revenue Layer — New Income Without New Hours" },
      { day: "DAY 03", phase: "Phase 3", title: "Systems & Scale — Automate Delivery, Multiply Output" }
    ],
    softSellIntro: "AI Business Mastery 72-Hour Challenge is a guided implementation challenge built to help you skip the theory. AI Business Mastery 72-Hour Challenge gives established business owners the exact AI integration roadmap that multiplies existing revenue — without a full rebuild, without new staff, and without losing what's already working. This isn't about learning AI. It's about deploying it in the specific places your business is ready for it right now.",
    softSellBullets: [
      "The AI business audit: find hidden revenue in systems you already have",
      "How to add a $5K–$20K/month AI revenue stream to your existing offers",
      "Automate your client delivery so one person does the work of five",
      "AI-powered premium offer repositioning — charge 2x for the exact same outcome"
    ],
    testimonials: [
      { text: "I was doing $25K/month and feeling stuck. The AI integration audit revealed $40K in revenue hiding in plain sight. Hit $78K last month. I wish I'd done this a year ago.", author: "Robert M.", role: "Agency Owner → AI-Powered Business", stars: 5 },
      { text: "I thought AI was for startups. The framework showed me exactly how to apply it to my 8-year-old consulting business. Revenue tripled. Hours worked cut in half. It's the best investment my business has ever made.", author: "Jennifer L.", role: "Senior Business Consultant", stars: 5 }
    ]
  }
];

// --- Components ---

export default function App() {
  const [screen, setScreen] = useState<'intro' | 'quiz' | 'email' | 'results'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [emailData, setEmailData] = useState({ name: '', email: '' });
  const [showUrgency, setShowUrgency] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'WAMATION_NAME_UPDATE') {
        setEmailData(prev => ({ ...prev, name: event.data.name }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUrgency(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => setScreen('quiz');

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setScreen('email');
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    if (emailData.email && emailData.email.includes('@')) {
      // The form will submit to the hidden iframe.
      // We wait a tiny bit to ensure the browser has started the request before unmounting the form.
      setTimeout(() => {
        setScreen('results');
        window.scrollTo(0, 0);
      }, 100);
    } else {
      e.preventDefault();
    }
  };

  const determineProfile = () => {
    const q6 = answers[5]; // model
    const q5 = answers[4]; // experience
    
    // If they explicitly picked a model, use that profile
    if (q6 !== undefined && RESULT_PROFILES[q6]) {
      return RESULT_PROFILES[q6];
    }
    
    // Fallback based on experience if model is somehow missing
    if (q5 === 3 || q5 === 2) return RESULT_PROFILES[4]; // Accelerator
    
    return RESULT_PROFILES[0]; // Default to Architect
  };

  const profile = determineProfile();
  const progress = Math.round(((currentQ + 1) / QUESTIONS.length) * 100);

  const ROTATING_WORDS = ["INCOME", "FREEDOM", "CLARITY", "CLIENTS", "CASHFLOW"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen noise-overlay relative overflow-x-hidden selection:bg-gold/30">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="py-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">AI to</span>
              <div className="h-4 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gold text-[10px] font-bold uppercase tracking-widest block"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className="text-gold text-xs font-semibold tracking-[0.3em] uppercase flex items-center gap-2">
              <span>AI TO INCOME IN</span>
              <motion.span
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 0px rgba(212,175,55,0)",
                    "0 0 15px rgba(212,175,55,0.6)",
                    "0 0 0px rgba(212,175,55,0)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="font-black"
              >
                72 HOURS
              </motion.span>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        {screen === 'quiz' && (
          <div className="mb-12">
            <div className="flex justify-between text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-medium">
              <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
              <span>{progress}% Complete</span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gold-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {screen === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-4 mx-auto w-fit"
              >
                <Clock className="w-3 h-3 text-gold" />
                <span className="text-gold text-[10px] font-bold tracking-widest uppercase">Takes &lt;2mins</span>
              </motion.div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-8 mx-auto w-fit">
                <div className="flex -space-x-2">
                  {[
                    { initials: 'JD', bg: 'bg-blue-500/20' },
                    { initials: 'AS', bg: 'bg-emerald-500/20' },
                    { initials: 'MK', bg: 'bg-amber-500/20' },
                    { initials: 'PL', bg: 'bg-purple-500/20' }
                  ].map((p, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full border-2 border-[#050505] ${p.bg} flex items-center justify-center text-[10px] font-bold text-white`}>
                      {p.initials}
                    </div>
                  ))}
                </div>
                <span className="text-zinc-400 text-[10px] font-bold tracking-wider uppercase">
                  <span className="text-gold">1,248+</span> Professionals have taken this quiz
                </span>
              </div>
              <h1 className="font-serif text-[28px] md:text-[48px] font-black leading-[1.2] mb-10 text-gold lowercase">
                <span className="inline-block px-4 py-1 bg-[#F0D060] text-black rounded-sm mb-2">
                  <span className="uppercase">Stop</span> Guessing with <span className="uppercase">AI</span>:
                </span>
                <br />
                <span className="text-white uppercase">Answer 7 Questions to Unlock</span> Your <span className="inline-block px-4 py-1 bg-[#F0D060] text-black rounded-lg text-[26px] md:text-[44px] italic uppercase">Personalized Income Blueprint</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
                Most people are leaving $1,000–$5,000/month on the table because they're approaching AI the wrong way for their specific skill set, goals, and situation.
                This quiz identifies exactly which AI strategy matches who you already are — so you stop wasting time on paths that were never right for you, and start moving fast on the one that is.
              </p>

              {/* 2-MINUTES QUIZ Section */}
              <div className="mb-12 p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl relative overflow-hidden group max-w-2xl mx-auto">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Clock className="w-32 h-32 text-gold" />
                </div>
                <div className="relative z-10 text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    <span className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase font-mono">System Status: Ready</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                    THE <span className="text-gold">2-MINUTES</span> QUIZ
                  </h3>
                  <div className="h-px w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-transparent mb-6" />
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    Our proprietary <span className="text-zinc-200 font-medium">AI Strategy Engine</span> analyzes your unique skill set, income goals, and time availability in under 120 seconds to identify your highest-probability path to profit.
                  </p>
                </div>
                {/* Decorative dashed line */}
                <div className="absolute bottom-0 left-0 w-full h-1 border-b border-dashed border-zinc-800" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
                {[
                  { icon: <Target className="w-6 h-6" />, title: "Personalized Path", desc: "Get your unique AI business blueprint, not generic advice that could apply to anyone" },
                  { icon: <Clock className="w-6 h-6" />, title: "Takes 60 secs", desc: "7 targeted questions that reveal more than hours of research" },
                  { icon: <DollarSign className="w-6 h-6" />, title: "Real Income Potential", desc: "See your specific monthly income range with the right AI strategy" }
                ].map((p, i) => (
                  <div key={i} className="bg-bg-card border border-zinc-800 p-5 rounded-2xl">
                    <div className="text-gold mb-3">{p.icon}</div>
                    <h4 className="text-sm font-bold mb-1">{p.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleStart}
                className="bg-gold-gradient text-black font-bold px-12 py-5 rounded-xl hover:scale-[1.02] transition-transform shadow-xl shadow-gold/20 flex items-center gap-2 mx-auto text-lg uppercase tracking-wider"
              >
                START MY PERSONALIZED ANALYSIS <ArrowRight className="w-5 h-5" />
              </button>
              <div className="mt-6 text-xs text-zinc-600 font-medium tracking-wide">
                🔒 100% FREE · NO CREDIT CARD · INSTANT RESULTS
              </div>
            </motion.div>
          )}

          {screen === 'quiz' && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-8"
            >
              <div className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                Question {currentQ + 1}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 leading-tight">
                {QUESTIONS[currentQ].text}
              </h2>
              <p className="text-zinc-500 text-sm mb-10">
                {QUESTIONS[currentQ].subtext}
              </p>

              <div className="space-y-3">
                {QUESTIONS[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-start gap-5 group ${
                      answers[currentQ] === i 
                        ? 'border-gold bg-gold/10' 
                        : 'border-zinc-800 bg-bg-card hover:border-zinc-600 hover:translate-x-1'
                    }`}
                  >
                    <span className="text-3xl flex-shrink-0">{opt.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{opt.title}</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-12 flex justify-between items-center">
                <button 
                  onClick={handleBack}
                  disabled={currentQ === 0}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    currentQ === 0 ? 'opacity-0 pointer-events-none' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={answers[currentQ] === undefined}
                  className={`bg-gold-gradient text-black font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all ${
                    answers[currentQ] === undefined ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:scale-105 shadow-lg shadow-gold/20'
                  }`}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-8">🔮</div>
              <h2 className="font-serif text-4xl md:text-5xl font-black mb-6 text-gold-gradient">
                Your Results Are Ready.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                We've analyzed your answers and identified your AI money path. What we found is specific to you — your skill set, your goals, and your current situation.
                Enter your details below to unlock your full personalized breakdown.
              </p>

              <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50">
                <div className="bg-gold/10 border-b border-gold/20 p-6">
                  <h3 className="text-gold font-bold uppercase tracking-widest text-sm">Unlock Your Discovery</h3>
                  <p className="text-[10px] text-zinc-500 mt-1 uppercase">Fill the form below to reveal your path</p>
                </div>
                
                <div className="p-8">
                  <form 
                    method="POST" 
                    action="https://app.wamation.com.ng/processor" 
                    id="wamationform"
                    target="hidden_iframe"
                    onSubmit={handleEmailSubmit}
                    className="space-y-5 text-left"
                  >
                    {/* Hidden Fields from Wamation */}
                    <input type="hidden" name="zq" value="41213" />
                    <input type="hidden" name="fid" value="efa26c9bb941213" />
                    <input type="hidden" name="pid" value="" />
                    <input type="hidden" name="bumppid" value="0" />
                    <input type="hidden" name="cid" value="" />
                    <input type="hidden" name="usp" value="0" />
                    <input type="hidden" name="grk" value="" />
                    <input type="hidden" name="pvar" value="" />

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Your Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="E.g. Joe" 
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                        onChange={(e) => setEmailData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">WhatsApp Number</label>
                      <div className="flex gap-2">
                        <select 
                          name="wnopfx" 
                          required 
                          className="bg-black border border-zinc-800 rounded-xl px-2 py-3 text-white text-sm focus:border-gold outline-none w-24"
                        >
                          <option value="234">+234 (NG)</option>
                          <option value="1">+1 (US/CA)</option>
                          <option value="44">+44 (UK)</option>
                          <option value="233">+233 (GH)</option>
                          <option value="254">+254 (KE)</option>
                          <option value="27">+27 (ZA)</option>
                          <option value="971">+971 (UAE)</option>
                        </select>
                        <input 
                          type="number" 
                          name="waphone" 
                          required 
                          placeholder="WhatsApp Number" 
                          className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="joe@example.com" 
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                        onChange={(e) => setEmailData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          required 
                          className="mt-1 w-4 h-4 rounded border-zinc-800 bg-black text-gold focus:ring-gold"
                        />
                        <span className="text-[10px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                          I agree to the <button type="button" className="text-gold underline" onClick={() => alert("BY SUBMITTING THIS FORM, You agree to receive relevant AI business tips and updates via your WhatsApp DM and emails. All resources are exclusively intellectual property of CARAMEL DIGITALS.")}>Terms & Conditions</button> and to receive personalized AI strategy updates.
                        </span>
                      </label>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-gold-gradient text-black font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gold/20 flex items-center justify-center gap-2 mt-4"
                    >
                      UNLOCK MY DISCOVERY RESULTS <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              <button 
                onClick={() => setScreen('results')}
                className="mt-8 text-zinc-600 hover:text-gold text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mx-auto transition-colors"
              >
                Already submitted? Skip to results <ArrowRight className="w-3 h-3" />
              </button>

              <p className="mt-6 text-[9px] text-zinc-700 max-w-xs mx-auto leading-relaxed uppercase tracking-tighter">
                🔒 Your information is 100% secure. We respect your privacy and will never share your data.
              </p>
            </motion.div>
          )}

          {screen === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12"
            >
              {/* Main Heading */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
                >
                  Analysis Complete
                </motion.div>
                <h2 className="font-serif text-4xl md:text-5xl font-black text-white mb-4">
                  Your Personalized <span className="text-gold">AI Income Blueprint</span>
                </h2>
                <p className="text-zinc-500 max-w-xl mx-auto text-sm uppercase tracking-widest font-bold">
                  Based on your unique skills, goals, and current situation
                </p>
              </div>

              {/* 1. AI Personalized Results (Top) */}
              <div className="max-w-3xl mx-auto mb-16">
                {/* Re-introducing the Profile Result in a more compact way */}
                <div className="bg-gold/5 border border-gold/20 rounded-2xl p-8 mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{profile.emoji}</span>
                    <div className="text-left">
                      <div className="text-gold text-[10px] font-bold tracking-widest uppercase">Your AI Business Analysis Profile</div>
                      <h4 className="font-serif text-2xl font-black text-white">{profile.title}</h4>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm italic text-left">
                    "Hey {emailData.name.split(' ')[0] ? emailData.name.split(' ')[0].charAt(0).toUpperCase() + emailData.name.split(' ')[0].slice(1).toLowerCase() : 'there'}, {profile.subtitle}"
                  </p>
                  <div className="mt-6">
                    <a 
                      href="https://wa.link/cd4tjk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#22c35e] text-white font-black px-6 py-4 rounded-xl text-lg transition-all shadow-lg shadow-emerald-500/20 hover:scale-105"
                    >
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.602 6.06L0 24l6.12-1.605a11.778 11.778 0 005.925 1.585h.005c6.637 0 12.032-5.396 12.036-12.032a11.79 11.79 0 00-3.526-8.511z"/>
                      </svg>
                      UNLOCK THE 72-HOUR SPRINT +MY EXCLUSIVE BONUS NOW VIA WHATSAPP
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
                {[
                  { label: "Monthly Potential", val: profile.income, icon: <DollarSign className="w-4 h-4" /> },
                  { label: "Time to First $", val: profile.timeline, icon: <Clock className="w-4 h-4" /> },
                  { label: "Difficulty Score", val: profile.difficulty, icon: <Brain className="w-4 h-4" /> }
                ].map((s, i) => (
                  <div key={i} className="bg-bg-card border border-zinc-800 p-8 rounded-2xl text-center group hover:border-gold/30 transition-colors">
                    <div className="text-gold/50 mb-3 flex justify-center">{s.icon}</div>
                    <span className="block font-serif text-4xl font-black text-gold mb-2">{s.val}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{s.label}</span>
                  </div>
                ))}
                {/* Jump to Solution Button */}
                <div className="mt-8 text-center">
                  <a 
                    href="#solution"
                    className="inline-flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Skip to your personalized solution <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Psychological Journey Section */}
              <div className="max-w-3xl mx-auto space-y-24 mb-32">
                <section className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gold/20 rounded-full" />
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-gold flex items-center gap-3">
                    <span className="text-sm font-mono opacity-50">01</span> The Mirror
                  </h3>
                  <p className="text-zinc-300 text-lg leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-gold">
                    {profile.mirror}
                  </p>
                </section>

                <section className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-red-500/20 rounded-full" />
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-red-400 flex items-center gap-3">
                    <span className="text-sm font-mono opacity-50">02</span> The Hidden Cost
                  </h3>
                  <p className="text-zinc-300 text-lg leading-relaxed">
                    {profile.hiddenCost}
                  </p>
                </section>

                <section className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-emerald-500/20 rounded-full" />
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-emerald-400 flex items-center gap-3">
                    <span className="text-sm font-mono opacity-50">03</span> The Insight
                  </h3>
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8">
                    <p className="text-emerald-50 text-xl font-medium leading-relaxed italic">
                      "{profile.insight}"
                    </p>
                  </div>
                </section>

                <section className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-blue-500/20 rounded-full" />
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-blue-400 flex items-center gap-3">
                    <span className="text-sm font-mono opacity-50">04</span> The Belief Correction
                  </h3>
                  <p className="text-zinc-300 text-lg leading-relaxed">
                    {profile.beliefCorrection}
                  </p>
                </section>

                <section className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gold/20 rounded-full" />
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-gold flex items-center gap-3">
                    <span className="text-sm font-mono opacity-50">05</span> What Makes Sense For You
                  </h3>
                  <p className="text-zinc-300 text-lg leading-relaxed mb-12">
                    {profile.whatMakesSense}
                  </p>

                  {/* Roadmap */}
                  <div className="grid grid-cols-1 gap-4">
                    {profile.roadmap.map((step, i) => (
                      <div key={i} className="bg-bg-card border border-zinc-800 rounded-2xl p-6 flex items-center gap-6 group hover:border-gold/30 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">{step.day} • {step.phase}</div>
                          <h4 className="text-lg font-bold text-white">{step.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* 2. The Solution: The 72-Hour AI Income Execution Sprint */}
              <div id="solution" className="scroll-mt-20">
                <ConversionOptimizedContent name={emailData.name} />
              </div>

              {/* Offer Box */}
              <div className="relative overflow-hidden bg-gradient-to-br from-gold/15 to-zinc-900 border-2 border-gold/30 rounded-[3rem] p-10 md:p-20 text-center mb-16 shadow-2xl shadow-gold/10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none" />
                
                <motion.div 
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  className="inline-block px-6 py-2 bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-10 shadow-lg shadow-orange-600/20"
                >
                  🔥 Quiz Exclusive Offer
                </motion.div>
                
                <h3 className="font-serif text-4xl md:text-6xl font-black mb-8 leading-tight text-white">
                  Get The Complete AI Business Mastery 72-Hour Challenge System
                </h3>
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                  You've identified your path. Now get the step-by-step system, templates, and 1-on-1 coaching that takes you from where you are to your first $10K AI month — faster than you think.
                </p>

                {/* Social Urgency Placeholder */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                        <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="user" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-gold text-[10px] font-black uppercase tracking-widest">Limited Availability</div>
                    <div className="text-white text-xs font-bold">Only 7 of 20 Bonus Spots Remaining</div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center mb-12">
                  <span className="font-serif text-4xl md:text-6xl font-black text-gold leading-none">₦50,000</span>
                  <span className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest mt-4">YOUR ONE-TIME INVESTMENT</span>
                </div>

                <div className="relative inline-block mb-10">
                  {/* Blinking Stars around the button */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-gold pointer-events-none"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0], 
                        scale: [0, 1, 0],
                        rotate: [0, 90, 180] 
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut"
                      }}
                      style={{
                        top: `${[10, 20, 80, 90, 50, 40][i]}%`,
                        left: `${[5, 95, 10, 90, -5, 105][i]}%`,
                      }}
                    >
                      <Star className="w-4 h-4 fill-gold" />
                    </motion.div>
                  ))}

                  <motion.a 
                    href="https://aibusinessmastery.me/r/carameldigitals"
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={{
                      scale: [1, 1.03, 1],
                      boxShadow: [
                        "0 20px 50px rgba(212,175,55,0.3)",
                        "0 20px 70px rgba(212,175,55,0.6)",
                        "0 20px 50px rgba(212,175,55,0.3)"
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="inline-block bg-gold-gradient text-black font-black px-16 py-8 rounded-2xl text-2xl hover:scale-[1.05] transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:shadow-[0_20px_60px_rgba(212,175,55,0.5)]"
                  >
                    👉 ENROLL NOW TO UNLOCK THE 72-HOUR INCOME EXECUTION SPRINT
                  </motion.a>
                </div>

                <div className="flex flex-wrap justify-center gap-8 text-xs text-zinc-500 font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500" /> 30-Day Guarantee</div>
                  <div className="flex items-center gap-2"><Lock className="w-5 h-5 text-emerald-500" /> Secure Checkout</div>
                  <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-emerald-500" /> Instant Access</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="py-12 border-t border-zinc-900 mt-12 text-center">
          <p className="text-[10px] text-zinc-700 font-medium tracking-widest uppercase">
            © {new Date().getFullYear()} AI Business Mastery 72-Hour Challenge · All Rights Reserved
          </p>
        </footer>
      </div>

      {/* Social Urgency Notification */}
      <SocialUrgency visible={showUrgency} />

      {/* Hidden iframe for form submission to prevent redirect */}
      <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }}></iframe>
    </div>
  );
}

function SocialUrgency({ visible }: { visible: boolean }) {
  const notifications = [
    "🟢 Chidinma from Abuja just discovered she's an AI Knowledge Broker",
    "🟢 Favor from Benin just completed her quiz",
    "🟢 Ibrahim from kano just got the 72-hour challenge",
    "🟢 John from delta just discovered he is AI business Accelerator",
    "🟢 Marcus from Lagos completed his quiz — 2 minutes ago",
    "🟢 Tunde from Anambra just discovered that he is AI Business Accelerator",
    "🟢 Chinwe from Port Harcourt just joined the 72-HOUR CHALLENGE",
    "🟢 5 people are taking this quiz right now"
  ];

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const showTimer = setTimeout(() => setShow(true), 500);
    
    const cycleTimer = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % notifications.length);
        setShow(true);
      }, 1000);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(cycleTimer);
    };
  }, [visible, notifications.length]);

  return (
    <AnimatePresence>
      {visible && show && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-6 left-6 z-[100] max-w-[280px] w-full"
        >
          <div className="bg-zinc-900/95 backdrop-blur-md border border-gold/20 p-3 rounded-xl shadow-xl flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-lg">
              🚀
            </div>
            <div className="text-[11px] font-medium text-zinc-200 leading-tight">
              {notifications[index]}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const ConversionOptimizedContent = ({ name }: { name: string }) => {
  const firstName = name.split(' ')[0] ? name.split(' ')[0].charAt(0).toUpperCase() + name.split(' ')[0].slice(1).toLowerCase() : 'there';

  return (
    <div className="max-w-4xl mx-auto space-y-24 mb-32 text-left">
      {/* Section 1: The Bridge & The Sprint Intro */}
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Zap className="w-32 h-32 text-gold" />
        </div>
        <div className="relative z-10">
          <div className="text-gold text-2xl mb-6">💡</div>
          <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed mb-10 font-medium italic">
            "Hey {firstName}, most professionals fail not because they lack skills, but because they lack a <span className="text-white font-bold underline decoration-gold/50">step-by-step execution plan</span>. Based on your personalized results, the fastest way to bridge the gap between where you are and your first $10K AI month is through:"
          </p>
          
          <div className="bg-black/40 border border-gold/20 rounded-2xl p-8 mb-10">
            <h3 className="font-serif text-3xl md:text-4xl font-black text-white mb-4">
              💥 The <span className="text-gold">72-Hour AI Income Execution Sprint</span>
            </h3>
            <p className="text-zinc-400 text-lg italic mb-8">
              “A structured implementation system designed to help you achieve results in 3 days, even if you’re starting from zero.”
            </p>
            
            <div className="space-y-4">
              <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-4">Inside the Sprint, you’ll implement:</h4>
              {[
                { day: "Day 1", title: "Clarity & Positioning", desc: "Discover your highest-income AI path" },
                { day: "Day 2", title: "Packaging & Monetization", desc: "Structure offers buyers actually want" },
                { day: "Day 3", title: "Launch & Execution", desc: "Start implementing immediately" }
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center text-gold font-bold flex-shrink-0">
                    {d.day.split(' ')[1]}
                  </div>
                  <div>
                    <div className="font-bold text-white">{d.day} – {d.title}</div>
                    <div className="text-sm text-zinc-500">{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Real Cost - Re-integrated for psychological impact */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 mb-10">
            <h4 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-6">The real cost of waiting is:</h4>
            <ul className="space-y-3">
              {[
                "Another 6 months of overthinking while others take your market share",
                "Watching peers leverage AI to work less and earn more while you stay stuck",
                "The invisible loss of ₦100,000s in potential revenue every single month",
                "Staying dependent on a single, fragile income stream"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                  <span className="text-red-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-zinc-400 text-lg font-medium text-center italic">
            Your next step is simple — follow the plan and take action.
          </p>
        </div>
      </section>

      {/* Section 2: Authority Pre-Frame */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gold/10 blur-2xl rounded-full" />
          <img 
            src="https://i.ibb.co/Q3NVhqjh/gnwwg4.jpg" 
            alt="Elizabeth Emmanuel" 
            className="relative rounded-[2rem] border-2 border-gold/20 shadow-2xl w-full h-auto"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h3 className="font-serif text-3xl font-black text-white mb-6">Why I Recommend This</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Hi {firstName}, I'm <span className="text-gold font-bold">Elizabeth Emmanuel</span> – A Digital Leverage Guide & AI Monetization Strategist. Founder of Caramel Digital Academy.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An online training platform dedicated for professionals and ambitious minds where I train you on how to earn more and leverage the internet space to your advantage. I have been opportune to train over 1000+ professionals online and offline to gain clarity on what to focus on to increase their earning potential in the market place.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            And now with the advent of AI, I’ve helped professionals like you find the fastest way to earn with AI without wasting months on trial-and-error and that's why I now recommend this structured 72-Hour Sprint.
          </p>
        </div>
      </section>

      {/* Flagship Program Link */}
      <section className="text-center bg-gold/5 border border-gold/10 rounded-3xl p-8">
        <p className="text-zinc-300 mb-6 italic">
          "I have personally used it to build an offer for my flagship program here..."
        </p>
        <a 
          href="https://sovereignincome-multiplier-system.netlify.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gold font-bold underline hover:text-white transition-colors text-lg"
        >
          Sovereign Income Multiplier System
        </a>
      </section>

      {/* Testimonials & Proof */}
      <section>
        <div className="text-center mb-12">
          <h3 className="font-serif text-3xl font-black text-white mb-4">Testimonies From Professionals</h3>
          <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">And ABM MEMBERS</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl italic text-zinc-300 leading-relaxed">
            “After implementing the positioning system, I was able to increase my salary.” – <span className="text-gold font-bold">Nigerian Professional</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl italic text-zinc-300 leading-relaxed">
            “Everything became clear and structured. I finally knew the next steps to monetize AI.” – <span className="text-gold font-bold">Virtual Assistant</span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img 
              src="https://i.ibb.co/q3JvHdH6/In-Shot-20260303-221504719.jpg" 
              alt="Proof 1" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img 
              src="https://i.ibb.co/prwT6nCm/In-Shot-20260303-222042968.jpg" 
              alt="Proof 2" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Exclusive Bonuses */}
      <section className="bg-zinc-900 border-2 border-gold/30 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
        <div className="text-center mb-12">
          <h3 className="font-serif text-3xl md:text-4xl font-black text-white mb-4">Exclusive Bonuses</h3>
          <p className="text-gold font-bold uppercase tracking-widest text-sm">(Only for first 20 enrollees)</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img 
            src="https://i.ibb.co/BHNc032y/Formal-Black-and-White-Letterhead-Design-20260304-180307-0000.png" 
            alt="Bonus Letterhead" 
            className="w-full h-auto rounded-2xl mb-12 border border-white/10 shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          className="space-y-6 mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {[
            { title: "First 10 Sales in 7 Days Action Plan", desc: "Step-by-step roadmap to your first wins.", value: "₦10,000" },
            { title: "African Digital Income Starter Kit", desc: "Everything Nigerian professionals need to start earning online.", value: "₦20,000" },
            { title: "Personal Self-Discovery Prompt", desc: "Rediscover your strengths and know exactly what AI strategy fits you.", value: "₦5,000" },
            { title: "AI Prompt Vault for Digital Sellers", desc: "Proven prompts to generate content, offers, and marketing materials quickly.", value: "₦10,000" },
            { title: "Nigerian Professionals AI Starter Kit", desc: "Tailored templates and examples for the local market.", value: "₦10,000" },
            { title: "AI Video Generation & Editing Tutorial", desc: "Learn to create high-converting sales videos with AI + simple editing.", value: "₦25,000" }
          ].map((b, i) => {
            // Cycle through different attention-grabbing entry animations
            const itemVariants = [
              { // Zoom & Pop
                hidden: { opacity: 0, scale: 0.3 },
                show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }
              },
              { // Fly in from below
                hidden: { opacity: 0, y: 60 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
              },
              { // Slide & Zoom
                hidden: { opacity: 0, x: -30, scale: 0.9 },
                show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
              }
            ];
            
            return (
              <motion.div 
                key={i} 
                variants={itemVariants[i % itemVariants.length]}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 group hover:border-gold/30 transition-colors cursor-default"
              >
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="text-gold text-xl mt-1"
                >
                  📌
                </motion.div>
                <div className="flex-1">
                  <div className="font-bold text-white text-lg mb-1">{b.title}</div>
                  <div className="text-zinc-400 text-sm mb-2">{b.desc}</div>
                  <div className="text-gold font-black text-xs uppercase tracking-widest">Worth {b.value}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="bg-gold/10 border border-gold/20 rounded-2xl p-8 text-center">
          <div className="text-zinc-400 text-sm uppercase tracking-widest mb-2">Total Bonus Value</div>
          <div className="text-white text-4xl font-black mb-4">₦80,000+</div>
          <div className="h-px w-24 bg-gold/30 mx-auto mb-4" />
          <div className="text-gold font-bold">“Only available for the first 20 people who enroll this month through my link.”</div>
        </div>
      </section>

      {/* Section 4: Call To Action */}
      <section className="text-center space-y-12">
        <div className="space-y-4">
          <h3 className="font-serif text-3xl md:text-4xl font-black text-white">Ready to take action, {firstName}?</h3>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            This isn't for people casually browsing. This is for professionals ready to execute and build a real AI-powered income stream.
          </p>
        </div>
        
        <div className="bg-orange-600/10 border border-orange-600/20 p-8 md:p-12 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck className="w-32 h-32 text-orange-600" />
          </div>
          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-10 italic relative z-10">
            “REMEMBER: This challenge is for serious and ambitious professionals who are tired of hitting the income ceiling... it is for action takers and not procrastinators nor excuse givers.”
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
            <a 
              href="https://wa.link/cd4tjk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto bg-[#25D366] hover:bg-[#22c35e] text-white font-black px-10 py-6 rounded-2xl text-xl transition-all shadow-xl shadow-emerald-600/20 hover:scale-105 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.602 6.06L0 24l6.12-1.605a11.778 11.778 0 005.925 1.585h.005c6.637 0 12.032-5.396 12.036-12.032a11.79 11.79 0 00-3.526-8.511z"/>
              </svg>
              UNLOCK THE 72-HOUR SPRINT +MY EXCLUSIVE BONUS NOW VIA WHATSAPP
            </a>
            
            <a 
              href="https://aibusinessmastery.me/r/carameldigitals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto bg-gold-gradient text-black font-black px-10 py-6 rounded-2xl text-xl transition-all shadow-xl shadow-gold/20 hover:scale-105 flex items-center justify-center gap-3"
            >
              👉 SEE THE FULL BREAKDOWN
            </a>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 md:p-12">
        <h3 className="font-serif text-3xl font-black text-white mb-10 text-center">Frequently Asked Questions</h3>
        <div className="space-y-8">
          {[
            { q: "How soon do I get access?", a: "Immediately your payment is confirmed, you get access to your dashboard and your challenge begins with DAY 1. Live training. Following step-by-step to get results in 3 days." },
            { q: "Do I need prior AI experience?", a: "No. Beginners and professionals alike can implement successfully." },
            { q: "What if I get stuck?", a: "You’ll have my bonus clarity session, templates, and accountability group to guide you." }
          ].map((faq, i) => (
            <div key={i} className="border-b border-zinc-800 pb-8 last:border-0">
              <h4 className="text-white font-bold text-lg mb-3 flex gap-3">
                <span className="text-gold">Q:</span> {faq.q}
              </h4>
              <p className="text-zinc-400 leading-relaxed flex gap-3">
                <span className="text-emerald-500 font-bold">A:</span> {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
