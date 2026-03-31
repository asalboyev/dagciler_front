export interface AboutSection {
  title: string | null;
  subtitle: string | null;
  desc: string | null;
  images: string[];
}

export interface AboutSchoolItem {
  id: number;
  title: string | null;
  subtitle: string | null;
  content1: string | null;
  content2: string | null;
  image: string | null;
}

export interface SiteInfo {
  id: number;
  phone: string | null;
  phone2: string | null;
  email: string | null;
  address: string | null;
  working_hours: string | null;
  telegram: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  logo_url: string | null;
  gift_card_image: string | null;
  map_link: string | null;
  map_lat: string | null;
  map_lng: string | null;
  about_sections: AboutSection[];
  about_schools: AboutSchoolItem[];
}
