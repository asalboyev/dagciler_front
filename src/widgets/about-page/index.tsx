'use client'
import { useAboutSchool } from "@/entities/about-school";
import { useSiteInfo } from "@/entities/siteinfo";
import { DynamicPageBanner } from "@/shared/ui/page-banner";
import { AboutContent } from "@/widgets/about-content";

export default function About() {
    const { data } = useAboutSchool();
    const { data: siteInfo } = useSiteInfo()
    const aboutData = siteInfo?.about_sections?.[0]
    
    return (
        <div className="pageOffset">
            <div className="container">
                <DynamicPageBanner
                    bannerImage={`${aboutData?.images?.[0] ?? ''}`}
                    title={`${aboutData?.title}`}
                    subtitle={`${aboutData?.subtitle}`}
                />
            </div>
            <AboutContent />
        </div>
    );
}
