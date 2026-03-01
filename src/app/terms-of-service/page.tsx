import NavbarPublic from "@/components/NavbarPublic";
import FooterMega from "@/components/FooterMega";

export default function TermsOfServicePage() {
    return (
        <>
            <NavbarPublic />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
                <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-gray max-w-none">
                    <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
                    <div className="mt-8 space-y-6 text-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900">1. Agreement to Terms</h2>
                        <p>By accessing or using Osiris, you agree to be bound by these Terms of Service.</p>
                        <h2 className="text-2xl font-bold text-gray-900">2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.</p>
                        {/* Placeholder content */}
                        <h2 className="text-2xl font-bold text-gray-900">3. Disclaimer</h2>
                        <p>The materials on Osiris are provided on an &apos;as is&apos; basis. Osiris makes no warranties, expressed or implied.</p>
                    </div>
                </div>
            </main>
            <FooterMega />
        </>
    );
}
