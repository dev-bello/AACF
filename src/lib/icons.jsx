import {
  Heart,
  HandHeart,
  ShieldCheck,
  Sprout,
  Handshake,
  Gift,
  Users,
  Sparkles,
  Star,
  Leaf,
  BookOpen,
  HelpingHand,
} from 'lucide-react';

// Named icon set usable from CMS content (the `icon` field on cards).
// Keys are stable slugs stored in the database; values are Lucide components.
// The ordered slug list lives in iconNames.js (ICON_OPTIONS).
const ICON_MAP = {
  heart: Heart,
  'hand-heart': HandHeart,
  shield: ShieldCheck,
  sprout: Sprout,
  handshake: Handshake,
  gift: Gift,
  users: Users,
  sparkles: Sparkles,
  star: Star,
  leaf: Leaf,
  book: BookOpen,
  hand: HelpingHand,
};

// Legacy symbols that used to be stored in content — map them to real icons
// so existing database rows keep rendering something sensible.
const LEGACY_MAP = {
  '✻': 'sparkles',
  '◆': 'shield',
  '●': 'handshake',
  '▲': 'sprout',
};

// Renders a content-driven icon by name (or legacy symbol), with a fallback.
export function ContentIcon({ name, size = 22, fallback = 'sparkles', ...rest }) {
  const key = ICON_MAP[name] ? name : LEGACY_MAP[name] || fallback;
  const Cmp = ICON_MAP[key] || Sparkles;
  return <Cmp size={size} strokeWidth={2} {...rest} />;
}
