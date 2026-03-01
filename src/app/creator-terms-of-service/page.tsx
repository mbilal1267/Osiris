import NavbarPublic from "@/components/NavbarPublic";
import FooterMega from "@/components/FooterMega";

export default function CreatorTermsOfServicePage() {
    return (
        <>
            <NavbarPublic />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
                <h1 className="font-display text-4xl font-bold mb-8">Creator Terms of Service</h1>
                <div className="prose prose-gray max-w-none">
                    <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
                    <div className="mt-8 space-y-6 text-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900">1. Creator Obligations</h2>
                        <p>As a creator on Osiris, you agree to provide authentic and high-quality content as agreed upon with brands.</p>
                        <h2 className="text-2xl font-bold text-gray-900">2. Payment Terms</h2>
                        <p>Payments will be held in escrow and released upon successful completion and approval of deliverables.</p>
                        {/* Placeholder content */}
                        <h2 className="text-2xl font-bold text-gray-900">3. Content Ownership</h2>
                        <p>Specific content ownership and usage rights will be defined in individual campaign contracts.</p>
                    </div>
                </div>
            </main>
            <FooterMega />
        </>
    );
}
