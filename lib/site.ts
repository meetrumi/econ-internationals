export const SITE = {
  name: "E-CON Internationals",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://econinternationals.com").replace(/\/$/, ""),
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "info@econinternationals.com",
  tagline: "Professional Air Duct Cleaning & Roof Cleaning Across the USA",
  description:
    "E-CON Internationals provides professional air duct cleaning and soft wash roof cleaning for homeowners across the USA. Clear upfront offers and direct chat with our team. Get a free quote today.",
};

export type Faq = { q: string; a: string };
export type Service = {
  slug: "air-duct-cleaning" | "roof-cleaning";
  key: "duct" | "roof";
  name: string;
  short: string;
  metaTitle: string;
  metaDesc: string;
  keywords: string[];
  h1: string;
  intro: string;
  benefits: { t: string; d: string }[];
  process: { t: string; d: string }[];
  signs: string[];
  priceNote: string;
  faqs: Faq[];
};

export const SERVICES: Service[] = [
  {
    slug: "air-duct-cleaning",
    key: "duct",
    name: "Air Duct Cleaning",
    short: "Remove dust, allergens and debris from your HVAC ducts for cleaner air and better airflow.",
    metaTitle: "Air Duct Cleaning Services | HVAC & Dryer Vent",
    metaDesc:
      "Professional air duct cleaning for homes: supply & return vents, HVAC duct cleaning, dryer vent cleaning. Clear upfront offers. Get a free quote.",
    keywords: ["air duct cleaning", "air duct cleaning near me", "HVAC duct cleaning", "duct cleaning service", "dryer vent cleaning", "vent cleaning", "air duct cleaning cost"],
    h1: "Professional Air Duct Cleaning Services",
    intro:
      "Your HVAC system pushes the same air through your home many times a day. Over the years, ducts collect dust, pet hair, pollen, construction debris and sometimes mold. Our air duct cleaning service uses negative-pressure vacuum equipment and agitation tools to clean supply and return ducts, registers, grilles and the main trunk lines, so your system breathes easier and your home stays cleaner.",
    benefits: [
      { t: "Cleaner indoor air", d: "Removes built-up dust, pet dander and pollen that recirculate through your vents." },
      { t: "Better airflow", d: "Clear ducts let your HVAC move air more freely to every room." },
      { t: "Less dusting", d: "Homeowners often notice less dust settling on furniture after a full cleaning." },
      { t: "Fresher smell", d: "Gets rid of stale, musty odors trapped in the duct system." },
    ],
    process: [
      { t: "Inspection", d: "We check vents, returns and accessible ductwork and confirm the scope and price before starting." },
      { t: "Protection", d: "Floors and furniture near vents are covered; registers are sealed off." },
      { t: "Negative-pressure cleaning", d: "A high-powered vacuum is connected to the system while brushes and air whips loosen debris." },
      { t: "Registers & returns", d: "Grilles and registers are removed, washed and reinstalled." },
      { t: "Final walkthrough", d: "We show you the results." },
    ],
    signs: [
      "Visible dust blowing out of vents",
      "Dust building up quickly after cleaning",
      "Musty or stale smell when the HVAC turns on",
      "Recent renovation or construction work",
      "You moved into a home and don't know when ducts were last cleaned",
      "Pets that shed, or allergy symptoms that get worse indoors",
    ],
    priceNote: "Most homes pay roughly $300–$700 for a full air duct cleaning, depending on home size, number of vents and system access. See our current offers below for exact pricing.",
    faqs: [
      { q: "How often should air ducts be cleaned?", a: "Most homes benefit from duct cleaning every 3–5 years, or sooner after renovations, if you have pets, or if you notice dust blowing from vents." },
      { q: "How long does air duct cleaning take?", a: "A typical single-system home takes about 3–5 hours. Larger homes or multiple systems can take longer." },
      { q: "Do I need to be home during the cleaning?", a: "Yes, an adult should be present to give access and do the final walkthrough with our technician." },
      { q: "Do you clean dryer vents too?", a: "Yes. Dryer vent cleaning can be added to any duct cleaning offer and helps reduce lint buildup, a common fire risk." },
      ],
  },
  {
    slug: "roof-cleaning",
    key: "roof",
    name: "Roof Cleaning",
    short: "Safe soft wash roof cleaning that removes black streaks, algae, moss and lichen.",
    metaTitle: "Roof Cleaning Services | Soft Wash & Moss Removal",
    metaDesc:
      "Soft wash roof cleaning that safely removes black streaks, algae, moss and lichen from shingle, tile and metal roofs. Clear upfront offers. Free quote.",
    keywords: ["roof cleaning", "roof cleaning near me", "soft wash roof cleaning", "roof moss removal", "black streaks on roof", "roof algae removal", "shingle roof cleaning"],
    h1: "Soft Wash Roof Cleaning Services",
    intro:
      "Those black streaks on your roof are usually Gloeocapsa magma, an algae that feeds on the limestone in asphalt shingles. Left alone, algae, moss and lichen hold moisture against your roof and can shorten its life. We use a low-pressure soft wash method with a professional cleaning solution that kills growth at the root without blasting granules off your shingles.",
    benefits: [
      { t: "Removes black streaks", d: "Kills algae at the root so your roof looks clean again, not just rinsed." },
      { t: "Protects your shingles", d: "Low-pressure soft washing avoids the damage high-pressure washing can cause." },
      { t: "Instant curb appeal", d: "A clean roof makes the whole home look newer, which matters when selling." },
      { t: "Longer roof life", d: "Removing moss and lichen stops moisture being trapped against the roof surface." },
    ],
    process: [
      { t: "Roof assessment", d: "We check roof type, pitch, condition and growth level, then confirm the price." },
      { t: "Plant & property protection", d: "Landscaping is pre-wet and protected; downspouts are managed." },
      { t: "Soft wash application", d: "A roof-safe cleaning solution is applied at low pressure to kill algae, moss and lichen." },
      { t: "Rinse & detail", d: "Gutters, siding and walkways are rinsed so nothing is left behind." },
      { t: "Final check", d: "We walk you through the result." },
    ],
    signs: [
      "Black or dark streaks running down the roof",
      "Green moss growing between shingles",
      "Gray or white lichen spots",
      "Roof looks old even though it isn't",
      "You're preparing the home for sale",
      "Shaded roof areas that stay damp",
    ],
    priceNote: "Roof cleaning usually costs around $0.20–$0.70 per square foot, so a typical roof falls between about $300 and $1,050. See our current offers below for exact pricing.",
    faqs: [
      { q: "Is soft washing safe for shingles?", a: "Yes. Soft washing uses low pressure and a cleaning solution to kill growth, which is the method most shingle manufacturers recommend over pressure washing." },
      { q: "How long do roof cleaning results last?", a: "Results typically last 2–4 years depending on shade, humidity and trees around the home." },
      { q: "Will the cleaning harm my plants?", a: "We pre-wet and protect landscaping and rinse afterwards to keep plants safe." },
      { q: "What roof types do you clean?", a: "Asphalt shingle, tile, metal and most flat roofs. Tell us your roof type when you request a quote." },
      ],
  },
];

export type City = { slug: string; name: string; state: string; st: string; duct: string; roof: string; services: ("duct" | "roof")[] };

export const CITIES: City[] = [
  { slug: "houston-tx", name: "Houston", state: "Texas", st: "TX", services: ["duct", "roof"], duct: "Houston's long, humid cooling season means HVAC systems run most of the year, pulling dust and moisture through the ducts.", roof: "Gulf Coast humidity makes Houston one of the worst areas for black algae streaks on shingle roofs." },
  { slug: "dallas-tx", name: "Dallas", state: "Texas", st: "TX", services: ["duct", "roof"], duct: "Hot Dallas summers and spring pollen loads keep AC systems working hard and ducts collecting debris.", roof: "Shaded roofs across Dallas neighborhoods often develop algae streaks and lichen after wet springs." },
  { slug: "fort-worth-tx", name: "Fort Worth", state: "Texas", st: "TX", services: ["duct", "roof"], duct: "Dust storms and long AC seasons in Fort Worth mean ducts fill with fine dust faster than average.", roof: "Fort Worth homes under mature trees commonly show dark algae streaks and moss on north-facing slopes." },
  { slug: "san-antonio-tx", name: "San Antonio", state: "Texas", st: "TX", services: ["duct", "roof"], duct: "San Antonio's cedar pollen season and year-round cooling make clean ducts important for allergy sufferers.", roof: "Humid summers in San Antonio encourage algae growth on asphalt shingles." },
  { slug: "austin-tx", name: "Austin", state: "Texas", st: "TX", services: ["duct", "roof"], duct: "Austin is known for cedar fever; clean ducts help stop pollen recirculating indoors.", roof: "Tree-covered Austin neighborhoods see moss and lichen on shaded roofs." },
  { slug: "tampa-fl", name: "Tampa", state: "Florida", st: "FL", services: ["duct", "roof"], duct: "Tampa's heat and humidity keep AC running nearly every day, which can lead to musty smelling ducts.", roof: "Florida's humidity makes roof algae a constant problem for Tampa homeowners." },
  { slug: "orlando-fl", name: "Orlando", state: "Florida", st: "FL", services: ["duct", "roof"], duct: "Year-round cooling in Orlando means ducts collect dust and moisture constantly.", roof: "Orlando roofs, especially tile and shingle, quickly develop black streaks in the humid climate." },
  { slug: "jacksonville-fl", name: "Jacksonville", state: "Florida", st: "FL", services: ["duct", "roof"], duct: "Coastal humidity in Jacksonville can lead to musty odors in HVAC ductwork.", roof: "Jacksonville's coastal moisture and shade trees create ideal conditions for roof algae and moss." },
  { slug: "atlanta-ga", name: "Atlanta", state: "Georgia", st: "GA", services: ["duct", "roof"], duct: "Atlanta's heavy spring pollen season coats everything, including the inside of your ducts.", roof: "Atlanta's tree canopy and humidity make roof algae and moss very common." },
  { slug: "charlotte-nc", name: "Charlotte", state: "North Carolina", st: "NC", services: ["duct", "roof"], duct: "Charlotte homes run both heating and cooling, so ducts work hard all year.", roof: "Humid summers and wooded lots in Charlotte lead to streaked, mossy roofs." },
  { slug: "raleigh-nc", name: "Raleigh", state: "North Carolina", st: "NC", services: ["duct", "roof"], duct: "Raleigh's pine pollen season makes duct cleaning popular with allergy sufferers.", roof: "The City of Oaks lives up to its name: heavy tree cover means lots of roof moss and algae." },
  { slug: "alexandria-va", name: "Alexandria", state: "Virginia", st: "VA", services: ["duct", "roof"], duct: "Many older Alexandria homes have ductwork that hasn't been cleaned in years.", roof: "Shaded historic neighborhoods in Alexandria often have algae and moss on their roofs." },
  { slug: "richmond-va", name: "Richmond", state: "Virginia", st: "VA", services: ["duct", "roof"], duct: "Richmond's humid summers and cold winters mean year-round HVAC use.", roof: "Richmond's mature trees and humidity leave many roofs with dark streaks and moss." },
  { slug: "rockville-md", name: "Rockville", state: "Maryland", st: "MD", services: ["duct", "roof"], duct: "Rockville homeowners use heating and cooling heavily, making regular duct cleaning worthwhile.", roof: "Wooded Montgomery County lots often see moss and algae on shaded roof slopes." },
  { slug: "seattle-wa", name: "Seattle", state: "Washington", st: "WA", services: ["roof"], duct: "", roof: "Seattle's wet climate makes it one of the worst places in the country for roof moss." },
  { slug: "portland-or", name: "Portland", state: "Oregon", st: "OR", services: ["roof"], duct: "", roof: "Portland's long rainy season lets moss build up thick on shaded roofs, holding water against shingles." },
];

export const serviceByKey = (k: string) => SERVICES.find((s) => s.key === k)!;
export const serviceBySlug = (s: string) => SERVICES.find((x) => x.slug === s);
