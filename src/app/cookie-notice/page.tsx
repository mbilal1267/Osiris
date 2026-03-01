import NavbarPublic from "@/components/NavbarPublic";
import FooterMega from "@/components/FooterMega";

export default function CookieNoticePage() {
    return (
        <>
            <NavbarPublic />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
                <h1 className="font-display text-4xl font-bold mb-8">Cookie Notice</h1>
                <div className="prose prose-gray max-w-none">
                    <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
                    <div className="mt-8 space-y-6 text-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900">1. What are cookies?</h2>
                        <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website.</p>
                        <h2 className="text-2xl font-bold text-gray-900">2. How we use cookies</h2>
                        <p>We use cookies to enhance your browsing experience, provide personalized content, and analyze our traffic.</p>
                        {/* Placeholder content */}
                        <h2 className="text-2xl font-bold text-gray-900">3. Managing cookies</h2>
                        <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.</p>
                    </div>
                </div>
            </main>
            <FooterMega />
        </>
    );
}
