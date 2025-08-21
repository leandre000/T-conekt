"use client";

import Link from "next/link";
import { CheckCircle, Users, Briefcase, MessageCircle, Star, DollarSign, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { BrowseJobsButton } from "@/components/landing/BrowseJobsButton";
import { useState, useEffect } from "react";

const pricingPlans = [
  {
    name: "Free",
    description: "Get started for free. Browse jobs, create your profile, and connect with talent or employers.",
    price: "$0",
    icon: DollarSign,
    cta: "Sign Up",
    ctaLink: "/auth/register",
    featured: false,
  },
  {
    name: "Pro",
    description: "Unlock advanced features, priority support, and premium opportunities.",
    price: "$19/mo",
    icon: Star,
    cta: "Start Pro",
    ctaLink: "/auth/register",
    featured: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for teams and organizations. Contact us for a tailored plan.",
    price: "Contact Us",
    icon: Briefcase,
    cta: "Contact Sales",
    ctaLink: "/contact",
    featured: false,
  },
];

const carouselImages = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
];

export default function HomeClient() {
  // Carousel state
  const [carouselIdx, setCarouselIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx((idx) => (idx + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-28 px-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-move dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-1000 shadow-lg">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#6366f1" fillOpacity="0.08" d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,133.3C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
        <div className="relative z-10 max-w-2xl mx-auto">
          <img src="/images/logo.svg" alt="TalentConnect Logo" className="mx-auto h-20 w-20 mb-4 rounded-full shadow-lg border-4 border-white/80 dark:border-neutral-800 animate-fade-in" />
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4 animate-fade-in drop-shadow-lg tracking-tight">Connect with Global Talent</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 animate-fade-in font-medium">Showcase your skills, find opportunities, and build your professional network on our global platform.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth/register" className="px-10 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-xl shadow-xl hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 animate-fade-in">Get Started</Link>
            <BrowseJobsButton />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-gray-900 dark:text-white tracking-tight">Why TalentConnect?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="feature-card group flex flex-col items-center text-center p-8 bg-white/80 dark:bg-neutral-800 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-indigo-100/80 dark:hover:bg-indigo-900/60 transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <Users className="h-12 w-12 text-primary mb-5 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">Global Talent Pool</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Access a diverse network of professionals and companies worldwide.</p>
          </div>
          <div className="feature-card group flex flex-col items-center text-center p-8 bg-white/80 dark:bg-neutral-800 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-purple-100/80 dark:hover:bg-purple-900/60 transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <Briefcase className="h-12 w-12 text-primary mb-5 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">Opportunities for All</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Find jobs, gigs, and projects tailored to your skills and interests.</p>
          </div>
          <div className="feature-card group flex flex-col items-center text-center p-8 bg-white/80 dark:bg-neutral-800 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-pink-100/80 dark:hover:bg-pink-900/60 transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <MessageCircle className="h-12 w-12 text-primary mb-5 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">Direct Messaging</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Connect and collaborate instantly with employers and talent.</p>
                </div>
              </div>
      </section>

      {/* Images/Illustrations Section (Dynamic Carousel) */}
      <section className="py-20 px-4 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            {carouselImages.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt="Remote Team"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 rounded-2xl ${carouselIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                style={{ transitionProperty: 'opacity' }}
              />
            ))}
                </div>
              </div>
        <div className="flex-1">
          <h3 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">Work Remotely, Collaborate Globally</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-medium">TalentConnect empowers you to work from anywhere, connect with top companies, and grow your career or business without borders.</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200 text-lg"><CheckCircle className="text-primary h-6 w-6" /> Flexible work arrangements</li>
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200 text-lg"><CheckCircle className="text-primary h-6 w-6" /> Secure payments and contracts</li>
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200 text-lg"><CheckCircle className="text-primary h-6 w-6" /> Verified talent and employers</li>
          </ul>
            </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-gray-900 dark:text-white tracking-tight">Simple, Transparent Pricing</h2>
        <div className="flex flex-col md:flex-row gap-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
          {pricingPlans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative group rounded-2xl shadow-xl p-10 flex flex-col items-center min-w-[320px] max-w-md mx-auto transition-all duration-300 border-2 border-transparent hover:border-primary/40 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                  plan.featured 
                    ? "bg-gradient-to-br from-blue-600 to-purple-700 text-white border-blue-500 scale-105" 
                    : "bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-white"
                }`}
                style={{ 
                  boxShadow: plan.featured 
                    ? "0 0 32px 8px rgba(99,102,241,0.4)" 
                    : "0 4px 20px rgba(0,0,0,0.1)" 
                }}
              >
                <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:shadow-glow group-hover:animate-shine transition-all duration-500" />
                <Icon className={`h-10 w-10 mb-6 ${plan.featured ? "text-white" : "text-blue-600 dark:text-blue-400"}`} />
                <h3 className="font-bold text-2xl mb-3">{plan.name}</h3>
                <p className={`mb-6 text-center transition-colors duration-300 text-lg ${
                  plan.featured 
                    ? "text-blue-100" 
                    : "text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                }`}>{plan.description}</p>
                <span className={`text-3xl font-extrabold mb-4 ${plan.featured ? "text-white" : "text-blue-600 dark:text-blue-400"}`}>{plan.price}</span>
                <Link href={plan.ctaLink} className={`mt-4 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
                  plan.featured 
                    ? "bg-white text-blue-600 hover:bg-gray-100 shadow-lg" 
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}>{plan.cta}</Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-gray-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How do I get started?",
              a: "Simply sign up for a free account, create your profile, and start browsing jobs or talent.",
            },
            {
              q: "Is TalentConnect free?",
              a: "Yes! You can use the basic features for free. Upgrade to Pro for advanced tools and support.",
            },
            {
              q: "How do I contact support?",
              a: "Visit our Contact page or email us at support@talentconnect.com for help.",
            },
          ].map((item, idx) => (
            <div key={item.q} className="rounded-xl bg-white/90 dark:bg-neutral-800 shadow-lg p-6">
              <button
                className="flex items-center w-full text-left gap-4 focus:outline-none focus:ring-2 focus:ring-primary group"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <HelpCircle className="h-7 w-7 text-primary flex-shrink-0" />
                <span className="font-bold text-lg md:text-xl text-gray-900 dark:text-white flex-1 group-hover:text-primary transition-colors duration-200">{item.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="h-6 w-6 text-primary" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400" />
                )}
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`overflow-hidden transition-all duration-500 ${openFaq === idx ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}`}
                aria-hidden={openFaq !== idx}
              >
                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">{item.a}</p>
              </div>
          </div>
          ))}
        </div>
      </section>
    </div>
  );
} 