export const site = {
  name: "Air & Ocean Logistics",
  shortName: "AOL",
  legalName: "Air Ocean Logistics, Inc.",
  tagline: "U.S. trucking brokerage with assets",
  description:
    "Air & Ocean Logistics is a United States trucking brokerage with assets — FTL, LTL, and expedited capacity nationwide. No air. No ocean. Just freight that moves on the road.",
  url: "https://airoceanlogistics.us",
  since: 2012,
  coverageNote: "United States only · Trucking only",
  contact: {
    phone: "(312) 342-7133",
    phoneHref: "tel:+13123427133",
    email: "ops@airoceanlogistics.us",
    emailHref: "mailto:ops@airoceanlogistics.us",
    addressLines: ["Schaumburg, IL", "United States"],
  },
  nav: [
    { href: "/services", label: "Services" },
    { href: "/coverage", label: "Coverage" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  modes: ["FTL", "LTL", "Expedited", "Dedicated"],
  stats: [
    { value: "2012", label: "Established" },
    { value: "USA", label: "Trucking only" },
    { value: "48", label: "State reach" },
    { value: "24/7", label: "Ops mindset" },
  ],
  services: [
    {
      slug: "ftl",
      title: "Full Truckload (FTL)",
      summary:
        "Dedicated trailers for dry van, reefer, and flatbed moves across the contiguous U.S. — priced clear, covered tight.",
      points: [
        "Dry van, reefer, and flatbed",
        "Live load / drop trailer options",
        "Lane pricing with transit windows",
      ],
    },
    {
      slug: "ltl",
      title: "Less-Than-Truckload (LTL)",
      summary:
        "Cost-efficient pallet freight when you don’t need the whole trailer — with pickup discipline and delivery accountability.",
      points: [
        "Palletized freight programs",
        "Density and class guidance",
        "Appointment and liftgate coordination",
      ],
    },
    {
      slug: "expedited",
      title: "Expedited & Time-Critical",
      summary:
        "When the line is down or the window is brutal — exclusive-use and team capacity built for speed.",
      points: [
        "Exclusive-use and team drivers",
        "Hot-shot and emergency coverage",
        "Milestone updates that actually land",
      ],
    },
    {
      slug: "dedicated",
      title: "Dedicated & Recurring Lanes",
      summary:
        "Repeat capacity for shippers who need consistency — asset-backed options where reliability is non-negotiable.",
      points: [
        "Scheduled recurring lanes",
        "Asset-backed flexibility",
        "Single ops owner per account",
      ],
    },
  ],
  process: [
    {
      step: "01",
      title: "Request",
      body: "Share origin, destination, equipment, weight, and pickup window. We respond fast with next steps.",
    },
    {
      step: "02",
      title: "Quote",
      body: "Clear rate, equipment type, and transit — no black-box math, no mystery accessorials up front.",
    },
    {
      step: "03",
      title: "Book",
      body: "We secure capacity, confirm the driver plan, and lock pickup before the clock starts.",
    },
    {
      step: "04",
      title: "Track",
      body: "Proactive check-calls, exception alerts, and POD handoff through final delivery.",
    },
  ],
  industries: [
    "Manufacturing",
    "Retail & eCommerce",
    "Automotive",
    "Food & beverage",
    "Industrial equipment",
    "Building materials",
  ],
  differentiators: [
    {
      title: "Trucking only",
      body: "We don’t book air or ocean carriage. Every file is road freight — FTL, LTL, expedited, and dedicated U.S. lanes.",
    },
    {
      title: "USA only",
      body: "Contiguous U.S. coverage with operators who know domestic compliance, appointments, and highway reality.",
    },
    {
      title: "Brokerage with assets",
      body: "Network reach plus owned and controlled capacity when the market tightens and your freight cannot wait.",
    },
  ],
  equipment: ["Dry Van", "Reefer", "Flatbed", "Step Deck", "Hot Shot", "Power Only"],
} as const;

export type Service = (typeof site.services)[number];
