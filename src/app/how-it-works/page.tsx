import NavbarPublic from "@/components/NavbarPublic";
import FooterMega from "@/components/FooterMega";
import { Handshake, CheckCircle, DollarSign, Search, Shield, Zap } from "lucide-react";

export default function HowItWorksPage() {
    return (
        <>
            <NavbarPublic />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
                <div className="text-center mb-16">
                    <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">Simple Workflow</p>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">How Osiris Works</h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">The clear, transparent path to successful brand-creator collaborations.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {[
                        { icon: Search, t: "1. Discover", d: "Brands search our vetted database of top creators using advanced filters to find the perfect match." },
                        { icon: Handshake, t: "2. Connect", d: "Send direct proposals and negotiate terms, rates, and deliverables confidently." },
                        { icon: Shield, t: "3. Contract & Escrow", d: "Agreements are signed and funds are held securely in escrow to protect both parties." },
                        { icon: Zap, t: "4. Create & Approve", d: "Creators submit content for review. Brands can request revisions or approve instantly." },
                        { icon: CheckCircle, t: "5. Publish", d: "Once approved, content goes live on the agreed-upon social media platforms." },
                        { icon: DollarSign, t: "6. Get Paid", d: "Escrow funds are released to the creator immediately upon approval. No more chasing invoices." }
                    ].map((step, i) => (
                        <div key={i} className="bg-surface border border-gray-200 rounded-3xl p-8 hover-lift shadow-sm hover:shadow-card-hover transition-smooth text-center">
                            <step.icon className="w-10 h-10 text-brand mx-auto mb-4" />
                            <h3 className="font-bold text-xl mb-3">{step.t}</h3>
                            <p className="text-gray-600">{step.d}</p>
                        </div>
                    ))}
                </div>
            </main>
            <FooterMega />
        </>
    );
}
