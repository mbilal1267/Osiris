import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-brand hover:text-brand-dark transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Privacy Policy & Legal</h1>
          <p className="text-lg text-gray-600">Last Updated: February 16, 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none text-gray-700">
          {/* Navigation */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12 border border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <a href="#introduction" className="text-brand hover:text-brand-dark transition-colors">1. Introduction</a>
              <a href="#who-applies" className="text-brand hover:text-brand-dark transition-colors">2. Who This Policy Applies To</a>
              <a href="#data-collected" className="text-brand hover:text-brand-dark transition-colors">3. Data We Collect</a>
              <a href="#how-we-use" className="text-brand hover:text-brand-dark transition-colors">4. How We Use Your Data</a>
              <a href="#intellectual-property" className="text-brand hover:text-brand-dark transition-colors">5. Intellectual Property & Content Rights</a>
              <a href="#data-sharing" className="text-brand hover:text-brand-dark transition-colors">6. Data Sharing</a>
              <a href="#data-security" className="text-brand hover:text-brand-dark transition-colors">7. Data Security</a>
              <a href="#data-retention" className="text-brand hover:text-brand-dark transition-colors">8. Data Retention</a>
              <a href="#your-rights" className="text-brand hover:text-brand-dark transition-colors">9. Your Rights Under DPDP Act 2023</a>
              <a href="#consent" className="text-brand hover:text-brand-dark transition-colors">10. Consent Manager</a>
              <a href="#cookies" className="text-brand hover:text-brand-dark transition-colors">11. Cookies & Tracking</a>
              <a href="#children" className="text-brand hover:text-brand-dark transition-colors">12. Children's Privacy</a>
              <a href="#updates" className="text-brand hover:text-brand-dark transition-colors">13. Policy Updates</a>
              <a href="#contact" className="text-brand hover:text-brand-dark transition-colors">14. Contact Information</a>
            </div>
          </div>

          {/* Section 1 */}
          <div id="introduction" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">1. Introduction</h2>
            <p className="mb-4">Welcome to <span className="font-semibold">Osirus</span> ("Platform", "we", "us", or "our").</p>
            <p className="mb-4"><span className="font-semibold">Osirus</span> is a social commerce and influencer collaboration platform that connects Brands and Creators to execute paid marketing campaigns, UGC services, and affiliate collaborations.</p>
            <p className="mb-4">We are committed to protecting your personal and business information in compliance with:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>The Digital Personal Data Protection Act, 2023 (India)</li>
              <li>Applicable GST and Income Tax laws</li>
              <li>RBI guidelines for payment processing and escrow accounts</li>
            </ul>
            <p>This Privacy Policy explains how we collect, use, process, and safeguard your data.</p>
          </div>

          {/* Section 2 */}
          <div id="who-applies" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">2. Who This Policy Applies To</h2>
            <p className="mb-4">This policy applies to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Brands / Businesses</li>
              <li>Creators / Influencers</li>
              <li>Website Visitors</li>
              <li>Users installing Osirus tracking tools (Pixel / Integrations)</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div id="data-collected" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">3. Data We Collect</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">A. Data Collected from Brands</h3>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-2">1. Business Identity Data</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Company Name</li>
                  <li>GSTIN</li>
                  <li>Registered Address</li>
                  <li>Authorized Representative Name</li>
                  <li>Contact Email & Phone</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-2">2. Logistics Data</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Warehouse / Pickup Address</li>
                  <li>Contact Person for Dispatch</li>
                  <li>Shipping Instructions</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">(Used for automated reverse pickup labels and logistics coordination.)</p>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-2">3. Payment Data</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Payment method (Credit Card / Net Banking / UPI / Wallet)</li>
                  <li>Billing Information</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2"><span className="font-semibold">Important:</span> Osirus does not store raw card details. Payments are processed via secure gateways such as Razorpay or Stripe.</p>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-2">4. Performance & Tracking Data</h4>
                <p className="text-gray-700 mb-2">If you install our:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                  <li>Tracking Pixel</li>
                  <li>Shopify / WooCommerce Integration</li>
                  <li>Custom API Integration</li>
                </ul>
                <p className="text-gray-700 mb-2">We collect:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Conversion Value</li>
                  <li>Order ID</li>
                  <li>Revenue attributed to influencer links</li>
                  <li>Click-through data</li>
                  <li>Campaign performance metrics</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">This data is anonymized and used for ROI analytics.</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">B. Data Collected from Creators</h3>
              
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">1. Identity Data</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Full Name</li>
                  <li>Date of Birth (Age Verification 18+)</li>
                  <li>PAN (for TDS compliance)</li>
                  <li>Government ID (if legally required)</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">2. Social Media Data</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Instagram / YouTube Handle</li>
                  <li>Follower Count</li>
                  <li>Engagement Rate</li>
                  <li>Public Audience Demographics</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">We may use third-party APIs to audit public engagement authenticity.</p>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">3. Logistics Data</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Delivery Address</li>
                  <li>Phone Number</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">Used strictly for product shipment coordination.</p>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">4. Financial Data</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Bank Account Details</li>
                  <li>UPI ID</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">Used solely to transfer earnings and deduct TDS as required by Indian tax law.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div id="how-we-use" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">4. How We Use Your Data</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-2">A. Escrow & Payment Processing</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Brand campaign funds are held in a designated Nodal/Escrow account</li>
                  <li>Funds are released to the Creator only after successful submission and review</li>
                  <li>We deduct applicable taxes (GST/TDS) where required by law</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-2">B. Campaign Matching & Recommendation Engine</h4>
                <p className="text-gray-700 mb-2">We use platform data to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Match Brands with relevant Creators</li>
                  <li>Rank influencers based on niche fit</li>
                  <li>Improve campaign performance predictions</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">All analytics for recommendation modeling is aggregated and anonymized.</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-2">C. Logistics Coordination</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>We generate automated shipping labels</li>
                  <li>Creator addresses are shared only with logistics partners (e.g., Shiprocket, Delhivery)</li>
                  <li>Brands do not directly access full Creator address unless operationally necessary</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-2">D. ROI & Performance Analytics</h4>
                <p className="text-gray-700">For Brands:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Influencer sales attribution</li>
                  <li>Traffic & conversion tracking</li>
                  <li>Campaign performance dashboards</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div id="intellectual-property" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">5. Intellectual Property & Content Rights</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-gray-900 mb-2">A. Standard Influencer Campaigns</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Creators retain ownership of posted social content</li>
                  <li>Brands receive limited usage rights as specified in the campaign agreement (e.g., 30-day whitelisting)</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-gray-900 mb-2">B. UGC / Raw File Services</h4>
                <p className="text-gray-700 mb-2">If a Creator is hired for:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                  <li>UGC content</li>
                  <li>Raw video file delivery</li>
                  <li>Ad creatives</li>
                </ul>
                <p className="text-gray-700 mb-2">Upon successful payment:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Full copyright transfers to the Brand</li>
                  <li>The Creator waives moral rights for commercial use</li>
                  <li>The Brand may use content for paid advertising and digital campaigns</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">Osirus facilitates this legal transfer.</p>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div id="data-sharing" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">6. Data Sharing</h2>
            <p className="font-semibold text-gray-900 mb-4">We do not sell your data.</p>
            
            <p className="text-gray-700 mb-4">We may share data with:</p>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-semibold text-gray-900 mb-2">A. Service Providers</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Payment Gateways (Razorpay / Stripe)</li>
                  <li>Logistics Companies (Shiprocket / Delhivery)</li>
                  <li>Cloud Hosting Providers</li>
                  <li>Analytics Service Providers</li>
                </ul>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-semibold text-gray-900 mb-2">B. Between Brands & Creators</h4>
                <p className="text-gray-700 mb-2">Before collaboration:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                  <li>Only public stats are visible</li>
                </ul>
                <p className="text-gray-700 mb-2">After confirmation:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Necessary details shared for order execution</li>
                </ul>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-semibold text-gray-900 mb-2">C. Legal Authorities</h4>
                <p className="text-gray-700 mb-2">If required under:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>DPDP Act 2023</li>
                  <li>GST Laws</li>
                  <li>Income Tax Regulations</li>
                  <li>Court Orders</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div id="data-security" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">7. Data Security</h2>
            <p className="mb-4">We implement:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Encrypted payment processing</li>
              <li>Secure cloud infrastructure</li>
              <li>Role-based access control</li>
              <li>Secure API authentication</li>
              <li>Limited internal access protocols</li>
            </ul>
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <p className="text-gray-700"><span className="font-semibold">Important:</span> Despite safeguards, no online system is 100% secure.</p>
            </div>
          </div>

          {/* Section 8 */}
          <div id="data-retention" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">8. Data Retention</h2>
            <p className="mb-4">We retain data:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>For active accounts</li>
              <li>For 7 years for GST and tax compliance</li>
              <li>For dispute resolution</li>
              <li>For fraud prevention</li>
            </ul>
            <p>After retention periods, data is securely deleted or anonymized.</p>
          </div>

          {/* Section 9 */}
          <div id="your-rights" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">9. Your Rights Under DPDP Act, 2023</h2>
            <p className="mb-4">As a Data Principal under Indian Law, you have the right to:</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                <h4 className="font-semibold text-gray-900 mb-2">1. Right to Access</h4>
                <p className="text-gray-700">Request a summary of data we hold about you.</p>
              </div>

              <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                <h4 className="font-semibold text-gray-900 mb-2">2. Right to Correction</h4>
                <p className="text-gray-700">Update your address, bank details, or profile data.</p>
              </div>

              <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                <h4 className="font-semibold text-gray-900 mb-2">3. Right to Erasure</h4>
                <p className="text-gray-700 mb-2">Request deletion of your account.</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Note:</span> We may retain mandatory financial records for 7 years.</p>
              </div>

              <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                <h4 className="font-semibold text-gray-900 mb-2">4. Right to Grievance Redressal</h4>
                <p className="text-gray-700 mb-2">Contact our Data Protection Officer (DPO):</p>
                <p className="text-gray-700"><span className="font-semibold">Email:</span> <a href="mailto:mehethescienceman@gmail.com" className="text-brand hover:text-brand-dark">mehethescienceman@gmail.com</a></p>
              </div>

              <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                <h4 className="font-semibold text-gray-900 mb-2">5. Right to Withdraw Consent</h4>
                <p className="text-gray-700 mb-2">You may withdraw consent by deleting your account.</p>
                <p className="text-sm text-gray-600">Active orders must be completed before withdrawal is processed.</p>
              </div>
            </div>
          </div>

          {/* Section 10 */}
          <div id="consent" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">10. Consent Manager</h2>
            <p className="mb-4">By using Osirus, you provide consent for data processing as outlined in this policy.</p>
            <p className="mb-4">Consent may be withdrawn at any time through:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Account Deletion</li>
              <li>Written request to DPO</li>
            </ul>
          </div>

          {/* Section 11 */}
          <div id="cookies" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">11. Cookies & Tracking</h2>
            <p className="mb-4">We use cookies for:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Login authentication</li>
              <li>Performance analytics</li>
              <li>Fraud detection</li>
              <li>Campaign tracking</li>
            </ul>
            <p>You may disable cookies in your browser settings.</p>
          </div>

          {/* Section 12 */}
          <div id="children" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">12. Children's Privacy</h2>
            <p className="mb-4"><span className="font-semibold">Osirus is strictly for users aged 18+.</span></p>
            <p>We do not knowingly collect data from minors.</p>
          </div>

          {/* Section 13 */}
          <div id="updates" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">13. Policy Updates</h2>
            <p>We may update this Privacy Policy periodically.</p>
            <p>Continued use of the Platform after updates constitutes acceptance.</p>
          </div>

          {/* Section 14 */}
          <div id="contact" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand">14. Contact Information</h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-700 mb-2"><span className="font-semibold">For any privacy-related concerns:</span></p>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Data Protection Officer</span></p>
                <p><span className="font-semibold">Osirus</span></p>
                <p><span className="font-semibold">Email:</span> <a href="mailto:mohammadbilal55500@gmail.com" className="text-brand hover:text-brand-dark">mohammadbilal55500@gmail.com</a></p>
                <p><span className="font-semibold">Address:</span> Aligarh Muslim University</p>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-brand/10 to-accent/10 rounded-lg border border-brand/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions or Concerns?</h3>
            <p className="text-gray-700 mb-4">Our Data Protection Officer is available to address any privacy-related questions or requests.</p>
            <a href="mailto:mohammadbilal55500@gmail.com" className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-dark transition-all">
              Contact DPO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
