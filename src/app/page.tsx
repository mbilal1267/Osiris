"use client";

import NavbarPublic from "@/components/NavbarPublic";
import FooterMega from "@/components/FooterMega";
import CTAStripYellow from "@/components/CTAStripYellow";
import Link from "next/link";
import { ArrowRight, Star, Users, BarChart3, Zap, Shield, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Mock data for creators with their categories
  const creators = [
    // Fitness
    { category: "Fitness", url: "/videos/fitness_1.mp4" },
    { category: "Fitness", url: "/videos/fitness_2.mp4" },
    { category: "Fitness", url: "/videos/fitness_3.mp4" },
    { category: "Fitness", url: "/videos/fitness_4.mp4" },
    // { category: "Fitness", url: "/videos/fitness_5.mp4" },
    // { category: "Fitness", url: "/videos/fitness_6.mp4" },
    // { category: "Fitness", url: "/videos/fitness_7.mp4" },
    // { category: "Fitness", url: "/videos/fitness_8.mp4" },
    // { category: "Fitness", url: "/videos/fitness_9.mp4" },
    // { category: "Fitness", url: "/videos/fitness_10.mp4" },
    // { category: "Fitness", url: "/videos/fitness_11.mp4" },
    // Fashion
    { category: "Fashion", url: "/videos/fashion_1.mp4" },
    { category: "Fashion", url: "/videos/fashion_2.mp4" },
    { category: "Fashion", url: "/videos/fashion_3.mp4" },
    { category: "Fashion", url: "/videos/fashion_4.mp4" },
    //{ category: "Fashion", url: "/videos/fashion_5.mp4" },
    //{ category: "Fashion", url: "/videos/fashion_6.mp4" },
    // Tech
    { category: "Tech", url: "/videos/tech_1.mp4" },
    { category: "Tech", url: "/videos/tech_2.mp4" },
    { category: "Tech", url: "/videos/tech_3.mp4" },
    { category: "Tech", url: "/videos/tech_4.mp4" },
    // { category: "Tech", url: "/videos/tech_5.mp4" },
    // { category: "Tech", url: "/videos/tech_6.mp4" },
    // Food
    { category: "Food", url: "/videos/food_1.mp4" },
    { category: "Food", url: "/videos/food_2.mp4" },
    { category: "Food", url: "/videos/food_3.mp4" },
    { category: "Food", url: "/videos/food_4.mp4" },
    //{ category: "Food", url: "/videos/food_5.mp4" },
    //{ category: "Food", url: "/videos/food_6.mp4" },
    // Travel
    { category: "Travel", url: "/videos/travel_1.mp4" },
    { category: "Travel", url: "/videos/travel_2.mp4" },
    { category: "Travel", url: "/videos/travel_3.mp4" },
    { category: "Travel", url: "/videos/travel_4.mp4" },
    // { category: "Travel", url: "/videos/travel_5.mp4" },
    // { category: "Travel", url: "/videos/travel_6.mp4" },
    // Gaming
    { category: "Gaming", url: "/videos/gaming_1.mp4" },
    { category: "Gaming", url: "/videos/gaming_2.mp4" },
    { category: "Gaming", url: "/videos/gaming_3.mp4" },
    { category: "Gaming", url: "/videos/gaming_4.mp4" },
    // { category: "Gaming", url: "/videos/gaming_5.mp4" },
    // { category: "Gaming", url: "/videos/gaming_6.mp4" },
    // Beauty
    { category: "Beauty", url: "/videos/beauty_1.mp4" },
    { category: "Beauty", url: "/videos/beauty_2.mp4" },
    { category: "Beauty", url: "/videos/beauty_3.mp4" },
    { category: "Beauty", url: "/videos/beauty_4.mp4" },
    // { category: "Beauty", url: "/videos/beauty_5.mp4" },
    // { category: "Beauty", url: "/videos/beauty_6.mp4" },
    // { category: "Beauty", url: "/videos/beauty_7.mp4" },
    { category: "Finance", url: "/videos/finance_1.mp4" },
    { category: "Finance", url: "/videos/finance_2.mp4" },
    { category: "Finance", url: "/videos/finance_3.mp4" },
    { category: "Finance", url: "/videos/finance_4.mp4" },
    // { category: "Finance", url: "/videos/finance_5.mp4" },
    // { category: "Finance", url: "/videos/finance_6.mp4" },
    // { category: "Finance", url: "/videos/finance_7.mp4" },
  ];

  const filteredCreators =
    selectedCategory === "All Categories"
      ? Array.from(
        new Map(
          creators.map((c) => [c.category, c]) // keeps first occurrence per category
        ).values()
      )
      : creators.filter((c) => c.category === selectedCategory);


  return (
    <>
      <NavbarPublic />
      <main>
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <div className="bg-gradient-hero rounded-[2.5rem] overflow-hidden shadow-card-hover transition-smooth hover:shadow-2xl animate-fade-in-up">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] animate-fade-in-down">
                  Discover brand champions.
                </h1>
                <p className="mt-4 text-white/85 text-base sm:text-lg max-w-md leading-relaxed animate-fade-in-down" style={{ animationDelay: "0.1s" }}>
                  Search creators, run campaigns, approve content, and track performance—one workspace for social commerce.
                </p>
                <div className="mt-8">
                  <Link href="/auth" className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-6 py-3.5 rounded-full hover-lift hover:shadow-xl transition-smooth">
                    Get Started <ArrowRight className="w-4 h-4 transition-smooth group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-3 grid-rows-2 gap-3 h-full min-h-[300px]">
                  {[
                    // Hero Collage Reels - Mix from various categories
                    { url: "/videos/fitness_1.mp4", aspect: "col-span-2 row-span-2" }, // Fitness
                    { url: "/videos/fashion_1.mp4", aspect: "col-span-1 row-span-1" }, // Fashion
                    { url: "/videos/tech_3.mp4", aspect: "col-span-1 row-span-1" }, // Tech
                    // { url: "/videos/food_1.mp4", aspect: "col-span-1 row-span-1" }, // Food
                    // { url: "/videos/travel_1.mp4", aspect: "col-span-1 row-span-1" }, // Travel
                  ].map((tile, i) => (
                    <div
                      key={i}
                      className={`${tile.aspect} rounded-3xl overflow-hidden shadow-md hover-lift transition-smooth animate-fade-in-up bg-gray-900 relative group`}
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <video
                        src={tile.url}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      {/* Interaction overlay to prevent iframe stealing clicks but allow scrolling if needed, or just let users click play */}
                      {/* For now keeping plain iframe */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm font-medium">
            <span>Trusted by 2,500+ brands</span>
            <span>•</span>
            <span>15,000+ verified creators</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              <span className="ml-1 text-gray-600 font-semibold">4.9/5</span>
            </div>
          </div>
        </section> */}

        {/* Feature sections */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">data driven influencing</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold">Why Osiris ?</h2>
            {/* <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">Identify your next brand champion with Osiris&apos;s Creator Discovery Suite. Surface top-fit creators, match prospects to campaign goals, and automate outreach.</p> */}
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">Find, evaluate, and connect with the best creators using Osiris&apos;s intelligent discovery platform—built to align with your campaign needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "No Upfront Cost", desc: "Search creators for free. No subscriptions, contracts, or hidden fees." },
              { icon: Shield, title: "Vetted Creators", desc: "Every creator is vetted by us. Always receive high-quality, professional content." },
              { icon: MessageCircle, title: "Instant Chat", desc: "Instantly chat with creators and stay in touch throughout the whole collaboration." },
              { icon: Users, title: "Secure Payments", desc: "Your money is held safely until you approve the creator's work." },
              { icon: Users, title: "influencer fit", desc: "find influencers that actually bring conversions" },
              { icon: BarChart3, title: "reports and analytics", desc: "Complete data driven insights for your creator management" },
            ].map((f, i) => (
              <div key={i} className="border border-gray-200 rounded-3xl p-6 bg-white hover-lift hover:shadow-card-hover hover:border-brand/30 transition-smooth animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-10 h-10 rounded-xl bg-brand/15 flex items-center justify-center mb-4 transition-smooth group-hover:scale-110">
                  <f.icon className="w-5 h-5 text-brand transition-smooth" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-surface py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-center mb-16">Execute with speed and precision.</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Search & Discover", desc: "Browse thousands of vetted creators filtered by niche, platform, audience, and engagement rate." },
                { step: "2", title: "Collaborate & Create", desc: "Send briefs, negotiate terms, approve content—all within one organized workspace." },
                { step: "3", title: "Track & Pay", desc: "Monitor campaign performance in real time and release payments when deliverables are approved." },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 shadow-card hover-lift hover:shadow-card-hover transition-smooth animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold text-lg mb-4 transition-smooth hover:scale-110">{s.step}</div>
                  <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              &ldquo;Osiris brings something unique to the market. We saw the brand <span className="text-brand">grow more than 55%.</span>&rdquo;
            </h2>
            <p className="mt-6 text-gray-500">Musharraf Abdullah</p>
          </div>
        </section>

        {/* Creators strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-10">Creators for every industry</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["All Categories", "Fashion", "Beauty", "Tech", "Food", "Fitness", "Travel", "Finance", "Gaming"].map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                  ? "bg-accent text-black font-semibold shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCreators.length > 0 ? (
              filteredCreators.map((creator, i) => (
                <div
                  key={i}
                  className="aspect-[9/16] rounded-[2rem] overflow-hidden shadow-md hover-lift hover:shadow-lg transition-smooth animate-fade-in-up bg-gray-100 relative group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <video
                    src={creator.url}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-xs font-bold bg-white/95 backdrop-blur px-3 py-1 rounded-full text-gray-900 shadow-sm">
                      {creator.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No creators found in this category.
              </div>
            )}
          </div>
        </section>

        {/* IRL Section */}
        <section className="bg-gradient-hero-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-3xl aspect-video col-span-2 flex items-center justify-center text-gray-500 shadow-card overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="photos/Event_Photo.jpg" alt="Event photo" className="w-full h-full object-cover" />
                </div>
                <div className="bg-gray-700 rounded-full aspect-square flex items-center justify-center text-gray-500 shadow-card overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="photos/creator.jpg" alt="Creator" className="w-full h-full object-cover" />
                </div>
                <div className="bg-gray-700 rounded-3xl aspect-square flex items-center justify-center text-gray-500 shadow-card overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="photos/Event.jpg" alt="Event" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">We bring marketers and creators together IRL, too.</h2>
                <p className="mt-4 text-gray-300 text-lg">Join us and spend an evening with the most-loved content creators in your city.</p>
                <div className="flex gap-2 mt-6 flex-wrap">
                  {["Mumbai", "Delhi", "Hyderabad", "Bangalore", "Ahmedabad"].map((city) => (
                    <span key={city} className="bg-accent text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">{city}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTAStripYellow />
      </main>
      <FooterMega />
    </>
  );
}
