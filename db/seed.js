const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
const url = process.env.DATABASE_URL;

const offers = [
  { title: "Basic Duct Clean", service: "duct", price: "$299", sort: 1, summary: "Ideal for apartments and smaller homes.", includes: ["Up to 10 supply vents", "1 return vent", "Negative-pressure vacuum cleaning", "Register & grille wash", "Before/after photos"], terms: "Single HVAC system, homes up to 1,500 sq ft. Extra vents $25 each." },
  { title: "Complete Duct & Dryer Vent", service: "duct", price: "$449", sort: 2, summary: "Our most popular whole-home package.", includes: ["Up to 18 supply vents", "2 return vents", "Main trunk line cleaning", "Dryer vent cleaning", "Register & grille wash", "Before/after photos"], terms: "Single HVAC system, homes up to 3,000 sq ft. Additional systems quoted separately." },
  { title: "Roof Soft Wash – Standard", service: "roof", price: "$399", sort: 3, summary: "Removes black streaks and light algae.", includes: ["Soft wash of entire roof", "Black streak & algae removal", "Plant protection", "Gutter exterior rinse", "Before/after photos"], terms: "Single-story or low-pitch roofs up to 1,800 sq ft. Steep or large roofs quoted on request." },
  { title: "Roof Moss & Algae Premium", service: "roof", price: "$649", sort: 4, summary: "Heavy moss, lichen and algae treatment.", includes: ["Soft wash of entire roof", "Moss & lichen treatment", "Hand removal of heavy moss", "Gutter clean-out", "Plant protection", "Before/after photos"], terms: "Roofs up to 3,000 sq ft. Two-story/steep roofs may need a custom quote." },
];

const posts = [
  {
    slug: "how-often-should-you-clean-air-ducts",
    title: "How Often Should You Clean Your Air Ducts?",
    metaTitle: "How Often Should You Clean Air Ducts? (Homeowner Guide)",
    metaDesc: "Most homes need air duct cleaning every 3–5 years. Learn what changes that schedule, from pets and allergies to renovations, and when to book sooner.",
    excerpt: "The usual answer is every 3–5 years, but pets, allergies, renovations and climate can change that.",
    tags: ["air duct cleaning", "HVAC maintenance", "indoor air quality"],
    content: `Most homeowners only think about their air ducts when something seems wrong. But the ducts carry every bit of heated and cooled air in your home, so keeping them clean matters.

## The general rule: every 3–5 years
For a typical home with no special issues, cleaning the air ducts every 3 to 5 years is a sensible schedule. That's often enough to stop heavy dust buildup without paying for cleaning you don't need.

## When to clean more often
Some homes collect debris faster and benefit from cleaning every 2–3 years:
- **Pets that shed.** Hair and dander get pulled into return vents every day.
- **Allergy or asthma sufferers.** Less dust and pollen recirculating can make the home more comfortable.
- **Smokers in the home.** Smoke residue builds up inside ductwork.
- **Hot, humid climates.** In places like Texas and Florida the AC runs most of the year, moving more air (and more dust) through the system.

## Clean right away after these events
- **Renovations or construction.** Drywall dust and sawdust travel straight into the ducts.
- **Moving into a new home.** You don't know what the last owners left behind.
- **Signs of pests or mold.** These need attention immediately.

## Signs it's time
Dust puffing out when the system starts, a musty smell from the vents, or dust settling on furniture just days after cleaning are all strong signs your ducts need attention.

## The bottom line
Use 3–5 years as a baseline and shorten it if any of the factors above apply to your home. Not sure? [Message us](/contact) and we'll help you decide whether cleaning is worth it right now.`,
  },
  {
    slug: "signs-your-air-ducts-need-cleaning",
    title: "7 Signs Your Air Ducts Need Cleaning",
    metaTitle: "7 Signs Your Air Ducts Need Cleaning | E-CON Internationals",
    metaDesc: "Dust blowing from vents, musty smells and rising allergy symptoms are common signs your air ducts need cleaning. Here are 7 to watch for.",
    excerpt: "Dust from vents, musty smells and uneven airflow are some of the clearest warning signs.",
    tags: ["air duct cleaning", "signs", "HVAC"],
    content: `Your ducts are hidden behind walls and ceilings, so problems are easy to miss. Here are seven signs it's time for a professional air duct cleaning.

## 1. Dust blows out when the system turns on
If you see a small puff of dust from a vent when the heat or AC starts, debris is sitting in the ducts.

## 2. Dust comes back fast
Dusting on Monday and seeing a layer again by Wednesday often points to dirty ducts recirculating particles.

## 3. Musty or stale smells
A musty odor when the HVAC runs can mean moisture and buildup inside the ductwork.

## 4. Visible buildup on vent covers
Remove a register and look inside with a flashlight. Thick gray dust on the walls of the duct is a clear sign.

## 5. Allergy symptoms get worse indoors
Sneezing or itchy eyes that ease when you leave the house can be a sign of dust and pollen circulating through your vents.

## 6. Uneven airflow between rooms
Heavy buildup and blockages can restrict airflow, leaving some rooms warmer or cooler than others.

## 7. Recent renovation or new home
Construction dust and unknown history are two of the best reasons to clean ducts.

## What to do next
If you've noticed two or more of these signs, it's worth getting a quote. See our [air duct cleaning offers](/air-duct-cleaning) or [chat with us](/contact).`,
  },
  {
    slug: "is-air-duct-cleaning-worth-it",
    title: "Is Air Duct Cleaning Worth It? An Honest Answer",
    metaTitle: "Is Air Duct Cleaning Worth It? Costs, Benefits & When to Skip",
    metaDesc: "An honest look at whether air duct cleaning is worth the cost: when it helps, when it doesn't, what it costs, and how to avoid bait-and-switch offers.",
    excerpt: "Sometimes yes, sometimes no. Here's how to tell, and how to avoid overpaying.",
    tags: ["air duct cleaning", "cost", "buying guide"],
    content: `Air duct cleaning isn't something every home needs every year. Here's an honest guide to when it's worth paying for.

## When it's worth it
- You can see dust buildup or debris in the ducts
- You've had renovation work done
- There are pets, smokers or allergy sufferers in the home
- You've moved into a home with unknown history
- There's a musty smell from the vents

## When you can probably skip it
If your ducts were cleaned in the last few years, you change your HVAC filter regularly and you don't see or smell any problems, cleaning can usually wait.

## What it costs
Most homeowners pay roughly $300–$700 for a full cleaning of a single-system home. Price depends on home size, number of vents and how easy the system is to access.

## Watch out for "$99 whole house" deals
Very low advertised prices are a common bait-and-switch: the price grows once the technician arrives. A fair offer clearly lists how many vents are included and what extras cost.

## How we do it
Our [offers](/offers) list exactly what's included and the price up front. Questions? [Ask us directly](/contact).`,
  },
  {
    slug: "what-causes-black-streaks-on-roof",
    title: "What Causes Black Streaks on Your Roof (and How to Remove Them)",
    metaTitle: "What Causes Black Streaks on a Roof? How to Remove Them Safely",
    metaDesc: "Black streaks on roofs are caused by Gloeocapsa magma algae. Learn why they appear, whether they damage shingles, and the safe way to remove them.",
    excerpt: "Those dark stains are algae, not dirt. Here's why they spread and how to remove them safely.",
    tags: ["roof cleaning", "black streaks", "roof algae"],
    content: `If your roof has dark streaks running down it, you're not alone. It's one of the most common roof problems in humid parts of the US.

## It's algae, not dirt
The streaks are usually caused by an algae called *Gloeocapsa magma*. It feeds on the limestone filler in asphalt shingles and spreads by airborne spores, which is why whole neighborhoods often have it.

## Why the streaks run downhill
Rain washes the algae down the roof slope, so the dark color forms vertical streaks. North-facing and shaded slopes are usually worse because they stay damp longer.

## Does it damage the roof?
The algae itself is mostly a looks problem at first. But it holds moisture and can make way for moss and lichen, which can lift shingles and shorten the roof's life over time.

## Don't pressure wash it
High-pressure washing can strip the protective granules off shingles and void some warranties. The streaks also come back quickly because the algae isn't killed at the root.

## The right way: soft washing
Soft washing applies a roof-safe cleaning solution at low pressure. It kills the algae, and the remaining stains fade as it breaks down.

## Get it handled
See our [soft wash roof cleaning](/roof-cleaning) offers or [send us a message](/contact) with a photo of your roof for a quote.`,
  },
  {
    slug: "pressure-washing-vs-soft-washing-roof",
    title: "Pressure Washing vs Soft Washing Your Roof: Which Is Better?",
    metaTitle: "Pressure Washing vs Soft Washing a Roof: Which Is Safer?",
    metaDesc: "Pressure washing can damage shingles; soft washing kills algae and moss at low pressure. Compare both methods for roof cleaning.",
    excerpt: "Pressure washing is fast but risky for shingles. Soft washing is the safer choice for most roofs.",
    tags: ["roof cleaning", "soft wash", "pressure washing"],
    content: `Both methods use water, but they work in very different ways, and for most roofs the difference matters a lot.

## Pressure washing
Uses high-pressure water to blast dirt away.
- **Pros:** fast, no chemicals
- **Cons:** can strip granules from asphalt shingles, crack tiles, force water under shingles, and doesn't kill algae at the root, so streaks return

## Soft washing
Uses low pressure (similar to a garden hose) plus a cleaning solution.
- **Pros:** kills algae, moss and lichen at the root; safe for shingles; results last longer
- **Cons:** needs careful handling to protect plants (pre-wetting and rinsing)

## Which should you choose?
For asphalt shingle roofs, soft washing is the clear winner, and it's the approach recommended by the Asphalt Roofing Manufacturers Association. Pressure is better kept for concrete driveways and walkways.

## Our approach
We only soft wash roofs and protect your landscaping before and after. See our [roof cleaning service](/roof-cleaning) or [ask a question](/contact).`,
  },
  {
    slug: "how-often-should-you-clean-your-roof",
    title: "How Often Should You Clean Your Roof?",
    metaTitle: "How Often Should You Clean Your Roof? Climate-Based Guide",
    metaDesc: "Most roofs need cleaning every 2–4 years. Learn how climate, shade and trees affect your schedule and the signs it's time for roof cleaning.",
    excerpt: "Every 2–4 years for most homes, but humid climates and shady lots may need it sooner.",
    tags: ["roof cleaning", "roof maintenance", "moss removal"],
    content: `There's no single answer, because climate and shade make a big difference. Here's how to work out the right schedule for your home.

## General guideline: every 2–4 years
After a soft wash, most roofs stay clean for 2 to 4 years before algae starts to return.

## Clean more often if...
- **You live somewhere humid** like Florida, the Gulf Coast or the Southeast
- **You live somewhere wet** like Seattle or Portland, where moss grows quickly
- **Your roof is shaded** by large trees
- **Branches hang over the roof** and drop leaves that hold moisture

## Signs it's time
- Dark streaks appearing again
- Green moss between shingles
- Lichen spots
- Gutters filling with shingle granules or moss

## Keep it clean longer
Trim overhanging branches, keep gutters clear, and treat growth early before moss takes hold.

## Book a cleaning
Check our [roof cleaning offers](/roof-cleaning) or [message us](/contact).`,
  },
];

async function main() {
  if (!url) { console.log("No DATABASE_URL, skipping DB setup"); return; }
  const db = new Client({ connectionString: url, ssl: /sslmode=require|neon\.tech|supabase/.test(url) ? { rejectUnauthorized: false } : undefined });
  await db.connect();
  await db.query(fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8"));
  const { rows } = await db.query("select count(*)::int n from offers");
  if (rows[0].n === 0) for (const o of offers) await db.query("insert into offers(title,service,price,summary,includes,terms,sort) values($1,$2,$3,$4,$5,$6,$7)", [o.title, o.service, o.price, o.summary, o.includes, o.terms, o.sort]);
  for (const p of posts) await db.query('insert into posts(slug,title,"metaTitle","metaDesc",excerpt,content,tags) values($1,$2,$3,$4,$5,$6,$7) on conflict (slug) do nothing', [p.slug, p.title, p.metaTitle, p.metaDesc, p.excerpt, p.content, p.tags]);
  await db.end();
  console.log("Database ready");
}
main().catch((e) => { console.error(e); process.exit(1); });
