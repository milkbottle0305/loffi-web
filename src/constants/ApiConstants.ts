type EndpointKey = 'NOTICES' | 'EVENTS' | 'MARKET_ITEMS';

export const ApiConstants: Record<EndpointKey, string> = {
  NOTICES: '/news/notices',
  EVENTS: '/news/events',
  MARKET_ITEMS: '/markets/items',
};

export const LOSTKARK_API_URL = 'https://developer-lostark.game.onstove.com';
