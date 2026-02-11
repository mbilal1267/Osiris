import Link from "next/link";

export default function CTAStripYellow() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto bg-accent rounded-[2.5rem] py-16 sm:py-24 px-8 text-center shadow-card-hover transition-smooth hover:shadow-2xl hover:scale-[1.02] animate-fade-in-up">
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-down">
          Join the marketplace.<br />Find your next match.
        </h2>
        <Link href="/auth" className="inline-block mt-8 bg-gray-900 text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full hover-lift hover:bg-gray-800 transition-smooth shadow-lg hover:shadow-2xl animate-fade-in-up" style={{animationDelay: "0.2s"}}>
          Get Started
        </Link>
      </div>
    </section>
  );
}
