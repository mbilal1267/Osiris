import NavbarPublic from "@/components/NavbarPublic";
import FooterMega from "@/components/FooterMega";
import CTAStripYellow from "@/components/CTAStripYellow";
import Link from "next/link";
import { ArrowRight, Star, BarChart3, Search, Zap, Target } from "lucide-react";

export default function BrandsPage() {
  return (
    <>
      <NavbarPublic />
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <div className="bg-surface rounded-[2.5rem] overflow-hidden shadow-card-hover border border-gray-200 transition-smooth hover:shadow-2xl animate-fade-in-up">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <span className="inline-flex text-xs font-bold bg-accent px-3 py-1 rounded-full w-fit mb-4 text-gray-900 animate-fade-in-down">Osiris for brands</span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] animate-fade-in-down" style={{animationDelay: "0.1s"}}>Collaborate with top creators</h1>
                <p className="mt-4 text-gray-700 text-lg max-w-md leading-relaxed animate-fade-in-down" style={{animationDelay: "0.2s"}}>Build your creator roster—faster. Shortlist creators with the right audience, launch campaigns, and measure ROI.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/auth?tab=signup&role=brand" className="inline-flex items-center gap-2 bg-black text-white font-semibold text-sm px-6 py-3.5 rounded-full hover-lift hover:bg-gray-800 transition-smooth shadow-md hover:shadow-lg animate-fade-in-down" style={{animationDelay: "0.3s"}}>Book a Demo</Link>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <Link href="/creators" className="text-sm text-gray-700 underline hover:text-gray-900 transition-colors">Are you a creator? Join Osiris</Link>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-red-500 text-red-500 transition-smooth hover:scale-125" style={{animationDelay: `${i * 0.05}s`}} />)}
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wide">&ldquo;Best customer support&rdquo;</span>
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <div className="grid grid-cols-3 grid-rows-2 gap-3 h-full min-h-[300px]">
                  {["bg-neon-blue","bg-pink-400","bg-amber-400","bg-emerald-400","bg-neon-purple","bg-neon-cyan"].map((bg, i) => (
                    <div key={i} className={`${bg} rounded-3xl ${i === 4 ? "col-span-2" : ""} shadow-md hover-lift transition-smooth animate-fade-in-up`} style={{animationDelay: `${i * 0.08}s`}}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">Marketing&apos;s Imperative</p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold">Make Creator Strategy a Marketing Pillar</h2>
              <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">Influencer marketing is no longer a test—it&apos;s a strategic necessity. Social platforms have overtaken TV in audience size—flipping the marketing landscape forever.</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-cyan-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-3xl sm:text-5xl font-bold">Build your dream roster.</h2>
                <p className="mt-4 text-gray-600 text-lg">Surface top-fit creators, match prospects to campaign goals, and automate outreach with Osiris&apos;s Creator Discovery Suite.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold mb-4">AI Creator Search</h3>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {["Brand Awareness", "Age: 25-35", "Audience: Male"].map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="bg-violet-100 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-2xl">🤝</span>
                  <div><p className="font-bold text-2xl">103</p><p className="text-sm text-gray-500">Products ready</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-teal-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">Execute with speed and precision.</h2>
            <p className="text-gray-600 text-lg max-w-2xl">No more spreadsheets or scattered tools. Osiris brings everything under one roof—messaging, shipping, payments, affiliates, and more—so you can stay organized and move fast.</p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-center mb-4">Track complete performance.</h2>
            <p className="text-gray-500 text-lg text-center max-w-2xl mx-auto mb-12">Real-time analytics on every campaign. See engagement, reach, conversions, and ROI across all your creator partnerships.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[{ icon: Search, t: "Discover", d: "Find the perfect creators for your brand with AI-powered search and detailed audience insights." },
                { icon: Zap, t: "Execute", d: "Manage briefs, contracts, approvals, and payments all in one workspace." },
                { icon: BarChart3, t: "Measure", d: "Track real-time ROI with conversion attribution across every creator and campaign." }
              ].map((f, i) => (
                <div key={i} className="bg-surface rounded-3xl p-8 text-center border border-gray-200 shadow-card hover-lift hover:shadow-card-hover transition-smooth animate-fade-in-up" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="w-12 h-12 rounded-xl bg-brand/15 mx-auto flex items-center justify-center mb-4 transition-smooth group-hover:scale-110"><f.icon className="w-6 h-6 text-brand" /></div>
                  <h3 className="font-bold text-xl mb-2">{f.t}</h3>
                  <p className="text-gray-600">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">&ldquo;Osiris brings something unique to the market. We saw the brand <span className="text-brand">grow more than 55%.</span>&rdquo;</h2>
            <p className="mt-6 text-gray-500">Charlene Zapisocki, Brand Manager — Norwell</p>
          </div>
        </section>

        <CTAStripYellow />
      </main>
      <FooterMega />
    </>
  );
}
