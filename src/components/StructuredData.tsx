import { Metadata } from "next";

interface StructuredDataProps {
  metadata: Metadata;
}

export default function StructuredData({ metadata }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Career Advisor",
    "description": metadata.description,
    "url": "https://ai-career-advisor-alpha.vercel.app/",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "AI Career Advisor Team",
      "url": "https://ai-career-advisor-alpha.vercel.app/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Career Advisor",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ai-career-advisor-alpha.vercel.app/android-chrome-512x512.png"
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://ai-career-advisor-alpha.vercel.app/ai-advisor-4.0.png",
      "width": 1200,
      "height": 630
    },
    "screenshot": [
      {
        "@type": "ImageObject",
        "url": "https://ai-career-advisor-alpha.vercel.app/ai-advisor-1.0.png",
        "caption": "AI Career Advisor - Career Analysis Interface"
      },
      {
        "@type": "ImageObject",
        "url": "https://ai-career-advisor-alpha.vercel.app/ai-advisor-2.0.png",
        "caption": "AI Career Advisor - Roadmap Generation"
      },
      {
        "@type": "ImageObject",
        "url": "https://ai-career-advisor-alpha.vercel.app/ai-advisor-3.0.png",
        "caption": "AI Career Advisor - Market Insights"
      }
    ],
    "featureList": [
      "AI-Powered Career Analysis",
      "Personalized Career Roadmaps",
      "Real-time Market Insights",
      "Interactive Chat Support",
      "Skill Assessment Tools",
      "Career Path Recommendations"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "applicationSubCategory": "Career Guidance",
    "softwareVersion": "1.0",
    "fileSize": "Web Application",
    "downloadUrl": "https://ai-career-advisor-alpha.vercel.app/",
    "isAccessibleForFree": true,
    "potentialAction": {
      "@type": "UseAction",
      "target": "https://ai-career-advisor-alpha.vercel.app/#input-form",
      "description": "Start your career analysis"
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Career Advisor",
    "url": "https://ai-career-advisor-alpha.vercel.app/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ai-career-advisor-alpha.vercel.app/android-chrome-512x512.png",
      "width": 512,
      "height": 512
    },
    "sameAs": [
      "https://twitter.com/aicareeradvisor",
      "https://linkedin.com/company/ai-career-advisor",
      "https://github.com/aicareeradvisor"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English",
      "areaServed": "Worldwide"
    },
    "foundingDate": "2024",
    "description": "AI-powered career guidance platform helping students and professionals discover their ideal career paths."
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Career Advisor",
    "url": "https://ai-career-advisor-alpha.vercel.app/",
    "description": metadata.description,
    "inLanguage": "en-US",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "AI Career Advisor Team"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ai-career-advisor-alpha.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData, null, 2),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData, null, 2),
        }}
      />
    </>
  );
}
