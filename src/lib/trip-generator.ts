import { destinations, type Destination } from "./trip-data";

export type TripInput = {
  from: string;
  to: string;
  date: string;
  days: number;
  travelers: number;
  budget: number;
  interests: string[];
  transport: string;
};

export type DayPlan = {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  night: string;
};

export type Trip = {
  id: string;
  createdAt: number;
  input: TripInput;
  days: DayPlan[];
  budget: { label: string; icon: string; percent: number; amount: number }[];
  perPerson: number;
  perDay: number;
};

const genericSpots = [
  "the city's most photographed landmark",
  "a hidden viewpoint locals love",
  "an old quarter walking trail",
  "a lakeside or riverside promenade",
  "a heritage museum with local stories",
];
const genericFood = [
  "a legendary local thali joint",
  "a street-food lane crawl",
  "a family-run regional kitchen",
  "a rooftop café with a view",
];
const genericEvenings = [
  "sunset at the main viewpoint",
  "the night market for souvenirs",
  "a live folk-music session",
  "a slow riverside dinner",
];

const pick = (arr: string[], i: number) => arr[i % arr.length] ?? arr[0] ?? "a local favourite";

function matchDestination(name: string): Destination | undefined {
  const q = name.trim().toLowerCase();
  return destinations.find((d) => d.name.toLowerCase() === q) ?? destinations.find((d) => q.includes(d.name.toLowerCase()));
}

const interestFlavour: Record<string, string> = {
  Adventure: "Add an adrenaline block — trekking, kayaking or a zipline nearby.",
  Nature: "Keep a slow nature window for gardens, forests or waterfalls.",
  Food: "Reserve an extra tasting stop — this city rewards hungry travellers.",
  Shopping: "Leave room for a bazaar run with bargaining time.",
  Relaxation: "Protect a no-plan afternoon for a spa or long café sit.",
  Culture: "Fit in a museum, temple or heritage walk with a local guide.",
};

export function generateTrip(input: TripInput): Trip {
  const dest = matchDestination(input.to);
  const spots = dest?.spots ?? genericSpots;
  const food = dest?.food ?? genericFood;
  const evenings = dest?.evenings ?? genericEvenings;
  const stays = dest?.stays ?? ["a well-reviewed central hotel", "a boutique guesthouse", "a quiet homestay"];
  const place = dest?.name ?? input.to;

  const days: DayPlan[] = Array.from({ length: input.days }, (_, i) => {
    const flavour = input.interests.length ? (interestFlavour[input.interests[i % input.interests.length] ?? ""] ?? "") : "";
    const isFirst = i === 0;
    const isLast = i === input.days - 1 && input.days > 1;
    return {
      day: i + 1,
      title: isFirst
        ? `Arrival in ${place}`
        : isLast
          ? `Last light in ${place}`
          : `${place} — ${input.interests[i % Math.max(input.interests.length, 1)] ?? "Discovery"} day`,
      morning: isFirst
        ? `Travel from ${input.from} by ${input.transport.toLowerCase()}, check in, then ease into ${pick(spots, i)}.`
        : `Start early at ${pick(spots, i)}. ${flavour}`,
      afternoon: `Lunch: ${pick(food, i)}, followed by ${pick(spots, i + 1)}.`,
      evening: isLast
        ? `Final souvenir run, then ${pick(evenings, i)} before you head back to ${input.from}.`
        : `${pick(evenings, i)} — perfect for photos with ${input.travelers > 1 ? "the group" : "yourself on timer"}.`,
      night: `Dinner near your stay, then rest at ${pick(stays, i)}.`,
    };
  });

  const split = [
    { label: "Transportation", icon: "🚗", percent: 30 },
    { label: "Accommodation", icon: "🏨", percent: 35 },
    { label: "Food", icon: "🍔", percent: 20 },
    { label: "Activities", icon: "🎯", percent: 15 },
  ];

  return {
    id: `trip-${Date.now()}`,
    createdAt: Date.now(),
    input,
    days,
    budget: split.map((s) => ({ ...s, amount: Math.round((input.budget * s.percent) / 100) })),
    perPerson: Math.round(input.budget / Math.max(input.travelers, 1)),
    perDay: Math.round(input.budget / Math.max(input.days, 1)),
  };
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
