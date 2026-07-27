import { Link } from "react-router-dom"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "Introduction",
    content: `Welcome to viTroom. This Privacy Policy explains how Kalkinso Software (OPC) Private Limited, operating as viTroom ("viTroom," "we," "us," or "our"), collects, uses, stores, shares, and protects your information when you use our mobile application, website, and related services.\n\nviTroom is an AI-powered virtual try-on application. Users can upload a photo of themselves and a clothing item, and viTroom uses artificial intelligence, including third-party AI models such as Google Gemini, to generate a photorealistic image of the user wearing that clothing item.\n\nBy using viTroom, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with this policy, please do not use viTroom.`,
  },
  {
    title: "Information We Collect",
    content: `We may collect the following information when you use viTroom:\n\nAccount Information: When you create an account or sign in using Google, Apple, email, or another login method, we may collect your name, email address, profile image, login identifier, and account-related details.\n\nUploaded Person Images: When you upload a photo of yourself, we collect and process that image to generate virtual try-on outputs. Uploaded images may include your face, body, clothing, and physical appearance.\n\nUploaded Clothing Images: When you upload a clothing item photo, we collect and process that image to render it on your person photo.\n\nStyle Preferences: We collect the body type, fit preference, occasion, and other options you select to generate your try-on result.\n\nGenerated Images and Outputs: We may collect and store the AI-generated try-on images created through viTroom.\n\nPayment and Subscription Information: If you purchase a subscription or credits, payment may be processed by third-party payment providers. We may receive limited transaction details such as order ID, purchase status, and payment confirmation. We do not store full card details.\n\nSupport Communications: If you contact us for help or feedback, we may collect your name, email address, message content, and other information you choose to provide.`,
  },
  {
    title: "Information We Collect Automatically",
    content: `When you use viTroom, we may automatically collect:\n\nUsage Data: Information about how you interact with the app, including features used, try-ons generated, session duration, credits used, and app activity.\n\nDevice Information: Device type, operating system, app version, browser type, device identifiers, language settings, crash logs, and diagnostic information.\n\nLog Data: IP address, access time, server logs, error reports, and security-related logs.\n\nAnalytics Data: We may use analytics tools to understand app performance, user behavior, and technical issues.\n\nCookies and Similar Technologies: If you use our website, we may use cookies and similar technologies to maintain sessions, improve security, and analyze traffic.`,
  },
  {
    title: "Camera, Gallery, and Storage Permissions",
    content: `viTroom may request access to your camera, photo gallery, or device storage so that you can upload your photo and clothing images. We only access images you select or upload. We do not access your entire photo gallery without your permission. You can manage these permissions through your device settings.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use your information to:\n\n1. Provide, operate, and improve viTroom.\n2. Process uploaded person and clothing images to generate AI-based virtual try-on outputs.\n3. Send your uploaded images and preferences to AI service providers, including Google Gemini, where required to generate results.\n4. Create, store, and display generated try-on images in your account.\n5. Manage accounts, subscriptions, credits, payments, and purchase history.\n6. Provide customer support and respond to queries.\n7. Fix bugs, improve app performance, and develop new features.\n8. Detect, prevent, and investigate fraud, abuse, and security incidents.\n9. Send service-related notifications, updates, and support messages.\n10. Send promotional communications where permitted by law. You may opt out at any time.\n11. Comply with legal obligations and protect our rights.`,
  },
  {
    title: "Use of AI and Third-Party Model Providers",
    content: `viTroom uses third-party artificial intelligence models and cloud services, including Google Gemini, to generate virtual try-on images.\n\nWhen you upload a person photo or clothing photo, that content may be transmitted to third-party AI providers for processing. These providers may process your uploaded images according to their own applicable terms and privacy policies.\n\nYou should avoid uploading images that contain sensitive personal information, private documents, identification cards, images of children, or anything you do not want processed by an AI system.\n\nviTroom-generated outputs are for visual inspiration and fashion visualization purposes only. They should not be treated as professional styling, tailoring, or sizing advice.`,
  },
  {
    title: "How We Share Your Information",
    content: `We may share your information in the following situations:\n\nWith AI Service Providers: We may share uploaded images and related data with AI model providers such as Google Gemini to generate the requested try-on outputs.\n\nWith Cloud and Infrastructure Providers: We may use third-party hosting, database, storage, and computing providers to operate viTroom.\n\nWith Payment Providers: If you make purchases, payment-related information may be shared with payment processors or billing providers.\n\nWith Analytics Providers: We may use third-party tools to understand usage, monitor performance, and improve the app.\n\nFor Legal Reasons: We may disclose information if required by law, court order, or government request.\n\nBusiness Transfers: If viTroom is involved in a merger, acquisition, or sale of assets, user information may be transferred as part of that transaction.\n\nWith Your Consent: We may share information for any other purpose with your consent.`,
  },
  {
    title: "User Content and Privacy",
    content: `You retain your rights in the images you upload to viTroom. By uploading content, you grant viTroom a limited, non-exclusive, worldwide license to host, store, process, and transmit your content only as needed to provide and support the Service.\n\nWe do not sell your uploaded photos to advertisers. We do not use your private uploaded images for public marketing or promotional purposes without your permission.`,
  },
  {
    title: "Data Retention",
    content: `We retain your information only for as long as necessary to provide viTroom, comply with legal obligations, resolve disputes, and maintain security.\n\nUploaded images and generated outputs may be stored in your account until you delete them or request deletion.\n\nYou may request deletion of your account and associated personal data by contacting us at support@kalkinso.in.`,
  },
  {
    title: "Data Security",
    content: `We use reasonable technical, administrative, and organizational measures to protect your information from unauthorized access, loss, misuse, or disclosure.\n\nHowever, no internet-based service is completely secure. You use viTroom at your own risk and should avoid uploading highly sensitive or confidential images.`,
  },
  {
    title: "Your Rights and Choices",
    content: `Depending on your location and applicable law, you may have rights to:\n\n1. Access the personal information we hold about you.\n2. Correct inaccurate or incomplete information.\n3. Delete your account or personal data.\n4. Withdraw consent where processing is based on consent.\n5. Object to or restrict certain processing.\n6. Request a copy of your data.\n7. Opt out of marketing communications.\n\nTo exercise these rights, contact us at support@kalkinso.in.`,
  },
  {
    title: "Children's Privacy",
    content: `viTroom is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided personal information without appropriate consent, we will take steps to delete such information.`,
  },
  {
    title: "International Data Transfers",
    content: `Your information may be processed and stored in countries other than your country of residence. Where required, we take appropriate measures to protect your information in accordance with this Privacy Policy and applicable laws.`,
  },
  {
    title: "Third-Party Links and Services",
    content: `viTroom may contain links to third-party websites, services, or login providers. We are not responsible for the privacy practices or content of third-party services. You should review their privacy policies before using them.`,
  },
  {
    title: "Changes to This Privacy Policy",
    content: `We may update this Privacy Policy from time to time. If we make material changes, we may notify you through the app, email, or website notice. The updated policy will be effective when posted with the revised "Last Updated" date.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions, concerns, or requests about this Privacy Policy, please contact us at:\n\nviTroom Support\nEmail: support@kalkinso.in\nCompany: Kalkinso Software (OPC) Private Limited\nAddress: 506 SHUKL PURE NANHA, SHUKL AINDHA, Aindha, Pratapgarh, Kunda, Uttar Pradesh, India, 230204`,
  },
]

export function PrivacyPage() {
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
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

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
            Questions about this policy? Contact us at{" "}
            <a href="mailto:support@kalkinso.in" className="text-orange-500 hover:underline">support@kalkinso.in</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
          <Logo />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
