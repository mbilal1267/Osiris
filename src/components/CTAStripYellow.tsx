import Link from "next/link";

export default function CTAStripYellow() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto bg-accent rounded-[2rem] py-16 sm:py-24 px-8 text-center">
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
          Join the marketplace.<br />Find your next match.
        </h2>
        <Link href="/auth" className="inline-block mt-8 bg-white text-black font-semibold text-sm sm:text-base px-8 py-4 rounded-full hover:bg-gray-50 transition-colors shadow-lg">
          Get Started
        </Link>
      </div>
    </section>
  );
}
