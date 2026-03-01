import CTAStripYellow from "@/components/CTAStripYellow";
import FooterMega from "@/components/FooterMega";
import NavbarPublic from "@/components/NavbarPublic";
import { CheckCircle, DollarSign, FileText, Handshake, Link2, MessageCircle, Star } from "lucide-react";
import Link from "next/link";

export default function CreatorsPage() {
  return (
    <>
      <NavbarPublic />
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <div className="bg-surface rounded-[2.5rem] overflow-hidden shadow-card-hover border border-gray-200 transition-smooth hover:shadow-2xl animate-fade-in-up">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <span className="inline-flex text-xs font-bold bg-accent px-3 py-1 rounded-full w-fit mb-4 text-gray-900 animate-fade-in-down">Osiris for creators &amp; agents</span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] animate-fade-in-down" style={{ animationDelay: "0.1s" }}>Get paid to do what you love</h1>
                <p className="mt-4 text-gray-700 text-lg max-w-md leading-relaxed animate-fade-in-down" style={{ animationDelay: "0.2s" }}>Find the next collaboration that gets you excited. Set your rates, share your media kit, and track approvals—without chasing brands.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/auth?tab=signup&role=creator" className="inline-flex items-center gap-2 bg-black text-white font-semibold text-sm px-6 py-3.5 rounded-full hover-lift hover:bg-gray-800 transition-smooth shadow-md hover:shadow-lg animate-fade-in-down" style={{ animationDelay: "0.3s" }}>Join for Free</Link>
                  <Link href="/brands" className="text-sm text-gray-700 underline hover:text-gray-900 self-center transition-colors">Are you a brand? Book a Demo</Link>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-red-500 text-red-500 transition-smooth hover:scale-125" style={{ animationDelay: `${i * 0.05}s` }} />)}
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wide">&ldquo;Easiest to do business with&rdquo;</span>
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <div className="grid grid-cols-2 gap-3 h-full min-h-[300px]">
                  <div className="bg-pink-400 rounded-3xl row-span-2 relative shadow-md hover-lift transition-smooth animate-fade-in-up overflow-hidden">
                    <video src="/videos/fitness_2.mp4" className="w-full h-full object-cover absolute inset-0" autoPlay muted loop playsInline />
                    <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1.5 shadow-lg text-xs font-bold flex items-center gap-1 animate-fade-in-down z-10" style={{ animationDelay: "0.4s" }}><span className="text-green-500">✓</span> Payment</div>
                  </div>
                  <div className="bg-amber-400 rounded-3xl shadow-md hover-lift transition-smooth animate-fade-in-up overflow-hidden relative" style={{ animationDelay: "0.1s" }}>
                    <video src="/videos/fashion_2.mp4" className="w-full h-full object-cover absolute inset-0" autoPlay muted loop playsInline />
                  </div>
                  <div className="bg-neon-blue rounded-3xl shadow-md hover-lift transition-smooth animate-fade-in-up overflow-hidden relative" style={{ animationDelay: "0.2s" }}>
                    <video src="/videos/tech_2.mp4" className="w-full h-full object-cover absolute inset-0" autoPlay muted loop playsInline />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-surface rounded-2xl aspect-[4/5] relative overflow-hidden">
              <div className="absolute bottom-6 left-6 space-y-2">
                {["Contracted", "Content Approved", "Payment"].map((s, i) => (
                  <div key={i} className="bg-white rounded-lg px-4 py-2 shadow-md flex items-center gap-2 text-sm font-medium">
                    <span className={`w-2 h-2 rounded-full ${i === 2 ? "bg-green-500" : "bg-gray-400"}`}></span>{s}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="inline-flex bg-accent px-3 py-1 rounded-full text-xs font-bold mb-4">Automation</span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">You create. We manage everything else</h2>
              <p className="mt-4 text-gray-500 text-lg">Our team and technology helps manage the campaign every step of the way so you can focus on creating content.</p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex bg-accent px-3 py-1 rounded-full text-xs font-bold mb-4">Payment</span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">Quality content deserves quality pay</h2>
              <p className="mt-4 text-gray-500 text-lg">Set your own prices and get automatic payments in under 45 days.</p>
              <div className="mt-8 bg-surface rounded-2xl p-6">
                <p className="text-lg font-display italic">&ldquo;My highest paid and most credible deals have been through Osiris.&rdquo;</p>
                <p className="text-sm text-gray-500 mt-2">Andrea Rivera — @andreariverafit</p>
              </div>
            </div>
            <div className="bg-surface rounded-2xl p-8">
              <h3 className="font-bold text-lg mb-6">Add your rates</h3>
              <div className="space-y-4">
                {["Photo", "Video", "Story", "YT Ad", "Billboard"].map((type, i) => (
                  <div key={i} className="flex items-center justify-between"><span className="text-sm font-medium">{type}</span><div className="w-32 h-8 bg-gray-200 rounded-lg"></div></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold mb-2">How Osiris Works</h2>
            <p className="text-gray-500 mb-10">Everything you need to run your business as a creator.</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[{ n: "1", t: "Create Your Profile", d: "Create your personal page and list your services for Instagram, TikTok, YouTube, and UGC." },
              { n: "2", t: "Share Your Link", d: "Share your custom link in your bio and social media. Brands can view and purchase your services." },
              { n: "3", t: "Start Earning", d: "Easily manage brand deals and get paid for your work directly through the platform." }
              ].map((s, i) => (
                <div key={i} className={`rounded-3xl p-6 text-white shadow-card hover-lift hover:shadow-lg transition-smooth animate-fade-in-up ${["bg-brand", "bg-gray-800", "bg-gray-900"][i]}`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="text-sm font-bold opacity-70">{s.n}</span>
                  <h3 className="font-bold text-xl mt-2 mb-2">{s.t}</h3>
                  <p className="text-sm opacity-85">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[{ icon: Handshake, t: "Get Brand Deals", d: "Get discovered by thousands of brands on our marketplace looking to work with you." },
              { icon: CheckCircle, t: "Manage Collabs", d: "Easily keep track of brand deals and deadlines. Submit deliverables directly through the platform." },
              { icon: DollarSign, t: "Always Get Paid", d: "Funds are collected upfront and paid out to you when you complete the collaboration." },
              { icon: Link2, t: "Custom Link", d: "Share your custom URL in your link in bio and with brands. Drive traffic to your profile." },
              { icon: MessageCircle, t: "Instant Chat", d: "Receive messages from brands and communicate instantly throughout the collaboration." },
              { icon: FileText, t: "Taxes Made Simple", d: "We handle the filing of your 1099 forms. No more worrying about tax season." }
              ].map((f, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-card hover-lift hover:shadow-card-hover transition-smooth animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  <f.icon className="w-5 h-5 text-brand mb-3 transition-smooth group-hover:scale-125" />
                  <h3 className="font-bold mb-1">{f.t}</h3>
                  <p className="text-sm text-gray-600">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-hero-dark text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-5xl font-bold">&ldquo;Osiris advocates for their creators... from making sure that we get paid fairly to hosting events that bring brands and creators together&rdquo;</h2>
            <p className="mt-6 text-gray-300">Musharraf Abdullah</p>
          </div>
        </section>

        <CTAStripYellow />
      </main>
      <FooterMega />
    </>
  );
}
