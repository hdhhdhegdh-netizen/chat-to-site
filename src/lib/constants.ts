// Application constants
export const APP_NAME = "Chat2Site";
export const APP_DOMAIN = "chat2site.app";

// Limits
export const MAX_PROJECTS_FREE = 3;
export const MAX_CHATS_PER_DAY_FREE = 10;
export const MAX_VERSION_HISTORY = 20;

// Template categories
export const TEMPLATE_CATEGORIES = {
  business: "أعمال",
  ecommerce: "متاجر",
  creative: "إبداعي",
  services: "خدمات",
  education: "تعليم",
} as const;

// Device breakpoints
export const DEVICE_WIDTHS = {
  mobile: 375,
  tablet: 768,
  desktop: 1280,
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;

// Status colors
export const STATUS_COLORS = {
  published: "green",
  draft: "gray",
  building: "yellow",
  error: "red",
} as const;

// Default messages
export const DEFAULT_AGENT_MESSAGE = "مرحبًا. أنا Chat2Site، وكيلك الذكي لبناء المواقع. أخبرني عن مشروعك وسأبدأ البناء فورًا.";
