export const site = {
  name: "Air & Ocean Logistics",
  shortName: "AOL",
  legalName: "Air Ocean Logistics, Inc.",
  tagline: "U.S. freight brokerage with assets",
  description:
    "Air & Ocean Logistics is a United States freight brokerage with assets — moving cargo nationwide by air, intermodal, and ground with broker agility and capacity you can count on.",
  url: "https://airoceanlogistics.us",
  since: 2012,
  coverageNote: "United States only",
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
  modes: ["Air", "Truck", "Intermodal", "Expedited"],
  stats: [
    { value: "2012", label: "Established" },
    { value: "USA", label: "Coverage only" },
    { value: "48", label: "Contiguous states" },
    { value: "1", label: "Accountable team" },
  ],
  services: [
    {
      slug: "air-freight",
      title: "Domestic Air Freight",
      summary:
        "Time-critical U.S. air shipments with airport-to-door coordination and tight milestone control.",
      points: [
        "Next-flight-out and deferred domestic air",
        "Airport pickup and final-mile handoff",
        "AOG and high-value handling protocols",
      ],
    },
    {
      slug: "truck-brokerage",
      title: "Truck & Brokerage",
      summary:
        "Asset-backed flexibility plus a vetted U.S. carrier network for FTL, LTL, and expedited road moves.",
      points: [
        "FTL, LTL, and expedited nationwide",
        "Dedicated and spot capacity",
        "Vetted carrier compliance",
      ],
    },
    {
      slug: "intermodal-drayage",
      title: "Intermodal & Drayage",
      summary:
        "Rail intermodal and port/rail ramp drayage across the U.S. — cost-efficient long hauls with controlled handoffs.",
      points: [
        "Domestic intermodal programs",
        "Port and rail ramp drayage",
        "Door-to-door coordination",
      ],
    },
    {
      slug: "project-special",
      title: "Project & Special Cargo",
      summary:
        "Oversize, multi-stop, and high-touch U.S. moves planned end-to-end by operators who own the outcome.",
      points: [
        "Multi-stop domestic itineraries",
        "Special equipment sourcing",
        "Single point of accountability",
      ],
    },
  ],
  process: [
    {
      step: "01",
      title: "Request",
      body: "Share U.S. origin, destination, cargo details, and timing. We respond with clear next steps.",
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
      title: "USA focused",
      body: "We move freight inside the United States only — clear lanes, domestic compliance, and no international handoff risk.",
    },
    {
      title: "Brokerage with assets",
      body: "The reach of a U.S. brokerage network with owned and controlled capacity where reliability matters most.",
    },
    {
      title: "Operator accountability",
      body: "Real people who own the file, escalate early, and communicate like partners — not ticket queues.",
    },
  ],
} as const;

export type Service = (typeof site.services)[number];
