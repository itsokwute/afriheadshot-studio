import { BackgroundPreset, HairstylePreset, OutfitPreset } from './types';

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // --- Category 1: Executive Suites (10 options) ---
  {
    id: 'exec-1',
    title: 'Minimalist Glass Executive Suite',
    category: 'Executive Suites',
    description: 'Sleek floor-to-ceiling glass executive office with soft ambient urban reflections.',
    gradientCss: 'from-slate-900 via-indigo-950 to-slate-900',
    lightingStyle: 'Soft directional window daylight with gentle fill',
    promptSnippet: 'luxury executive office interior, blurred floor-to-ceiling glass wall, modern dark mahogany desk, soft morning sunlight, shallow depth of field'
  },
  {
    id: 'exec-2',
    title: 'High-Ceiling Corner Office',
    category: 'Executive Suites',
    description: 'Spacious corner office with refined metallic elements and warm diffused interior lights.',
    gradientCss: 'from-zinc-900 via-neutral-900 to-zinc-950',
    lightingStyle: 'Warm overhead spot with soft fill light',
    promptSnippet: 'exclusive corner executive suite, subtle blurred interior architectural lines, brushed brass trim, elegant ambient lighting, soft bokeh'
  },
  {
    id: 'exec-3',
    title: 'Pan-African Finance Suite',
    category: 'Executive Suites',
    description: 'Contemporary financial institution executive suite with sleek dark stone accents.',
    gradientCss: 'from-stone-900 via-zinc-900 to-black',
    lightingStyle: 'Cinematic corporate side lighting',
    promptSnippet: 'corporate financial headquarters suite, polished granite accent wall in background, subtle soft blur, high-end professional atmosphere'
  },
  {
    id: 'exec-4',
    title: 'Modern CEO Sanctuary',
    category: 'Executive Suites',
    description: 'Sophisticated private CEO workspace with muted grey leather panels.',
    gradientCss: 'from-gray-900 via-slate-900 to-gray-950',
    lightingStyle: 'Refined rembrandt key lighting',
    promptSnippet: 'contemporary CEO office, textured slate wall, minimalist artwork frame out of focus, premium executive aesthetic'
  },
  {
    id: 'exec-5',
    title: 'Venture Capital Penthouse Suite',
    category: 'Executive Suites',
    description: 'Sleek penthouse office with warm interior ambient lamps and polished oak floor reflections.',
    gradientCss: 'from-amber-950 via-zinc-900 to-stone-900',
    lightingStyle: 'Warm golden hour interior glow',
    promptSnippet: 'modern venture capital executive office, golden interior warmth, softly blurred leather armchair background, elegant atmosphere'
  },
  {
    id: 'exec-6',
    title: 'Modernist Steel & Marble Suite',
    category: 'Executive Suites',
    description: 'Clean architectural room with dark grey marble columns.',
    gradientCss: 'from-cyan-950 via-slate-900 to-zinc-900',
    lightingStyle: 'Cool crisp daylight balancing warm accents',
    promptSnippet: 'modernist corporate suite with marble pillar blur, clean architectural lines, corporate executive studio lighting'
  },
  {
    id: 'exec-7',
    title: 'Private Equity Suite',
    category: 'Executive Suites',
    description: 'Dark slate executive lounge with subtle geometric acoustic paneling.',
    gradientCss: 'from-neutral-900 via-stone-900 to-neutral-950',
    lightingStyle: 'Subtle rim light with soft key shadow',
    promptSnippet: 'luxurious corporate private equity suite, modern geometric acoustic panel background, soft rim lighting, shallow focus'
  },
  {
    id: 'exec-8',
    title: 'Global Fintech Executive Suite',
    category: 'Executive Suites',
    description: 'Futuristic yet grounded executive workspace featuring clean glass dividers.',
    gradientCss: 'from-blue-950 via-slate-900 to-zinc-900',
    lightingStyle: 'Modern softbox studio setup',
    promptSnippet: 'high-tech executive workspace background, clean glass paneling, subtle blue ambient accents, soft bokeh blur'
  },
  {
    id: 'exec-9',
    title: 'Consulting Managing Director Suite',
    category: 'Executive Suites',
    description: 'Warm dark walnut paneling with soft ambient library bookshelf blur.',
    gradientCss: 'from-stone-900 via-amber-950 to-stone-950',
    lightingStyle: 'Classic warm executive portrait light',
    promptSnippet: 'managing director office, soft blurred rich walnut bookshelf, refined classic corporate lighting'
  },
  {
    id: 'exec-10',
    title: 'Innovation Lounge Executive Suite',
    category: 'Executive Suites',
    description: 'Clean modern lounge background with matte dark grey finishes.',
    gradientCss: 'from-zinc-900 via-slate-900 to-neutral-900',
    lightingStyle: 'Diffused top-down softbox light',
    promptSnippet: 'modern innovation lounge suite, dark charcoal background, clean minimal aesthetic, soft focus'
  },

  // --- Category 2: Corporate Skylines (10 options) ---
  {
    id: 'sky-1',
    title: 'Lagos Victoria Island Skyline Sunset',
    category: 'Corporate Skylines',
    cityOrSetting: 'Lagos, Nigeria',
    description: 'Golden hour vista of Victoria Island financial district towers reflected over the lagoon.',
    gradientCss: 'from-amber-900 via-slate-900 to-purple-950',
    lightingStyle: 'Warm dusk ambient light with glowing city bokeh',
    promptSnippet: 'blurred panoramic background of Victoria Island Lagos corporate skyline at sunset, glowing high-rise lights, warm golden dusk reflections'
  },
  {
    id: 'sky-2',
    title: 'Nairobi Upper Hill Tech Skyline',
    category: 'Corporate Skylines',
    cityOrSetting: 'Nairobi, Kenya',
    description: 'Crisp morning daylight overlooking Upper Hill and Westlands modern glass towers.',
    gradientCss: 'from-cyan-950 via-slate-900 to-blue-950',
    lightingStyle: 'Bright East African morning daylight',
    promptSnippet: 'soft focus background of Nairobi Upper Hill modern glass corporate skyscrapers, bright clear morning sky, urban professional landscape'
  },
  {
    id: 'sky-3',
    title: 'Johannesburg Sandton Financial Hub',
    category: 'Corporate Skylines',
    cityOrSetting: 'Johannesburg, South Africa',
    description: 'Richest mile in Africa skyline backdrop with modern architectural financial towers.',
    gradientCss: 'from-slate-900 via-zinc-900 to-slate-950',
    lightingStyle: 'High-contrast afternoon daylight with clear skies',
    promptSnippet: 'blurred Sandton Johannesburg corporate financial center skyline, modern glass towers, high-end corporate backdrop'
  },
  {
    id: 'sky-4',
    title: 'Abidjan Plateau Financial Tower Skyline',
    category: 'Corporate Skylines',
    cityOrSetting: 'Abidjan, Côte d’Ivoire',
    description: 'Stunning view of Le Plateau skyline across the Ébrié Lagoon at twilight.',
    gradientCss: 'from-indigo-950 via-slate-900 to-cyan-950',
    lightingStyle: 'Twilight blue hour with warm building windows',
    promptSnippet: 'soft blur background of Abidjan Plateau financial skyline at twilight, lagoon water reflections, corporate elegance'
  },
  {
    id: 'sky-5',
    title: 'Accra Airport City Corporate Hub',
    category: 'Corporate Skylines',
    cityOrSetting: 'Accra, Ghana',
    description: 'Modern sleek glass towers in Accra Airport City district under soft warm sunshine.',
    gradientCss: 'from-amber-950 via-zinc-900 to-slate-900',
    lightingStyle: 'Warm equatorial sunlight with soft diffusion',
    promptSnippet: 'blurred Accra Airport City commercial high-rise buildings background, warm daylight, clean modern corporate setting'
  },
  {
    id: 'sky-6',
    title: 'Kigali Innovation City Horizon',
    category: 'Corporate Skylines',
    cityOrSetting: 'Kigali, Rwanda',
    description: 'Green rolling hills topped with modern glass tech hub architecture and Kigali Convention Center dome.',
    gradientCss: 'from-emerald-950 via-slate-900 to-zinc-900',
    lightingStyle: 'Clean crisp highland sunlight',
    promptSnippet: 'soft blurred Kigali Rwanda tech skyline background, modern architectural dome, clean eco-friendly urban vista'
  },
  {
    id: 'sky-7',
    title: 'Casablanca Finance City Skyline',
    category: 'Corporate Skylines',
    cityOrSetting: 'Casablanca, Morocco',
    description: 'Modern white and glass financial towers reflecting Mediterranean daylight.',
    gradientCss: 'from-sky-950 via-slate-900 to-zinc-900',
    lightingStyle: 'Bright coastal daylight with soft window light',
    promptSnippet: 'blurred Casablanca Finance City tower skyline background, clean white glass architecture, bright coastal ambiance'
  },
  {
    id: 'sky-8',
    title: 'Addis Ababa Financial District High-Rise',
    category: 'Corporate Skylines',
    cityOrSetting: 'Addis Ababa, Ethiopia',
    description: 'Dynamic newly built banking headquarters towers under a clear highland sky.',
    gradientCss: 'from-blue-950 via-slate-900 to-indigo-950',
    lightingStyle: 'Direct key light with soft shadow fill',
    promptSnippet: 'soft focus Addis Ababa corporate banking district towers background, modern high-rise architecture, bright day sky'
  },
  {
    id: 'sky-9',
    title: 'Cape Town Foreshore Harbour Skyline',
    category: 'Corporate Skylines',
    cityOrSetting: 'Cape Town, South Africa',
    description: 'Sleek harbor corporate skyline with subtle mountain silhouette in soft bokeh.',
    gradientCss: 'from-slate-900 via-cyan-950 to-slate-950',
    lightingStyle: 'Soft ocean mist diffused daylight',
    promptSnippet: 'blurred Cape Town Foreshore financial district skyline background, subtle harbor bokeh, elegant professional feel'
  },
  {
    id: 'sky-10',
    title: 'Dakar Almadies Coastal Business District',
    category: 'Corporate Skylines',
    cityOrSetting: 'Dakar, Senegal',
    description: 'Modern oceanfront corporate buildings along Les Almadies peninsula.',
    gradientCss: 'from-teal-950 via-slate-900 to-zinc-950',
    lightingStyle: 'Warm Atlantic afternoon sun',
    promptSnippet: 'blurred Dakar Almadies oceanfront business center background, warm sunlight, modern glass office reflections'
  },

  // --- Category 3: Tech Hub Glass (8 options) ---
  {
    id: 'tech-1',
    title: 'Silicon Lagoon Open Glass Atrium',
    category: 'Tech Hub Glass',
    description: 'Multi-story open atrium tech campus with frosted glass walkways and geometric LED lines.',
    gradientCss: 'from-blue-950 via-slate-900 to-cyan-950',
    lightingStyle: 'Modern cold-to-warm gradient studio light',
    promptSnippet: 'blurred modern tech hub atrium, frosted glass partitions, subtle blue LED lighting accents, futuristic high-tech workplace'
  },
  {
    id: 'tech-2',
    title: 'Minimalist Engineering Lab Workspace',
    category: 'Tech Hub Glass',
    description: 'Clean dark slate tech lab with out-of-focus double-glazed glass walls.',
    gradientCss: 'from-zinc-900 via-slate-900 to-neutral-900',
    lightingStyle: 'Crisp top softbox key light',
    promptSnippet: 'soft blur tech lab interior, clean dark workspace, glass wall reflections, modern developer studio ambient'
  },
  {
    id: 'tech-3',
    title: 'Fintech Innovation Lounge Glass',
    category: 'Tech Hub Glass',
    description: 'High-end tech lounge featuring dark tinted privacy glass and warm ambient lamps.',
    gradientCss: 'from-slate-900 via-indigo-950 to-stone-900',
    lightingStyle: 'Warm directional side key',
    promptSnippet: 'blurred fintech startup headquarters background, dark glass divider, subtle warm glowing pendant lamps out of focus'
  },
  {
    id: 'tech-4',
    title: 'AI Robotics Lab Executive Corridor',
    category: 'Tech Hub Glass',
    description: 'Sleek minimalist hallway with glowing frosted glass panels.',
    gradientCss: 'from-cyan-950 via-zinc-900 to-slate-950',
    lightingStyle: 'Diffuse linear ceiling lights',
    promptSnippet: 'soft blurred research lab glass corridor background, clean high-tech interior, minimalist corporate tech environment'
  },
  {
    id: 'tech-5',
    title: 'Modern Product Studio Loft',
    category: 'Tech Hub Glass',
    description: 'Industrial tech loft with dark steel beams and floor-to-ceiling glass.',
    gradientCss: 'from-stone-900 via-neutral-900 to-zinc-950',
    lightingStyle: 'Natural daylight from large window wall',
    promptSnippet: 'modern product studio tech loft background, industrial black frame glass wall blurred, warm interior ambient light'
  },
  {
    id: 'tech-6',
    title: 'Cybersecurity War Room Glass',
    category: 'Tech Hub Glass',
    description: 'Dark moody tech background with subtle cobalt blue glass reflections.',
    gradientCss: 'from-blue-950 via-zinc-900 to-black',
    lightingStyle: 'Dramatic rim light with soft fill',
    promptSnippet: 'blurred cybersecurity center background, dark smoked glass, deep cobalt blue lighting highlights, sophisticated tech tone'
  },
  {
    id: 'tech-7',
    title: 'Cloud Architecture Open Plan',
    category: 'Tech Hub Glass',
    description: 'Contemporary tech office with floating glass whiteboard panels in shallow focus.',
    gradientCss: 'from-slate-900 via-sky-950 to-slate-900',
    lightingStyle: 'Bright diffused softbox daylight',
    promptSnippet: 'soft blur cloud tech office background, floating glass partition, clean modern workspace aesthetics'
  },
  {
    id: 'tech-8',
    title: 'Venture Builder Co-Working Glass Hub',
    category: 'Tech Hub Glass',
    description: 'Vibrant tech accelerator hub with glass pod meeting rooms out of focus.',
    gradientCss: 'from-zinc-900 via-indigo-950 to-slate-900',
    lightingStyle: 'Balanced ambient daylight with studio rim',
    promptSnippet: 'blurred tech incubator co-working space background, glass conference pod, premium tech professional mood'
  },

  // --- Category 4: Neutral Minimal Studio Gradients (8 options) ---
  {
    id: 'grad-1',
    title: 'Charcoal & Platinum Executive Gradient',
    category: 'Studio Gradients',
    description: 'Classic dark charcoal fading softly into deep silver-grey for high-impact LinkedIn portraits.',
    gradientCss: 'from-zinc-900 via-slate-800 to-zinc-950',
    lightingStyle: 'Pure 3-point portrait studio lighting setup',
    promptSnippet: 'professional photo studio backdrop, smooth seamless charcoal grey gradient background, soft light falloff, zero distractions'
  },
  {
    id: 'grad-2',
    title: 'Warm Espresso & Cocoa Studio Vignette',
    category: 'Studio Gradients',
    description: 'Rich dark chocolate brown gradient that complements deep melanin skin tones perfectly.',
    gradientCss: 'from-amber-950 via-stone-900 to-amber-950',
    lightingStyle: 'Warm butterfly portrait key lighting',
    promptSnippet: 'rich deep espresso brown seamless studio backdrop, soft vignette lighting, tailored for deep warm skin tone contrast'
  },
  {
    id: 'grad-3',
    title: 'Midnight Indigo Corporate Gradient',
    category: 'Studio Gradients',
    description: 'Deep royal navy fading to slate blue, symbolizing trust, authority, and leadership.',
    gradientCss: 'from-blue-950 via-slate-900 to-indigo-950',
    lightingStyle: 'Crisp executive rim with warm key light',
    promptSnippet: 'seamless dark midnight navy blue studio backdrop, subtle gradient radial spotlight behind head, high-end executive look'
  },
  {
    id: 'grad-4',
    title: 'Terracotta Clay & Slate Minimalist',
    category: 'Studio Gradients',
    description: 'Earth-toned warm terracotta gradient with subtle texture and soft lighting.',
    gradientCss: 'from-amber-900 via-stone-900 to-zinc-950',
    lightingStyle: 'Soft warm fill with defined key shadow',
    promptSnippet: 'earthy terracotta brown seamless studio backdrop, subtle warm matte texture, modern artistic executive portrait lighting'
  },
  {
    id: 'grad-5',
    title: 'Graphite & Muted Bronze Gradient',
    category: 'Studio Gradients',
    description: 'Matte dark graphite with subtle warm metallic glow.',
    gradientCss: 'from-stone-900 via-zinc-800 to-stone-950',
    lightingStyle: 'Subtle bronze rim light',
    promptSnippet: 'dark graphite grey studio background, subtle warm bronze light glow in center, timeless professional portrait backdrop'
  },
  {
    id: 'grad-6',
    title: 'Deep Obsidian Studio Black',
    category: 'Studio Gradients',
    description: 'Ultra-clean moody black studio with gentle light separation for maximum subject focus.',
    gradientCss: 'from-black via-zinc-950 to-black',
    lightingStyle: 'Dramatic rim separation light',
    promptSnippet: 'pure matte black studio background with subtle soft hair light separation, striking executive headshot lighting'
  },
  {
    id: 'grad-7',
    title: 'Emerald Forest Deep Gradient',
    category: 'Studio Gradients',
    description: 'Sophisticated deep emerald green fading to charcoal, ideal for ESG & Sustainability leaders.',
    gradientCss: 'from-emerald-950 via-slate-900 to-emerald-950',
    lightingStyle: 'Subtle cool green separation backlight',
    promptSnippet: 'deep dark emerald green seamless studio background, subtle radial gradient, elegant sustainable executive backdrop'
  },
  {
    id: 'grad-8',
    title: 'Warm Sandstone Studio Softbox',
    category: 'Studio Gradients',
    description: 'Muted warm beige sand studio gradient offering elegant soft contrast.',
    gradientCss: 'from-stone-800 via-amber-950 to-stone-900',
    lightingStyle: 'Soft golden key light',
    promptSnippet: 'warm neutral sandstone grey studio backdrop, soft ambient illumination, smooth non-reflective wall surface'
  },

  // --- Category 5: Terracotta & Wood (7 options) ---
  {
    id: 'terra-1',
    title: 'Contemporary Terracotta Architectural Wall',
    category: 'Terracotta & Wood',
    description: 'Textured warm terracotta clay plaster wall with soft modern shadow geometry.',
    gradientCss: 'from-amber-950 via-stone-900 to-orange-950',
    lightingStyle: 'Warm natural side sun through architectural slats',
    promptSnippet: 'blurred modern terracotta clay plaster wall background, warm architectural sunlight, subtle shadow lines, earthy elegance'
  },
  {
    id: 'terra-2',
    title: 'Rich African Teak Wood Slats',
    category: 'Terracotta & Wood',
    description: 'Bespoke vertical dark teak wood slatted interior wall with subtle ambient glow.',
    gradientCss: 'from-amber-950 via-stone-900 to-yellow-950',
    lightingStyle: 'Warm indirect key lighting',
    promptSnippet: 'soft blurred dark teak wood slatted wall background, rich warm timber texture, high-end corporate architectural interior'
  },
  {
    id: 'terra-3',
    title: 'Modernist Red Ochre & Stone',
    category: 'Terracotta & Wood',
    description: 'Deep red ochre textured wall paired with dark basalt stone trims in shallow focus.',
    gradientCss: 'from-red-950 via-zinc-900 to-stone-950',
    lightingStyle: 'Rich warm Rembrandt light',
    promptSnippet: 'blurred red ochre textured wall, modern dark stone architectural element, warm African heritage executive backdrop'
  },
  {
    id: 'terra-4',
    title: 'Earthy Clay & Fluted Wood Lounge',
    category: 'Terracotta & Wood',
    description: 'Curved fluted oak paneling alongside matte clay plaster.',
    gradientCss: 'from-stone-900 via-amber-950 to-zinc-900',
    lightingStyle: 'Soft warm ceiling downlight',
    promptSnippet: 'soft blur background of curved fluted wood wall and warm clay plaster, luxury organic architecture'
  },
  {
    id: 'terra-5',
    title: 'Dark Mahogany Boardroom Wall',
    category: 'Terracotta & Wood',
    description: 'Polished deep mahogany wood paneling with subtle warm brass lighting sconces.',
    gradientCss: 'from-amber-950 via-neutral-900 to-black',
    lightingStyle: 'Refined warm sconce lighting glow',
    promptSnippet: 'blurred dark mahogany wood wall background, subtle brass trim reflection, classic executive boardroom backdrop'
  },
  {
    id: 'terra-6',
    title: 'Warm Laterite Brick Architectural Facade',
    category: 'Terracotta & Wood',
    description: 'Modern compressed laterite earth brick architecture in soft daylight blur.',
    gradientCss: 'from-orange-950 via-stone-900 to-amber-950',
    lightingStyle: 'Natural daylight with warm bounce fill',
    promptSnippet: 'soft blurred modern compressed earth brick architectural wall, warm sunlight bounce, contemporary sustainable architecture'
  },
  {
    id: 'terra-7',
    title: 'Carved Ebony & Walnut Panel',
    category: 'Terracotta & Wood',
    description: 'Dark carved wood wall featuring subtle geometric African relief patterns.',
    gradientCss: 'from-stone-950 via-zinc-900 to-neutral-950',
    lightingStyle: 'Focused rim light catching wood relief edges',
    promptSnippet: 'soft blurred dark ebony carved wood wall, subtle geometric relief texture, luxury cultural corporate interior'
  },

  // --- Category 6: African Boardrooms (7 options) ---
  {
    id: 'board-1',
    title: 'Pan-African Sovereign Boardroom',
    category: 'African Boardrooms',
    description: 'Grand boardroom with expansive dark marble conference table and blurred national crest backdrop.',
    gradientCss: 'from-zinc-900 via-slate-900 to-stone-950',
    lightingStyle: 'Formal top-down soft studio light',
    promptSnippet: 'soft focus background of luxury corporate boardroom, dark polished marble table reflections, elegant leather executive chairs blurred'
  },
  {
    id: 'board-2',
    title: 'African Development Bank Conference Hall',
    category: 'African Boardrooms',
    description: 'Sleek international diplomatic boardroom featuring frosted glass flag motifs in shallow depth of field.',
    gradientCss: 'from-blue-950 via-slate-900 to-zinc-900',
    lightingStyle: 'Bright balanced daylight & studio key',
    promptSnippet: 'blurred international diplomatic conference hall background, sleek modern wooden horseshoe boardroom table, executive presence'
  },
  {
    id: 'board-3',
    title: 'Central Bank Governor Suite',
    category: 'African Boardrooms',
    description: 'High-security central bank boardroom with dark granite walls and warm recessed lights.',
    gradientCss: 'from-stone-900 via-zinc-900 to-slate-950',
    lightingStyle: 'Authoritative warm spotlight with rim separation',
    promptSnippet: 'blurred central bank boardroom background, dark granite wall, subtle gold accent detail out of focus, high authority tone'
  },
  {
    id: 'board-4',
    title: 'Lagos Stock Exchange Director Room',
    category: 'African Boardrooms',
    description: 'Polished glass and dark walnut boardroom overlooking the financial city.',
    gradientCss: 'from-slate-900 via-indigo-950 to-zinc-900',
    lightingStyle: 'Crisp modern daylight with softfill',
    promptSnippet: 'soft blur background of stock exchange director room, modern glass conference table, subtle city skyline lights blurred'
  },
  {
    id: 'board-5',
    title: 'Johannesburg Corporate Chambers',
    category: 'African Boardrooms',
    description: 'High-ceiling legal and corporate council chamber with acoustic wood panelling.',
    gradientCss: 'from-stone-900 via-neutral-900 to-stone-950',
    lightingStyle: 'Warm overhead diffused glow',
    promptSnippet: 'blurred legal council boardroom, rich acoustic wood panel wall, executive conference leather chairs in background'
  },
  {
    id: 'board-6',
    title: 'Tech Summit Keynote Green Room',
    category: 'African Boardrooms',
    description: 'VIP speaker green room background with minimalist modern furniture.',
    gradientCss: 'from-zinc-900 via-cyan-950 to-slate-900',
    lightingStyle: 'Contemporary softbox fill light',
    promptSnippet: 'blurred tech summit VIP lounge boardroom, sleek dark interior, modern executive lighting'
  },
  {
    id: 'board-7',
    title: 'Multinational Energy Directors Suite',
    category: 'African Boardrooms',
    description: 'Refined dark slate and brass trim boardroom table with soft window light.',
    gradientCss: 'from-slate-950 via-zinc-900 to-slate-900',
    lightingStyle: 'Window key light with soft shadow detail',
    promptSnippet: 'soft focus corporate energy boardroom, slate tabletop reflection, premium international executive setting'
  }
];

export const HAIRSTYLE_PRESETS: HairstylePreset[] = [
  {
    id: 'hair-1',
    title: 'Clean Low Fade with Sharp Line-Up',
    gender: 'men',
    description: 'Sharp, immaculate low fade haircut with a crisp edge-up line, giving a fresh corporate executive polish.',
    textureType: '360 Coils / Tight Texture',
    promptSnippet: 'neat low fade haircut, razor-sharp hairline edge-up, clean side fade, authentic natural African hair texture, polished executive grooming'
  },
  {
    id: 'hair-2',
    title: 'Crisp 360 Waves',
    gender: 'men',
    description: 'Deep, defined 360 wave pattern with clean taper fade around the temples and neck.',
    textureType: 'Deep Wave Pattern',
    promptSnippet: 'well-groomed 360 waves hair pattern, sharp taper fade, immaculate edge-up, natural dark hair sheen'
  },
  {
    id: 'hair-3',
    title: 'Tapered Afro & Clean Beard',
    gender: 'men',
    description: 'Classic medium-length natural afro tapered neatly at the temples, paired with a sculpted beard.',
    textureType: 'Volume 4C Afro Texture',
    promptSnippet: 'neatly groomed tapered afro haircut, natural 4C curl volume, sharp lined beard, authentic African natural hair texture'
  },
  {
    id: 'hair-4',
    title: 'Neat Short Locs / Dreadlocks',
    gender: 'all',
    description: 'Well-maintained, manicured short locs styled backwards or neatly contoured.',
    textureType: 'Cultivated Locs',
    promptSnippet: 'neatly manicured short locs dreadlocks, polished retwist scalp line, clean professional hair styling'
  },
  {
    id: 'hair-5',
    title: 'Clean Bald / Shaved Head',
    gender: 'men',
    description: 'Smooth, clean-shaved scalp with natural skin glow and groomed facial hair.',
    textureType: 'Smooth Shaved',
    promptSnippet: 'clean shaved bald head, healthy skin glow, well-groomed beard or clean shave, sharp executive masculine look'
  },
  {
    id: 'hair-6',
    title: 'Formal Box Braids (Medium Length)',
    gender: 'women',
    description: 'Sleek, pristine shoulder-length box braids parted neatly for an elegant executive presentation.',
    textureType: 'Neat Braided Extensions',
    promptSnippet: 'sleek medium box braids, neat square parts, elegant shoulder fall, polished corporate hair presentation'
  },
  {
    id: 'hair-7',
    title: 'Senegalese Twists Updo',
    gender: 'women',
    description: 'High executive crown updo crafted from smooth Senegalese twists, framing the face gracefully.',
    textureType: 'Twisted Updo',
    promptSnippet: 'elegant Senegalese twists high updo hairstyle, clean sleek edges, sophisticated face-framing hair'
  },
  {
    id: 'hair-8',
    title: 'Precision Stitch Cornrows',
    gender: 'all',
    description: 'Immaculate straight-back stitch cornrows with crisp clean scalp partings.',
    textureType: 'Precision Braids',
    promptSnippet: 'sharp precision stitch cornrows, straight back braided hairstyle, immaculate scalp lines'
  },
  {
    id: 'hair-9',
    title: 'Voluminous High Afro Puff',
    gender: 'women',
    description: 'Sleek laid edges transitioning into a bold, rich, rounded natural afro puff at the crown.',
    textureType: 'Natural 4C Afro Puff',
    promptSnippet: 'sleek smooth laid edges with a rich voluminous high afro puff, authentic dense 4C hair texture, regal corporate look'
  },
  {
    id: 'hair-10',
    title: 'Sleek Low Bun with Edges Laid',
    gender: 'women',
    description: 'Sophisticated low chignon bun with delicately styled baby hair edges.',
    textureType: 'Sleek Smoothed Natural',
    promptSnippet: 'sleek low corporate bun hairstyle, smoothed natural dark hair texture, delicately laid edges, executive elegance'
  },
  {
    id: 'hair-11',
    title: 'Modern Bantu Knot Transition',
    gender: 'women',
    description: 'Sculpted geometric Bantu knot crowns transitioning into soft defined curls.',
    textureType: 'Sculpted Knots & Curls',
    promptSnippet: 'sculpted modern Bantu knots framing face with defined curl texture, high-end editorial corporate African hair'
  }
];

export const OUTFIT_PRESETS: OutfitPreset[] = [
  {
    id: 'outfit-1',
    title: 'Bespoke Navy Two-Piece Suit',
    category: 'Global Formal',
    description: 'Tailored midnight navy wool blazer with crisp white spread collar shirt and silk tie.',
    promptSnippet: 'wearing a bespoke tailored dark midnight navy blue wool suit jacket, crisp immaculate white dress shirt, subtle dark silk tie, razor-sharp collar fit',
    colorPalette: ['#0f172a', '#ffffff', '#1e293b']
  },
  {
    id: 'outfit-2',
    title: 'Tailored Charcoal Blazer & Crisp Shirt',
    category: 'Global Formal',
    description: 'Sharp charcoal grey blazer over an open-collar high-thread-count white shirt.',
    promptSnippet: 'wearing a luxury charcoal grey structured suit blazer, unbuttoned crisp white luxury oxford shirt, modern smart executive style',
    colorPalette: ['#1f2937', '#ffffff', '#4b5563']
  },
  {
    id: 'outfit-3',
    title: 'Senator Suit / Agbada Corporate Fusion',
    category: 'African Formal',
    description: 'Prestigious African Senator suit in dark obsidian wool with subtle geometric chest embroidery.',
    promptSnippet: 'wearing a high-end dark obsidian black African Senator suit, structured mandarin stand collar, immaculate geometric chest embroidery, luxury regal corporate African attire',
    colorPalette: ['#09090b', '#27272a', '#d4af37']
  },
  {
    id: 'outfit-4',
    title: 'Smart Casual Merino Turtleneck & Blazer',
    category: 'Smart Casual',
    description: 'Black fine merino wool turtleneck underneath a textured dark tweed blazer.',
    promptSnippet: 'wearing a sleek fitted black fine merino wool turtleneck sweater under a dark grey houndstooth suit blazer, contemporary tech founder aesthetic',
    colorPalette: ['#000000', '#374151', '#111827']
  },
  {
    id: 'outfit-5',
    title: 'Tailored Ankara Accent Blazer',
    category: 'African Formal',
    description: 'Deep navy executive blazer featuring subtle rich Ankara print lapel trims.',
    promptSnippet: 'wearing a fitted dark navy executive suit blazer with subtle high-end Ankara pattern lapel piping, white shirt, refined modern African business fashion',
    colorPalette: ['#1e3a8a', '#9a3412', '#ffffff']
  },
  {
    id: 'outfit-6',
    title: 'Modern Dashiki Executive Tunic',
    category: 'African Formal',
    description: 'Sleek tailored dark royal blue Dashiki executive top with gold thread collar stitching.',
    promptSnippet: 'wearing a modern tailored dark royal blue executive Dashiki tunic, intricate gold micro-embroidery along collar and placket, pristine African executive outfit',
    colorPalette: ['#1e1b4b', '#eab308', '#312e81']
  }
];
