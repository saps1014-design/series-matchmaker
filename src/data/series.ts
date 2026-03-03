export interface Series {
  title: string;
  description: string;
  platform: string;
  genre: string;
}

export const platforms = ["Netflix", "Prime Video", "Disney+", "Max", "Apple TV+"] as const;
export const genres = ["Drama", "Comedy", "Action", "Sci-Fi", "Thriller"] as const;

export const seriesData: Series[] = [
  // Netflix - Drama
  { title: "The Crown", description: "Chronicles the reign of Queen Elizabeth II from the 1940s to modern times.", platform: "Netflix", genre: "Drama" },
  { title: "Ozark", description: "A financial advisor launders money for a drug cartel and moves his family to the Ozarks.", platform: "Netflix", genre: "Drama" },
  { title: "Queen's Gambit", description: "An orphaned chess prodigy struggles with addiction on her quest to become the greatest chess player.", platform: "Netflix", genre: "Drama" },
  { title: "Mindhunter", description: "FBI agents study serial killers to understand and solve ongoing cases.", platform: "Netflix", genre: "Drama" },
  { title: "Godless", description: "A young outlaw takes refuge in a quiet mining town populated almost entirely by women.", platform: "Netflix", genre: "Drama" },
  { title: "Beef", description: "Two strangers let a road rage incident escalate into a bitter feud that consumes their lives.", platform: "Netflix", genre: "Drama" },

  // Netflix - Comedy
  { title: "Never Have I Ever", description: "An Indian-American teenager deals with the pressures of high school and family expectations.", platform: "Netflix", genre: "Comedy" },
  { title: "Dead to Me", description: "A widow befriends a free spirit who harbors a dark secret about her husband's death.", platform: "Netflix", genre: "Comedy" },
  { title: "Unbreakable Kimmy Schmidt", description: "A woman escapes a doomsday cult and starts a new life in New York City.", platform: "Netflix", genre: "Comedy" },
  { title: "Grace and Frankie", description: "Two women bond after their husbands announce they're in love with each other.", platform: "Netflix", genre: "Comedy" },
  { title: "The Good Place", description: "A woman wakes up in the afterlife and tries to become a better person.", platform: "Netflix", genre: "Comedy" },
  { title: "Russian Doll", description: "A woman keeps dying and reliving her 36th birthday party in a surreal time loop.", platform: "Netflix", genre: "Comedy" },

  // Netflix - Action
  { title: "Squid Game", description: "Desperate contestants compete in deadly children's games for a massive cash prize.", platform: "Netflix", genre: "Action" },
  { title: "The Night Agent", description: "A low-level FBI agent uncovers a conspiracy that reaches the highest levels of power.", platform: "Netflix", genre: "Action" },
  { title: "Extraction", description: "A black ops mercenary must rescue a kidnapped teenager from a ruthless crime lord.", platform: "Netflix", genre: "Action" },
  { title: "Money Heist", description: "A criminal mastermind recruits a band of thieves to carry out the biggest heist in history.", platform: "Netflix", genre: "Action" },
  { title: "Vikings: Valhalla", description: "Follow the adventures of legendary Norse heroes in the early 11th century.", platform: "Netflix", genre: "Action" },

  // Netflix - Sci-Fi
  { title: "Stranger Things", description: "Kids in a small town uncover supernatural forces and secret government experiments.", platform: "Netflix", genre: "Sci-Fi" },
  { title: "Black Mirror", description: "An anthology series exploring the dark side of technology and modern society.", platform: "Netflix", genre: "Sci-Fi" },
  { title: "Dark", description: "A child's disappearance unravels a time-travel conspiracy spanning several generations.", platform: "Netflix", genre: "Sci-Fi" },
  { title: "Altered Carbon", description: "In a future where consciousness can be transferred, a prisoner solves a murder.", platform: "Netflix", genre: "Sci-Fi" },
  { title: "3 Body Problem", description: "Scientists face an unprecedented threat from an alien civilization in this epic mystery.", platform: "Netflix", genre: "Sci-Fi" },

  // Netflix - Thriller
  { title: "You", description: "A dangerously charming bookstore manager goes to extreme measures to insert himself into the lives of those he's obsessed with.", platform: "Netflix", genre: "Thriller" },
  { title: "Bodyguard", description: "A war veteran assigned to protect a controversial politician uncovers a web of intrigue.", platform: "Netflix", genre: "Thriller" },
  { title: "The Watcher", description: "A family moves into their dream home only to receive threatening letters from a stalker.", platform: "Netflix", genre: "Thriller" },
  { title: "Bloodline", description: "A family of hoteliers in the Florida Keys has their secrets threatened by a black sheep sibling.", platform: "Netflix", genre: "Thriller" },
  { title: "Clickbait", description: "A man is abducted and held hostage in a video that goes viral, leading to a frantic investigation.", platform: "Netflix", genre: "Thriller" },

  // Prime Video - Drama
  { title: "The Marvelous Mrs. Maisel", description: "A 1950s housewife discovers a talent for stand-up comedy after her husband leaves her.", platform: "Prime Video", genre: "Drama" },
  { title: "Reacher", description: "A former military police investigator drifts into a small town and uncovers a deadly conspiracy.", platform: "Prime Video", genre: "Drama" },
  { title: "Fleabag", description: "A dry-witted woman navigates life, love, and family in London with brutal honesty.", platform: "Prime Video", genre: "Drama" },
  { title: "Homecoming", description: "A caseworker at a facility helping soldiers transition to civilian life uncovers a sinister plot.", platform: "Prime Video", genre: "Drama" },
  { title: "Citadel", description: "Spies from a global agency must work together after their memories are wiped.", platform: "Prime Video", genre: "Drama" },

  // Prime Video - Comedy
  { title: "The Boys", description: "A group of vigilantes takes on corrupt superheroes who abuse their powers.", platform: "Prime Video", genre: "Comedy" },
  { title: "Upload", description: "A man chooses to be uploaded to a virtual afterlife when he dies prematurely.", platform: "Prime Video", genre: "Comedy" },
  { title: "Catastrophe", description: "An American man and an Irish woman try to make their relationship work after a fling.", platform: "Prime Video", genre: "Comedy" },
  { title: "Harlem", description: "Four ambitious girlfriends navigate love, career, and friendship in Harlem.", platform: "Prime Video", genre: "Comedy" },
  { title: "Jury Duty", description: "A real person serves on a jury alongside actors in this unique comedy experiment.", platform: "Prime Video", genre: "Comedy" },

  // Prime Video - Action
  { title: "Jack Ryan", description: "A CIA analyst is thrust into a dangerous field assignment for the first time.", platform: "Prime Video", genre: "Action" },
  { title: "The Terminal List", description: "A Navy SEAL investigates why his platoon was ambushed during a covert mission.", platform: "Prime Video", genre: "Action" },
  { title: "Citadel", description: "Elite spies from a global agency must stop a powerful syndicate.", platform: "Prime Video", genre: "Action" },
  { title: "The Power", description: "Women around the world develop the ability to generate electrical jolts from their hands.", platform: "Prime Video", genre: "Action" },
  { title: "Cross", description: "A detective and forensic psychologist hunts the most dangerous criminals.", platform: "Prime Video", genre: "Action" },

  // Prime Video - Sci-Fi
  { title: "The Expanse", description: "In a colonized solar system, a detective and a ship captain uncover a vast conspiracy.", platform: "Prime Video", genre: "Sci-Fi" },
  { title: "Fallout", description: "Survivors navigate a post-apocalyptic wasteland shaped by nuclear devastation.", platform: "Prime Video", genre: "Sci-Fi" },
  { title: "Tales from the Loop", description: "Residents above an underground machine experience impossible events.", platform: "Prime Video", genre: "Sci-Fi" },
  { title: "Night Sky", description: "A couple discovers a chamber in their backyard that leads to a strange planet.", platform: "Prime Video", genre: "Sci-Fi" },
  { title: "The Peripheral", description: "A woman discovers a connection to an alternate future timeline.", platform: "Prime Video", genre: "Sci-Fi" },

  // Prime Video - Thriller
  { title: "Hunters", description: "A band of Nazi hunters in 1970s New York City discovers a conspiracy to create a Fourth Reich.", platform: "Prime Video", genre: "Thriller" },
  { title: "The Underground Railroad", description: "A young woman escapes slavery via a literal underground railroad beneath the South.", platform: "Prime Video", genre: "Thriller" },
  { title: "Them", description: "A Black family moves to an all-white neighborhood in the 1950s and faces terrifying forces.", platform: "Prime Video", genre: "Thriller" },
  { title: "I Know What You Did Last Summer", description: "Teens are stalked by a mysterious killer after a fatal accident on graduation night.", platform: "Prime Video", genre: "Thriller" },
  { title: "Too Old to Die Young", description: "An LA sheriff's deputy navigates the criminal underworld after a tragedy.", platform: "Prime Video", genre: "Thriller" },

  // Disney+ - Drama
  { title: "The Bear", description: "A young chef returns home to run his family's sandwich shop in Chicago.", platform: "Disney+", genre: "Drama" },
  { title: "Shōgun", description: "An English sailor navigates the political landscape of feudal Japan.", platform: "Disney+", genre: "Drama" },
  { title: "Only Murders in the Building", description: "Three strangers obsessed with true crime investigate a death in their building.", platform: "Disney+", genre: "Drama" },
  { title: "The Old Man", description: "A former CIA officer living off the grid is forced to confront his past.", platform: "Disney+", genre: "Drama" },
  { title: "A Small Light", description: "The story of Miep Gies, who helped hide Anne Frank and her family.", platform: "Disney+", genre: "Drama" },

  // Disney+ - Comedy
  { title: "Abbott Elementary", description: "Teachers at an underfunded Philadelphia school navigate the challenges of education.", platform: "Disney+", genre: "Comedy" },
  { title: "What We Do in the Shadows", description: "Vampire roommates navigate modern life on Staten Island.", platform: "Disney+", genre: "Comedy" },
  { title: "Welcome to Wrexham", description: "Ryan Reynolds and Rob McElhenney buy a struggling Welsh football club.", platform: "Disney+", genre: "Comedy" },
  { title: "High School Musical: The Series", description: "Students at the school where the movie was filmed stage their own production.", platform: "Disney+", genre: "Comedy" },
  { title: "The Muppets Mayhem", description: "The Electric Mayhem Band records their first studio album.", platform: "Disney+", genre: "Comedy" },

  // Disney+ - Action
  { title: "The Mandalorian", description: "A lone bounty hunter in the Star Wars galaxy protects a mysterious child.", platform: "Disney+", genre: "Action" },
  { title: "Andor", description: "A thief becomes a revolutionary in the early days of the Rebel Alliance.", platform: "Disney+", genre: "Action" },
  { title: "Loki", description: "The God of Mischief steps out of his brother's shadow in a time-bending adventure.", platform: "Disney+", genre: "Action" },
  { title: "Ahsoka", description: "A former Jedi investigates a growing threat to the galaxy after the Empire's fall.", platform: "Disney+", genre: "Action" },
  { title: "Echo", description: "A young woman reconnects with her Native American roots while being pursued by enemies.", platform: "Disney+", genre: "Action" },

  // Disney+ - Sci-Fi
  { title: "Secret Invasion", description: "Nick Fury discovers a faction of shape-shifting Skrulls infiltrating Earth.", platform: "Disney+", genre: "Sci-Fi" },
  { title: "Moon Knight", description: "A gift shop employee discovers he has dissociative identity disorder and a connection to an Egyptian god.", platform: "Disney+", genre: "Sci-Fi" },
  { title: "The Book of Boba Fett", description: "The legendary bounty hunter navigates the galaxy's underworld.", platform: "Disney+", genre: "Sci-Fi" },
  { title: "Obi-Wan Kenobi", description: "The Jedi master watches over a young Luke Skywalker while evading the Empire.", platform: "Disney+", genre: "Sci-Fi" },
  { title: "National Treasure: Edge of History", description: "A young dreamer searches for treasure connected to her family's past.", platform: "Disney+", genre: "Sci-Fi" },

  // Disney+ - Thriller
  { title: "The Cleaning Lady", description: "A doctor working as a cleaning lady becomes entangled in organized crime.", platform: "Disney+", genre: "Thriller" },
  { title: "Accused", description: "An anthology where ordinary people find themselves on trial for extraordinary crimes.", platform: "Disney+", genre: "Thriller" },
  { title: "Under the Banner of Heaven", description: "A detective investigates a murder connected to a prominent Mormon family.", platform: "Disney+", genre: "Thriller" },
  { title: "Prey", description: "A young Comanche warrior faces a deadly alien predator in the Great Plains.", platform: "Disney+", genre: "Thriller" },
  { title: "The Patient", description: "A therapist is held prisoner by a serial killer who wants to curb his urges.", platform: "Disney+", genre: "Thriller" },

  // Max - Drama
  { title: "Succession", description: "A wealthy family fights for control of their global media empire.", platform: "Max", genre: "Drama" },
  { title: "The White Lotus", description: "Guests and staff at an exclusive resort reveal their dark sides over a vacation.", platform: "Max", genre: "Drama" },
  { title: "The Last of Us", description: "A hardened survivor escorts a teenage girl across a post-pandemic America.", platform: "Max", genre: "Drama" },
  { title: "Euphoria", description: "A group of high school students navigate love, drugs, and identity.", platform: "Max", genre: "Drama" },
  { title: "Industry", description: "Young graduates compete for permanent positions at a prestigious London bank.", platform: "Max", genre: "Drama" },
  { title: "The Gilded Age", description: "Old money clashes with new money in 1880s New York high society.", platform: "Max", genre: "Drama" },

  // Max - Comedy
  { title: "Hacks", description: "A legendary Las Vegas comedian mentors a young comedy writer.", platform: "Max", genre: "Comedy" },
  { title: "Our Flag Means Death", description: "A wealthy aristocrat abandons his life to become a pirate captain.", platform: "Max", genre: "Comedy" },
  { title: "The Righteous Gemstones", description: "A megachurch family schemes to maintain their power and influence.", platform: "Max", genre: "Comedy" },
  { title: "Somebody Somewhere", description: "A woman in a small Kansas town discovers herself through singing.", platform: "Max", genre: "Comedy" },
  { title: "Julia", description: "The story of Julia Child's rise to fame with her French cooking show.", platform: "Max", genre: "Comedy" },

  // Max - Action
  { title: "House of the Dragon", description: "The Targaryen civil war threatens to tear Westeros apart 200 years before Game of Thrones.", platform: "Max", genre: "Action" },
  { title: "Peacemaker", description: "The brash antihero explores the origins of the man who believes in peace at any cost.", platform: "Max", genre: "Action" },
  { title: "Warrior", description: "A martial arts prodigy navigates the Chinatown underworld of 1870s San Francisco.", platform: "Max", genre: "Action" },
  { title: "Titans", description: "A group of young heroes from across the DC Universe come together.", platform: "Max", genre: "Action" },
  { title: "Doom Patrol", description: "Misfit superheroes investigate the weirdest phenomena in the DC Universe.", platform: "Max", genre: "Action" },

  // Max - Sci-Fi
  { title: "Westworld", description: "Androids in a futuristic theme park begin to question their reality.", platform: "Max", genre: "Sci-Fi" },
  { title: "Raised by Wolves", description: "Androids raise human children on a mysterious planet after Earth's destruction.", platform: "Max", genre: "Sci-Fi" },
  { title: "The Nevers", description: "Victorian women with unusual abilities must fight for a place in the world.", platform: "Max", genre: "Sci-Fi" },
  { title: "Station Eleven", description: "Survivors of a devastating flu navigate a post-apocalyptic world connected by art.", platform: "Max", genre: "Sci-Fi" },
  { title: "DMZ", description: "A medic searches for her lost son in a demilitarized Manhattan.", platform: "Max", genre: "Sci-Fi" },

  // Max - Thriller
  { title: "True Detective", description: "Detectives pursue criminals across multiple timelines in gripping investigations.", platform: "Max", genre: "Thriller" },
  { title: "Mare of Easttown", description: "A detective in a small Pennsylvania town investigates a local murder.", platform: "Max", genre: "Thriller" },
  { title: "The Staircase", description: "A novelist is accused of murdering his wife in this true-crime drama.", platform: "Max", genre: "Thriller" },
  { title: "Sharp Objects", description: "A reporter with a dark past returns to her hometown to cover a disturbing murder case.", platform: "Max", genre: "Thriller" },
  { title: "The Flight Attendant", description: "A flight attendant wakes up next to a dead body with no memory of what happened.", platform: "Max", genre: "Thriller" },

  // Apple TV+ - Drama
  { title: "Severance", description: "Office workers discover unsettling truths about their employer's surgical division of work and personal memories.", platform: "Apple TV+", genre: "Drama" },
  { title: "Slow Horses", description: "Disgraced MI5 agents at Slough House take on dangerous missions no one else wants.", platform: "Apple TV+", genre: "Drama" },
  { title: "The Morning Show", description: "The behind-the-scenes drama of a morning news program on a major network.", platform: "Apple TV+", genre: "Drama" },
  { title: "Pachinko", description: "A Korean family's multigenerational journey of resilience and identity.", platform: "Apple TV+", genre: "Drama" },
  { title: "Lessons in Chemistry", description: "A 1960s chemist becomes the unlikely star of a cooking show.", platform: "Apple TV+", genre: "Drama" },

  // Apple TV+ - Comedy
  { title: "Ted Lasso", description: "An American football coach is hired to manage a struggling English soccer team.", platform: "Apple TV+", genre: "Comedy" },
  { title: "Shrinking", description: "A grieving therapist starts telling his patients exactly what he thinks.", platform: "Apple TV+", genre: "Comedy" },
  { title: "Mythic Quest", description: "The team behind a popular video game navigates creative and personal challenges.", platform: "Apple TV+", genre: "Comedy" },
  { title: "Loot", description: "A billionaire philanthropist tries to reconnect with the real world after her divorce.", platform: "Apple TV+", genre: "Comedy" },
  { title: "Platonic", description: "Former best friends reconnect after a long rift and navigate their new dynamic.", platform: "Apple TV+", genre: "Comedy" },

  // Apple TV+ - Action
  { title: "Monarch: Legacy of Monsters", description: "After Godzilla's battle in San Francisco, two siblings uncover their family's deep connection to Monarch.", platform: "Apple TV+", genre: "Action" },
  { title: "See", description: "In a far-future world where everyone is blind, a warrior protects his tribe.", platform: "Apple TV+", genre: "Action" },
  { title: "Masters of the Air", description: "American bomber boys risk everything in aerial combat during World War II.", platform: "Apple TV+", genre: "Action" },
  { title: "Invasion", description: "Multiple perspectives witness and respond to an alien invasion of Earth.", platform: "Apple TV+", genre: "Action" },
  { title: "Tehran", description: "A Mossad agent goes undercover in Iran on a dangerous mission.", platform: "Apple TV+", genre: "Action" },

  // Apple TV+ - Sci-Fi
  { title: "Foundation", description: "Mathematicians attempt to preserve civilization as the Galactic Empire collapses.", platform: "Apple TV+", genre: "Sci-Fi" },
  { title: "Silo", description: "Thousands of people live in a giant underground silo with strict rules about the outside world.", platform: "Apple TV+", genre: "Sci-Fi" },
  { title: "For All Mankind", description: "An alternate history where the Soviet Union beats the US to the Moon.", platform: "Apple TV+", genre: "Sci-Fi" },
  { title: "Dark Matter", description: "A physicist is abducted into an alternate version of his life.", platform: "Apple TV+", genre: "Sci-Fi" },
  { title: "Constellation", description: "An astronaut returns from space to discover her reality has shifted.", platform: "Apple TV+", genre: "Sci-Fi" },

  // Apple TV+ - Thriller
  { title: "Black Bird", description: "A convicted drug dealer transfers to a maximum-security prison to befriend a suspected serial killer.", platform: "Apple TV+", genre: "Thriller" },
  { title: "Presumed Innocent", description: "A prosecutor becomes the prime suspect in a colleague's murder.", platform: "Apple TV+", genre: "Thriller" },
  { title: "The Afterparty", description: "Detectives investigate a murder at a high school reunion afterparty.", platform: "Apple TV+", genre: "Thriller" },
  { title: "Defending Jacob", description: "A father investigates whether his own son committed a horrific crime.", platform: "Apple TV+", genre: "Thriller" },
  { title: "Servant", description: "A Philadelphia couple hires a mysterious nanny who brings a strange presence into their home.", platform: "Apple TV+", genre: "Thriller" },
];

export function getRecommendations(platform: string, genre: string): Series[] {
  return seriesData.filter(s => s.platform === platform && s.genre === genre);
}
