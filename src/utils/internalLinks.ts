/**
 * Internal Linking Utility
 * Automatically adds internal links to content based on keyword mappings
 */

// Pillar page keyword mappings
const PILLAR_KEYWORDS: Record<string, string> = {
  // Primary pillar pages
  'martial arts software': '/martial-arts-software/',
  'martial arts management software': '/martial-arts-software/',
  'dojo software': '/dojo-management-software/',
  'dojo management software': '/dojo-management-software/',
  'dojo management': '/dojo-management-software/',
  'karate software': '/karate-school-software/',
  'karate school software': '/karate-school-software/',
  'karate school management': '/karate-school-software/',
  'mma software': '/mma-gym-software/',
  'mma gym software': '/mma-gym-software/',
  'mma gym management': '/mma-gym-software/',
  'martial arts crm': '/martial-arts-crm/',
  'dojo crm': '/martial-arts-crm/',
  'billing software': '/martial-arts-billing-software/',
  'martial arts billing': '/martial-arts-billing-software/',
  'martial arts billing software': '/martial-arts-billing-software/',
  
  // Blog-worthy keywords
  'karate belts': '/blog/karate-belt-order-complete-guide/',
  'belt ranking': '/blog/karate-belt-order-complete-guide/',
  'bjj belts': '/blog/bjj-belts-order-complete-guide/',
  'taekwondo belts': '/blog/taekwondo-belts/',
  'jiu jitsu belts': '/blog/jiu-jitsu-belt-ranks/',
  
  // General site links
  'pricing': '/pricing/',
  'contact us': '/contact/',
  'about us': '/about/',
};

// Track which keywords have been linked (per content piece)
let linkedKeywords: Set<string> = new Set();

/**
 * Add internal links to content string
 * Only links first occurrence of each keyword
 */
export function addInternalLinks(
  content: string, 
  currentPath: string = '',
  maxLinks: number = 5
): string {
  linkedKeywords = new Set();
  let linkCount = 0;
  let result = content;
  
  // Sort keywords by length (longest first) to avoid partial matches
  const sortedKeywords = Object.keys(PILLAR_KEYWORDS).sort((a, b) => b.length - a.length);
  
  for (const keyword of sortedKeywords) {
    if (linkCount >= maxLinks) break;
    
    const targetPath = PILLAR_KEYWORDS[keyword];
    
    // Don't link to the current page
    if (targetPath === currentPath) continue;
    
    // Skip if we've already linked a similar keyword
    const baseKeyword = keyword.split(' ').slice(0, 2).join(' ');
    if (linkedKeywords.has(baseKeyword)) continue;
    
    // Create case-insensitive regex for first occurrence only
    // Avoid matching inside existing links or HTML tags
    const regex = new RegExp(
      `(?<!<[^>]*)(?<![\\w-])${escapeRegex(keyword)}(?![\\w-])(?![^<]*>)`,
      'i'
    );
    
    const match = result.match(regex);
    if (match) {
      const linkedText = `<a href="${targetPath}" class="internal-link">${match[0]}</a>`;
      result = result.replace(regex, linkedText);
      linkedKeywords.add(baseKeyword);
      linkCount++;
    }
  }
  
  return result;
}

/**
 * Escape special regex characters
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get related pages based on content keywords
 */
export function getRelatedPages(content: string, currentPath: string, limit: number = 3): Array<{title: string, href: string}> {
  const related: Array<{title: string, href: string, score: number}> = [];
  const contentLower = content.toLowerCase();
  
  const pageData: Record<string, string> = {
    '/martial-arts-software/': 'Martial Arts Software',
    '/dojo-management-software/': 'Dojo Management Software',
    '/karate-school-software/': 'Karate School Software',
    '/mma-gym-software/': 'MMA Gym Software',
    '/martial-arts-crm/': 'Martial Arts CRM',
    '/martial-arts-billing-software/': 'Martial Arts Billing Software',
    '/pricing/': 'Pricing',
    '/about/': 'About Us',
  };
  
  for (const [href, title] of Object.entries(pageData)) {
    if (href === currentPath) continue;
    
    // Score based on keyword presence
    let score = 0;
    const keywords = title.toLowerCase().split(' ');
    for (const keyword of keywords) {
      if (contentLower.includes(keyword)) {
        score += 1;
      }
    }
    
    if (score > 0) {
      related.push({ title, href, score });
    }
  }
  
  // Sort by score and return top results
  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ title, href }) => ({ title, href }));
}

export default {
  addInternalLinks,
  getRelatedPages,
  PILLAR_KEYWORDS
};
