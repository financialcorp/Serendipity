/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ENHANCED VERSION — Richer animations, hover effects, magnetic buttons,
 * parallax, shimmer loaders, stagger reveals, 3D card tilts, and more.
 * Mouse cursor is UNCHANGED per user request.
 */

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
  useTransform,
  useMotionValue,
  animate as motionAnimate,
} from "motion/react";
import {
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  GlassWater,
  Speaker,
  Star,
  Folder,
  Sparkles,
  MapPin,
  Phone,
  Check,
  ArrowUpRight,
  Users,
  Wind,
  Droplets,
  Utensils,
  Zap,
  Facebook,
  Instagram,
  Twitter,
  Building,
  ChevronDown,
  ZoomIn,
  Anchor,
  Clock,
  DollarSign,
  Ship,
  Gauge,
  Fuel,
  Wrench,
  Settings,
  Activity,
  Camera,
  Eye,
  Home,
  Compass,
  Waves,
  Send,
  Pause,
  Plus,
  ChevronUp,
  Layers,
  Navigation,
  Shield,
  Wifi,
  ThermometerSun,
  Maximize2,
  Info,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Experience {
  img: string;
  tag: string;
  title: string;
  desc: string;
  features: string[];
}

interface HeroSlide {
  line1: string;
  line2: string;
  desc: string;
  tag: string;
}

interface Room {
  img: string;
  sub: string;
  title: string;
  desc: string;
  amenities: string[];
  extraAmenities?: string[];
  bathDesc?: string;
  extraImages?: string[];
}

interface FleetVessel {
  img: string;
  name: string;
  desc: string;
  specs: { label: string; value: string }[];
  length: string;
  guests: string;
  cabins: string;
  imgIndex: number;
}

interface GalleryImage {
  src: string;
  tab: "exterior" | "interior";
  label: string;
}

interface PhotoGalleryItem {
  src: string;
  label: string;
  glowColor: "gold" | "blue" | "teal" | "rose";
  tall?: boolean;
}

interface WaterToyDetail {
  icon: React.ElementType;
  label: string;
  desc: string;
  color: string;
  modalTitle: string;
  modalSubtitle: string;
  modalDesc: string;
  modalFeatures: string[];
  modalImages: string[];
  badge: string;
}

interface FlybridgeImageDetail {
  src: string;
  label: string;
  videoSrc?: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  badge: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const EXPERIENCES: Experience[] = [
  {
    img: "assets/occasion1.png",
    tag: "Leisure",
    title: "Sunset Cruises & Day Excursions",
    desc: "Watch the Gulf Coast horizon blaze with color as Serendipity glides through calm waters. Our sunset cruises are timed perfectly to the golden hour, with craft cocktails, soft music, and panoramic views from the flybridge.",
    features: [
      "Professional crew & captain",
      "Craft cocktails included",
      "Up to 4 hours on water",
      "Available year-round",
    ],
  },
  {
    img: "assets/occasion2.png",
    tag: "Celebration",
    title: "Birthday & Anniversary Celebrations",
    desc: "Make your milestone unforgettable. We coordinate every detail—from floral décor and custom cakes to curated playlists and chef-prepared menus—so all you do is celebrate.",
    features: [
      "Custom décor packages",
      "Private chef available",
      "Champagne toast included",
      "Photography coordination",
    ],
  },
  {
    img: "assets/occasion3.png",
    tag: "Corporate",
    title: "Corporate & Executive Events",
    desc: "Impress clients and inspire your team in an extraordinary setting. Serendipity offers an exclusive boardroom on the water with full AV capabilities, catering, and absolute privacy.",
    features: [
      "Full AV & WiFi setup",
      "Catering packages",
      "Up to 12 executives",
      "NDAs & confidentiality honored",
    ],
  },
  {
    img: "assets/occasion4.png",
    tag: "Wellness",
    title: "Wellness Retreats on the Water",
    desc: "Disconnect from the noise and reconnect with yourself. Our wellness retreats feature guided meditation, yoga on the sundeck, spa treatments, and clean, nourishing cuisine tailored to your needs.",
    features: [
      "Certified yoga instructor",
      "Spa & massage options",
      "Organic catering menu",
      "Mindfulness packages",
    ],
  },
  {
    img: "assets/occasion5.png",
    tag: "VIP Room",
    title: "First Class Relaxation",
    desc: "Experience the pinnacle of luxury in our VIP staterooms. Each room is a sanctuary of comfort, featuring plush bedding, ambient lighting, and personalized service.",
    features: [
      "Plush bedding with premium linens",
      "Climate-controlled environment",
      "Private ensuite bathroom",
      "Personalized service",
    ],
  },
  {
    img: "assets/occasion6.png",
    tag: "Kitchen",
    title: "Chef's Cooking Class",
    desc: "Join our award-winning chef for an immersive culinary experience on the water. Learn to prepare signature dishes while enjoying stunning ocean views.",
    features: [
      "Hands-on cooking experience",
      "Premium ingredients provided",
      "Take-home recipes",
      "Wine pairing included",
    ],
  },
];

const ROOMS: Room[] = [
  {
    img: "assets/accomodation1.webp",
    sub: "Master Suite",
    title: "Primary Stateroom",
    desc: "The full-beam Master Stateroom is a private sanctuary, featuring a plush king-size bed that is framed by oversized stainless porthole windows, overflowing with natural light. This room includes:",
    amenities: [
      "Double-door entry for a grand welcome",
      "Walk-in closet plus two armoires",
      "Makeup vanity (port side) and working desk (starboard) with bookshelves and filing cabinets",
      'Flat screen 32" TV with satellite DirecTV and entertainment center',
      "Motorized blackout shades and custom ambient lighting, including ceiling and wall sconces",
      "Independent climate control",
    ],
    extraAmenities: [
      "Oversized frameless glass shower with dual-controlled showerheads",
      "His & hers walkthrough vanity with quartz countertops",
      "Herringbone travertine mosaic floor",
      "Two large vanity cabinets with ample room for cosmetics, hairdryers, and personal care items",
      "Two full-height linen closets (port and starboard)",
    ],
    bathDesc: "Designed with you in mind, the full-beam ensuite master bath includes:",
    extraImages: ["assets/accomodation2.webp", "assets/accomodation3.webp"],
  },
  {
    img: "assets/accomodation4.webp",
    sub: "Port VIP",
    title: "Port VIP Stateroom",
    desc: "Located on the port side, this VIP guest suite features a queen-size bed and large stainless porthole windows that spill natural light into the room.",
    amenities: [
      "Custom motorized shades with indirect ceiling lighting",
      "Satellite DirecTV plasma TV and climate-controlled comfort",
      "Generous storage with drawers under the bed and a cedar lined closet",
    ],
    extraAmenities: [
      "Frameless full-size shower",
      "Herringbone mosaic travertine flooring",
      "Quartz vanity top with ample counter space",
      "Vanity mirrors and separate storage closet for personal items",
    ],
    bathDesc: "The port VIP ensuite bath offers:",
    extraImages: ["assets/accomodation5.webp", "assets/accomodation6.webp"],
  },
  {
    img: "assets/accomodation7.webp",
    sub: "Starboard VIP",
    title: "Starboard VIP Stateroom",
    desc: "The Starboard VIP Stateroom mirrors its port side counterpart for the same upscale features.",
    amenities: [
      "Queen-size bed with under-bed storage",
      "Stainless porthole windows for natural light",
      "Motorized lighting control and ambient LED accents",
      "Satellite DirecTV and climate-controlled atmosphere",
      "Cedar-lined closet for longer charters or extended stays",
    ],
    extraAmenities: [
      "Frameless glass shower with full standing height",
      "Elegant quartz vanity with mosaic tile flooring",
      "Generous vanity storage and personal care cabinet",
    ],
    bathDesc: "The starboard VIP ensuite bath includes:",
    extraImages: ["assets/accomodation8.webp", "assets/accomodation9.webp"],
  },
  {
    img: "assets/accomodation10.webp",
    sub: "Midship",
    title: "Midship Stateroom",
    desc: "The Midship Stateroom offers a beautifully appointed retreat centered around a comfortable double bed, bathed in natural light through a generous stainless steel porthole window. This inviting space includes:",
    amenities: [
      "Motorized shades paired with refined ambient lighting — indirect cove illumination and soft accent lights — to set the perfect mood",
      "Independently controlled air conditioning for personalized comfort",
      "Satellite DirecTV entertainment system",
      "Abundant storage with spacious drawers beneath the bed and a cedar lined closet",
    ],
    extraAmenities: [
      "A full-size, frameless glass shower",
      "Vanity mirrors flanked by generous storage and a dedicated vanity closet for grooming essentials",
      "A subtly elegant quartz countertop atop a mosaic herringbone travertine floor",
    ],
    bathDesc: "Thoughtfully designed with your ease in mind, the adjoining ensuite bath includes:",
    extraImages: ["assets/accomodation11.webp"],
  },
];

const EXTERIOR_GALLERY: GalleryImage[] = [
  { src: "assets/hero1.png", tab: "exterior", label: "Bow View at Sunset" },
  { src: "assets/hero2.png", tab: "exterior", label: "Open Gulf Waters" },
  { src: "assets/hero3.png", tab: "exterior", label: "Starboard Profile" },
  { src: "assets/occasion1.png", tab: "exterior", label: "Aft Deck at Anchor" },
  { src: "assets/occasion2.png", tab: "exterior", label: "Flybridge Entertaining" },
  { src: "assets/occasion3.png", tab: "exterior", label: "Full Port Side" },
  { src: "assets/occasion4.png", tab: "exterior", label: "Stern View at Sea" },
  { src: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800", tab: "exterior", label: "Bow at Sunrise" },
  { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", tab: "exterior", label: "Gulf Coast Cruise" },
  { src: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=800", tab: "exterior", label: "Anchor in Paradise" },
  { src: "https://img.freepik.com/free-photo/infinity-pool-with-ocean-view-sunset_23-2151993705.jpg?semt=ais_hybrid&w=740&q=80", tab: "exterior", label: "Twilight on the Water" },
  { src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800", tab: "exterior", label: "Sundeck Life" },
];

const INTERIOR_GALLERY: GalleryImage[] = [
  { src: "assets/gallerymain.png", tab: "interior", label: "Master Stateroom" },
  { src: "assets/occasion5.png", tab: "interior", label: "VIP Stateroom" },
  { src: "assets/occasion6.png", tab: "interior", label: "Galley Kitchen" },
  { src: "assets/cheryl_foods.jpeg", tab: "interior", label: "Fine Dining — Chef Cheryl" },
  { src: "assets/cheryl_foods1.jpeg", tab: "interior", label: "Culinary Artistry" },
  { src: "assets/cheryl_foods2.jpeg", tab: "interior", label: "Chef's Table Experience" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Salon Lounge" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Chef's Preparation" },
  { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Ensuite Bathroom" },
  { src: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Navigation Helm" },
  { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Luxury Bedding Suite" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800", tab: "interior", label: "Private Deck Lounge" },
];

const DESTINATIONS = [
  { name: "Egmont Key", img: "assets/egmont_key.jpg", desc: "A refuge for wildlife, the Tampa Bay island known as Egmont Key is home to gopher tortoises and myriad seabirds. As a refuge for visitors, Egmont Key State Park is rich in history and can be visited by private boat.", distance: "45 min", tag: "Nature & History" },
  { name: "St Petersburg Iconic Pier", img: "assets/IconicPier.jpg", desc: "The new St. Pete Pier! This gleaming attraction on the city's picturesque waterfront promises limitless fun. Its 26 beautiful acres seamlessly combine the peaceful blue waters of Tampa Bay with the vibrant greenery of downtown.", distance: "20 min", tag: "Iconic Landmark" },
  { name: "Shell Key Preserve", img: "assets/Shell_Key.jpg", desc: "Anchor in crystal turquoise waters for world-class shelling and paddleboarding. Shell Key is a pristine barrier island offering some of the most breathtaking natural scenery on the Gulf Coast.", distance: "35 min", tag: "Snorkeling & Shelling" },
  { name: "Pass-A-Grille", img: "assets/Pass_A_Grille.jpg", desc: "Enjoy a legendary sunset with a curated beach picnic delivered to your yacht. Pass-A-Grille's bohemian charm, award-winning restaurants, and historic character make it one of the Gulf's most beloved stops.", distance: "30 min", tag: "Dining & Sunset" },
  { name: "Anna Maria Island", img: "assets/Anna_Maria.jpg", desc: "Old Florida charm meets pristine beaches on Anna Maria Island. Explore the turquoise waters, dine at waterfront restaurants, and experience the laid-back luxury that defines Gulf Coast living.", distance: "60 min", tag: "Beach & Dining" },
  { name: "Honeymoon Island", img: "assets/Honeymoon_Island.jpg", desc: "One of Florida's most visited state parks, Honeymoon Island offers pristine beaches, nature trails, and some of the Gulf's best shelling. The perfect romantic or family destination.", distance: "40 min", tag: "State Park" },
];

const CHARTER_RATES = [
  { name: "Day Trip", price: "$10,000", duration: "10am – 6pm", nights: "0", guests: "Up to 12", desc: "Departs at 10am and returns by 6pm. Includes use of 2 Jet Skis & 16' Nautica RIB to visit local beaches, islands and restaurants.", highlights: ["2 Jet Skis included", "16' Nautica RIB tender", "Local beaches & islands", "Restaurant stops"], popular: false },
  { name: "Weekend Getaway", price: "$20,000", duration: "Fri noon – Sun 3pm", nights: "2", guests: "Up to 8", desc: "Departs at 12 noon on Friday and returns Sunday at 3pm. Enjoy 3 days and 2 overnights with up to 8 guests in four staterooms.", highlights: ["3 days / 2 nights", "4 private staterooms", "Sarasota to Tarpon Springs range", "Full crew included"], popular: true },
  { name: "Full Week", price: "$35,000", duration: "Mon noon – Sun 3pm", nights: "6", guests: "Up to 8", desc: "Departs at 12 noon on Monday and returns Sunday at 3pm. Enjoy 7 days and 6 overnights with up to 8 guests in four staterooms.", highlights: ["7 days / 6 nights", "4 private staterooms", "Key West to Destin FL range", "Full crew & private chef"], popular: false },
];

const SPECIAL_RATES = [
  { name: "Corporate Events", price: "$15,000", desc: "Catered by local waterfront restaurant destinations. The vessel can accommodate up to 25 guests onboard for cocktails and hors d'oeuvres for 6-hour cruises." },
  { name: "Birthdays & Anniversaries", price: "$7,500", desc: "Celebrate an intimate event with themed decor in honor of the special guest. Up to 10 people can be accommodated for a 6-hour sunset cruise." },
  { name: "Culinary & Wine Cheese Events", price: "$7,500", desc: "Enjoy a private chef-prepared meal prepared fresh in the country kitchen for up to 8 guests on a 6-hour dinner cruise." },
];

const PHOTO_COL_1: PhotoGalleryItem[] = [
  { src: "assets/occasion1.png", label: "Sunset Cruise", glowColor: "gold", tall: true },
  { src: "assets/occasion2.png", label: "Anniversary Charter", glowColor: "teal", tall: false },
  { src: "assets/hero1.png", label: "Gulf Waters", glowColor: "blue", tall: true },
  { src: "assets/cheryl_foods.jpeg", label: "Fine Dining", glowColor: "rose", tall: false },
  { src: "assets/occasion4.png", label: "Wellness Retreat", glowColor: "teal", tall: true },
];

const PHOTO_COL_2: PhotoGalleryItem[] = [
  { src: "assets/hero2.png", label: "Open Sea", glowColor: "blue", tall: false },
  { src: "assets/gallerymain.png", label: "Master Stateroom", glowColor: "gold", tall: true },
  { src: "assets/occasion3.png", label: "Corporate Event", glowColor: "teal", tall: false },
  { src: "assets/cheryl_foods1.jpeg", label: "Culinary Artistry", glowColor: "rose", tall: true },
  { src: "assets/occasion5.png", label: "VIP Suite", glowColor: "blue", tall: false },
];

const PHOTO_COL_3: PhotoGalleryItem[] = [
  { src: "assets/cheryl_foods2.jpeg", label: "Chef's Table", glowColor: "rose", tall: true },
  { src: "assets/hero3.png", label: "Starboard View", glowColor: "blue", tall: false },
  { src: "assets/occasion6.png", label: "Chef's Kitchen", glowColor: "gold", tall: true },
  { src: "assets/occasion1.png", label: "Island Hopping", glowColor: "teal", tall: false },
  { src: "assets/gallerymain.png", label: "Luxury Interior", glowColor: "gold", tall: true },
];

const GLOW_MAP: Record<PhotoGalleryItem["glowColor"], string> = {
  gold: "linear-gradient(90deg, transparent, #c9a227, transparent)",
  blue: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
  teal: "linear-gradient(90deg, transparent, #14b8a6, transparent)",
  rose: "linear-gradient(90deg, transparent, #f43f5e, transparent)",
};

const FLYBRIDGE_IMAGE_DETAILS: FlybridgeImageDetail[] = [
  {
    src: "assets/Al_FrescoDining.jpg",
    label: "",
    videoSrc: "/assets/oversized.mp4",
    title: "Oceanfront Dining Deck",
    subtitle: "Elegant Dining Experience Above Open Waters",
    description:
      "Relax aboard Serendipity’s luxurious outdoor dining deck featuring panoramic ocean views, refined seating, and a peaceful open-air atmosphere. Perfectly designed for private dining, sunset gatherings, and unforgettable moments at sea, this space blends comfort, elegance, and coastal beauty into one breathtaking experience.",
    highlights: [
      "Elegant outdoor dining setup",
      "Panoramic sea & horizon views",
      "Luxury cushioned lounge seating",
      "Perfect for sunset dinners",
      "Relaxing open-air yacht ambiance",
      "Ideal for private celebrations",
    ],
    badge: "Luxury Experience",
  },

 {
  src: "assets/Loungentertainment.jpg",
  label: "",
  videoSrc: "/assets/alfresco.mp4",
  title: "Private Yacht Escape",
  subtitle: "Luxury Dining & Relaxation Above Open Waters",
  description:
    "Enjoy a peaceful luxury yacht experience aboard Serendipity featuring elegant outdoor dining, comfortable lounge seating, and breathtaking ocean views. Surrounded by calm blue waters and refreshing sea breezes, this flybridge space creates the perfect atmosphere for private relaxation, dining, and unforgettable moments at sea.",
  highlights: [
    "Elegant outdoor dining setup",
    "Panoramic oceanfront views",
    "Luxury cushioned lounge seating",
    "Relaxing open-air atmosphere",
    "Perfect for private yacht gatherings",
    "Modern flybridge entertainment area",
  ],
  badge: "Private Escape",
},

  {
    src: "assets/Panoramic_Views.jpg",
    label: "",
    videoSrc: "/assets/cocltails.mp4",
    title: "Luxury Interior Suite",
    subtitle: "Refined Comfort with Modern Elegance",
    description:
      "Step into Serendipity’s sophisticated interior suite designed with premium finishes, elegant furnishings, and warm ambient lighting. The spacious and relaxing atmosphere creates the perfect onboard retreat for overnight stays, private relaxation, and elevated luxury yacht experiences.",
    highlights: [
      "Premium luxury interior suite",
      "Elegant modern furnishings",
      "Warm ambient lighting",
      "Comfortable private retreat",
      "Spacious relaxing atmosphere",
      "Perfect for overnight stays",
    ],
    badge: "Luxury Suite",
  },
];
const WATER_TOY_DETAILS: WaterToyDetail[] = [
  {
    icon: Zap,
    label: "2 SeaDoo Spark jet skis",
    desc: "",
    color: "#c9a227",
    badge: "Included",
    modalTitle: "SeaDoo Spark Jet Skis",
    modalSubtitle: "Twin High-Performance Personal Watercraft",
    modalDesc: "Feel the rush of twin SeaDoo Spark jet skis — two of the most agile, lightweight personal watercraft on the water.",
    modalFeatures: ["2 SeaDoo Spark units — always both available", "900 ACE engine — lightweight & responsive", "Perfect for beginners and experienced riders", "Launched from the yacht's integrated swim platform", "Life jackets & safety gear provided", "Available at all anchorages and calm water stops"],
    modalImages: ["assets/SeaDoo.jpg", "assets/SeaDoo1.jpg", "assets/SeaDoo2.jpg"],
  },
  {
    icon: Anchor,
    label: "16' Novurania Jet Drive RIB",
    desc: "",
    color: "#c9a227",
    badge: "Tender",
    modalTitle: "16' Novurania Jet Drive RIB",
    modalSubtitle: "Your Private Island-Hopping Tender",
    modalDesc: "The 16-foot Novurania Jet Drive rigid inflatable boat is Serendipity's dedicated tender, giving you the freedom to explore beaches, restaurants, and hidden coves.",
    modalFeatures: ["16-foot rigid inflatable — stable & seaworthy", "Jet drive propulsion — safe for swimmers", "Shallow water capable — beach landings easy", "Seats up to 6 guests comfortably", "Used for shore excursions, restaurant runs & exploring", "Operated by trained crew member"],
    modalImages: ["assets/Novurania.webp", "assets/Novurania1.webp", "assets/Novurania2.jpg"],
  },
  {
    icon: Waves,
    label: "Waterskiing, tubing & wakeboarding gear",
    desc: "",
    color: "#c9a227",
    badge: "Adventure",
    modalTitle: "Waterskiing, Tubing & Wakeboarding",
    modalSubtitle: "Full Tow Sports Gear Package",
    modalDesc: "Serendipity carries a full suite of tow sports equipment — from beginner-friendly tubes to performance wakeboards and water skis.",
    modalFeatures: ["Performance wakeboards with bindings", "Slalom & combo water skis", "Inflatable towable tubes — 1 & 2-person", "Full tow rope & handles included", "Crew-operated towing — always a spotter aboard", "Helmets & life jackets for all sizes provided"],
    modalImages: ["assets/Waterskiing.webp", "assets/Waterskiing1.jpeg", "assets/Waterskiing2.webp"],
  },
  {
    icon: Compass,
    label: "Snorkel sets & paddle boards",
    desc: "",
    color: "#c9a227",
    badge: "Explore",
    modalTitle: "Snorkel Sets & Paddle Boards",
    modalSubtitle: "Explore Above & Below the Surface",
    modalDesc: "Discover the vibrant underwater world of the Gulf Coast with premium snorkel sets, or glide across glassy morning water on a stand-up paddle board.",
    modalFeatures: ["Multiple full snorkel sets — mask, fin & snorkel", "Sizes available for adults and children", "Stand-up paddle boards — wide & stable design", "Ideal at Shell Key, Egmont Key & Pass-A-Grille", "Crew assists with fitting and launch", "Perfect for calm-water anchorages & sunrise paddles"],
    modalImages: ["assets/Snorkel.jpeg", "assets/Snorkel1.jpg", "assets/Snorkel2.webp"],
  },
];

// ─── Enhanced CSS (injected once) ─────────────────────────────────────────────
const ENHANCED_CSS = `
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes pulseGold {
    0%, 100% { box-shadow: 0 0 0 0 rgba(201,162,39,0); }
    50% { box-shadow: 0 0 0 10px rgba(201,162,39,0.15); }
  }
  @keyframes scanLine {
    0% { top: 0%; }
    100% { top: 100%; }
  }
  @keyframes waveFlow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes goldPing {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes borderDraw {
    from { stroke-dashoffset: 1000; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes revealMask {
    from { clip-path: inset(0 100% 0 0); }
    to { clip-path: inset(0 0% 0 0); }
  }
  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }

  .shimmer-text {
    background: linear-gradient(90deg, #c9a227 0%, #f0c040 40%, #fff 50%, #f0c040 60%, #c9a227 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .gold-shimmer-btn {
    position: relative;
    overflow: hidden;
  }
  .gold-shimmer-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transform: skewX(-20deg);
    transition: none;
  }
  .gold-shimmer-btn:hover::after {
    animation: waveFlow 0.7s ease;
  }

  .tilt-card {
    transform-style: preserve-3d;
    transition: transform 0.1s ease;
  }

  .magnetic-btn {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .reveal-line {
    animation: revealMask 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  }

  .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; }
  .cal-head { text-align: center; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.3); padding: 6px 0; text-transform: uppercase; letter-spacing: 0.15em; }
  .cal-day { text-align: center; padding: 8px 4px; font-size: 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
  .cal-day.empty { cursor: default; }
  .cal-day.available { color: rgba(255,255,255,0.7); }
  .cal-day.available:hover { background: rgba(201,162,39,0.12); color: #c9a227; transform: scale(1.1); }
  .cal-day.booked { color: rgba(255,255,255,0.15); background: rgba(255,59,48,0.08); cursor: not-allowed; text-decoration: line-through; }
  .cal-day.selected { background: #c9a227; color: #040d1a; font-weight: 700; }
  .cal-day.today { border: 1px solid rgba(201,162,39,0.5); }

  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

  .text-gold { color: #c9a227; }
  .bg-gold { background-color: #c9a227; }
  .bg-navy { background-color: #040d1a; }
  .bg-navy-light { background-color: #061226; }
  .text-navy { color: #040d1a; }
  .bg-gold-hover { background-color: #e0b62e; }
  .border-gold { border-color: #c9a227; }
  .fill-gold { fill: #c9a227; }
  .shadow-gold { --tw-shadow-color: #c9a227; }

  /* Noise overlay on hero */
  .noise-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
    mix-blend-mode: overlay;
  }

  /* Flowing gold accent line */
  .gold-accent-line {
    background: linear-gradient(90deg, transparent 0%, #c9a227 20%, #f0c040 50%, #c9a227 80%, transparent 100%);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }
`;

// ─── Global style injector ────────────────────────────────────────────────────
function StyleInjector() {
  useEffect(() => {
    const id = "serendipity-enhanced-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = ENHANCED_CSS;
      document.head.appendChild(style);
    }
  }, []);
  return null;
}

// ─── HD Video Style ───────────────────────────────────────────────────────────
const HD_VIDEO_STYLE: React.CSSProperties = {
  imageRendering: "auto",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  transform: "translateZ(0)",
  willChange: "transform",
};

// ─── Magnetic Button Hook ─────────────────────────────────────────────────────
function useMagneticEffect(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };

    const handleMouseLeave = () => {
      motionAnimate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
      motionAnimate(y, 0, { type: "spring", stiffness: 300, damping: 25 });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, x, y]);

  return { ref, x, y };
}

// ─── 3D Tilt Card Hook ────────────────────────────────────────────────────────
function useTiltEffect(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateX.set((0.5 - py) * intensity * 2);
      rotateY.set((px - 0.5) * intensity * 2);
    };
    const handleMouseLeave = () => {
      motionAnimate(rotateX, 0, { type: "spring", stiffness: 200, damping: 20 });
      motionAnimate(rotateY, 0, { type: "spring", stiffness: 200, damping: 20 });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity, rotateX, rotateY]);

  return { ref, rotateX, rotateY };
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ to, duration = 1.5, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!inView || !nodeRef.current) return;
    const controls = motionAnimate(0, to, {
      duration,
      ease: [0.17, 0.55, 0.55, 1],
      onUpdate(v) {
        if (nodeRef.current) nodeRef.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

// ─── Stagger Reveal Container ─────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] } },
};

// ─── Particle Burst on Click ──────────────────────────────────────────────────
function ParticleBurst({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  const particles = Array.from({ length: 8 }, (_, i) => i);
  useEffect(() => {
    const t = setTimeout(onDone, 800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{ position: "fixed", left: x, top: y, pointerEvents: "none", zIndex: 99999 }}>
      {particles.map((i) => {
        const angle = (i / particles.length) * 360;
        const dist = 30 + Math.random() * 20;
        const dx = Math.cos((angle * Math.PI) / 180) * dist;
        const dy = Math.sin((angle * Math.PI) / 180) * dist;
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: i % 2 === 0 ? "#c9a227" : "#f0c040",
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Hover Ripple Button ──────────────────────────────────────────────────────
function RippleButton({
  children,
  onClick,
  className,
  style,
  href,
  as: Tag = "button",
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  as?: "button" | "a";
}) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    onClick?.(e);
  };

  const props = {
    className,
    style: { ...style, position: "relative" as const, overflow: "hidden" },
    onClick: handleClick,
    ...(href ? { href } : {}),
  };

  return (
    <Tag {...props}>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ width: 0, height: 0, opacity: 0.4 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: r.x - 100,
            top: r.y - 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            pointerEvents: "none",
          }}
        />
      ))}
      {children}
    </Tag>
  );
}

// ─── Animated Section Divider ─────────────────────────────────────────────────
function GoldDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ position: "relative", height: 1, overflow: "hidden", margin: "0 0" }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, #c9a227 30%, #f0c040 50%, #c9a227 70%, transparent)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}

// ─── Text Reveal Animation ────────────────────────────────────────────────────
function RevealText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
      <motion.span
        className={className}
        initial={{ y: "100%" }}
        animate={{ y: inView ? "0%" : "100%" }}
        transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// ─── FIXED: FlybridgeImageModal ───────────────────────────────────────────────

function FlybridgeImageModal({
  detail,
  onClose,
}: {
  detail: FlybridgeImageDetail;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // ─── DYNAMIC CONTENT ─────────────────────────────────────
 const modalContent =
  detail.title?.toLowerCase().includes("cocktail") ||
  detail.title?.toLowerCase().includes("bar")
    ? {
        // COCKTAIL / BAR (keep title)
        title: "Wet Bar for Handcrafted Cocktails",
        label: "Elegant Flybridge Cocktail Experience",
        description:
          "Enjoy a refined onboard cocktail experience at Serendipity’s flybridge wet bar. Designed for relaxation and social moments, this space allows guests to unwind with handcrafted drinks, premium refreshments, and a luxurious lounge atmosphere while surrounded by stunning ocean views.",
        included: [
          "Flybridge wet bar setup",
          "Handcrafted cocktail service area",
          "Premium beverage selection & refreshment station",
          "Relaxed social lounge ambiance",
          "Ideal for sunset drinks & gatherings",
          "Private luxury yacht bar experience",
        ],
      }
    : detail.title?.toLowerCase().includes("dining")
    ? {
        // DINING (keep title)
        title: "Oversized chaise lounges for sunbathing",
        label: "Luxury Open-Air Dining Experience",
        description:
          "Experience elegant open-air dining aboard Serendipity’s flybridge, where every meal is complemented by panoramic ocean views and fresh sea breezes. The space is designed for comfort and sophistication, making it perfect for breakfast, lunch, and sunset dining at sea.",
        included: [
          "Elegant flybridge dining setup",
          "Panoramic ocean-view dining area",
          "Comfortable luxury seating arrangement",
          "Refined table setting experience",
          "Perfect for all-day dining & sunset meals",
          "Private open-air dining ambiance",
        ],
      }
    : {
        // SUN LOUNGING (keep title)
        title: "Al Fresco Dining with Ocean Views",
        label: "Ultimate Comfort & Sunbathing Experience",
        description:
          "Unwind on Serendipity’s spacious flybridge sun loungers designed for pure relaxation and ocean views. Enjoy the sun, sea breeze, and peaceful cruising atmosphere from oversized cushioned lounges made for ultimate comfort at sea.",
        included: [
          "Premium oversized sun loungers",
          "Panoramic ocean-view relaxation space",
          "Cushioned luxury seating comfort",
          "Open-air flybridge experience",
          "Perfect for sunbathing & lounging",
          "Private luxury relaxation zone",
        ],
      };

  useEffect(() => {
    const vid = videoRef.current;

    if (!vid) return;

    vid.currentTime = 0;

    vid.play().catch(() => {});
  }, [detail]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    const vid = videoRef.current;

    if (!vid) return;

    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[10030] flex items-center justify-center p-4 md:p-8"
      style={{
        background: "rgba(2,5,15,0.97)",
        backdropFilter: "blur(28px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.88, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10"
        style={{
          background:
            "linear-gradient(145deg, #060e1e 0%, #040d1a 100%)",
          maxHeight: "92vh",
          boxShadow:
            "0 0 100px rgba(201,162,39,0.12), 0 50px 140px rgba(0,0,0,0.85)",
        }}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-white/30 hover:text-white transition-colors rounded-xl hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className="overflow-y-auto scrollbar-hide"
          style={{ maxHeight: "92vh" }}
        >
          {/* VIDEO HEADER */}
          <div
            className="relative w-full overflow-hidden"
            style={{ height: 320 }}
          >
            <video
              ref={videoRef}
              src={detail.videoSrc}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                ...HD_VIDEO_STYLE,
                filter: "brightness(0.65) saturate(1.15)",
              }}
            />

            {/* OVERLAY */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(6,14,30,0.15) 0%, transparent 30%, rgba(6,14,30,0.98) 100%)",
              }}
            />

            <div className="gold-accent-line absolute top-0 left-0 right-0 h-[2px]" />

            {/* BADGE */}
            <div
              className="absolute top-5 left-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{
                background: "rgba(201,162,39,0.92)",
              }}
            >
              <Star className="w-3 h-3 text-[#040d1a]" />

              <span className="text-[9px] font-bold uppercase tracking-widest text-[#040d1a]">
                PRIVATE ESCAPE
              </span>
            </div>

            {/* PLAY BUTTON */}
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="absolute top-4 right-14 z-10 w-9 h-9 rounded-full flex items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:border-gold/50 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </motion.button>

            {/* LIVE */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute top-[52px] right-14 flex items-center gap-1.5 px-2 py-1 rounded-full"
                  style={{
                    background: "rgba(201,162,39,0.85)",
                  }}
                >
                  <Play className="w-2 h-2 text-[#040d1a] fill-current" />

                  <span className="text-[7px] font-bold uppercase tracking-widest text-[#040d1a]">
                    Live
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TITLE */}
            <div className="absolute bottom-6 left-7 z-10 max-w-3xl">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-px bg-[#c9a227]" />

                <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#c9a227]/80">
                  Flybridge Experience
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-2xl leading-tight">
                {modalContent.title}
              </h2>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-10">
            {/* LABEL */}
            <p
              className="text-[10px] font-bold uppercase tracking-[3px] mb-4"
              style={{
                color: "#c9a227",
              }}
            >
              {modalContent.label}
            </p>

            {/* DESCRIPTION */}
            <p className="text-sm text-white/65 leading-relaxed mb-8">
              {modalContent.description}
            </p>

            {/* INCLUDED */}
            <div
              className="rounded-2xl p-6 mb-8"
              style={{
                background: "rgba(201,162,39,0.04)",
                border: "1px solid rgba(201,162,39,0.12)",
              }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#c9a227]/70 mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-[#c9a227]/50" />
                What's Included
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {modalContent.included.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: "rgba(201,162,39,0.15)",
                      }}
                    >
                      <Check className="w-3 h-3 text-[#c9a227]" />
                    </div>

                    <span className="text-xs text-white/65 leading-relaxed">
                      {h}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border transition-all hover:bg-[#c9a227]/10"
                style={{
                  borderColor: "rgba(201,162,39,0.35)",
                  color: "#c9a227",
                }}
              >
                <Phone className="w-4 h-4" />

                Inquire About This
              </a>

              <a
                href="/book"
                onClick={onClose}
                className="gold-shimmer-btn flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:translate-y-[-1px]"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a227, #f0c040)",
                  color: "#040d1a",
                }}
              >
                Book Your Charter

                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
// ─── Flybridge Thumbnail ──────────────────────────────────────────────────────
function FlybridgeThumbnail({ detail, isActive, onClick, onActivate }: { detail: FlybridgeImageDetail; isActive: boolean; onClick: () => void; onActivate: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    hoverTimeoutRef.current = setTimeout(() => onActivate(), 80);
    const vid = videoRef.current;
    if (vid) { vid.currentTime = 0; vid.play().catch(() => {}); }
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    const vid = videoRef.current;
    if (vid) { vid.pause(); vid.currentTime = 0; }
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="relative rounded-xl overflow-hidden transition-all duration-300 group"
      style={{
        aspectRatio: "16/10",
        border: isActive ? "2px solid #c9a227" : "2px solid rgba(255,255,255,0.08)",
        opacity: isActive ? 1 : 0.5,
        cursor: "pointer",
      }}
    >
      <img src={detail.src} alt={detail.label} className="w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover:scale-105"
        style={{ opacity: isHovered && detail.videoSrc ? 0 : 1 }} />
      {detail.videoSrc && (
        <video ref={videoRef} src={detail.videoSrc} muted loop playsInline preload="metadata"
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0, ...HD_VIDEO_STYLE }} />
      )}
      <div className="absolute inset-0 transition-opacity duration-200"
        style={{ background: isHovered ? "linear-gradient(to top, rgba(4,13,26,0.7) 0%, transparent 60%)" : "rgba(0,0,0,0.2)", opacity: 1 }} />
      {detail.videoSrc && isHovered && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(201,162,39,0.9)" }}>
          <Play className="w-2 h-2 fill-current text-[#040d1a]" />
        </motion.div>
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-1">
        <Info className="w-2.5 h-2.5 text-white/70 flex-shrink-0" />
        <span className="text-[7px] font-semibold text-white/70 truncate">{detail.label}</span>
      </motion.div>
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 gold-accent-line" />
      )}
    </motion.button>
  );
}

// ─── Water Toy Modal ──────────────────────────────────────────────────────────
function WaterToyModal({ toy, onClose }: { toy: WaterToyDetail; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveImg((p) => (p + 1) % toy.modalImages.length), 4000);
    return () => clearInterval(t);
  }, [toy.modalImages.length]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[10020] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(2,5,15,0.96)", backdropFilter: "blur(24px)" }}>
      <motion.div initial={{ scale: 0.88, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.88, y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }} onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl overflow-hidden border border-white/10"
        style={{ background: "linear-gradient(145deg, #060e1e 0%, #040d1a 100%)", maxHeight: "92vh", boxShadow: "0 0 80px rgba(201,162,39,0.1), 0 40px 120px rgba(0,0,0,0.8)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 text-white/30 hover:text-white transition-colors rounded-xl hover:bg-white/5"><X className="w-5 h-5" /></button>
        <div className="overflow-y-auto scrollbar-hide" style={{ maxHeight: "92vh" }}>
          <div className="relative w-full overflow-hidden" style={{ height: 260 }}>
            <AnimatePresence mode="wait">
              <motion.img key={activeImg} src={toy.modalImages[activeImg]} alt={toy.modalTitle}
                className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }} style={{ filter: "brightness(0.75) saturate(1.1)" }} />
            </AnimatePresence>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(6,14,30,0.3) 0%, transparent 40%, rgba(6,14,30,0.98) 100%)" }} />
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(201,162,39,0.9)" }}>
              <toy.icon className="w-3 h-3 text-[#040d1a]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#040d1a]">{toy.badge}</span>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              {toy.modalImages.map((_, i) => (
                <motion.button key={i} onClick={() => setActiveImg(i)} animate={{ width: activeImg === i ? 24 : 8, background: activeImg === i ? "#c9a227" : "rgba(255,255,255,0.35)" }} className="h-1 rounded-full transition-all duration-300" />
              ))}
            </div>
            <div className="absolute bottom-6 left-6 z-10">
              <div className="flex items-center gap-2 mb-1"><div className="w-5 h-px bg-[#c9a227]" /><span className="text-[9px] font-bold uppercase tracking-[3px] text-[#c9a227]/80">Onboard Equipment</span></div>
              <h2 className="text-2xl md:text-3xl font-serif text-white drop-shadow-2xl leading-tight">{toy.modalTitle}</h2>
            </div>
          </div>
          <div className="p-6 md:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[3px] mb-4" style={{ color: "#c9a227" }}>{toy.modalSubtitle}</p>
            <p className="text-sm text-white/65 leading-relaxed mb-8">{toy.modalDesc}</p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {toy.modalImages.map((src, i) => (
                <motion.button key={i} onClick={() => setActiveImg(i)} whileHover={{ scale: 1.05 }} className="relative rounded-xl overflow-hidden transition-all duration-300"
                  style={{ aspectRatio: "16/10", border: activeImg === i ? "2px solid #c9a227" : "2px solid rgba(255,255,255,0.08)", opacity: activeImg === i ? 1 : 0.5 }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
            <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(201,162,39,0.04)", border: "1px solid rgba(201,162,39,0.12)" }}>
              <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#c9a227]/70 mb-5 flex items-center gap-2"><span className="w-4 h-px bg-[#c9a227]/50" /> What's Included</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {toy.modalFeatures.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(201,162,39,0.15)" }}>
                      <Check className="w-3 h-3 text-[#c9a227]" />
                    </div>
                    <span className="text-xs text-white/65 leading-relaxed">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contact" onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border transition-all hover:bg-[#c9a227]/10"
                style={{ borderColor: "rgba(201,162,39,0.35)", color: "#c9a227" }}>
                <Phone className="w-4 h-4" /> Ask About This
              </a>
              <a href="/book" onClick={onClose} className="gold-shimmer-btn flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: "linear-gradient(135deg, #c9a227, #f0c040)", color: "#040d1a" }}>
                Book Your Charter <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


// ─── Mobile Components ────────────────────────────────────────────────────────
function MobileBottomNav({ openAvail }: { openAvail: () => void }) {
  const [active, setActive] = useState("home");

  const navItems = [
    { id: "home", icon: Home, label: "Home", href: "#home" },
    { id: "experiences", icon: Waves, label: "Explore", href: "#experiences" },
    { id: "booking", icon: Anchor, label: "Book", href: "/book", isExternal: true, isPrimary: true },
    { id: "accommodations", icon: Building, label: "Rooms", href: "#accommodations" },
    { id: "pricing", icon: DollarSign, label: "Pricing", href: "#pricing" },
  ];

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[999]"
      style={{
        background: "rgba(4, 13, 26, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(201, 162, 39, 0.15)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => !item.isExternal && setActive(item.id)}
            className="flex flex-col items-center gap-1 relative group"
            style={{ minWidth: 56, padding: "4px 8px" }}
          >
            {item.isPrimary ? (
              <motion.div
                whileTap={{ scale: 0.92 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #c9a227, #f0c040)",
                  boxShadow: "0 0 20px rgba(201,162,39,0.4)",
                  marginTop: -20,
                }}
              >
                <item.icon className="w-5 h-5 text-navy" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                whileTap={{ scale: 0.88 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: active === item.id ? "rgba(201,162,39,0.15)" : "transparent",
                }}
              >
                <item.icon
                  className="w-5 h-5 transition-colors"
                  style={{
                    color: active === item.id ? "#c9a227" : "rgba(255,255,255,0.4)",
                  }}
                />
              </motion.div>
            )}
            <span
              className="text-[9px] font-bold tracking-wide uppercase transition-colors"
              style={{
                color: item.isPrimary
                  ? "#c9a227"
                  : active === item.id
                  ? "#c9a227"
                  : "rgba(255,255,255,0.3)",
                marginTop: item.isPrimary ? 2 : 0,
              }}
            >
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function MobileHeroStats() {
  const stats = [{ val: "94'", label: "Lazzara" }, { val: "Sleeps 12", label: "Staterooms" }, { val: "5.0★", label: "Rating" }, { val: "20+", label: "Spots" }];
  return (
    <div className="flex items-center justify-between scrollbar-hide">
      {stats.map((s, i) => (
        <div key={i} className="flex-1 flex flex-col items-center px-1 py-2"
          style={{ scrollSnapAlign: "start", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
          <span className="text-[11px] text-gold font-bold leading-none">{s.val}</span>
          <span className="text-[8px] uppercase tracking-[1px] text-white/40 mt-0.5">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function MobileQuickActions({ openAvail, openVideo, openRoute }: { openAvail: () => void; openVideo: () => void; openRoute: () => void }) {
  const actions = [
    { label: "Check Dates", icon: Clock, action: openAvail, color: "rgba(201,162,39,0.15)", textColor: "#c9a227" },
    { label: "Watch Video", icon: Play, action: openVideo, color: "rgba(255,255,255,0.06)", textColor: "rgba(255,255,255,0.7)" },
    { label: "View Route", icon: Compass, action: openRoute, color: "rgba(255,255,255,0.06)", textColor: "rgba(255,255,255,0.7)" },
  ];
  return (
    <div className="flex gap-1.5 px-0 mt-2">
      {actions.map((a, i) => (
        <motion.button key={i} whileTap={{ scale: 0.94 }} onClick={a.action} className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border"
          style={{ background: a.color, borderColor: a.textColor === "#c9a227" ? "rgba(201,162,39,0.3)" : "rgba(255,255,255,0.08)" }}>
          <a.icon className="w-3 h-3" style={{ color: a.textColor }} />
          <span className="text-[10px] font-bold tracking-wide" style={{ color: a.textColor }}>{a.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

function MobilePricingCard({ rate }: { rate: (typeof CHARTER_RATES)[0] }) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} className="w-full rounded-3xl overflow-hidden"
      style={{ background: rate.popular ? "linear-gradient(145deg, rgba(201,162,39,0.12) 0%, rgba(4,13,26,0.8) 100%)" : "rgba(255,255,255,0.04)", border: rate.popular ? "1px solid rgba(201,162,39,0.35)" : "1px solid rgba(255,255,255,0.08)" }}>
      {rate.popular && (<div className="flex justify-center pt-0"><span className="text-[9px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-b-xl" style={{ background: "#c9a227", color: "#040d1a" }}>Most Popular</span></div>)}
      <div className="p-5">
        <h3 className="text-lg mb-1">{rate.name}</h3>
        <div className="flex items-baseline gap-1 mb-4"><span className="text-3xl font-serif text-gold font-bold">{rate.price}</span><span className="text-white/30 text-xs">/ charter</span></div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 text-white/40 text-[10px] bg-white/5 rounded-full px-2.5 py-1"><Clock className="w-3 h-3 text-gold/60" /> {rate.duration}</div>
          <div className="flex items-center gap-1 text-white/40 text-[10px] bg-white/5 rounded-full px-2.5 py-1"><Users className="w-3 h-3 text-gold/60" /> {rate.guests}</div>
        </div>
        <div className="space-y-2 mb-5">
          {rate.highlights.slice(0, 3).map((h, j) => (
            <div key={j} className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0"><Check className="w-2.5 h-2.5 text-gold" /></div><span className="text-xs text-white/50">{h}</span></div>
          ))}
        </div>
        <a href="/book" className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all"
          style={{ background: rate.popular ? "#c9a227" : "rgba(255,255,255,0.06)", color: rate.popular ? "#040d1a" : "rgba(255,255,255,0.6)", border: rate.popular ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
          Book {rate.name} <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

function MobileDestCard({ dest, onTap }: { dest: (typeof DESTINATIONS)[0]; onTap: () => void }) {
  return (
    <motion.div whileTap={{ scale: 0.96 }} onClick={onTap} className="flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer" style={{ width: 200, height: 260 }}>
      <div className="relative w-full h-full">
        <img src={dest.img} className="w-full h-full object-cover" alt={dest.name} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,13,26,0.9) 0%, transparent 55%)" }} />
        <div className="absolute top-3 left-3"><span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: "rgba(201,162,39,0.85)", color: "#040d1a" }}>{dest.tag}</span></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-sm text-white leading-snug">{dest.name}</p>
          <div className="flex items-center gap-1 mt-1 text-white/40"><Clock className="w-2.5 h-2.5" /><span className="text-[9px]">{dest.distance}</span></div>
        </div>
      </div>
    </motion.div>
  );
}

function CalendarComponent({ onSelect }: { onSelect: (date: string) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1));
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const bookedDays = [3, 7, 8, 14, 21, 22, 27];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const daysHeader = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const changeMonth = (dir: number) => setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
  const toggleDay = (d: number, isBooked: boolean) => {
    if (isBooked) return;
    const dateStr = `${d} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    setSelectedDays((prev) => { const idx = prev.indexOf(d); if (idx === -1) { onSelect(dateStr); return [...prev, d]; } return prev.filter((day) => day !== d); });
  };
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const today = new Date();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 text-white/50 hover:text-white"><ChevronLeft className="w-5 h-5" /></motion.button>
        <span className="text-lg">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => changeMonth(1)} className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10 text-white/50 hover:text-white"><ChevronRight className="w-5 h-5" /></motion.button>
      </div>
      <div className="cal-grid">
        {daysHeader.map((h) => (<div key={h} className="cal-head">{h}</div>))}
        {Array.from({ length: firstDay }).map((_, i) => (<div key={`empty-${i}`} className="cal-day empty" />))}
        {Array.from({ length: totalDays }).map((_, i) => {
          const d = i + 1;
          const isToday = d === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
          const isBooked = bookedDays.includes(d);
          const isSelected = selectedDays.includes(d);
          return (<div key={d} onClick={() => toggleDay(d, isBooked)} className={`cal-day ${isBooked ? "booked" : isSelected ? "selected" : "available"} ${isToday && !isBooked ? "today" : ""}`}>{d}</div>);
        })}
      </div>
    </div>
  );
}

// ─── Charter Highlights Modal ─────────────────────────────────────────────────
function CharterHighlightsModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[10010] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(2,5,15,0.96)", backdropFilter: "blur(24px)" }}>
      <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }} onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10"
        style={{ background: "#060e1e", maxHeight: "92vh", boxShadow: "0 0 80px rgba(201,162,39,0.08), 0 40px 120px rgba(0,0,0,0.8)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 text-white/30 hover:text-white transition-colors rounded-xl hover:bg-white/5"><X className="w-5 h-5" /></button>
        <div className="overflow-y-auto" style={{ maxHeight: "92vh" }}>
          <div className="relative flex-shrink-0" style={{ height: 240 }}>
            <video className="w-full h-full object-cover" src="/assets/videos.mp4" autoPlay muted loop playsInline style={{ pointerEvents: "none", filter: "brightness(0.55) saturate(1.1)", ...HD_VIDEO_STYLE }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,30,0.4) 0%, transparent 40%, rgba(6,14,30,0.98) 100%)" }} />
            <div className="gold-accent-line absolute top-0 left-0 right-0 h-[2px]" />
            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
              <div className="flex items-center justify-center gap-3 mb-2"><div className="w-8 h-px bg-gold/50" /><span className="text-[9px] font-bold uppercase tracking-[3px] text-gold/70">Overnight or Day Charter</span><div className="w-8 h-px bg-gold/50" /></div>
              <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-2xl">Charter Highlights</h2>
            </div>
          </div>
          <div className="p-6 md:p-10">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {[
                { icon: MapPin, text: "Based in Saint Petersburg, perfectly located between Tampa and Sarasota", color: "#c9a227" },
                { icon: Compass, text: "Unmatched flexibility with access to Gulf and Intercoastal routes", color: "#3b82f6" },
                { icon: Ship, text: "Exceptionally rare 100ft yacht with shallow draft—access exclusive spots", color: "#14b8a6" },
                { icon: Sparkles, text: "Newly remodeled interior with crewed, concierge-level service", color: "#f43f5e" },
                { icon: Navigation, text: "Convenient access from major airports and marinas", color: "#a855f7" },
              ].map((item, i) => (
                <motion.div key={i} variants={staggerItem} whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all cursor-default"
                  style={{ background: `${item.color}06`, border: `1px solid ${item.color}15` }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15` }}><item.icon className="w-4 h-4" style={{ color: item.color }} /></div>
                  <p className="text-sm text-white/70 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
            <div className="grid grid-cols-4 gap-3 mb-8 p-5 rounded-2xl" style={{ background: "rgba(201,162,39,0.05)", border: "1px solid rgba(201,162,39,0.12)" }}>
              {[{ val: 94, suffix: " ft", label: "Vessel" }, { val: 12, suffix: " guests", label: "Capacity" }, { val: 4, suffix: "", label: "Suites" }, { val: 5, suffix: "★", label: "Rating" }].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="text-center">
                  <div className="text-xl text-gold font-bold"><AnimatedCounter to={s.val} suffix={s.suffix} /></div>
                  <div className="text-[9px] uppercase tracking-[2px] text-white/30 mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contact" onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border border-gold/40 text-gold hover:bg-gold/10 transition-all"><Phone className="w-4 h-4" /> Contact for Custom Itineraries</a>
              <a href="/book" onClick={onClose} className="gold-shimmer-btn flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:translate-y-[-1px]"
                style={{ background: "linear-gradient(135deg, #c9a227, #f0c040)", color: "#040d1a" }}>
                Book Now <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── FIX 2: Removed stray "/" before "function FlybridgeSection" ──────────────
function FlybridgeSection({ onTourClick }: { onTourClick: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedDetail, setSelectedDetail] = useState<FlybridgeImageDetail | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { ref: btnRef, x: btnX, y: btnY } = useMagneticEffect(0.4);

  const flyVideos = [
    { videoSrc: "/assets/oversized.mp4", detail: FLYBRIDGE_IMAGE_DETAILS[0] },
    { videoSrc: "/assets/alfresco.mp4", detail: FLYBRIDGE_IMAGE_DETAILS[1] },
    { videoSrc: "/assets/cocltails.mp4", detail: FLYBRIDGE_IMAGE_DETAILS[2] },
  ];

  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeImg) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeImg]);

  const handleVideoEnded = () => {
    setActiveImg((p) => (p + 1) % flyVideos.length);
  };

  const features = [
    { icon: Droplets, text: "A hot/cold Jacuzzi" },
    { icon: Wind, text: "Oversized chaise lounges for sunbathing" },
    { icon: Utensils, text: "Al fresco dining with ocean views" },
    { icon: GlassWater, text: "Wet bar for handcrafted cocktails" },
  ];

  const currentDetail = flyVideos[activeImg].detail;

  return (
    <>
      <section
        id="flybridge"
        ref={sectionRef}
        className="py-2 md:py-5 px-4 md:px-8 lg:px-16 relative overflow-hidden"
        style={{ background: "linear-gradient(to top, #0b1929, transparent)" }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* LEFT: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -40 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: "#c9a227" }} />
                <span className="text-[10px] font-bold uppercase tracking-[4px]" style={{ color: "#c9a227" }}>
                  Luxury Living
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-8">
                Expansive<br />
                <em className="italic shimmer-text">Flybridge</em>
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#c9a227] mb-6">
                  Flybridge Experience
                </p>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  className="grid grid-cols-2 gap-x-8 gap-y-4"
                >
                  {features.map((item, i) => (
                    <motion.div key={i} variants={staggerItem} className="flex items-center gap-3 group">
                      <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.4 }}>
                        <Check className="w-3.5 h-3.5" style={{ color: "#c9a227" }} />
                      </motion.div>
                      <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <p className="text-sm leading-relaxed mb-8 max-w-md text-white/50">
                This elevated space offers 360° sightlines for exploring the waters between Saint Petersburg, Tampa, and Sarasota.
              </p>
              <motion.button
                ref={btnRef as any}
                onClick={onTourClick}
                style={{ x: btnX, y: btnY, background: "#c9a227", color: "#050a10" } as any}
                whileTap={{ scale: 0.95 }}
                className="gold-shimmer-btn inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold transition-all shadow-xl shadow-black/40"
              >
                Tour Serendipity
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </motion.div>

            {/* RIGHT: Video Player */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 40 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div
                className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.55)] border border-white/5"
                style={{ aspectRatio: "16/10" }}
              >
                {flyVideos.map((item, i) => (
                  <video
                    key={i}
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={item.videoSrc}
                    muted
                    playsInline
                    preload="metadata"
                    onEnded={handleVideoEnded}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{
                      opacity: activeImg === i ? 1 : 0,
                      pointerEvents: "none",
                      ...HD_VIDEO_STYLE,
                    }}
                  />
                ))}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent 45%)" }}
                />
                <div className="absolute top-5 right-5 flex gap-2 z-10">
                  {flyVideos.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      animate={{
                        width: activeImg === i ? 24 : 8,
                        background: activeImg === i ? "#c9a227" : "rgba(255,255,255,0.35)",
                      }}
                      className="h-1 rounded-full transition-all"
                    />
                  ))}
                </div>
                <AnimatePresence>
                  <motion.div
                    key={activeImg}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full z-10"
                    style={{ background: "rgba(201,162,39,0.85)" }}
                  >
                    <Play className="w-2.5 h-2.5 text-[#040d1a] fill-current" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#040d1a]">
                      Playing {activeImg + 1} / {flyVideos.length}
                    </span>
                  </motion.div>
                </AnimatePresence>
                <button
                  onClick={() => setSelectedDetail(currentDetail)}
                  className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:border-gold/50 transition-all text-[10px] font-bold uppercase tracking-widest"
                >
                  <Info className="w-3 h-3" /> Details
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {flyVideos.map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative rounded-2xl overflow-hidden group"
                    style={{
                      aspectRatio: "16/10",
                      border: activeImg === i ? "2px solid #c9a227" : "2px solid rgba(255,255,255,0.08)",
                      opacity: activeImg === i ? 1 : 0.5,
                      transition: "opacity 0.3s, border-color 0.3s",
                    }}
                  >
                    <video
                      src={item.videoSrc}
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                      style={{ pointerEvents: "none" }}
                    />
                    {activeImg === i && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 gold-accent-line" />
                    )}
                    {activeImg !== i && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <Play className="w-4 h-4 text-white/60 fill-current" />
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute bottom-1.5 left-1.5 right-1.5"
                    >
                      <span className="text-[7px] font-semibold text-white/80 truncate block">
                        {item.detail.title}
                      </span>
                    </motion.div>
                    {activeImg === i && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(201,162,39,0)",
                            "0 0 0 4px rgba(201,162,39,0.2)",
                            "0 0 0 0 rgba(201,162,39,0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedDetail && (
          <FlybridgeImageModal detail={selectedDetail} onClose={() => setSelectedDetail(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Water Toys Section ───────────────────────────────────────────────────────
function WaterToysSection() {
  const [activeImg, setActiveImg] = useState(0);
  const [hoveredToy, setHoveredToy] = useState<number | null>(null);
  const [selectedToy, setSelectedToy] = useState<WaterToyDetail | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const toyImages = [
    { src: "assets/waterboy1.webp", label: "", videoSrc: "/assets/watertoy.mp4" },
    { src: "assets/waterboy2.webp", label: "", videoSrc: "/assets/watertoy2.mp4" },
    { src: "assets/waterboy3.webp", label: "", videoSrc: "/assets/watertoy3.mp4" },
  ];

  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeImg) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeImg]);

  const handleVideoEnded = () => {
    setActiveImg((p) => (p + 1) % toyImages.length);
  };

  return (
    <>
      <section id="water-toys" ref={sectionRef} className="py-2 md:py-5 px-4 md:px-8 lg:px-16 relative overflow-hidden" style={{ background: "#051126" }}>
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at top right, rgba(201,162,39,0.25), transparent 35%)" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }} transition={{ duration: 0.8 }}>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.05]">Water Toys<br />
                <span className="text-white/40 font-light">Included for Your</span><br />
                <em className="italic shimmer-text">Enjoyment</em>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }} transition={{ duration: 0.8, delay: 0.1 }} className="lg:max-w-[320px] lg:pt-2">
              <p className="text-white/45 text-sm md:text-[15px] leading-relaxed lg:text-right">Adventure meets luxury with a full suite of water sports gear:</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* LEFT: Video Player */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -40 }} transition={{ duration: 0.8 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.55)] border border-white/5" style={{ aspectRatio: "16/10" }}>
                {toyImages.map((item, i) => (
                  <video
                    key={i}
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={item.videoSrc}
                    muted
                    playsInline
                    preload="metadata"
                    onEnded={handleVideoEnded}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: activeImg === i ? 1 : 0, pointerEvents: "none", ...HD_VIDEO_STYLE }}
                  />
                ))}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent 45%)" }} />
                <div className="absolute top-5 right-5 flex gap-2 z-10">
                  {toyImages.map((_, i) => (
                    <motion.button key={i} onClick={() => setActiveImg(i)}
                      animate={{ width: activeImg === i ? 24 : 8, background: activeImg === i ? "#c9a227" : "rgba(255,255,255,0.35)" }}
                      className="h-1 rounded-full transition-all" />
                  ))}
                </div>
                <AnimatePresence>
                  <motion.div key={activeImg} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full z-10"
                    style={{ background: "rgba(201,162,39,0.85)" }}>
                    <Play className="w-2.5 h-2.5 text-[#040d1a] fill-current" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#040d1a]">Playing {activeImg + 1} / {toyImages.length}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {toyImages.map((img, i) => (
                  <motion.button key={i} onClick={() => setActiveImg(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                    className="relative rounded-2xl overflow-hidden group"
                    style={{ aspectRatio: "16/10", border: activeImg === i ? "2px solid #c9a227" : "2px solid rgba(255,255,255,0.08)", opacity: activeImg === i ? 1 : 0.5, transition: "opacity 0.3s, border-color 0.3s" }}>
                    <video src={img.videoSrc} muted playsInline preload="metadata" className="w-full h-full object-cover" style={{ pointerEvents: "none" }} />
                    {activeImg === i && <div className="absolute bottom-0 left-0 right-0 h-0.5 gold-accent-line" />}
                    {activeImg !== i && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <Play className="w-4 h-4 text-white/60 fill-current" />
                      </div>
                    )}
                    {activeImg === i && (
                      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
                        animate={{ boxShadow: ["0 0 0 0 rgba(201,162,39,0)", "0 0 0 4px rgba(201,162,39,0.2)", "0 0 0 0 rgba(201,162,39,0)"] }}
                        transition={{ duration: 2, repeat: Infinity }} />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Amenities List */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: "#c9a227" }} />
                <span className="text-[10px] font-bold uppercase tracking-[4px]" style={{ color: "#c9a227" }}>Onboard Amenities</span>
              </div>
              <div className="space-y-3 mb-10">
                {WATER_TOY_DETAILS.map((toy, i) => (
                  <motion.div key={i} onMouseEnter={() => setHoveredToy(i)} onMouseLeave={() => setHoveredToy(null)}
                    whileHover={{ x: 6, scale: 1.01 }} onClick={() => setSelectedToy(toy)}
                    className="flex items-center gap-5 p-4 rounded-2xl transition-all border cursor-pointer group relative overflow-hidden"
                    style={{ background: hoveredToy === i ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", borderColor: hoveredToy === i ? "rgba(201,162,39,0.3)" : "rgba(255,255,255,0.05)" }}>
                    {hoveredToy === i && (
                      <motion.div initial={{ x: "-100%", opacity: 0.3 }} animate={{ x: "200%", opacity: 0 }} transition={{ duration: 0.6 }}
                        style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.1), transparent)", pointerEvents: "none" }} />
                    )}
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ background: hoveredToy === i ? "rgba(201,162,39,0.15)" : "rgba(255,255,255,0.05)" }}>
                      <motion.div animate={{ rotate: hoveredToy === i ? 360 : 0 }} transition={{ duration: 0.5 }}>
                        <toy.icon className="w-5 h-5 transition-colors" style={{ color: hoveredToy === i ? "#c9a227" : "#666" }} />
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-white group-hover:text-white transition-colors">{toy.label}</div>
                      <div className="text-xs text-white/40 mt-0.5">{toy.desc}</div>
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
                      <motion.span animate={{ opacity: hoveredToy === i ? 0.8 : 0 }} className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#c9a227" }}>Details</motion.span>
                      <motion.div animate={{ x: hoveredToy === i ? 0 : -4, opacity: hoveredToy === i ? 1 : 0.2 }}>
                        <ArrowUpRight className="w-4 h-4" style={{ color: "#c9a227" }} />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-white/45 text-sm md:text-[15px] leading-relaxed mb-8 max-w-lg">
                Whether anchored at Egmont Key, cruising near Longboat Pass, or playing off the shores of St. Pete Beach, the Serendipity experience ensures you're always ready for adventure.
              </p>
              <motion.a href="/book" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.96 }}
                className="gold-shimmer-btn inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-bold transition-all shadow-xl shadow-black/40"
                style={{ background: "#c9a227", color: "#050a10" }}>
                Plan Your Experience <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedToy && <WaterToyModal toy={selectedToy} onClose={() => setSelectedToy(null)} />}
      </AnimatePresence>
    </>
  );
}

// ─── Room Detail Modal ────────────────────────────────────────────────────────
function RoomDetailModal({ room, onClose }: { room: Room; onClose: () => void }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="max-w-3xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <motion.img src={room.img} alt={room.title} className="w-full h-full object-cover"
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
        <div className="absolute top-4 left-4"><span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: "rgba(201,162,39,0.9)", color: "#040d1a" }}>{room.sub}</span></div>
        <div className="gold-accent-line absolute bottom-0 left-0 right-0 h-[1px]" />
      </div>
      <div className="p-6 md:p-10">
        <div className="flex items-center gap-3 mb-2"><div className="w-8 h-[1px] bg-gold" /><span className="text-[9px] uppercase tracking-[3px] text-gold/60 font-bold">{room.sub} Suite</span></div>
        <h2 className="text-2xl md:text-3xl font-serif mb-3">{room.title}</h2>
        <p className="text-sm text-white/60 mb-6 leading-relaxed">{room.desc}</p>
        <h3 className="text-xs font-bold uppercase tracking-[2px] text-gold/70 mb-3 flex items-center gap-2"><span className="w-4 h-px bg-gold/40" /> Key Features</h3>
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {room.amenities.map((a, i) => (
            <motion.div key={i} variants={staggerItem} className="flex items-center gap-3 p-3 bg-white/5 border border-white/8 rounded-xl">
              <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-gold" /></div>
              <span className="text-xs text-white/70">{a}</span>
            </motion.div>
          ))}
        </motion.div>
        {room.extraAmenities && room.extraAmenities.length > 0 && (
          <div className="mb-6">
            <AnimatePresence>
              {showMore && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                  <div className="mt-2 mb-4">
                    {room.bathDesc && (<div className="p-4 rounded-2xl mb-4" style={{ background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.15)" }}><p className="text-[10px] uppercase tracking-[2px] text-gold/60 font-bold mb-2">Ensuite Bath</p><p className="text-xs text-white/60 leading-relaxed">{room.bathDesc}</p></div>)}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {room.extraAmenities.map((a, i) => (<motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex items-start gap-3 p-3 bg-white/3 border border-white/6 rounded-xl"><div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" /><span className="text-xs text-white/55 leading-relaxed">{a}</span></motion.div>))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => setShowMore(!showMore)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-[2px] transition-all"
              style={{ background: showMore ? "rgba(201,162,39,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${showMore ? "rgba(201,162,39,0.25)" : "rgba(255,255,255,0.08)"}`, color: showMore ? "#c9a227" : "rgba(255,255,255,0.4)" }}>
              {showMore ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><Plus className="w-4 h-4" /> View All Room Details</>}
            </motion.button>
          </div>
        )}
        {room.extraImages && room.extraImages.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {room.extraImages.map((src, i) => (<div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-white/8"><motion.img src={src} alt={`${room.title} ${i + 1}`} className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} /></div>))}
          </div>
        )}
        <a href="#contact" onClick={onClose} className="gold-shimmer-btn w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm">Inquire About This Suite <ArrowUpRight className="w-4 h-4" /></a>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({
  isScrolled,
  isHidden,
  setMobileMenuOpen,
  openAvail,
}: {
  isScrolled: boolean;
  isHidden: boolean;
  setMobileMenuOpen: (o: boolean) => void;
  openAvail: () => void;
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 px-6 md:px-16 overflow-visible
      bg-navy/90 backdrop-blur-2xl py-3
      ${isScrolled ? "py-2 shadow-xl" : ""}
      ${isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
    >
      {isScrolled && (
        <div className="gold-accent-line absolute bottom-0 left-0 right-0 h-[1px] opacity-30" />
      )}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <motion.a href="#home" whileHover={{ scale: 1.05 }} className="group">
            <img src="assets/logo.png" alt="Logo" className="h-8 md:h-12 lg:h-14 w-auto transition-all" />
          </motion.a>
        </div>
        <div className="hidden lg:flex items-center gap-5 xl:gap-8 flex-nowrap overflow-visible">
          {["Home", "Accommodations", "Experiences", "Destinations"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              onMouseEnter={() => setHoveredItem(item)} onMouseLeave={() => setHoveredItem(null)}
              className="whitespace-nowrap flex-shrink-0 text-white/70 hover:text-white transition relative group text-sm">
              {item}
              <motion.div className="absolute -bottom-1 left-0 right-0 h-px bg-gold" initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredItem === item ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ transformOrigin: "left" }} />
            </a>
          ))}
<div
  className="relative z-50"
  onMouseEnter={() => setExploreOpen(true)}
  onMouseLeave={() => setExploreOpen(false)}
>
  <button
    onClick={() => setExploreOpen((prev) => !prev)}
    className="flex items-center gap-1 whitespace-nowrap text-white/70 hover:text-white transition text-sm"
  >
    Explore
    <ChevronDown
      className={`w-3.5 h-3.5 transition-transform ${
        exploreOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  <motion.div
    initial={{ opacity: 0, y: -10, scale: 0.96 }}
    animate={
      exploreOpen
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0, y: -10, scale: 0.96 }
    }
    transition={{ duration: 0.2 }}
    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-navy-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden py-2 ${
      exploreOpen
        ? "pointer-events-auto"
        : "pointer-events-none"
    }`}
  >
    <div className="gold-accent-line absolute top-0 left-0 right-0 h-[1px]" />

    {/* Live Availability */}
    <button
      onClick={openAvail}
      className="w-full text-left px-5 py-2.5 text-green-400 hover:bg-white/5 hover:text-green-300 transition flex items-center gap-2 text-sm"
    >
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      Live Availability
    </button>

    {/* Private Experience */}
    <a
      href="#private"
      className="block px-5 py-2.5 text-white/70 hover:text-gold hover:bg-white/5 transition text-sm"
    >
      <motion.span
        whileHover={{ x: 4 }}
        className="flex items-center justify-between"
      >
        Private Experience
        <ArrowUpRight className="w-4 h-4 opacity-50" />
      </motion.span>
    </a>

    {/* Corporate Experience */}
    <a
      href="#corporate"
      className="block px-5 py-2.5 text-white/70 hover:text-gold hover:bg-white/5 transition text-sm"
    >
      <motion.span
        whileHover={{ x: 4 }}
        className="flex items-center justify-between"
      >
        Corporate Experience
        <ArrowUpRight className="w-4 h-4 opacity-50" />
      </motion.span>
    </a>

    {/* Other Links */}
    {["Culinary", "Mechanical", "Reviews"].map((l) => (
      <a
        key={l}
        href={`#${l.toLowerCase()}`}
        className="block px-5 py-2.5 text-white/70 hover:text-gold hover:bg-white/5 transition text-sm"
      >
        <motion.span
          whileHover={{ x: 4 }}
          className="flex items-center justify-between"
        >
          {l}
          <ChevronRight className="w-4 h-4 opacity-40" />
        </motion.span>
      </a>
    ))}
  </motion.div>
</div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative group z-50">
            <motion.a href="/book" whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}
              className="gold-shimmer-btn flex items-center gap-2 whitespace-nowrap bg-gold px-4 py-2 rounded-full text-navy font-bold text-xs transition shadow-lg shadow-gold/20">
              Book Now
              <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
            </motion.a>
            <div className="absolute right-0 mt-2 w-44 bg-black/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {["Reserve", "Inquire"].map((l) => (
                <a key={l} href={l === "Reserve" ? "/reservation" : "#contact"}
                  className="block px-4 py-2.5 text-xs text-white hover:text-yellow-400 hover:bg-black/80 hover:pl-6 transition-all">{l}</a>
              ))}
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.92 }} onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-white border border-white/10 rounded-lg hover:bg-white/5">
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({
  setMobileMenuOpen,
  openAvail,
}: {
  setMobileMenuOpen: (o: boolean) => void;
  openAvail: () => void;
}) {
  const menuItems = [
    "Home",
    "Vessel",
    "Private Experiences",
    "Corporate Experiences",
    "Gallery",
    "Flybridge",
    "Accommodations",
    "Culinary",
    "Destinations",
    "Pricing",
    "Mechanical",
    "Reviews",
    "Inquire",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="fixed inset-0 bg-navy/98 backdrop-blur-2xl z-[2000] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <img src="assets/logo.png" alt="Serendipity" className="h-10 w-auto" />
        <motion.button
          whileTap={{ scale: 0.9, rotate: 90 }}
          onClick={() => setMobileMenuOpen(false)}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-col gap-1">
          {menuItems.map((l, i) => (
            <motion.a
              key={l}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 + 0.1 }}
              href={
                l === "Home"
                  ? "#home"
                  : l === "Inquire"
                  ? "#contact"
                  : l === "Private Experiences"
                  ? "#private"
                  : l === "Corporate Experiences"
                  ? "#corporate"
                  : `#${l.toLowerCase()}`
              }
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-4 border-b border-white/5 group"
            >
              <span className="text-xl font-serif text-white/80 group-hover:text-gold transition-colors">
                {l}
              </span>

              <motion.div whileHover={{ x: 4 }}>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors" />
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 py-5 border-t border-white/5 flex flex-col gap-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            setMobileMenuOpen(false);
            openAvail();
          }}
          className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-gold text-xs font-bold uppercase tracking-[2px]"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 relative">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-60" />
          </div>
          Check Live Availability
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-2 gap-3"
        >
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-gold/30 text-gold font-bold text-sm hover:bg-gold/10 transition-all"
          >
            <Send className="w-4 h-4" /> Inquire
          </a>

          <a
            href="/book"
            onClick={() => setMobileMenuOpen(false)}
            className="gold-shimmer-btn flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gold text-navy font-bold text-sm"
          >
            Reserve <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Hero({
  heroIdx,
  setHeroIdx,
  openAvail,
  openVideo,
  openRoute,
}: {
  heroIdx: number;
  setHeroIdx: (i: number) => void;
  openAvail: () => void;
  openVideo: () => void;
  openRoute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  const slides: HeroSlide[] = [
    { line1: "Your Gulf Coast", line2: "Escape Awaits", desc: "Reserve our luxury 94' Lazzara yacht for charter in St Pete / Tampa Bay.", tag: "Saint Petersburg, FL" },
    { line1: "Experience", line2: "Pure Luxury", desc: "Discover breathtaking views and world-class comfort on Florida's Gulf Coast.", tag: "Tampa Bay, FL" },
    { line1: "Make Memories", line2: "at Sea", desc: "Unforgettable moments aboard our expertly remodeled luxury yacht.", tag: "Gulf Coast, FL" },
  ];

  return (
    <>
      <section ref={heroRef} id="home" className="relative h-[51svh] md:h-[100svh] min-h-[320px] overflow-hidden noise-overlay">
        <motion.div className="absolute inset-0 z-0" style={{ scale: videoScale }}>
          <video ref={videoRef} src="/assets/attract_video.mp4" autoPlay muted loop playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-[1.18] md:scale-100"
            style={{ ...HD_VIDEO_STYLE, filter: "brightness(0.72) contrast(1.05) saturate(1.1)" }} />
        </motion.div>
        <motion.div className="absolute right-3 lg:right-10 bottom-20 lg:bottom-24 z-20 pointer-events-auto"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 group">
            <motion.img src="/assets/hero3.png" alt="Owner" className="w-[120px] lg:w-[340px] object-cover"
              animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </motion.div>

        {/* MOBILE */}
        <motion.div className="lg:hidden relative h-full flex flex-col justify-end z-10" style={{ opacity }}>
          <div className="px-2 pb-0.5">
            <AnimatePresence mode="wait">
              <motion.div key={heroIdx + "mobile"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="w-2 h-2 text-gold" />
                  <span className="text-[8px] font-bold tracking-[2px] uppercase text-gold">{slides[heroIdx].tag}</span>
                </div>
                <h1 className="text-[20px] font-serif leading-[1.02] tracking-tight mb-1">
                  {slides[heroIdx].line1}<br />
                  <em className="text-gold italic font-serif">{slides[heroIdx].line2}</em>
                </h1>
                <p className="text-[10px] text-white/65 mb-2 leading-snug max-w-[220px]">{slides[heroIdx].desc}</p>
                <div className="flex gap-2 mb-2">
                  <a href="/book" className="w-auto px-4 py-1.5 bg-gold text-black font-bold text-[10px] rounded-full text-center shadow-md whitespace-nowrap">Book Now</a>
                  <button onClick={openVideo} className="w-auto px-4 py-1.5 border border-white/30 text-white text-[10px] rounded-full font-bold whitespace-nowrap">Watch Experience</button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-1.5 pb-3 pt-1">
            {[0, 1, 2].map((i) => (
              <motion.button key={i} onClick={() => setHeroIdx(i)} animate={{ width: heroIdx === i ? 16 : 6 }}
                className={`h-1 rounded-full transition-colors ${heroIdx === i ? "bg-gold" : "bg-white/20"}`} />
            ))}
          </div>
        </motion.div>

        {/* DESKTOP */}
        <motion.div style={{ y: textY, opacity }} className="hidden lg:flex relative h-full w-[70%] mx-[15%] flex-col justify-end pb-32 z-10">
          <AnimatePresence mode="wait">
            <motion.div key={heroIdx + "desktop"} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.4, ease: "easeInOut" }} className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-gold" />
                <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">{slides[heroIdx].tag}</span>
              </div>
              <h1 className="text-[62px] font-serif leading-[1.08] tracking-tight mb-6">
                {slides[heroIdx].line1}
                <em className="block text-gold italic">{slides[heroIdx].line2}</em>
              </h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-lg">{slides[heroIdx].desc}</p>
              <div className="flex gap-6 items-center">
                <a href="/book" className="gold-shimmer-btn bg-gold px-10 py-5 rounded-full text-navy font-bold text-base flex items-center gap-2 shadow-xl shadow-gold/20">
                  Book Now <ArrowUpRight className="w-5 h-5" />
                </a>
                <button onClick={openVideo} className="flex items-center gap-4 text-white hover:text-gold">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center">
                    <Play className="w-5 h-5 fill-current ml-1" />
                  </div>
                  <span className="font-bold tracking-widest text-sm uppercase">Watch Experience</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="hidden lg:flex absolute right-16 bottom-40 flex-col gap-3 z-10">
          {[0, 1, 2].map((i) => (
            <motion.button key={i} onClick={() => setHeroIdx(i)}
              animate={{ height: heroIdx === i ? 40 : 10, background: heroIdx === i ? "#c9a227" : "rgba(255,255,255,0.2)" }}
              className="w-2.5 rounded-full" />
          ))}
        </div>
      </section>

      <div className="lg:hidden bg-[#040d1a] px-2 pt-2 pb-2 space-y-1.5">
        <MobileHeroStats />
        <MobileQuickActions openAvail={openAvail} openVideo={openVideo} openRoute={openRoute} />
      </div>
    </>
  );
}

// ─── FIX 3: ExperiencesSection — removed openExp prop (component takes no props) ──
function ExperiencesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExp = EXPERIENCES[activeIndex];

  return (
    <section
      id="experiences"
      className="relative overflow-hidden bg-[#020b18] py-14 md:py-24"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[320px] h-[320px] bg-gold/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col xl:flex-row justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-gold" />
              <span className="text-[10px] tracking-[4px] uppercase font-bold text-gold">
                Curated Experiences
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl leading-[1] font-serif text-white">
              A Floating Resort for{" "}
              <span className="italic text-gold">
                Every Occasion
              </span>
            </h2>
          </div>

          <div className="max-w-sm xl:text-right">
            <p className="text-white/40 text-sm md:text-base leading-relaxed">
              Adventure meets luxury with a full suite of onboard experiences
              and water activities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          
          {/* LEFT SIDE */}
          <div>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0.5, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[30px]"
            >
              <img
                src={activeExp.img}
                alt={activeExp.title}
                className="w-full h-[280px] sm:h-[420px] md:h-[560px] object-cover"
                draggable={false}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020b18]/90 via-transparent to-transparent" />
            </motion.div>

            {/* THUMBNAILS */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {EXPERIENCES.map((exp, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                    activeIndex === i
                      ? "border-gold"
                      : "border-white/10"
                  }`}
                >
                  <img
                    src={exp.img}
                    alt={exp.title}
                    className={`w-full h-24 sm:h-28 md:h-36 object-cover transition-transform duration-700 ${
                      activeIndex === i
                        ? "scale-110"
                        : "scale-100 hover:scale-105"
                    }`}
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  {activeIndex === i && (
                    <div className="absolute inset-0 ring-1 ring-gold rounded-2xl" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-[1px] bg-gold" />

              <span className="text-[10px] tracking-[4px] uppercase text-gold font-bold">
                Experience Details
              </span>
            </div>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8"
            >
              <p className="text-white/50 text-sm md:text-base leading-relaxed">
                {activeExp.desc}
              </p>
            </motion.div>

            <div className="space-y-3">
              {EXPERIENCES.map((exp, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`group w-full text-left rounded-[22px] border p-4 transition-all duration-500 ${
                    activeIndex === i
                      ? "border-gold bg-white/[0.05]"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium text-sm md:text-base">
                      {exp.title}
                    </h3>

                    <ArrowUpRight
                      className={`w-4 h-4 transition-all ${
                        activeIndex === i
                          ? "text-gold rotate-45"
                          : "text-white/20 group-hover:text-gold"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8 mt-2">
              <p className="text-white/50 text-sm md:text-base leading-relaxed">
                Whether anchored at exclusive islands or cruising pristine
                coastlines, every moment aboard is crafted for unforgettable
                luxury and adventure.
              </p>

              <a
                href="#destinations"
                className="inline-flex items-center gap-2 mt-6 bg-gold text-[#04101f] px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
              >
                Plan Your Experience
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// ─── Accommodations Section (UPDATED) ────────────────────────────────────────
// Drop-in replacement — no Modal, no Flybridge/Vessel blocks.
// Left: large image with thumbnail strip (no name tags on images).
// Right: full inline detail panel.
// UPDATED: "4 suites aboard" moved below the main heading.

function AccommodationsSection({
  openRoom,
  openGalleryInterior,
}: {
  openRoom: (r: Room) => void;
  openGalleryInterior: () => void;
}) {
  const [activeSuiteIndex, setActiveSuiteIndex] = useState(0);
  const [showBath, setShowBath] = useState(false);

  // reset bath toggle whenever suite changes
  useEffect(() => {
    setShowBath(false);
  }, [activeSuiteIndex]);

  const activeSuite = ROOMS[activeSuiteIndex];

  return (
    <section
      id="accommodations"
      className="relative py-10 md:py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-b from-[#061226] via-[#081a33] to-[#050b18]"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gold/10 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-7xl mx-auto"
      >
        {/* ── Section Header ── */}
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-6 items-center mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-[1px] bg-gradient-to-r from-gold to-transparent" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-gold/80">
                Luxury Living
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.05]">
              Elegant Accommodations
              <span
                className="block shimmer-text italic mt-1"
                style={{ fontSize: "0.85em" }}
              >
                sleeps up to 12 guests
              </span>
            </h2>

            {/* ── MOVED SUITE TABS BELOW TITLE ── */}
            <div className="mt-6">
              <p className="text-[9px] uppercase tracking-[3px] text-white/30 font-bold mb-3 flex items-center gap-2">
                <Folder className="w-3 h-3 text-gold/50" />
                4 suites aboard
              </p>

              <div className="flex flex-wrap gap-2">
                {ROOMS.map((suite, i) => (
                  <motion.button
                    key={suite.title}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveSuiteIndex(i)}
                    className={`px-3 py-1.5 rounded-full text-[10px] border transition-all ${
                      i === activeSuiteIndex
                        ? "bg-gold/15 border-gold text-gold"
                        : "bg-white/5 border-white/10 text-white/40 hover:text-white/70"
                    }`}
                  >
                    {suite.title}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-white/50 text-base max-w-md">
            Four private suites designed for absolute comfort, privacy, and
            quiet ocean living.
          </p>
        </div>

        {/* ── Main Two-Column Layout ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ── LEFT: Image + Thumbnail Strip ── */}
          <div>
            {/* Main image */}
            <motion.div
              key={activeSuite.title + "-img"}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-[2rem] overflow-hidden border border-white/10 group"
            >
              <img
                src={activeSuite.img}
                className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                alt={activeSuite.title}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Interior gallery shortcut */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  background: "#c9a227",
                  color: "#040d1a",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={openGalleryInterior}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-gold/30 text-gold text-[10px] tracking-widest uppercase flex items-center gap-1"
              >
                <Eye className="w-3 h-3" />
                Interior
              </motion.button>
            </motion.div>

            {/* Extra images */}
            {activeSuite.extraImages &&
              activeSuite.extraImages.length > 0 && (
                <motion.div
                  key={activeSuite.title + "-extras"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`mt-4 grid gap-3 ${
                    activeSuite.extraImages.length === 1
                      ? "grid-cols-1"
                      : "grid-cols-2"
                  }`}
                >
                  {activeSuite.extraImages.map((src, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/8"
                    >
                      <motion.img
                        src={src}
                        alt={`${activeSuite.title} view ${i + 2}`}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  ))}
                </motion.div>
              )}
          </div>

          {/* ── RIGHT: Detail Panel ── */}
          <div className="flex flex-col gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSuite.title + "-detail"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-5"
              >
                {/* Sub-label + title */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-[1px] bg-gold" />
                    <span className="text-[9px] uppercase tracking-[3px] text-gold/60 font-bold">
                      {activeSuite.sub} Suite
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif">
                    {activeSuite.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed">
                  {activeSuite.desc}
                </p>

                {/* Key Features */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[3px] text-gold/70 mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-gold/50" />
                    Key Features
                  </p>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    {activeSuite.amenities.map((a, i) => (
                      <motion.div
                        key={i}
                        variants={staggerItem}
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: "rgba(201,162,39,0.15)",
                          }}
                        >
                          <Check className="w-3 h-3 text-[#c9a227]" />
                        </div>

                        <span className="text-xs text-white/65 leading-relaxed">
                          {a}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Ensuite Bath toggle */}
                {activeSuite.extraAmenities &&
                  activeSuite.extraAmenities.length > 0 && (
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowBath((prev) => !prev)}
                        className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-[2px] transition-all"
                        style={{
                          background: showBath
                            ? "rgba(201,162,39,0.08)"
                            : "rgba(255,255,255,0.04)",
                          border: `1px solid ${
                            showBath
                              ? "rgba(201,162,39,0.25)"
                              : "rgba(255,255,255,0.08)"
                          }`,
                          color: showBath
                            ? "#c9a227"
                            : "rgba(255,255,255,0.4)",
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <Droplets className="w-3.5 h-3.5" />
                          VIEW ROOM DETAILS
                        </span>

                        <motion.span
                          animate={{ rotate: showBath ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </motion.button>

                      <AnimatePresence>
                        {showBath && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="mt-3 rounded-2xl p-5"
                              style={{
                                background: "rgba(201,162,39,0.04)",
                                border: "1px solid rgba(201,162,39,0.12)",
                              }}
                            >
                              {activeSuite.bathDesc && (
                                <p className="text-[10px] font-bold uppercase tracking-[3px] text-gold/70 mb-4 flex items-center gap-2">
                                  <span className="w-4 h-px bg-gold/50" />
                                  {activeSuite.bathDesc}
                                </p>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {activeSuite.extraAmenities.map((a, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-start gap-3 p-3 rounded-xl"
                                    style={{
                                      background: "rgba(255,255,255,0.03)",
                                      border:
                                        "1px solid rgba(255,255,255,0.06)",
                                    }}
                                  >
                                    <div
                                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                      style={{
                                        background:
                                          "rgba(201,162,39,0.15)",
                                      }}
                                    >
                                      <Check className="w-3 h-3 text-[#c9a227]" />
                                    </div>

                                    <span className="text-xs text-white/65 leading-relaxed">
                                      {a}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                {/* CTA */}
                <a
                  href="#contact"
                  className="gold-shimmer-btn w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Inquire About This Suite
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Culinary Section ─────────────────────────────────────────────────────────
function CulinarySection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const slides = [
    { id: "chef", tag: "Master of the Galley", name: "Chef Cheryl", role: "Gulf Coast's Premier Yacht Chef", profileImg: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200", titleLine1: "Where ", titleItalic: "Fine Dining", titleLine2: " Meets Home Comfort", description: "Looking for a personal chef for a party, work event, family dinner, or yacht excursion? Chef Cheryl brings the dream of fine dining to your charter table.", mainImgs: ["assets/cheryl_foods.jpeg", "assets/cheryl_foods1.jpeg", "assets/cheryl_foods2.jpeg"], icon: <Utensils className="w-4 h-4 text-gold" /> },
    { id: "mixology", tag: "The Art of Mixology", name: "Nelly the Mixologist", role: "Expert Craft Cocktail Artist", profileImg: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=200", titleLine1: "Crafting Cocktails That ", titleItalic: "Spark Connection", titleLine2: "", description: "Mixology isn't just about pouring drinks—it's about creating an experience where every sip tells a story.", mainImgs: ["https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=500","https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=500","https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600"], icon: <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M7.5,7L5.5,5H18.5L16.5,7M11,13V19H6V21H18V19H13V13L21,5V3H3V5L11,13Z" /></svg> },
  ];
  const slideVariants = { enter: (d: number) => ({ x: d > 0 ? 1000 : -1000, opacity: 0 }), center: { zIndex: 1, x: 0, opacity: 1 }, exit: (d: number) => ({ zIndex: 0, x: d < 0 ? 1000 : -1000, opacity: 0 }) };

  return (
    <section id="culinary" className="py-1.5 md:py-5 bg-navy-light overflow-hidden relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Culinary & Mixology</span></div>
            <h2 className="text-3xl md:text-5xl font-serif">Epicurean <em className="text-gold italic font-serif">Journey</em></h2>
          </div>
          <div className="flex gap-2 md:gap-4">
            <motion.button whileHover={{ scale: 1.1, borderColor: "#c9a227", color: "#c9a227" }} whileTap={{ scale: 0.9 }}
              onClick={() => { setDirection(-1); setActiveSlide((p) => (p - 1 + slides.length) % slides.length); }}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all">
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1, borderColor: "#c9a227", color: "#c9a227" }} whileTap={{ scale: 0.9 }}
              onClick={() => { setDirection(1); setActiveSlide((p) => (p + 1) % slides.length); }}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all">
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        <div className="relative h-auto lg:h-[700px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div key={activeSlide} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }} className="lg:absolute inset-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-8 items-center h-full">
                <div className="order-2 lg:order-1">
                  <motion.div whileHover={{ scale: 1.005 }} className="bg-navy/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-12 shadow-2xl transition-all hover:border-white/15">
                    <div className="flex items-center gap-3 mb-5"><div className="w-8 h-[1px] bg-gold/50" /><span className="text-[10px] font-bold tracking-[2px] uppercase text-gold/60">{slides[activeSlide].tag}</span></div>
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div whileHover={{ scale: 1.08 }} className="w-14 md:w-20 h-14 md:h-20 rounded-full border-2 border-gold/30 p-1 shrink-0 shadow-xl relative">
                        <img src={slides[activeSlide].profileImg} className="w-full h-full object-cover rounded-full" alt={slides[activeSlide].name} />
                        <div className="absolute -bottom-1 -right-1 bg-navy border border-white/10 rounded-full p-1.5 scale-90">{slides[activeSlide].icon}</div>
                      </motion.div>
                      <div>
                        <h3 className="text-lg md:text-2xl font-serif">{slides[activeSlide].name}</h3>
                        <p className="text-gold text-[9px] uppercase tracking-widest mt-1 font-bold opacity-80">{slides[activeSlide].role}</p>
                      </div>
                    </div>
                    <h2 className="text-xl md:text-4xl font-serif mb-5 leading-snug">{slides[activeSlide].titleLine1}<em className="text-gold italic font-serif">{slides[activeSlide].titleItalic}</em>{slides[activeSlide].titleLine2}</h2>
                    <p className="text-white/50 text-sm leading-relaxed">{slides[activeSlide].description}</p>
                  </motion.div>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 md:gap-6 relative px-2 lg:px-0">
                  <div className="mt-6 md:mt-12"><motion.img whileHover={{ y: -10, scale: 1.02 }} src={slides[activeSlide].mainImgs[0]} className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl border border-white/10" alt="" /></div>
                  <div><motion.img whileHover={{ y: -10, scale: 1.02 }} src={slides[activeSlide].mainImgs[1]} className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl border border-white/10" alt="" /></div>
                  <div className="col-span-2 px-4 md:px-20 -mt-6 md:-mt-10 relative z-10"><motion.img whileHover={{ scale: 1.02 }} src={slides[activeSlide].mainImgs[2]} className="w-full aspect-video object-cover rounded-[2rem] shadow-2xl border border-white/20" alt="" /></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-3">
          {slides.map((_, i) => (
            <motion.button key={i} onClick={() => { setDirection(i > activeSlide ? 1 : -1); setActiveSlide(i); }}
              animate={{ width: activeSlide === i ? 32 : 16, background: activeSlide === i ? "#c9a227" : "rgba(255,255,255,0.2)" }}
              className="h-1.5 rounded-full transition-colors" />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  const [selected, setSelected] = useState<(typeof DESTINATIONS)[0] | null>(null);

  return (
    <section id="destinations" className="py-2 md:py-5 px-4 md:px-8 lg:px-16 bg-navy">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-[1.5px] bg-gold" />
              <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Gulf Coast Destinations</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              Choose Great Day<br /><em className="text-gold italic font-serif">Destinations</em>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm leading-relaxed">All destinations accessible from St Petersburg / Tampa Bay.</p>
        </div>

        <div className="lg:hidden flex gap-3 overflow-x-auto pb-3 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
          {DESTINATIONS.map((dest, i) => (<MobileDestCard key={i} dest={dest} onTap={() => setSelected(dest)} />))}
        </div>

        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {DESTINATIONS.map((dest, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }} onClick={() => setSelected(dest)} whileHover={{ y: -6, scale: 1.01 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/3] shadow-2xl">
              <motion.img src={dest.img} className="w-full h-full object-cover transition-transform duration-700"
                animate={{ scale: 1 }} whileHover={{ scale: 1.07 }} alt={dest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-3xl pointer-events-none" style={{ border: "1px solid rgba(201,162,39,0.4)" }} />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-gold/90 text-navy text-[10px] font-bold uppercase tracking-widest rounded-full">{dest.tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base md:text-lg font-serif group-hover:text-gold transition-colors">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-white/40 text-xs"><Clock className="w-3 h-3" /> {dest.distance}</div>
                </div>
                <motion.div initial={{ opacity: 0, y: 8 }} whileHover={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-[2px]">
                  Learn More <ArrowUpRight className="w-3 h-3" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <Modal onClose={() => setSelected(null)}>
            <div className="relative max-w-2xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto scrollbar-hide"
              style={{ background: "linear-gradient(145deg, #060e1e 0%, #040d1a 100%)", maxHeight: "90vh", boxShadow: "0 0 80px rgba(201,162,39,0.1), 0 40px 120px rgba(0,0,0,0.8)" }}>
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-20 p-2 text-white/30 hover:text-white transition-colors rounded-xl hover:bg-white/5"><X className="w-5 h-5" /></button>
              <div className="relative h-52 md:h-64 overflow-hidden">
                <motion.img src={selected.img} className="w-full h-full object-cover" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} alt={selected.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040d1a] via-transparent to-transparent" />
                <div className="gold-accent-line absolute top-0 left-0 right-0 h-[2px]" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gold/90 text-navy text-[10px] font-bold uppercase tracking-widest rounded-full">{selected.tag}</span>
                </div>
                <div className="absolute bottom-5 left-5 z-10">
                  <div className="flex items-center gap-2 mb-1"><div className="w-5 h-px bg-[#c9a227]" /><span className="text-[9px] font-bold uppercase tracking-[3px] text-[#c9a227]/80">Gulf Coast Destination</span></div>
                  <h2 className="text-2xl md:text-3xl font-serif text-white drop-shadow-2xl leading-tight">{selected.name}</h2>
                </div>
              </div>
              <div className="p-5 md:p-10">
                <div className="flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-gold" /><span className="text-xs text-white/40 uppercase tracking-widest">{selected.distance} from marina</span></div>
                <p className="text-sm text-white/60 leading-relaxed mb-8">{selected.desc}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setSelected(null)} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border transition-all hover:bg-[#c9a227]/10"
                    style={{ borderColor: "rgba(201,162,39,0.35)", color: "#c9a227" }}>
                    <Phone className="w-4 h-4" /> Inquire About This Stop
                  </button>
                  <a href="/book" onClick={() => setSelected(null)} className="gold-shimmer-btn flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:translate-y-[-1px]"
                    style={{ background: "linear-gradient(135deg, #c9a227, #f0c040)", color: "#040d1a" }}>
                    Include in My Charter <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────────
function PricingSection() {
  const [showSpecial, setShowSpecial] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section id="pricing" ref={sectionRef} className="py-4 md:py-5 px-4 md:px-8 lg:px-16 bg-navy-light">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Charter Rates</span><div className="w-10 h-[1.5px] bg-gold" /></div>
          <h2 className="text-3xl md:text-5xl font-serif mb-3">Charter Pricing<br /><em className="text-gold italic font-serif">& Price List</em></h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">Departing Tampa / St Petersburg. All rates include professional captain and crew.</p>
        </div>
        <div className="lg:hidden grid grid-cols-1 gap-3 mb-6 max-w-md mx-auto px-4">
          {CHARTER_RATES.map((rate, i) => (<MobilePricingCard key={i} rate={rate} />))}
        </div>
        <div className="hidden lg:grid grid-cols-3 gap-5 md:gap-8 mb-8">
          {CHARTER_RATES.map((rate, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ delay: i * 0.15, duration: 0.7 }} whileHover={{ y: -6, scale: 1.01 }}
              className={`relative rounded-[2rem] overflow-hidden border transition-all ${rate.popular ? "border-gold/40 bg-gradient-to-b from-gold/10 to-navy/50" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
              {rate.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <div className="bg-gold text-navy text-[10px] font-bold uppercase tracking-widest px-6 py-1.5 rounded-b-full">Most Popular</div>
                  </div>
                  <div className="absolute inset-0 rounded-[2rem] pointer-events-none" style={{ animation: "pulseGold 3s ease infinite" }} />
                </>
              )}
              <div className={`p-6 md:p-10 ${rate.popular ? "pt-10 md:pt-12" : ""}`}>
                <h3 className="text-xl md:text-2xl font-serif mb-1">{rate.name}</h3>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-3xl md:text-4xl font-serif text-gold font-bold">{rate.price}</span>
                  <span className="text-white/30 text-sm mb-1">/ charter</span>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 mb-5">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs"><Clock className="w-3.5 h-3.5 text-gold/60" /> {rate.duration}</div>
                  <div className="flex items-center gap-1.5 text-white/40 text-xs"><Users className="w-3.5 h-3.5 text-gold/60" /> {rate.guests}</div>
                  {rate.nights !== "0" && (<div className="flex items-center gap-1.5 text-white/40 text-xs"><Anchor className="w-3.5 h-3.5 text-gold/60" /> {rate.nights} nights</div>)}
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{rate.desc}</p>
                <div className="space-y-2.5 mb-6">
                  {rate.highlights.map((h, j) => (
                    <motion.div key={j} initial={{ opacity: 0, x: -8 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -8 }}
                      transition={{ delay: i * 0.15 + j * 0.08 }} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-gold" /></div>
                      <span className="text-sm text-white/60">{h}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.a href="/book" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className={`gold-shimmer-btn w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${rate.popular ? "bg-gold text-navy hover:bg-gold-hover" : "border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold"}`}>
                  Book {rate.name} <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="border border-white/10 rounded-3xl overflow-hidden">
          <motion.button whileHover={{ background: "rgba(255,255,255,0.03)" }} onClick={() => setShowSpecial(!showSpecial)}
            className="w-full flex items-center justify-between p-5 md:p-8 transition-colors">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <motion.div animate={{ rotate: showSpecial ? 180 : 0 }} transition={{ duration: 0.4 }}>
                  <Star className="w-4 h-4 text-gold" />
                </motion.div>
              </div>
              <div className="text-left">
                <h3 className="text-base md:text-xl font-serif">Special Events & Occasions</h3>
                <p className="text-[10px] text-white/30 mt-0.5">Corporate events, celebrations & culinary experiences</p>
              </div>
            </div>
            <motion.div animate={{ rotate: showSpecial ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5 text-white/40" />
            </motion.div>
          </motion.button>
          <AnimatePresence>
            {showSpecial && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                <div className="p-5 md:p-8 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {SPECIAL_RATES.map((r, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, borderColor: "rgba(201,162,39,0.3)" }}
                      className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-serif text-sm md:text-lg">{r.name}</h4>
                        <span className="text-gold font-bold text-base md:text-xl font-serif shrink-0 ml-2">{r.price}</span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed mb-4">{r.desc}</p>
                      <motion.a href="/book" whileHover={{ x: 4 }} className="text-gold text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all">Book Now <ArrowUpRight className="w-3 h-3" /></motion.a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-center text-white/25 text-xs mt-6">*Pricing subject to availability. Contact us for custom itineraries and special packages.</p>
        <div className="mt-6 text-center">
          <motion.a href="#destinations" whileHover={{ scale: 1.03, y: -2 }} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold/10 transition-all">
            <MapPin className="w-4 h-4" /> Check Out Cool Destinations
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
function MechanicalSection() {
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [openSystem, setOpenSystem] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-60px",
  });

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  /* ================================================= */
  /* SPECS */
  /* ================================================= */

  const mechanicalSpecs = [
    { label: "Hull Type", value: "Fiberglass / GRP", icon: Ship },
    { label: "Hull Config", value: "Monohull", icon: Anchor },
    { label: "Year Built", value: "2000", icon: Clock },
    { label: "Major Refit", value: "2022", icon: Wrench },
    { label: "Builder", value: "Lazzara Yachts (FL)", icon: Settings },
    { label: "Classification", value: "Lazzara 94 Hardtop", icon: Activity },
    { label: "LOA", value: "94 ft / 28.65 m", icon: Ship },
    { label: "Beam", value: "23 ft / 7.01 m", icon: Wind },
    { label: "Draft", value: "6 ft (1.7 m)", icon: Droplets },
    { label: "Displacement", value: "174 gross tons", icon: Gauge },
    { label: "Cruise Speed", value: "18 knots", icon: Zap },
    { label: "Max Speed", value: "25 knots", icon: Zap },
    { label: "Engine Hours", value: "Incredibly Low", icon: Gauge },
    { label: "Fuel Capacity", value: "Large reserve tanks", icon: Fuel },
    { label: "Range", value: "Tampa to Key West", icon: MapPin },
    { label: "Generator", value: "Dual — 6,250 hrs each", icon: Activity },
    { label: "Air Conditioning", value: "Chilled water 169,500 BTU", icon: Wind },
    { label: "Navigation", value: "Full electronics suite", icon: Settings },
  ];

  /* ================================================= */
  /* SYSTEMS */
  /* ================================================= */

  const systems = [
    {
      title: "Propulsion",
      icon: Gauge,
      items: [
        "Twin diesel inboard engines",
        "Shaft drive — low engine hours",
        "Bow thruster for precision docking",
        "Hydraulic stabilizers underway",
        "Anti-fouling bottom paint (2022)",
      ],
    },

    {
      title: "Electronics & Navigation",
      icon: Settings,
      items: [
        "Garmin / Furuno chart plotter suite",
        "Radar — open array",
        "VHF radios (multiple)",
        "GPS & AIS transponder",
        "Satellite TV & high-speed WiFi",
        "Full anchor windlass system",
      ],
    },

    {
      title: "Safety Systems",
      icon: Activity,
      items: [
        "Life rafts — USCG certified",
        "EPIRB & flares aboard",
        "Fire suppression — engine room",
        "Bilge pump system — automatic",
        "CO detectors throughout",
        "First aid & medical kit",
      ],
    },

    {
      title: "Onboard Systems",
      icon: Wrench,
      items: [
        "Dual generators — full power at anchor",
        "Watermaker / reverse osmosis — 1,500 gal/day",
        "Full HVAC — all staterooms",
        "Premium sound system",
        "Washer / dryer aboard",
        "Icemaker & commercial refrigeration",
      ],
    },
  ];

  /* SHOW FIRST 10 */
  const visibleSpecs = showAllSpecs
    ? mechanicalSpecs
    : mechanicalSpecs.slice(0, 10);

  return (
    <section
      id="mechanical"
      ref={sectionRef}
      className="
        py-4 md:py-8
        px-4 md:px-6 lg:px-20
        bg-navy
        relative
        overflow-hidden
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10"
      >

        {/* ================================================= */}
        {/* TOP */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-end mb-6">

          {/* TITLE */}
          <div>
            <span className="text-[10px] tracking-[4px] uppercase text-gold/60 mb-3 block">
              Technical Overview
            </span>

            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              Mechanical{" "}
              <span className="text-gold italic">
                Excellence
              </span>
            </h2>
          </div>

          {/* DESCRIPTION */}
          <div className="lg:flex lg:justify-end">
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md">
              SERENDIPITY is engineered for performance,
              reliability, and refined cruising comfort.
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* SPECS + VIDEO */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5 items-start">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div>

            {/* SPECS GRID */}
            <div className="grid grid-cols-2 gap-3">

              {visibleSpecs.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{
                    y: -3,
                    scale: 1.02,
                  }}
                  className="
                    p-4
                    rounded-2xl
                    bg-white/[0.03]
                    transition-all
                    group
                  "
                >
                  <s.icon className="w-4 h-4 text-gold mb-2" />

                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                    {s.label}
                  </p>

                  <p className="text-sm text-white/80 font-medium leading-tight">
                    {s.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* VIEW BUTTON */}
            <div className="mt-4">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  setShowAllSpecs(!showAllSpecs)
                }
                className="
                  text-xs
                  tracking-[3px]
                  uppercase
                  text-gold
                  flex
                  items-center
                  gap-2
                  transition-all
                "
              >
                {showAllSpecs
                  ? "Show Less"
                  : "View All Specs"}

                <ChevronDown
                  className={`
                    w-3 h-3 transition-transform
                    ${showAllSpecs ? "rotate-180" : ""}
                  `}
                />
              </motion.button>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{
              opacity: isInView ? 1 : 0,
              x: isInView ? 0 : 30,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="relative"
          >

            {/* GLOW */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-[60%] h-[60%] bg-cyan-400/10 blur-[100px] rounded-full" />
            </div>

            {/* VIDEO */}
            <motion.video
              ref={videoRef}
              src="/assets/New_3D.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="
                relative
                w-full
                rounded-[32px]
                object-cover
                overflow-hidden
              "
              style={{
                ...HD_VIDEO_STYLE,
                filter:
                  "brightness(1.05) contrast(1.08) saturate(1.1)",
                maxHeight: "620px",
              } as any}
              whileHover={{
                scale: 1.01,
              }}
            />
          </motion.div>
        </div>

        {/* ================================================= */}
        {/* SYSTEMS */}
        {/* ================================================= */}

        <div className="mt-6 space-y-3">

          {systems.map((sys, i) => {
            const isOpen = openSystem === i;

            return (
              <motion.div
                key={i}
                layout
                className="
                  rounded-2xl
                  bg-white/[0.03]
                  overflow-hidden
                "
              >

                {/* HEADER */}
                <motion.button
                  onClick={() =>
                    setOpenSystem(
                      isOpen ? null : i
                    )
                  }
                  whileHover={{ x: 2 }}
                  className="
                    w-full
                    px-5 py-5
                    flex
                    items-center
                    justify-between
                    transition
                  "
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center">
                      <sys.icon className="w-4 h-4 text-gold" />
                    </div>

                    <h4 className="font-serif text-lg">
                      {sys.title}
                    </h4>
                  </div>

                  <ChevronDown
                    className={`
                      w-5 h-5 text-white/40 transition-transform
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </motion.button>

                {/* CONTENT */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <ul className="grid md:grid-cols-2 gap-3">

                          {sys.items.map((item, j) => (
                            <motion.li
                              key={j}
                              initial={{
                                opacity: 0,
                                x: -10,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                delay: j * 0.05,
                              }}
                              className="
                                flex
                                items-start
                                gap-3
                                text-sm
                                text-white/60
                              "
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2" />

                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* ================================================= */}
          {/* BUTTON AT VERY BOTTOM */}
          {/* ================================================= */}

          <div className="pt-3 flex justify-center">
            <motion.a
              href="/book"
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="
                relative
                overflow-hidden
                group
                inline-flex
                items-center
                gap-3
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-gold
                via-yellow-400
                to-gold
                text-navy
                font-semibold
                whitespace-nowrap
              "
            >
              {/* SHINE */}
              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  group-hover:translate-x-full
                  transition-transform
                  duration-1000
                  bg-gradient-to-r
                  from-transparent
                  via-white/40
                  to-transparent
                "
              />

              <span className="relative z-10">
                Book Your Charter
              </span>

              <ArrowUpRight className="relative z-10 w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}// ─────────────────────────────────────────────────────────────────────────────
// DROP-IN REPLACEMENTS: PrivateSection & CorporateSection
// Paste these two functions into your App.jsx, replacing the originals.
// All imports (motion, AnimatePresence, useInView, useRef, Check,
// ArrowUpRight, Shield, Users, Wifi, Clock, Star, MapPin, Phone, X) are
// already present in your existing file — no new imports needed.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Data ─────────────────────────────────────────────────────────────────────

const POPULAR_DESTINATIONS_MINI = [
  {
    tag: "Nature & History",
    name: "Egmont Key",
    desc: "Shelling, sightseeing, and historic beauty.",
    img: "assets/egmont_key.jpg",
  },
  {
    tag: "Iconic Landmark",
    name: "St. Pete Pier",
    desc: "Perfect for dining and exploring after your cruise.",
    img: "assets/IconicPier.jpg",
  },
  {
    tag: "State Park",
    name: "Honeymoon Island",
    desc: "Romantic shoreline and nature preserve.",
    img: "assets/Honeymoon_Island.jpg",
  },
  {
    tag: "Dockside Dining",
    name: "Salt Rock Grill",
    desc: "Dockside dining paired with fine food, cocktails, and waterfront views.",
    img: "assets/salta.webp",
  },
];

const PRIVATE_EXP_DATA = [
  {
    id: "weddings",
    tag: "Weddings at Sea",
    title: "Weddings at Sea",
    subtitle: "Say I do aboard an iconic vessel",
    heroImg: "assets/sea-wedding.webp",
    description:
      'Say "I do" aboard an iconic vessel surrounded by turquoise waters and sunset skies.',
    features: [
      "Micro weddings and elopements",
      "Engagement parties",
      "Sunset vow renewals",
    ],
    note: "Our crew works closely with your planner to ensure a seamless event.",
    ctaLabel: "Plan Your Wedding",
  },
  {
    id: "anniversaries",
    tag: "Romance",
    title: "Anniversaries & Romantic Escapes",
    subtitle: "Reconnect and celebrate in style",
    heroImg: "assets/couples-image.webp",
    description:
      "Enjoy a romantic cruise with private dining and unforgettable views.",
    features: [
      "Private chef options",
      "Live music and décor",
      "Champagne and roses",
    ],
    note: "Every romantic escape is tailored specifically to your vision.",
    ctaLabel: "Plan Your Escape",
  },
  {
    id: "birthdays",
    tag: "Celebrations",
    title: "Birthday Cruises & Milestone Events",
    subtitle: "Celebrate in luxury",
    heroImg: "assets/Card-Container.webp",
    description:
      "Take your birthday celebration to the next level aboard Serendipity.",
    features: [
      "Cocktails and catered meals",
      "Jacuzzi and water toys",
      "Music and entertainment",
    ],
    note: "We handle every detail so you can fully enjoy the experience.",
    ctaLabel: "Book Your Celebration",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRIVATE SECTION
// ─────────────────────────────────────────────────────────────────────────────

function PrivateSection() {
  return (
    <section id="private" className="bg-navy">
      {/* ── Section Header ── */}
      <div
        className="pt-6 pb-4 px-4 md:px-8 lg:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-[1.5px] bg-gold" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">
              Private Charter
            </span>
            <div className="w-10 h-[1.5px] bg-gold" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
  <h2 className="text-3xl md:text-5xl font-serif leading-tight">
    Celebrate Life's Most
    <br />
    <em className="text-gold italic font-serif">
      Meaningful Moments
    </em>
  </h2>
</div>
        </motion.div>
      </div>

      {/* ── Experience Blocks ── */}
      {PRIVATE_EXP_DATA.map((exp, i) => (
        <PrivateExpBlock key={exp.id} exp={exp} isEven={i % 2 === 0} index={i} />
      ))}

      {/* ── Popular Destinations Strip ── */}
      <PrivateDestinationsStrip />
    </section>
  );
}

// ─── Individual experience block (unchanged from original logic, enhanced visuals) ──

function PrivateExpBlock({
  exp,
  isEven,
  index,
}: {
  exp: (typeof PRIVATE_EXP_DATA)[0];
  isEven: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="px-4 md:px-8 lg:px-16 py-10 md:py-16"
      style={{
        background:
          index % 2 === 0
            ? "rgba(255,255,255,0.02)"
            : "rgba(6,18,38,0.8)",
        borderTop:
          index === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={{
            opacity: inView ? 1 : 0,
            x: inView ? 0 : isEven ? -40 : 40,
          }}
          transition={{ duration: 0.9 }}
          className={isEven ? "" : "lg:order-2"}
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/8 group">
            <img
              src={exp.heroImg}
              alt={exp.title}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{ aspectRatio: "16/10" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(4,13,26,0.45) 0%, transparent 60%)",
              }}
            />
            <div className="gold-accent-line absolute top-0 left-0 right-0 h-[2px]" />

            {/* Floating badge */}
            <div
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(201,162,39,0.9)", color: "#040d1a" }}
            >
              {exp.tag}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={{
            opacity: inView ? 1 : 0,
            x: inView ? 0 : isEven ? 40 : -40,
          }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className={isEven ? "" : "lg:order-1"}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold">
              {exp.tag}
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-serif mb-2 leading-tight">
            {exp.title}
          </h3>
          <p className="text-white/40 text-sm mb-4">{exp.subtitle}</p>
          <p className="text-white/65 text-sm leading-relaxed mb-6">
            {exp.description}
          </p>

          <div className="flex flex-col gap-3 mb-5">
            {exp.features.map((f, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -10 }}
                transition={{ delay: 0.2 + j * 0.08 }}
                className="flex items-center gap-3 p-3.5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Check className="w-4 h-4 text-gold shrink-0" />
                <span className="text-sm text-white/70">{f}</span>
              </motion.div>
            ))}
          </div>

          <div
            className="p-4 rounded-xl mb-6"
            style={{
              background: "rgba(201,162,39,0.05)",
              border: "1px solid rgba(201,162,39,0.2)",
            }}
          >
            <p className="text-sm text-white/55 leading-relaxed italic">
              {exp.note}
            </p>
          </div>

          <a
            href="/book"
            className="gold-shimmer-btn inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-bold rounded-xl text-sm"
          >
            {exp.ctaLabel} <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Popular Destinations strip appended inside PrivateSection ────────────────

function PrivateDestinationsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="px-4 md:px-8 lg:px-16 py-14 md:py-20"
      style={{
        background:
          "linear-gradient(to bottom, rgba(6,18,38,0.8), rgba(4,13,26,1))",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-[1.5px] bg-gold" />
            <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold">
              Popular Stops
            </span>
            <div className="w-10 h-[1.5px] bg-gold" />
          </div>
          <h3 className="text-2xl md:text-4xl font-serif mb-2">
            Popular{" "}
            <em className="text-gold italic font-serif">Destinations</em>
          </h3>
          <p className="text-white/40 text-sm max-w-lg mx-auto">
            Discover Florida's most breathtaking waterfront destinations.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPULAR_DESTINATIONS_MINI.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 24,
              }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,162,39,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 160 }}>
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  style={{ transform: "scale(1)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(4,13,26,0.85) 100%)",
                  }}
                />
                {/* Tag */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
                  style={{ background: "rgba(201,162,39,0.9)", color: "#040d1a" }}
                >
                  {dest.tag}
                </div>
              </div>

              {/* Text */}
              <div className="p-4">
                <h4 className="font-serif text-base text-white mb-1.5 group-hover:text-gold transition-colors">
                  {dest.name}
                </h4>
                <p className="text-xs text-white/45 leading-relaxed">
                  {dest.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          style={{
            background: "rgba(201,162,39,0.05)",
            border: "1px solid rgba(201,162,39,0.18)",
          }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-gold mb-3">
              Plan Your Perfect Experience
            </p>
            <h4 className="font-serif text-2xl md:text-3xl mb-2 leading-tight">
              Let's Plan Your{" "}
              <em className="shimmer-text italic">Perfect Experience</em>
            </h4>
            <p className="text-white/50 text-sm leading-relaxed">
              Whether it's a wedding, anniversary, or birthday celebration,
              Serendipity creates unforgettable luxury experiences.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Contact info */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p
                className="text-[9px] font-bold uppercase tracking-[3px] text-gold/70 mb-4 flex items-center gap-2"
              >
                <span className="w-4 h-px bg-gold/50" />
                Contact Us
              </p>
              <div className="space-y-3">
                {[
                  { icon: Phone, label: "Capt. Jake", value: "412-418-2968" },
                  {
                    icon: Phone,
                    label: "Manager Bryon",
                    value: "727-644-9653",
                  },
                  { icon: MapPin, label: "", value: "Saint Petersburg, Florida" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(201,162,39,0.12)" }}
                    >
                      <c.icon className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div>
                      {c.label && (
                        <p className="text-[9px] text-white/30 uppercase tracking-wider">
                          {c.label}
                        </p>
                      )}
                      <p className="text-xs text-white/70">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/book"
              className="gold-shimmer-btn flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold text-navy font-bold text-sm"
            >
              Book Your Charter <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CORPORATE SECTION  (enhanced with intro text from Image 2 + new design)
// ─────────────────────────────────────────────────────────────────────────────

const CORP_USE_CASES_DATA = [
  "Impress clients",
  "Executive retreats",
  "Client appreciation cruises",
  "Team-building outings",
  "Networking mixers",
  "Off-site meetings",
  "Leadership roundtables",
  "Sales incentive trips",
  "Partner dinners or deal closings",
];

const CORP_VENUE_FEATURES = [
  "Elegant indoor and outdoor spaces",
  "Open-air flybridge with Jacuzzi, lounge seating, and wet bar",
  "12-guest maximum capacity (ideal for small groups)",
  "Catered dining or onboard chef service",
  "High-speed Wi-Fi and media entertainment",
  "Discreet, professional crew support",
];

const CORP_WHAT_TO_EXPECT = [
  {
    icon: Shield,
    title: "Private and Professional Environment",
    desc: "Serendipity transforms business functions into elevated experiences. From casual networking cruises to formal client receptions, we provide an unmatched charter experience.",
    color: "#c9a227",
  },
  {
    icon: Users,
    title: "All-Inclusive, Fully Staffed",
    desc: "Our experienced crew handles every detail—so you and your guests can stay present and productive.",
    color: "#3b82f6",
  },
  {
    icon: Wifi,
    title: "Tech-Ready Spaces",
    desc: "We will work with you to prepare for presentations. Connect your own media for video content and background music.",
    color: "#14b8a6",
  },
  {
    icon: Clock,
    title: "Flexible Duration",
    desc: "Book a 2- to 4-hour cruise, a half-day strategy session, or a sunset networking cocktail hour—we'll customize the itinerary to your needs.",
    color: "#a855f7",
  },
];

// Stats for the animated counter row
const CORP_STATS = [
  { val: 94, suffix: " ft", label: "Yacht Length" },
  { val: 12, suffix: "", label: "Max Guests" },
  { val: 4, suffix: "", label: "Private Suites" },
  { val: 25, suffix: "+", label: "Charter Guests" },
];

function CorporateSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const introBannerRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);
  const usecaseRef = useRef<HTMLDivElement>(null);
  const expectRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const introBannerInView = useInView(introBannerRef, {
    once: true,
    margin: "-60px",
  });
  const venueInView = useInView(venueRef, { once: true, margin: "-60px" });
  const usecaseInView = useInView(usecaseRef, { once: true, margin: "-60px" });
  const expectInView = useInView(expectRef, { once: true, margin: "-60px" });

  const staggerC = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };
  const staggerI = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="corporate" className="bg-navy">
      {/* ── Section Header ── */}
     {/* ── Section Header ── */}
<div
  ref={headerRef}
  className="pt-6 pb-4 px-4 md:px-8 lg:px-16"
  style={{
    background:
      "linear-gradient(135deg, rgba(6,14,30,0.98) 0%, rgba(8,22,44,0.98) 100%)",
    borderTop: "none",
    borderBottom: "none",
  }}
>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-[1.5px] bg-gold" />
            <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">
              Corporate Charter
            </span>
            <div className="w-10 h-[1.5px] bg-gold" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
  <h2 className="text-3xl md:text-5xl font-serif leading-tight">
    Corporate &amp; Executive
    <br />
    <em className="text-gold italic font-serif">Experiences</em>
  </h2>
</div>
        </motion.div>
      </div>

      {/* ── Intro Banner (from Image 2) ── */}
      <div
        ref={introBannerRef}
        className="px-4 md:px-8 lg:px-16 py-10 md:py-14"
        style={{
          background:
            "linear-gradient(135deg, rgba(6,14,30,0.98) 0%, rgba(8,22,44,0.98) 100%)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0)",
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: rich description text */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={{
              opacity: introBannerInView ? 1 : 0,
              x: introBannerInView ? 0 : -36,
            }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gold" />
              <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold">
                Why Serendipity
              </span>
            </div>

            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-5">
              Host your next corporate gathering on board{" "}
              <em className="text-gold not-italic font-serif">Serendipity</em>, a
              94-foot luxury yacht based in St. Petersburg, Florida. Whether
              you're planning a client appreciation cruise, leadership retreat, or
              end of the year team gathering, Serendipity offers a sophisticated
              and fully private setting for productive and memorable events on the
              water.
            </p>

            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Conveniently docked between Tampa, Clearwater, and Sarasota,
              Serendipity delivers a premium alternative to traditional venues.
              Our vessel is perfect for local businesses, startups, law firms, and
              executive teams seeking an exclusive Gulf Coast corporate experience
              for up to 12 people.
            </p>

            <a
              href="/book"
              className="gold-shimmer-btn inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-navy font-bold rounded-xl text-sm shadow-lg shadow-gold/20"
            >
              Reserve Now <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right: animated stat pills */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{
              opacity: introBannerInView ? 1 : 0,
              x: introBannerInView ? 0 : 36,
            }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {CORP_STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: introBannerInView ? 1 : 0,
                  y: introBannerInView ? 0 : 20,
                }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="relative p-6 rounded-2xl overflow-hidden flex flex-col justify-between"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,162,39,0.18)",
                  minHeight: 110,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] gold-accent-line"
                />
                <span className="text-3xl text-gold font-bold mb-1">
                  <AnimatedCounter to={s.val} suffix={s.suffix} />
                </span>
                <span className="text-[10px] uppercase tracking-[2px] text-white/30">
                  {s.label}
                </span>
              </motion.div>
            ))}

            {/* Location card spanning full width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: introBannerInView ? 1 : 0,
                y: introBannerInView ? 0 : 20,
              }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="col-span-2 p-5 rounded-2xl flex items-center gap-4"
              style={{
                background: "rgba(201,162,39,0.06)",
                border: "1px solid rgba(201,162,39,0.2)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(201,162,39,0.15)" }}
              >
                <MapPin className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[2px] text-gold/60 font-bold mb-0.5">
                  Home Port
                </p>
                <p className="text-sm text-white/70">
                  Maximo Marina, St. Petersburg, FL —{" "}
                  <span className="text-white/40 text-xs">
                    between Tampa &amp; Sarasota
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Venue Features ── */}
      <div
        ref={venueRef}
        className="px-4 md:px-8 lg:px-16 pb-10 md:pb-16"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        <div className="max-w-7xl mx-auto pt-10 md:pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={{
              opacity: venueInView ? 1 : 0,
              x: venueInView ? 0 : -36,
            }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold">
                Exclusive Venue
              </span>
            </div>

            <h3 className="text-2xl md:text-4xl font-serif mb-4 leading-tight">
              A Unique Venue for
              <br />
              Corporate Gatherings
            </h3>

            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Serendipity transforms business functions into elevated
              experiences. From casual networking cruises to formal client
              receptions, we provide an unmatched charter experience with:
            </p>

            <motion.div
              variants={staggerC}
              initial="hidden"
              animate={venueInView ? "show" : "hidden"}
              className="flex flex-col gap-3"
            >
              {CORP_VENUE_FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  variants={staggerI}
                  whileHover={{
                    borderColor: "rgba(201,162,39,0.25)",
                    background: "rgba(201,162,39,0.04)",
                  }}
                  className="flex items-start gap-3 p-3 rounded-xl transition-all"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-sm text-white/65 leading-relaxed">
                    {f}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{
              opacity: venueInView ? 1 : 0,
              x: venueInView ? 0 : 36,
            }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/8 group">
              <img
                src="assets/venue.webp"
                alt="Corporate venue on Serendipity"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ aspectRatio: "4/3" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(4,13,26,0.4) 0%, transparent 60%)",
                }}
              />
              <div className="gold-accent-line absolute top-0 left-0 right-0 h-[2px]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Use Cases ── */}
      <div
        ref={usecaseRef}
        className="px-4 md:px-8 lg:px-16 py-10 md:py-16"
        style={{
          background: "#051126",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={{
              opacity: usecaseInView ? 1 : 0,
              x: usecaseInView ? 0 : -36,
            }}
            transition={{ duration: 0.9 }}
          >
            <div className="relative rounded-3xl overflow-hidden group">
              <img
                src="assets/venue1.webp"
                alt="Corporate gathering"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ aspectRatio: "4/3", filter: "brightness(0.8)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(4,13,26,0.6) 0%, transparent 55%)",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{
              opacity: usecaseInView ? 1 : 0,
              x: usecaseInView ? 0 : 36,
            }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold">
                Ideal For
              </span>
            </div>

            <h3 className="text-2xl md:text-4xl font-serif mb-6 leading-tight">
              Events That
              <br />
              Make an Impression
            </h3>

            <motion.div
              variants={staggerC}
              initial="hidden"
              animate={usecaseInView ? "show" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
            >
              {CORP_USE_CASES_DATA.map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerI}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-sm text-white/60">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <a
              href="/book"
              className="gold-shimmer-btn inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-bold rounded-xl text-sm"
            >
              Book Your Event <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── What To Expect ── */}
      <div
        ref={expectRef}
        className="px-4 md:px-8 lg:px-16 py-10 md:py-16"
        style={{
          background: "#040d1a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gold" />
              <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold">
                Onboard
              </span>
            </div>
            <h3 className="text-2xl md:text-4xl font-serif leading-tight">
              Aboard Serendipity:
              <br />
              <em className="shimmer-text">What You Can Expect</em>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORP_WHAT_TO_EXPECT.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: expectInView ? 1 : 0,
                  y: expectInView ? 0 : 24,
                }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h4 className="font-serif text-lg mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
// ─── Reviews Section ──────────────────────────────────────────────────────────
function ReviewsSection() {
  const reviewsList = [
    { name: "Carolina Reyes", role: "5-Day Charter Guest", text: "We just had a 5 day charter and we could not be any happier. Captain John, Jake and Hailey were amazing. The crew made it perfect and the yacht's beauty I could not even explain. We are already planning our next trip. 5 stars no doubt!!!", initial: "CR" },
    { name: "Shannon Cook", role: "Day Cruise Guest", text: "I had the opportunity to be a guest for a day cruise and it was lovely. The boat is top notch as are the captains. Definitely recommend!", initial: "SC" },
    { name: "Byron Wilson", role: "Weekend Charter Guest", text: "We had an amazing time aboard the Serendipity! Unforgettable from start to finish. Already planning our return!", initial: "BW" },
    { name: "Michael Chen", role: "Corporate Event", text: "Stunning yacht and professional crew. Our executive team was thoroughly impressed. The perfect venue for networking.", initial: "MC" },
    { name: "Sarah Jenkins", role: "Sunset Cruise", text: "The most beautiful sunset I have ever seen. The attention to detail on Serendipity is unmatched. Truly first-class.", initial: "SJ" },
    { name: "David Miller", role: "Anniversary Guest", text: "An absolute dream. The crew went above and beyond to make our anniversary special. Highly recommended!", initial: "DM" },
  ];
  const infiniteReviews = [...reviewsList, ...reviewsList];

  return (
    <section id="reviews" className="py-2 md:py-5 bg-navy-light relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mb-8 md:mb-16">
        <div className="flex items-center gap-3 mb-3"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Guest Reviews</span></div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <h2 className="text-3xl md:text-5xl font-serif leading-tight">What Our Clients <em className="text-gold italic font-serif">Say</em></h2>
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center gap-1 mb-1">
              {[1,2,3,4,5].map((i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Star className="w-4 h-4 fill-gold text-gold" />
                </motion.div>
              ))}
            </div>
            <p className="text-sm font-bold">5.0 Average Rating</p>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden relative py-6 md:py-10">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="flex gap-4 md:gap-6 whitespace-nowrap">
          {infiniteReviews.map((r, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02, y: -4 }}
              className="w-[280px] md:w-[420px] shrink-0 p-5 md:p-10 bg-navy/40 backdrop-blur-xl border border-white/10 rounded-[2rem] whitespace-normal group hover:border-gold/30 transition-all shadow-xl">
              <div className="text-gold/20 mb-4 font-serif"><svg className="w-7 md:w-10 h-7 md:h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg></div>
              <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map((j) => (<Star key={j} className="w-3 h-3 fill-gold text-gold" />))}</div>
              <p className="text-sm text-white/80 leading-relaxed mb-5 italic">"{r.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <motion.div whileHover={{ scale: 1.15 }} className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center font-bold text-gold text-xs group-hover:bg-gold group-hover:text-navy transition-all shrink-0">{r.initial}</motion.div>
                <div>
                  <h5 className="font-bold text-sm">{r.name}</h5>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Inquiry Section ──────────────────────────────────────────────────────────
function InquirySection({ addToast }: { addToast: (m: string, t: string, tp: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Day Trip");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("We'll be in touch within 24 hours!", "Inquiry Sent!", "success");
      setFirstName(""); setLastName(""); setEmail(""); setMessage(""); setEventType("Day Trip");
    }, 900);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    background: focused === name ? "rgba(201,162,39,0.04)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === name ? "rgba(201,162,39,0.4)" : "rgba(255,255,255,0.1)"}`,
    transition: "all 0.3s",
  });

  return (
    <section id="contact" className="py-10 md:py-5 px-4 md:px-8 lg:px-16 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none"><img src="assets/hero1.png" className="w-full h-full object-cover" alt="" /></div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-center">
        <div>
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold">Get in Touch</span></div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6">Questions or<br /><em className="text-gold italic font-serif">Special Requests?</em></h2>
          <p className="text-white/50 text-base mb-8 max-w-sm">Have questions about our charter packages, availability, or want to discuss a custom itinerary?</p>
          <div className="p-5 mb-6 rounded-2xl border border-gold/20 bg-gold/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1"><p className="text-sm font-bold text-gold mb-1">Ready to Book?</p><p className="text-xs text-white/50">Skip the inquiry and go straight to selecting your charter package.</p></div>
            <motion.a href="/book" whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="gold-shimmer-btn flex items-center gap-2 px-5 py-3 bg-gold text-navy font-bold rounded-xl text-sm shadow-lg shadow-gold/20 whitespace-nowrap shrink-0">
              Book Now <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
          <div className="space-y-4">
            {[{ icon: Phone, text: "Call Jake: 412-418-2968" }, { icon: Phone, text: "Call Bryon: 727-644-9653" }, { icon: MapPin, text: "Saint Petersburg, FL" }].map((c, i) => (
              <motion.div key={i} whileHover={{ x: 6 }} className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-gold/50 transition-colors shrink-0">
                  <c.icon className="w-4 h-4 text-gold" />
                </div>
                <span className="text-white/70 font-medium group-hover:text-white transition-colors text-sm">{c.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.002 }}
          className="p-5 md:p-10 lg:p-12 bg-navy-light/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl transition-all">
          <h3 className="text-2xl md:text-3xl font-serif mb-2">Send an Inquiry</h3>
          <p className="text-white/40 mb-6 text-sm">Tell us about your event and we'll get back to you within 24 hours.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-white/30 tracking-widest uppercase">First Name</label>
                <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => setFocused("first")} onBlur={() => setFocused(null)}
                  className="w-full rounded-xl p-3.5 text-sm outline-none text-white placeholder-white/20" style={inputStyle("first")} placeholder="John" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-white/30 tracking-widest uppercase">Last Name</label>
                <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => setFocused("last")} onBlur={() => setFocused(null)}
                  className="w-full rounded-xl p-3.5 text-sm outline-none text-white placeholder-white/20" style={inputStyle("last")} placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-white/30 tracking-widest uppercase">Email Address</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                className="w-full rounded-xl p-3.5 text-sm outline-none text-white placeholder-white/20" style={inputStyle("email")} placeholder="john@example.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-white/30 tracking-widest uppercase">Charter Interest</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)}
                onFocus={() => setFocused("select")} onBlur={() => setFocused(null)}
                className="w-full rounded-xl p-3.5 text-sm outline-none appearance-none cursor-pointer text-white" style={inputStyle("select")}>
                {["Day Trip — $10,000","Weekend Getaway — $20,000","Full Week — $35,000","Corporate Events — $15,000","Birthdays & Anniversaries — $7,500","Culinary & Wine Cheese — $7,500","Sunset Cruise (Custom)","General Question"].map((o) => (
                  <option key={o} className="bg-navy">{o}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-white/30 tracking-widest uppercase">Message</label>
              <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)}
                className="w-full rounded-xl p-3.5 text-sm outline-none resize-none text-white placeholder-white/20" style={inputStyle("msg")}
                placeholder="Tell us about your event, preferred dates, guest count..." />
            </div>
            <motion.button disabled={loading} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}
              className="gold-shimmer-btn w-full py-4 bg-gradient-to-r from-gold to-gold-hover text-navy font-bold rounded-2xl shadow-xl shadow-gold/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3">
              {loading ? (
                <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full" />Sending Inquiry…</>
              ) : (
                <><Send className="w-5 h-5" /> Send Inquiry</>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#040810] py-12 md:py-5 px-4 md:px-8 lg:px-16 border-t border-white/5 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto">
        <GoldDivider />
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20 mt-12">
          <div className="col-span-2 lg:col-span-1">
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-2 mb-4">
              <img src="assets/logo.png" alt="Serendipity Logo" className="h-12 md:h-16 w-auto" />
            </motion.div>
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">A stunning 94' Lazzara Hardtop motor yacht based in Saint Petersburg, Florida.</p>
            <div className="flex gap-3">
              {[{ href: "https://www.facebook.com/profile.php?id=61578530267044", icon: Facebook }, { href: "https://www.instagram.com/serendipityyachtcharter/", icon: Instagram }].map(({ href, icon: Icon }, i) => (
                <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, borderColor: "rgba(201,162,39,0.5)", color: "#c9a227" }} whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 transition-all">
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
          {[
            { title: "Charter", links: [["Day Trip — $10,000", "/book"],["Weekend — $20,000", "/book"],["Full Week — $35,000", "/book"],["Corporate — $15,000", "/book"]] },
            { title: "Contact", links: [["Jake: 412-418-2968"],["Bryon: 727-644-9653"],["Send Inquiry", "#contact"]] },
            { title: "Location", links: [["Maximo Marina"],["3701 50 Ave S."],["St. Petersburg, FL"]] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-serif text-base mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(([label, href], i) => (
                  <li key={i}>
                    {href ? (
                      <motion.a href={href} whileHover={{ x: 4, color: "#c9a227" }} className="text-sm text-white/30 transition-all inline-block">{label}</motion.a>
                    ) : (
                      <motion.span whileHover={{ x: 4, color: "#c9a227" }} className="text-sm text-white/30 transition-all inline-block">{label}</motion.span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-medium text-white/20 tracking-widest uppercase">
          <p>© 2025 SERENDIPITY YACHT CHARTER. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-5 md:gap-8">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <motion.a key={l} href={`/${l.toLowerCase()}`} whileHover={{ color: "#c9a227" }} className="transition-colors">{l}</motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[10002] flex items-center justify-center p-4 md:p-10"
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
      <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 32 }} onClick={(e) => e.stopPropagation()}
        className="relative max-h-full w-full flex items-center justify-center" style={{ maxHeight: "95vh" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<"exterior" | "interior">("exterior");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isAvailOpen, setIsAvailOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isRouteOpen, setIsRouteOpen] = useState(false);
  const [isCharterHighlightsOpen, setIsCharterHighlightsOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; msg: string; title: string; type: string }[]>([]);
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); setShowFab(window.scrollY > 600); };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToast = useCallback((msg: string, title: string, type: string = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, title, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const nextHero = () => setHeroIdx((prev) => (prev + 1) % 3);
  useEffect(() => { const interval = setInterval(nextHero, 12000); return () => clearInterval(interval); }, []);

  const openGalleryWithTab = (tab: "exterior" | "interior") => { setGalleryTab(tab); setIsGalleryOpen(true); };
  const openLightbox = useCallback((src: string) => { setLightboxImg(src); }, []);

  const spawnParticles = (e: React.MouseEvent) => {
    const id = Date.now();
    setParticles((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-white" onClick={spawnParticles}>
      <StyleInjector />

      {/* Animated progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 z-[10001] origin-left"
        style={{ scaleX, background: "linear-gradient(90deg, #c9a227, #f0c040, #c9a227)", boxShadow: "0 0 8px rgba(201,162,39,0.5)" }} />

      {/* Particle effects */}
      <AnimatePresence>
        {particles.map((p) => (
          <ParticleBurst key={p.id} x={p.x} y={p.y} onDone={() => setParticles((prev) => prev.filter((pp) => pp.id !== p.id))} />
        ))}
      </AnimatePresence>

      <Navbar isHidden={false} isScrolled={isScrolled} setMobileMenuOpen={setMobileMenuOpen} openAvail={() => setIsAvailOpen(true)} />

      <AnimatePresence>
        {mobileMenuOpen && <MobileMenu setMobileMenuOpen={setMobileMenuOpen} openAvail={() => setIsAvailOpen(true)} />}
      </AnimatePresence>

      <MobileBottomNav openAvail={() => setIsAvailOpen(true)} />

      <Hero heroIdx={heroIdx} setHeroIdx={setHeroIdx} openAvail={() => setIsAvailOpen(true)} openVideo={() => setIsVideoOpen(true)} openRoute={() => setIsRouteOpen(true)} />

      <main>
        <AccommodationsSection openRoom={setSelectedRoom} openGalleryInterior={() => openGalleryWithTab("interior")} />
        <ExperiencesSection openExp={setSelectedExp} />
        <FlybridgeSection onTourClick={() => setIsCharterHighlightsOpen(true)} />
        <WaterToysSection />
        <CulinarySection />
        <DestinationsSection />
        <PricingSection />
        <MechanicalSection />
        <PrivateSection />
        <CorporateSection />
        <ReviewsSection />
        <InquirySection addToast={addToast} />
      </main>

      <Footer />

      {/* ── Modals ── */}
      <AnimatePresence>
        {isCharterHighlightsOpen && <CharterHighlightsModal onClose={() => setIsCharterHighlightsOpen(false)} />}

        {selectedExp && (
          <Modal onClose={() => setSelectedExp(null)}>
            <div className="max-w-3xl w-full bg-navy-light rounded-3xl overflow-hidden border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="relative overflow-hidden">
                <motion.img src={selectedExp.img} alt={selectedExp.title} className="w-full h-56 md:h-80 object-cover"
                  initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                <div className="absolute top-4 left-4 md:hidden"><span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: "rgba(201,162,39,0.85)", color: "#040d1a" }}>{selectedExp.tag}</span></div>
              </div>
              <div className="p-5 md:p-12">
                <div className="hidden md:flex items-center gap-2 mb-4"><div className="w-10 h-[1.5px] bg-gold" /><span className="text-[10px] md:text-[11px] font-bold tracking-[2.5px] uppercase text-gold">{selectedExp.tag} Event</span></div>
                <h2 className="text-2xl md:text-4xl font-serif mb-3 md:mb-4 leading-tight">{selectedExp.title}</h2>
                <p className="text-sm text-white/60 mb-5 leading-relaxed">{selectedExp.desc}</p>
                <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {selectedExp.features.map((f, i) => (
                    <motion.div key={i} variants={staggerItem} className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-xl">
                      <Check className="w-4 h-4 text-gold shrink-0" /><span className="text-xs text-white/70">{f}</span>
                    </motion.div>
                  ))}
                </motion.div>
                <a href="/book" className="gold-shimmer-btn w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm">
                  Book This Experience <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Modal>
        )}

        {selectedRoom && (<Modal onClose={() => setSelectedRoom(null)}><RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} /></Modal>)}

        {isGalleryOpen && (
          <Modal onClose={() => setIsGalleryOpen(false)}>
            <div className="max-w-5xl w-full bg-navy-light rounded-3xl border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="sticky top-0 bg-navy-light/95 backdrop-blur-xl border-b border-white/10 z-10 p-5 md:p-10 pb-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3">
                  <div><h2 className="text-xl md:text-4xl font-serif mb-1">The Collection</h2><p className="text-white/40 text-xs">Serendipity — 94' Lazzara Hardtop Motor Yacht</p></div>
                  <div className="flex gap-2">
                    {(["exterior","interior"] as const).map((tab) => (
                      <motion.button key={tab} onClick={() => setGalleryTab(tab)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${galleryTab === tab ? "bg-gold text-navy border-gold shadow-lg shadow-gold/20" : "bg-white/5 border-white/15 text-white/50 hover:text-white hover:border-white/30"}`}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-10 pt-5">
                <AnimatePresence mode="wait">
                  <motion.div key={galleryTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                    {(galleryTab === "exterior" ? EXTERIOR_GALLERY : INTERIOR_GALLERY).map((img, i) => (
                      <motion.div key={`${galleryTab}-${i}`} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/8 group relative cursor-pointer"
                        onClick={() => setLightboxImg(img.src)}>
                        <motion.img src={img.src} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} alt={img.label} />
                        <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/50 transition-colors duration-400 flex items-center justify-center">
                          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileHover={{ opacity: 1, scale: 1 }}>
                            <ZoomIn className="w-7 h-7 text-white drop-shadow-lg" />
                          </motion.div>
                        </div>
                        <motion.div initial={{ y: "100%" }} whileHover={{ y: 0 }} transition={{ duration: 0.3 }}
                          className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy/90 to-transparent">
                          <p className="text-[10px] font-semibold text-white/90">{img.label}</p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Modal>
        )}

        {lightboxImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxImg(null)}
            className="fixed inset-0 bg-black/96 z-[10003] flex items-center justify-center p-4" style={{ backdropFilter: "blur(12px)" }}>
            <motion.button whileHover={{ scale: 1.1, rotate: 90 }} onClick={() => setLightboxImg(null)} className="absolute top-6 right-6 p-2 text-white/50 hover:text-white"><X className="w-7 h-7" /></motion.button>
            <motion.img initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={lightboxImg}
              className="max-w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} alt="Gallery" />
          </motion.div>
        )}

        {isAvailOpen && (
          <Modal onClose={() => setIsAvailOpen(false)}>
            <div className="max-w-lg w-full bg-navy-light rounded-3xl overflow-y-auto max-h-[90vh] scrollbar-hide border border-white/10 shadow-2xl relative">
              <div className="gold-accent-line absolute top-0 left-0 right-0 h-[2px]" />
              <div className="p-5 md:p-12">
                <h2 className="text-2xl md:text-3xl font-serif mb-2 mr-5">Check Availability</h2>
                <p className="text-white/40 mb-6 text-xs md:text-sm">Select your desired dates to check current availability.</p>
                <CalendarComponent onSelect={(date) => addToast(`Selected ${date}`, "Date Added", "gold")} />
                <div className="mt-6 flex flex-wrap gap-3">
                  {[["bg-gold","Selected"],["border border-gold","Today"],["bg-red-500/10","Booked"],["bg-white/10","Available"]].map(([cls, label]) => (
                    <div key={label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded ${cls}`} /><span className="text-[10px] uppercase tracking-wider text-white/50">{label}</span></div>
                  ))}
                </div>
                <motion.a href="/book" onClick={() => setIsAvailOpen(false)} whileHover={{ scale: 1.01, y: -1 }}
                  className="gold-shimmer-btn mt-8 w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 text-sm">
                  Book Selected Dates <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </Modal>
        )}

        {isVideoOpen && (
          <Modal onClose={() => setIsVideoOpen(false)}>
            <div className="w-[95vw] md:w-[80vw] lg:w-[70vw] aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-white/10">
              <iframe src="https://player.vimeo.com/video/778990092?autoplay=1&color=c9a227&title=0&byline=0&portrait=0"
                className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            </div>
          </Modal>
        )}

        {isRouteOpen && (
          <Modal onClose={() => setIsRouteOpen(false)}>
            <div className="max-w-2xl w-full bg-navy-light rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col scrollbar-hide overflow-y-auto max-h-[95vh]">
              <div className="relative h-44 md:h-64 shrink-0 overflow-hidden">
                <motion.img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
                  className="w-full h-full object-cover" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-gold/90 px-3 py-1.5 rounded-full text-navy font-bold text-[10px] uppercase tracking-widest shadow-lg">
                  <Star className="w-3 h-3 fill-current" /> High Demand
                </div>
              </div>
              <div className="p-5 md:p-12">
                <div className="flex items-center gap-3 mb-3"><div className="w-8 h-[1.5px] bg-gold" /><span className="text-[10px] font-bold tracking-[2px] uppercase text-gold">Exclusive Itinerary</span></div>
                <h2 className="text-2xl md:text-3xl font-serif mb-3">The Island Hopper</h2>
                <p className="text-xs md:text-sm text-white/60 mb-6 leading-relaxed">Navigate the crown jewels of Florida's coast.</p>
                <div className="space-y-4">
                  {[
                    { t: "Egmont Key State Park", d: "Visit the historic lighthouse and explore hidden ruins." },
                    { t: "Shell Key Preserve", d: "Anchor in crystal turquoise waters for shelling and paddleboarding." },
                    { t: "Pass-A-Grille Historic District", d: "Enjoy a legendary sunset with a curated beach picnic." },
                  ].map((item, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <motion.div whileHover={{ background: "#c9a227", color: "#040d1a" }} className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center text-[10px] text-gold font-bold transition-all flex-shrink-0">{idx + 1}</motion.div>
                        {idx < 2 && <div className="w-px h-full bg-white/10 my-1" />}
                      </div>
                      <div className="pb-3">
                        <h4 className="font-bold text-xs mb-0.5 group-hover:text-gold transition-colors">{item.t}</h4>
                        <p className="text-[10px] text-white/40 leading-relaxed">{item.d}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div><p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Duration</p><p className="text-gold text-lg">4 - 8 Hours</p></div>
                  <motion.a href="/book" onClick={() => setIsRouteOpen(false)} whileHover={{ scale: 1.03, y: -1 }}
                    className="gold-shimmer-btn w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold rounded-xl text-sm transition-all text-center">
                    Reserve This Route
                  </motion.a>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* FAB scroll-to-top */}
      <AnimatePresence>
        {showFab && (
          <motion.button initial={{ opacity: 0, scale: 0.5, rotate: -45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            whileHover={{ scale: 1.1, rotate: -15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden lg:flex fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-gold to-gold/80 rounded-full items-center justify-center shadow-xl z-50 group"
            style={{ boxShadow: "0 0 20px rgba(201,162,39,0.35)" }}>
            <ChevronLeft className="w-6 h-6 text-navy rotate-90 group-hover:translate-y-[-2px] transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast notifications */}
      <div className="fixed bottom-20 lg:bottom-8 left-4 flex flex-col gap-3 z-[10001] max-w-[260px] md:max-w-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div key={t.id} initial={{ x: -100, opacity: 0, scale: 0.9 }} animate={{ x: 0, opacity: 1, scale: 1 }} exit={{ x: -100, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="p-3.5 min-w-48 md:min-w-64 bg-navy-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${t.type === "gold" ? "bg-gold/15" : "bg-green-500/15"}`}>
                {t.type === "gold" ? <Zap className="w-4 h-4 text-gold" /> : <Check className="w-4 h-4 text-green-500" />}
              </div>
              <div>
                <p className="text-xs font-bold">{t.title}</p>
                <span className="text-[10px] text-white/40 block mt-0.5">{t.msg}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}