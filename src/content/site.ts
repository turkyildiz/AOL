export const site = {
  name: "Air & Ocean Logistics",
  shortName: "AOL",
  legalName: "Air Ocean Logistics, Inc.",
  tagline: "Freight brokerage with assets",
  description:
    "Air & Ocean Logistics is a freight brokerage with assets — moving cargo by air, ocean, and ground with broker agility and capacity you can count on.",
  url: "https://airoceanlogistics.us",
  since: 2012,
  contact: {
    phone: "(312) 342-7133",
    phoneHref: "tel:+13123427133",
    email: "quotes@airoceanlogistics.us",
    emailHref: "mailto:quotes@airoceanlogistics.us",
    addressLines: ["Schaumburg, IL", "United States"],
  },
  nav: [
    { href: "/services", label: "Services" },
    { href: "/coverage", label: "Coverage" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  modes: ["Air", "Ocean", "Ground", "Multimodal"],
  stats: [
    { value: "2012", label: "Established" },
    { value: "3+", label: "Primary modes" },
    { value: "24/7", label: "Ops mindset" },
    { value: "1", label: "Accountable team" },
  ],
  services: [
    {
      slug: "air-freight",
      title: "Air Freight",
      summary:
        "Time-critical shipments with airport-to-door coordination, charter options, and tight milestone control.",
      points: [
        "Express & deferred air products",
        "Airport pickup and last-mile handoff",
        "AOG and high-value handling protocols",
      ],
    },
    {
      slug: "ocean-freight",
      title: "Ocean Freight",
      summary:
        "FCL and LCL programs built for cost control, sailing reliability, and transparent container visibility.",
      points: [
        "FCL & LCL booking",
        "Port drayage coordination",
        "Customs-ready documentation support",
      ],
    },
    {
      slug: "truck-brokerage",
      title: "Truck & Brokerage",
      summary:
        "Asset-backed flexibility plus a vetted carrier network for FTL, LTL, and expedited road moves.",
      points: [
        "FTL, LTL, and expedited",
        "Dedicated and spot capacity",
        "Vetted carrier compliance",
      ],
    },
    {
      slug: "project-special",
      title: "Project & Special Cargo",
      summary:
        "Out-of-gauge, multi-leg, and high-touch moves planned end-to-end by operators who own the outcome.",
      points: [
        "Multi-leg itineraries",
        "Special equipment sourcing",
        "Single point of accountability",
      ],
    },
  ],
  process: [
    {
      step: "01",
      title: "Request",
      body: "Share origin, destination, cargo details, and timing. We respond with clear next steps.",
    },
    {
      step: "02",
      title: "Quote",
      body: "Mode options, transit windows, and pricing — presented so you can decide with confidence.",
    },
    {
      step: "03",
      title: "Book",
      body: "We secure capacity, align parties, and lock milestones before cargo moves.",
    },
    {
      step: "04",
      title: "Track",
      body: "Proactive updates, document control, and exception handling through delivery.",
    },
  ],
  industries: [
    "Manufacturing",
    "Retail & eCommerce",
    "Automotive",
    "Industrial equipment",
    "Consumer goods",
    "Healthcare logistics",
  ],
  differentiators: [
    {
      title: "Brokerage with assets",
      body: "The reach of a brokerage network with owned and controlled capacity where reliability matters most.",
    },
    {
      title: "Multi-mode fluency",
      body: "Air, ocean, and ground under one team — so your freight plan is not forced into a single product.",
    },
    {
      title: "Operator accountability",
      body: "Real people who own the file, escalate early, and communicate like partners — not ticket queues.",
    },
  ],
} as const;

export type Service = (typeof site.services)[number];
