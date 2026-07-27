import { Link } from "react-router-dom"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "Definitions",
    content: `"Service" means the viTroom application, website, AI tools, virtual try-on features, subscriptions, credits, and related services.\n\n"User," "you," or "your" means any person or entity using viTroom.\n\n"User Content" means any image, style preference, or other material you upload or submit to viTroom.\n\n"Generated Content" means any AI-generated try-on image, variation, preview, or output created using viTroom.\n\n"Credits" means digital units used to access certain paid AI generation features, if applicable.`,
  },
  {
    title: "Description of Service",
    content: `viTroom is an AI-powered virtual try-on application. Users can upload a photo of themselves and a clothing item, and viTroom uses artificial intelligence, including third-party AI models such as Google Gemini, to generate a photorealistic image of the user wearing that clothing item.\n\nviTroom is designed for fashion visualization, online shopping assistance, and creative styling. The Service does not provide professional tailoring, sizing, styling, or fashion advice.`,
  },
  {
    title: "Eligibility",
    content: `You must be at least 16 years old to use viTroom. By using the Service, you confirm that you are legally capable of entering into these Terms.\n\nIf you use viTroom on behalf of a company, business, or organization, you represent that you have authority to bind that entity to these Terms.`,
  },
  {
    title: "Account Registration",
    content: `To access certain features, you may need to create an account or sign in using a third-party login method such as Google.\n\nYou agree to provide accurate, complete, and updated information. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.\n\nYou must notify us immediately if you suspect unauthorized access to your account.`,
  },
  {
    title: "User Content",
    content: `You are responsible for all images and other content you upload or submit to viTroom.\n\nBy uploading User Content, you confirm that:\n\n• You own the content or have the necessary rights and permissions to use it.\n• The content does not violate any law or third-party rights.\n• The content does not include illegal, harmful, abusive, or prohibited material.\n• You have obtained consent from any person whose image appears in the uploaded content, where required.\n• You understand that uploaded person photos may reveal your physical appearance and personal identity.`,
  },
  {
    title: "License to Use User Content",
    content: `You retain ownership of your User Content.\n\nBy submitting User Content to viTroom, you grant us a limited, non-exclusive, worldwide, royalty-free license to host, store, process, reproduce, modify, transmit, display, and use your User Content solely as necessary to:\n\n• Provide the Service.\n• Generate AI-based virtual try-on images.\n• Store your generated results in your account.\n• Improve, maintain, troubleshoot, and secure the Service.\n• Comply with legal obligations.\n\nWe will not use your private uploaded photos in public marketing or promotional materials without your permission.`,
  },
  {
    title: "Generated Content",
    content: `Subject to your compliance with these Terms, you may use the Generated Content created through viTroom for personal or commercial purposes, unless restricted by applicable law, third-party rights, or subscription plan terms.\n\nYou understand and agree that:\n\n• AI-generated outputs may not be perfectly accurate.\n• Similar or identical outputs may be generated for other users.\n• Generated Content may contain errors, distortions, or inaccurate fit representations.\n• You are responsible for reviewing Generated Content before making any purchase decisions.\n• Generated Content should not be relied upon as a guarantee of exact fit, color accuracy, or fabric appearance.`,
  },
  {
    title: "Prohibited Content",
    content: `You agree not to upload, generate, request, or share content that:\n\n• Is illegal, fraudulent, misleading, or harmful.\n• Violates intellectual property, privacy, or other rights of any person or entity.\n• Contains personal documents, IDs, bank details, passwords, or other highly sensitive information.\n• Includes images of children without appropriate legal consent.\n• Promotes hate, harassment, discrimination, abuse, or violence.\n• Contains sexually explicit, exploitative, or non-consensual content.\n• Attempts to create unsafe, deceptive, or harmful outputs.\n• Misuses viTroom to infringe someone else's designs, brand, or copyrighted work.`,
  },
  {
    title: "Prohibited Activities",
    content: `You agree not to:\n\n• Use bots, scraping tools, or automated scripts to access the Service.\n• Reverse engineer, decompile, or attempt to discover the source code or model logic.\n• Interfere with or disrupt the Service, servers, or security systems.\n• Use viTroom for unlawful, abusive, fraudulent, or harmful activities.\n• Resell or commercially exploit the Service without written permission.\n• Create multiple accounts to abuse free credits, trials, or promotional offers.\n• Upload viruses, malware, or harmful code.\n\nViolation of this section may result in suspension, termination, loss of credits, and legal action.`,
  },
  {
    title: "Subscriptions, Credits, and Payments",
    content: `viTroom may offer free features, paid subscriptions, one-time purchases, credits, or premium plans.\n\nBy purchasing a subscription, plan, or credits, you agree to pay all applicable fees, taxes, and charges. Pricing and features may vary by country, platform, plan, or promotional offer.\n\nCredits, if offered, may be consumed when you generate try-on images or use certain AI features.\n\nWe may change pricing, plans, features, or credit usage rules at any time. Any material changes will be communicated where required.`,
  },
  {
    title: "Auto-Renewal and Cancellation",
    content: `If you purchase a recurring subscription, it may automatically renew unless cancelled before the next billing date.\n\nIf your purchase was made through Apple App Store or Google Play Store, cancellation must be managed through your Apple or Google account settings.\n\nIf your purchase was made directly through viTroom, you may cancel through your account settings or by contacting support@kalkinso.in.\n\nCancellation stops future billing but does not automatically provide a refund for previous payments.`,
  },
  {
    title: "Refund Policy",
    content: `Refunds are governed by our Refund and Cancellation Policy. In general, refund requests may be considered only within three days of the first subscription purchase and only where one credit usage will be considered.\n\nPurchases made through Google Play Store may be subject to their respective refund rules and processes.`,
  },
  {
    title: "Third-Party Services",
    content: `viTroom may use third-party services, including but not limited to:\n\n• Google Gemini or other AI model providers.\n• Cloud hosting and storage providers.\n• Payment processors.\n• App stores.\n• Analytics and crash reporting providers.\n• Authentication providers such as Google.\n\nYour use of third-party services may be subject to their own terms and privacy policies. viTroom is not responsible for third-party service failures, policy changes, or data practices.`,
  },
  {
    title: "Intellectual Property",
    content: `viTroom, including its name, logo, design, interface, software, features, graphics, text, branding, and underlying technology, is owned by viTroom or its licensors and is protected by intellectual property laws.\n\nYou may not copy, modify, distribute, sell, lease, reverse engineer, or create derivative works from any part of viTroom without our written permission.`,
  },
  {
    title: "Feedback",
    content: `If you provide suggestions, ideas, feature requests, or feedback, you grant viTroom the right to use that feedback without restriction or compensation to you.`,
  },
  {
    title: "Service Availability",
    content: `We aim to provide a reliable Service, but we do not guarantee that viTroom will always be available, uninterrupted, secure, or error-free.\n\nAI generation may fail, take longer than expected, or produce inaccurate results due to model limitations, server issues, maintenance, or high demand.`,
  },
  {
    title: "Disclaimer of Warranties",
    content: `VITROOM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, AVAILABILITY, AND RELIABILITY.\n\nWE DO NOT GUARANTEE THAT GENERATED CONTENT WILL ACCURATELY REPRESENT HOW A CLOTHING ITEM WILL FIT, LOOK, OR FEEL IN REAL LIFE.`,
  },
  {
    title: "Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, VITROOM, ITS OWNERS, EMPLOYEES, CONTRACTORS, PARTNERS, AND AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, BUSINESS, OR GOODWILL ARISING FROM YOUR USE OF THE SERVICE.\n\nVITROOM IS NOT RESPONSIBLE FOR PURCHASE DECISIONS, RETURNS, SIZING ISSUES, OR ANY ACTION TAKEN BASED ON AI-GENERATED TRY-ON OUTPUTS.`,
  },
  {
    title: "Indemnification",
    content: `You agree to indemnify and hold harmless viTroom, its owners, employees, contractors, affiliates, and service providers from any claims, damages, losses, liabilities, costs, or expenses arising from:\n\n• Your use of the Service.\n• Your User Content.\n• Your Generated Content.\n• Your violation of these Terms.\n• Your violation of any law or third-party rights.`,
  },
  {
    title: "Termination",
    content: `We may suspend or terminate your account or access to viTroom at any time if we believe you violated these Terms, misused the Service, created legal risk, engaged in fraud, or harmed viTroom, other users, or third parties.\n\nUpon termination, your right to use the Service will stop immediately. Certain sections of these Terms will continue to apply after termination.`,
  },
  {
    title: "Changes to These Terms",
    content: `We may update these Terms from time to time. If we make material changes, we may notify you through the app, website, or email. Your continued use of viTroom after the updated Terms become effective means you accept the revised Terms.`,
  },
  {
    title: "Governing Law",
    content: `These Terms will be governed by the laws of India. Any disputes will be subject to the courts located in Pratapgarh, Uttar Pradesh, India, unless applicable law requires a different forum.`,
  },
  {
    title: "Contact Us",
    content: `For questions about these Terms, contact us at:\n\nviTroom Support\nEmail: support@kalkinso.in\nCompany: Kalkinso Software (OPC) Private Limited\nAddress: 506 SHUKL PURE NANHA, SHUKL AINDHA, Aindha, Pratapgarh, Kunda, Uttar Pradesh, India, 230204`,
  },
]

export function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Badge className="mb-4 bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400">
          Legal
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Terms and Conditions</h1>
        <p className="mt-3 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Welcome to viTroom. These Terms and Conditions ("Terms") govern your access to and use of the viTroom mobile application, website, AI virtual try-on features, subscriptions, credits, and related services. viTroom is operated by Kalkinso Software (OPC) Private Limited. By downloading, accessing, or using viTroom, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white text-xs font-bold">{i + 1}</span>
                {s.title}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed whitespace-pre-line">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-fuchsia-500/5 p-6">
          <p className="text-sm text-muted-foreground">
            Questions about these terms? Contact us at{" "}
            <a href="mailto:support@kalkinso.in" className="text-orange-500 hover:underline">support@kalkinso.in</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
          <Logo />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
