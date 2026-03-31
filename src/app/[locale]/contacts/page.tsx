'use client'
import { DynamicPageBanner } from "@/shared/ui/page-banner";
import { BranchesSection } from "@/widgets/branches-section";
import { ContactSection } from "@/widgets/contact-section";
import { useTranslations } from "next-intl";

export default function ContactsPage() {
  const tMain = useTranslations('main')
  return (
    <div className="pageOffset">
      <div className="container">
        <DynamicPageBanner
          title={tMain('contacts-title')}
          subtitle={tMain('contact-title')}
          bannerImage="/images/hero.png"
        />
      </div>
      <BranchesSection />
      <ContactSection />
    </div>
  );
}
