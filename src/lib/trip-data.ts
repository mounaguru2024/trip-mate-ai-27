import ooty from "@/assets/ooty.jpg";
import kodaikanal from "@/assets/kodaikanal.jpg";
import goa from "@/assets/goa.jpg";
import manali from "@/assets/manali.jpg";
import kerala from "@/assets/kerala.jpg";
import jaipur from "@/assets/jaipur.jpg";
import mumbai from "@/assets/mumbai.jpg";
import delhi from "@/assets/delhi.jpg";

export type Destination = {
  name: string;
  image: string;
  tagline: string;
  description: string;
  region: string;
  bestFor: string[];
  spots: string[];
  food: string[];
  evenings: string[];
  stays: string[];
};

export const destinations: Destination[] = [
  {
    name: "Ooty",
    image: ooty,
    region: "Tamil Nadu",
    tagline: "Queen of the Nilgiris",
    description: "Rolling tea gardens, toy trains and cool misty mornings in the Nilgiri hills.",
    bestFor: ["Nature", "Relaxation"],
    spots: ["Botanical Gardens", "Doddabetta Peak", "Nilgiri Mountain Railway ride", "Pykara Falls", "Tea Museum & estate walk"],
    food: ["Hot varkey with filter coffee", "Homemade chocolate tasting", "Nilgiri mutton kurma", "Cheese toast at a hill café"],
    evenings: ["Ooty Lake boating at dusk", "Rose Garden sunset stroll", "Charring Cross market shopping", "Bonfire at a tea-estate stay"],
    stays: ["Colonial estate bungalow", "Boutique tea-garden resort", "Cosy hillside homestay"],
  },
  {
    name: "Kodaikanal",
    image: kodaikanal,
    region: "Tamil Nadu",
    tagline: "Princess of hill stations",
    description: "Pine forests, cliff viewpoints and a silver lake wrapped in permanent mist.",
    bestFor: ["Nature", "Relaxation"],
    spots: ["Coaker's Walk", "Pillar Rocks", "Bryant Park", "Silver Cascade Falls", "Dolphin's Nose trek"],
    food: ["Wood-fired pizza at a lake café", "Kodai plums & fresh berry jam", "Hot bajji at Pillar Rocks", "Eucalyptus-honey pancakes"],
    evenings: ["Cycling around Kodai Lake", "Pine Forest golden hour photos", "Bakery street snack crawl", "Stargazing from the observatory road"],
    stays: ["Lakefront heritage inn", "Pine-forest cottage", "Valley-view boutique hotel"],
  },
  {
    name: "Goa",
    image: goa,
    region: "West Coast",
    tagline: "Sun, sand and susegad",
    description: "Beach shacks, Portuguese lanes and the best sunsets on the Arabian Sea.",
    bestFor: ["Relaxation", "Food", "Adventure"],
    spots: ["Palolem Beach", "Fort Aguada", "Old Goa churches", "Dudhsagar waterfall trip", "Divar island backroads"],
    food: ["Goan fish curry rice", "Prawn balchão", "Bebinca dessert", "Beach-shack calamari & feni sundowner"],
    evenings: ["Sunset cruise on the Mandovi", "Anjuna flea market", "Live music at a beach shack", "Night kayaking in the backwaters"],
    stays: ["Beachfront villa", "Portuguese heritage guesthouse", "Design hostel near the sands"],
  },
  {
    name: "Manali",
    image: manali,
    region: "Himachal Pradesh",
    tagline: "Himalayan adventure base",
    description: "Snow peaks, apple orchards and river-side cafés at the gateway to Spiti.",
    bestFor: ["Adventure", "Nature"],
    spots: ["Solang Valley", "Hadimba Temple", "Old Manali river walk", "Atal Tunnel & Sissu", "Jogini Falls trek"],
    food: ["Siddu with ghee", "Trout tawa fry", "Himachali dham thali", "Apple pie at an Old Manali bakery"],
    evenings: ["Mall Road shopping", "Riverside bonfire", "Café hopping in Old Manali", "Paragliding landing-field sunset"],
    stays: ["Riverside wooden cottage", "Orchard boutique resort", "Cliff-view mountain lodge"],
  },
  {
    name: "Kerala",
    image: kerala,
    region: "God's Own Country",
    tagline: "Backwaters & spice hills",
    description: "Houseboats, ayurvedic calm, Fort Kochi art and green cardamom hills.",
    bestFor: ["Nature", "Culture", "Relaxation"],
    spots: ["Alleppey backwaters cruise", "Munnar tea estates", "Fort Kochi heritage walk", "Athirappilly Falls", "Periyar wildlife safari"],
    food: ["Karimeen pollichathu", "Appam with stew", "Sadya on banana leaf", "Kerala parotta & beef fry"],
    evenings: ["Kathakali performance", "Chinese fishing nets at sunset", "Ayurvedic massage session", "Houseboat dinner under the stars"],
    stays: ["Overnight houseboat", "Tea-plantation bungalow", "Heritage homestay in Fort Kochi"],
  },
  {
    name: "Jaipur",
    image: jaipur,
    region: "Rajasthan",
    tagline: "The Pink City",
    description: "Forts, palaces, block-print bazaars and royal Rajasthani feasts.",
    bestFor: ["Culture", "Shopping", "Food"],
    spots: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Nahargarh sunset point"],
    food: ["Dal baati churma", "Pyaaz kachori", "Laal maas", "Lassi at a Johari Bazaar institution"],
    evenings: ["Bapu Bazaar shopping", "Chokhi Dhani folk evening", "Rooftop dinner facing Hawa Mahal", "Light show at Amber Fort"],
    stays: ["Restored haveli", "Palace-view boutique hotel", "Desert-luxe resort on the outskirts"],
  },
  {
    name: "Mumbai",
    image: mumbai,
    region: "Maharashtra",
    tagline: "City that never sleeps",
    description: "Sea-facing promenades, art deco streets and India's greatest street food.",
    bestFor: ["Food", "Shopping", "Culture"],
    spots: ["Gateway of India", "Elephanta Caves ferry", "Marine Drive", "Kala Ghoda art district", "Sanjay Gandhi National Park"],
    food: ["Vada pav & cutting chai", "Bombay sandwich", "Mohammed Ali Road kebabs", "Bhel puri at Chowpatty"],
    evenings: ["Marine Drive sunset", "Colaba Causeway shopping", "Bandra street-art walk", "Rooftop bar with skyline views"],
    stays: ["Sea-view Colaba hotel", "Bandra design apartment", "Art deco heritage suite"],
  },
  {
    name: "Delhi",
    image: delhi,
    region: "National Capital",
    tagline: "Seven cities in one",
    description: "Mughal monuments, leafy avenues and a food scene spanning every century.",
    bestFor: ["Culture", "Food", "Shopping"],
    spots: ["Red Fort", "Humayun's Tomb", "Qutub Minar", "India Gate & Rajpath", "Lodhi Art District"],
    food: ["Parathas in Chandni Chowk", "Butter chicken & naan", "Chaat at Bengali Market", "Nihari breakfast in Old Delhi"],
    evenings: ["Hauz Khas lakeside dinner", "Dilli Haat crafts shopping", "Qawwali at Nizamuddin", "Connaught Place night walk"],
    stays: ["Lutyens-zone boutique hotel", "Hauz Khas designer stay", "Heritage haveli in Old Delhi"],
  },
];

export const interests = ["Adventure", "Nature", "Food", "Shopping", "Relaxation", "Culture"] as const;
export const transports = ["Car", "Bus", "Train", "Flight"] as const;

export const travelTips = [
  { icon: "🎒", title: "Pack light, layer smart", text: "Hill stations swing 15°C in a day — carry one warm layer and quick-dry basics." },
  { icon: "💳", title: "Carry dual payments", text: "Keep ₹2,000 cash for local transport and shacks; UPI works almost everywhere else." },
  { icon: "🕗", title: "Beat the crowds", text: "Reach popular viewpoints before 8 AM for clear skies and zero queues." },
  { icon: "🛡️", title: "Insure long trips", text: "Trips above 4 days or with treks deserve basic travel insurance — it costs less than a dinner." },
  { icon: "📶", title: "Offline maps", text: "Download offline maps for ghats and forest routes where signal disappears." },
  { icon: "🍽️", title: "Eat where locals queue", text: "The busiest small kitchen almost always beats the prettiest empty café." },
];

export const packingList = [
  "Government photo ID + copies",
  "Power bank & charging cables",
  "Reusable water bottle",
  "Light jacket / warm layer",
  "Comfortable walking shoes",
  "Sunscreen & sunglasses",
  "Basic medicine kit",
  "Umbrella / poncho",
  "Toiletries & sanitiser",
  "Camera or phone gimbal",
];
