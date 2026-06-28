import ramadanPackage from '../assets/images/ramadan-package.jpeg';
import skillsTraining from '../assets/images/skills-training.jpeg';
import communitySchool from '../assets/images/community-school.jpeg';
import widowsKits from '../assets/images/widows-kits.jpeg';
import agriculture from '../assets/images/agriculture.jpeg';
import ramadanFamily from '../assets/images/ramadan-family.jpeg';
import founderSpeaking from '../assets/images/founder-speaking.jpeg';
import patronEmir from '../assets/images/patron-emir.jpeg';
import adminSecretary from '../assets/images/admin-secretary.jpeg';

// Field types:
//   text | textarea | image | number | date | files
// 'files' stores [{name, url}] for uploadable reports/documents.
// 'image' stores a single URL (with optional upload).

export const COLLECTIONS = {
  causes: {
    label: 'Home — Cause Cards',
    description: 'Fundraising cards shown on the homepage.',
    fields: [
      { name: 'tag',       label: 'Tag',        type: 'text' },
      { name: 'title',     label: 'Title',      type: 'text' },
      { name: 'image_url', label: 'Image',      type: 'image' },
      { name: 'raised',    label: 'Raised',     type: 'text' },
      { name: 'goal',      label: 'Goal',       type: 'text' },
      { name: 'pct',       label: 'Progress %', type: 'text' },
    ],
    defaults: [
      { tag: 'Food Security', title: 'Ramadan Food Relief',    image_url: ramadanPackage, raised: '₦1.8M', goal: '₦3M', pct: '60%' },
      { tag: 'Empowerment',   title: "Women's Skills Training", image_url: skillsTraining, raised: '₦1.2M', goal: '₦2M', pct: '60%' },
      { tag: 'Education',     title: 'Orphan Education Fund',  image_url: communitySchool, raised: '₦900K', goal: '₦2M', pct: '45%' },
    ],
  },

  programs: {
    label: 'Programs — Cards',
    description: 'Program cards with full detail modals.',
    fields: [
      { name: 'tag',          label: 'Tag',                     type: 'text' },
      { name: 'title',        label: 'Title',                   type: 'text' },
      { name: 'image_url',    label: 'Card Image (primary)',     type: 'image' },
      { name: 'images',       label: 'Gallery Images',          type: 'images' },
      { name: 'text',         label: 'Card Summary',            type: 'textarea' },
      { name: 'details',      label: 'Full Description',        type: 'textarea' },
      { name: 'start_date',   label: 'Start Date',              type: 'date' },
      { name: 'end_date',     label: 'End Date (or "Ongoing")', type: 'text' },
      { name: 'beneficiaries',label: 'Beneficiaries',           type: 'text' },
      { name: 'location',     label: 'Location',                type: 'text' },
      { name: 'reports',      label: 'Reports / Documents',     type: 'files' },
    ],
    defaults: [
      {
        tag: 'Food Security', title: 'Ramadan Food Relief', image_url: ramadanPackage,
        text: 'Seasonal food packages — rice, grains, oil and essentials — delivered to hundreds of fasting families each Ramadan.',
        details: 'Each Ramadan, our team prepares and distributes food packages containing rice, maize, soya beans, vegetable oil, salt and seasoning to families identified by local community leaders. Distribution points are set up across multiple wards in Birnin-Kebbi to ensure accessibility. Recipients include widows, orphan-headed households and families living below the poverty line.',
        start_date: '2022-03-01', end_date: 'Ongoing (annually)',
        beneficiaries: '350+ families per cycle', location: 'Birnin-Kebbi, Kebbi State',
        reports: [],
      },
      {
        tag: 'Empowerment', title: "Women's Skills Training", image_url: skillsTraining,
        text: 'Vocational training and starter kits in tailoring, knitting and small enterprise — helping women earn and stand on their own.',
        details: "The Women's Skills Training Programme equips widows, single mothers and young women with marketable vocational skills. Each cohort receives 3 months of hands-on training in tailoring, knitting or small-scale food processing, followed by a fully equipped starter kit to launch their own micro-enterprise. A savings and peer-support group is established for each graduating cohort.",
        start_date: '2022-06-01', end_date: 'Ongoing',
        beneficiaries: '120+ women trained', location: 'Birnin-Kebbi & Argungu',
        reports: [],
      },
      {
        tag: 'Education', title: 'Orphan & Child Education', image_url: communitySchool,
        text: 'School fees, uniforms and learning materials that keep orphans and out-of-school children in the classroom.',
        details: 'The Orphan Education Fund covers school registration fees, uniforms, textbooks and stationery for orphaned and out-of-school children identified in partnership with local government education authorities. Children are monitored each term; caregivers receive a small stipend to offset indirect costs such as transport and lunch.',
        start_date: '2023-01-01', end_date: 'Ongoing',
        beneficiaries: '200+ children supported', location: 'Kebbi State',
        reports: [],
      },
      {
        tag: 'Care', title: 'Widows & Vulnerable Support', image_url: widowsKits,
        text: 'Direct support and care packages for widows, the elderly and persons living with disabilities.',
        details: 'Our Widows & Vulnerable Support programme delivers quarterly care packages containing food staples, toiletries and household essentials to registered beneficiaries. Persons with disabilities also receive assistive items and referrals to relevant government programmes. Home visits are conducted by our volunteers to ensure dignity and follow up on welfare.',
        start_date: '2022-01-01', end_date: 'Ongoing',
        beneficiaries: '180+ households', location: 'Birnin-Kebbi & surrounding areas',
        reports: [],
      },
      {
        tag: 'Livelihoods', title: 'Agriculture & Self-Reliance', image_url: agriculture,
        text: 'Seeds, tools and farming support that help families grow their own food and build sustainable income.',
        details: 'The Agriculture & Self-Reliance programme distributes improved seeds (maize, sorghum, cowpea), basic hand tools and fertiliser to smallholder farming families at the start of each planting season. Extension workers from the Kebbi State Agricultural Development Programme co-facilitate training in good agronomic practices. Participants are encouraged to save a portion of their harvest for the following season.',
        start_date: '2023-04-01', end_date: 'Ongoing (seasonal)',
        beneficiaries: '90+ farming families', location: 'Rural Kebbi State',
        reports: [],
      },
      {
        tag: 'Wellbeing', title: 'Health & Emergency Relief', image_url: ramadanFamily,
        text: 'Medical outreach, clean water and rapid help for families facing illness, displacement or sudden crisis.',
        details: 'Our Health & Emergency Relief team responds to crises within 48 hours — providing food parcels, safe water, basic medicines and hygiene kits. We partner with local hospitals and the State Emergency Management Agency (SEMA) for referrals and logistics. During medical outreach days, free consultations, medications and health education are provided to underserved communities.',
        start_date: '2022-08-01', end_date: 'Ongoing (as needed)',
        beneficiaries: '300+ individuals reached', location: 'Kebbi State (mobile)',
        reports: [],
      },
    ],
  },

  program_tiers: {
    label: 'Programs — Giving Tiers',
    description: 'The "Become a Hero" amount tiers on the Programs page.',
    fields: [
      { name: 'amt',   label: 'Amount', type: 'text' },
      { name: 'label', label: 'Label',  type: 'text' },
    ],
    defaults: [
      { amt: '₦5K',   label: "One family's food pack" },
      { amt: '₦25K',  label: 'A tailoring starter kit' },
      { amt: '₦50K',  label: 'A term of schooling' },
      { amt: '₦100K', label: "A family's safety net" },
    ],
  },

  impact_stats: {
    label: 'Impact — Stat Row',
    description: 'The headline numbers shown on the Programs page.',
    fields: [
      { name: 'num',   label: 'Number', type: 'text' },
      { name: 'label', label: 'Label',  type: 'text' },
    ],
    defaults: [
      { num: '2,000+', label: 'Lives reached with relief' },
      { num: '350+',   label: 'Food packs distributed' },
      { num: '120+',   label: 'Women empowered' },
      { num: '8',      label: 'Communities served' },
    ],
  },

  leaders: {
    label: 'Leadership — Team',
    description: 'Leadership & governance team members (shown on About page).',
    fields: [
      { name: 'name',      label: 'Name',  type: 'text' },
      { name: 'role',      label: 'Role',  type: 'text' },
      { name: 'image_url', label: 'Photo', type: 'image' },
      { name: 'bio',       label: 'Bio',   type: 'textarea' },
    ],
    defaults: [
      { name: 'Aminatu Abdulkarim',     role: 'Founder & President',       image_url: founderSpeaking, bio: 'Visionary behind the foundation, leading every outreach with compassion and resolve.' },
      { name: 'HRH, Emir of Argungu',  role: 'Grand Patron',              image_url: patronEmir,      bio: "Royal patron lending leadership, legitimacy and blessing to the foundation's mission." },
      { name: 'Administrative Secretary', role: 'Operations & Coordination', image_url: adminSecretary,  bio: 'Coordinating programs, volunteers and day-to-day delivery across the communities we serve.' },
    ],
  },

  about_values: {
    label: 'About — Values',
    description: 'The values cards on the About page.',
    fields: [
      { name: 'icon',  label: 'Icon',  type: 'text' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'text',  label: 'Text',  type: 'textarea' },
    ],
    defaults: [
      { icon: '✻', title: 'Compassion',    text: 'We lead every outreach with empathy and genuine care.' },
      { icon: '◆', title: 'Dignity',       text: 'We protect the worth of every person we serve.' },
      { icon: '●', title: 'Transparency',  text: 'Faithful, accountable stewardship of every gift.' },
      { icon: '▲', title: 'Self-Reliance', text: 'We build lasting capacity, not just relief.' },
    ],
  },

  about_stats: {
    label: 'About — Results',
    description: 'The "Tangible Results" numbers on the About page.',
    fields: [
      { name: 'num',   label: 'Number', type: 'text' },
      { name: 'label', label: 'Label',  type: 'text' },
    ],
    defaults: [
      { num: '2,000+', label: 'Individuals reached with relief' },
      { num: '350+',   label: 'Food packages distributed' },
      { num: '120+',   label: 'Women trained & equipped' },
    ],
  },

  involvement_ways: {
    label: 'Get Involved — Ways to Help',
    description: 'The ways-to-help cards on the Get Involved page.',
    fields: [
      { name: 'icon',  label: 'Icon',  type: 'text' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'text',  label: 'Text',  type: 'textarea' },
    ],
    defaults: [
      { icon: '✻', title: 'Volunteer',     text: 'Join distributions, mentoring and outreach. Hands on the ground change everything.' },
      { icon: '◆', title: 'Partner With Us', text: "Corporate CSR, NGOs and institutions — let's scale impact together through partnership." },
      { icon: '●', title: 'Donate Goods',  text: 'Food, clothing, books and materials. In-kind giving reaches families directly.' },
    ],
  },

  donate_tiers: {
    label: 'Donate — Impact Tiers',
    description: 'The "Your Gift, Their Lifeline" tiers on the Donate page.',
    fields: [
      { name: 'amount', label: 'Amount',      type: 'text' },
      { name: 'text',   label: 'Description', type: 'text' },
    ],
    defaults: [
      { amount: '₦5,000',  text: "provides a family's food pack for Ramadan." },
      { amount: '₦25,000', text: 'equips a woman with a tailoring starter kit.' },
      { amount: '₦50,000', text: "sponsors an orphan's schooling for a term." },
    ],
  },

  home_trust: {
    label: 'Home — Partners Bar',
    description: 'Partner/supporter names shown under the hero.',
    fields: [
      { name: 'name', label: 'Partner name', type: 'text' },
    ],
    defaults: [
      { name: 'Emirate Council' },
      { name: 'CSR Partners' },
      { name: 'Philanthropists' },
      { name: 'Community Donors' },
    ],
  },
};

export const SETTINGS = {
  home_hero: {
    label: 'Home — Hero Section',
    fields: [
      { name: 'eyebrow',       label: 'Eyebrow text',    type: 'text' },
      { name: 'heading',       label: 'Heading',         type: 'text' },
      { name: 'lede',          label: 'Sub-text',        type: 'textarea' },
      { name: 'cta_primary',   label: 'Primary CTA',    type: 'text' },
      { name: 'cta_secondary', label: 'Secondary CTA',  type: 'text' },
    ],
    defaults: {
      eyebrow:       'Compassion · Dignity · Upliftment',
      heading:       'Your Kindness Transforms Lives',
      lede:          'We feed the hungry, empower women and educate orphans across Birnin-Kebbi and Kebbi State — turning everyday generosity into lasting change.',
      cta_primary:   'Donate Now',
      cta_secondary: 'Become a Volunteer',
    },
  },

  home_mission: {
    label: 'Home — Mission Section',
    fields: [
      { name: 'statement', label: 'Mission statement', type: 'textarea' },
      { name: 'stat',      label: 'Big stat',          type: 'text' },
      { name: 'stat_text', label: 'Stat description',  type: 'textarea' },
    ],
    defaults: {
      statement: 'A registered foundation born from compassion — serving widows, orphans and families in hardship with food, skills, education and dignity.',
      stat:      '100%',
      stat_text: 'of your intention reaches families in need — delivered with accountability and care.',
    },
  },

  home_reach: {
    label: 'Home — Reach Card',
    fields: [
      { name: 'total',        label: 'Total reached',  type: 'text' },
      { name: 'caption',      label: 'Caption',        type: 'text' },
      { name: 'food_packs',   label: 'Food packs',     type: 'text' },
      { name: 'women_trained',label: 'Women trained',  type: 'text' },
      { name: 'communities',  label: 'Communities',    type: 'text' },
    ],
    defaults: {
      total:         '2,000+',
      caption:       'Lives touched with relief, training & education',
      food_packs:    '350+',
      women_trained: '120+',
      communities:   '8',
    },
  },

  about_intro: {
    label: 'About — Introduction',
    fields: [
      { name: 'image_url', label: 'Founder photo', type: 'image' },
      { name: 'title',     label: 'Title',          type: 'text' },
      { name: 'para1',     label: 'Paragraph 1',   type: 'textarea' },
      { name: 'para2',     label: 'Paragraph 2',   type: 'textarea' },
    ],
    defaults: {
      image_url: '/images/founder.jpeg',
      title: 'A foundation built on compassion and action.',
      para1: 'The Aminatu Abdulkarim Charity Foundation (RC No. 175798) is a registered non-profit serving the most vulnerable members of our community — widows, orphans, persons with disabilities and families living in hardship.',
      para2: 'What began as quiet, personal giving has grown into an organised movement for dignity and self-reliance — meeting immediate needs while building long-term capacity in the people we serve.',
    },
  },

  about_vm: {
    label: 'About — Vision & Mission',
    fields: [
      { name: 'vision',  label: 'Vision',  type: 'textarea' },
      { name: 'mission', label: 'Mission', type: 'textarea' },
    ],
    defaults: {
      vision:  'A society where every vulnerable person can live with dignity, hope, and the means to thrive.',
      mission: 'To relieve poverty and empower the disadvantaged through food, education, healthcare and sustainable livelihoods.',
    },
  },

  about_governance: {
    label: 'About — Governance Note',
    fields: [
      { name: 'text', label: 'Text', type: 'textarea' },
    ],
    defaults: {
      text: 'Every contribution is managed with faith-based stewardship and open accountability — so your generosity always reaches the families who need it most.',
    },
  },

  impact_feature: {
    label: 'Programs — Impact Feature Block',
    fields: [
      { name: 'image_url', label: 'Feature image', type: 'image' },
      { name: 'heading',   label: 'Heading',       type: 'text' },
      { name: 'text',      label: 'Body text',     type: 'textarea' },
      { name: 'cta',       label: 'CTA label',     type: 'text' },
    ],
    defaults: {
      image_url: '/images/women-group.jpeg',
      heading:   'Real change, measured in lives.',
      text:      "Every donation becomes food on a table, a child in school, or a woman with a trade. Since our launch, the foundation's reach has grown steadily — community by community.",
      cta:       'Support This Work →',
    },
  },

  impact_quote: {
    label: 'Programs — Patron Quote',
    fields: [
      { name: 'image_url',   label: 'Patron photo', type: 'image' },
      { name: 'quote',       label: 'Quote',        type: 'textarea' },
      { name: 'attribution', label: 'Attribution',  type: 'text' },
      { name: 'role',        label: 'Role',         type: 'text' },
    ],
    defaults: {
      image_url:   '/images/patron-emir.jpeg',
      quote:       'This foundation reflects the very best of our values — caring for the orphan, the widow and the needy. It has my full support and blessing.',
      attribution: 'His Royal Highness, the Emir of Argungu',
      role:        'Grand Patron of the Foundation',
    },
  },

  home_impact_band: {
    label: 'Home — Impact Band',
    fields: [
      { name: 'image_url',      label: 'Feature photo',  type: 'image' },
      { name: 'photo_num',      label: 'Photo stat',     type: 'text' },
      { name: 'photo_caption',  label: 'Photo caption',  type: 'text' },
      { name: 'stat1_num',      label: 'Stat 1 number',  type: 'text' },
      { name: 'stat1_text',     label: 'Stat 1 text',    type: 'text' },
      { name: 'stat2_num',      label: 'Stat 2 number',  type: 'text' },
      { name: 'stat2_text',     label: 'Stat 2 text',    type: 'text' },
    ],
    defaults: {
      image_url:     '/images/ramadan-handover.jpeg',
      photo_num:     '350+',
      photo_caption: 'Ramadan food packages delivered to fasting families.',
      stat1_num:     '120+',
      stat1_text:    'Women equipped with skills and starter kits to earn a living.',
      stat2_num:     '200+',
      stat2_text:    'Orphans & children supported with education and materials.',
    },
  },

  get_involved_intro: {
    label: 'Get Involved — Intro Text',
    fields: [
      { name: 'heading',      label: 'Page heading',    type: 'text' },
      { name: 'sub',          label: 'Sub-text',        type: 'textarea' },
      { name: 'form_heading', label: 'Form heading',    type: 'text' },
      { name: 'form_sub',     label: 'Form sub-text',  type: 'text' },
    ],
    defaults: {
      heading:      'Be a Volunteer',
      sub:          'Whether you give your time, your skills or your support — you help carry hope further.',
      form_heading: 'You Can Save Lives',
      form_sub:     'Tell us a little about you — a coordinator will be in touch.',
    },
  },

  contact_info: {
    label: 'Contact — Details',
    fields: [
      { name: 'phone',   label: 'Phone',   type: 'text' },
      { name: 'hours',   label: 'Hours',   type: 'text' },
      { name: 'email1',  label: 'Email 1', type: 'text' },
      { name: 'email2',  label: 'Email 2', type: 'text' },
      { name: 'address', label: 'Address', type: 'textarea' },
    ],
    defaults: {
      phone:   '+234 803 000 0000',
      hours:   'Mon–Sat, 9am–5pm',
      email1:  'info@aacfoundation.org',
      email2:  'support@aacfoundation.org',
      address: 'Yari House, Near Gesse Roundabout, Birnin-Kebbi, Kebbi State',
    },
  },

  donate_bank: {
    label: 'Donate — Bank Details',
    fields: [
      { name: 'account_name', label: 'Account Name', type: 'text' },
      { name: 'account_no',   label: 'Account No.',  type: 'text' },
      { name: 'bank_name',    label: 'Bank',         type: 'text' },
    ],
    defaults: {
      account_name: 'AACF Foundation',
      account_no:   '0000000000',
      bank_name:    '[Bank Name]',
    },
  },
};

export const COLLECTION_KEYS = Object.keys(COLLECTIONS);
export const SETTING_KEYS    = Object.keys(SETTINGS);
