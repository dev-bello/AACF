-- Seed — mirrors src/content/schema.js defaults.
-- Re-runnable: clears and re-inserts each time.

delete from public.content_items;
delete from public.site_settings;

-- ============================================================
-- COLLECTIONS
-- ============================================================

insert into public.content_items (collection, sort_order, data) values

-- Home — cause cards
('causes', 0, '{"tag":"Food Security","title":"Ramadan Food Relief","image_url":"/images/ramadan-package.jpeg","raised":"₦1.8M","goal":"₦3M"}'),
('causes', 1, '{"tag":"Empowerment","title":"Women''s Skills Training","image_url":"/images/skills-training.jpeg","raised":"₦1.2M","goal":"₦2M"}'),
('causes', 2, '{"tag":"Education","title":"Orphan Education Fund","image_url":"/images/community-school.jpeg","raised":"₦900K","goal":"₦2M"}'),

-- Programs
('programs', 0, '{
  "tag":"Food Security","title":"Ramadan Food Relief",
  "image_url":"/images/ramadan-package.jpeg",
  "text":"Seasonal food packages — rice, grains, oil and essentials — delivered to hundreds of fasting families each Ramadan.",
  "details":"Each Ramadan, our team prepares and distributes food packages containing rice, maize, soya beans, vegetable oil, salt and seasoning to families identified by local community leaders. Distribution points are set up across multiple wards in Birnin-Kebbi to ensure accessibility. Recipients include widows, orphan-headed households and families living below the poverty line.",
  "start_date":"2022-03-01","end_date":"Ongoing (annually)",
  "beneficiaries":"350+ families per cycle","location":"Birnin-Kebbi, Kebbi State",
  "reports":[]
}'),
('programs', 1, '{
  "tag":"Empowerment","title":"Women''s Skills Training",
  "image_url":"/images/skills-training.jpeg",
  "text":"Vocational training and starter kits in tailoring, knitting and small enterprise — helping women earn and stand on their own.",
  "details":"The Women''s Skills Training Programme equips widows, single mothers and young women with marketable vocational skills. Each cohort receives 3 months of hands-on training in tailoring, knitting or small-scale food processing, followed by a fully equipped starter kit to launch their own micro-enterprise. A savings and peer-support group is established for each graduating cohort.",
  "start_date":"2022-06-01","end_date":"Ongoing",
  "beneficiaries":"120+ women trained","location":"Birnin-Kebbi & Argungu",
  "reports":[]
}'),
('programs', 2, '{
  "tag":"Education","title":"Orphan & Child Education",
  "image_url":"/images/community-school.jpeg",
  "text":"School fees, uniforms and learning materials that keep orphans and out-of-school children in the classroom.",
  "details":"The Orphan Education Fund covers school registration fees, uniforms, textbooks and stationery for orphaned and out-of-school children identified in partnership with local government education authorities. Children are monitored each term; caregivers receive a small stipend to offset indirect costs such as transport and lunch.",
  "start_date":"2023-01-01","end_date":"Ongoing",
  "beneficiaries":"200+ children supported","location":"Kebbi State",
  "reports":[]
}'),
('programs', 3, '{
  "tag":"Care","title":"Widows & Vulnerable Support",
  "image_url":"/images/widows-kits.jpeg",
  "text":"Direct support and care packages for widows, the elderly and persons living with disabilities.",
  "details":"Our Widows & Vulnerable Support programme delivers quarterly care packages containing food staples, toiletries and household essentials to registered beneficiaries. Persons with disabilities also receive assistive items and referrals to relevant government programmes. Home visits are conducted by our volunteers to ensure dignity and follow up on welfare.",
  "start_date":"2022-01-01","end_date":"Ongoing",
  "beneficiaries":"180+ households","location":"Birnin-Kebbi & surrounding areas",
  "reports":[]
}'),
('programs', 4, '{
  "tag":"Livelihoods","title":"Agriculture & Self-Reliance",
  "image_url":"/images/agriculture.jpeg",
  "text":"Seeds, tools and farming support that help families grow their own food and build sustainable income.",
  "details":"The Agriculture & Self-Reliance programme distributes improved seeds (maize, sorghum, cowpea), basic hand tools and fertiliser to smallholder farming families at the start of each planting season. Extension workers from the Kebbi State Agricultural Development Programme co-facilitate training in good agronomic practices. Participants are encouraged to save a portion of their harvest for the following season.",
  "start_date":"2023-04-01","end_date":"Ongoing (seasonal)",
  "beneficiaries":"90+ farming families","location":"Rural Kebbi State",
  "reports":[]
}'),
('programs', 5, '{
  "tag":"Wellbeing","title":"Health & Emergency Relief",
  "image_url":"/images/ramadan-family.jpeg",
  "text":"Medical outreach, clean water and rapid help for families facing illness, displacement or sudden crisis.",
  "details":"Our Health & Emergency Relief team responds to crises within 48 hours — providing food parcels, safe water, basic medicines and hygiene kits. We partner with local hospitals and the State Emergency Management Agency (SEMA) for referrals and logistics. During medical outreach days, free consultations, medications and health education are provided to underserved communities.",
  "start_date":"2022-08-01","end_date":"Ongoing (as needed)",
  "beneficiaries":"300+ individuals reached","location":"Kebbi State (mobile)",
  "reports":[]
}'),

-- Program tiers
('program_tiers', 0, '{"amt":"₦5K","label":"One family''s food pack"}'),
('program_tiers', 1, '{"amt":"₦25K","label":"A tailoring starter kit"}'),
('program_tiers', 2, '{"amt":"₦50K","label":"A term of schooling"}'),
('program_tiers', 3, '{"amt":"₦100K","label":"A family''s safety net"}'),

-- Impact stats
('impact_stats', 0, '{"num":"2,000+","label":"Lives reached with relief"}'),
('impact_stats', 1, '{"num":"350+","label":"Food packs distributed"}'),
('impact_stats', 2, '{"num":"120+","label":"Women empowered"}'),
('impact_stats', 3, '{"num":"8","label":"Communities served"}'),

-- Leadership
('leaders', 0, '{"name":"Aminatu Abdulkarim","role":"Founder & President","image_url":"/images/founder-speaking.jpeg","bio":"Visionary behind the foundation, leading every outreach with compassion and resolve."}'),
('leaders', 1, '{"name":"HRH, Emir of Argungu","role":"Grand Patron","image_url":"/images/patron-emir.jpeg","bio":"Royal patron lending leadership, legitimacy and blessing to the foundation''s mission."}'),
('leaders', 2, '{"name":"Administrative Secretary","role":"Operations & Coordination","image_url":"/images/admin-secretary.jpeg","bio":"Coordinating programs, volunteers and day-to-day delivery across the communities we serve."}'),

-- About values
('about_values', 0, '{"icon":"heart","title":"Compassion","text":"We lead every outreach with empathy and genuine care."}'),
('about_values', 1, '{"icon":"shield","title":"Dignity","text":"We protect the worth of every person we serve."}'),
('about_values', 2, '{"icon":"handshake","title":"Transparency","text":"Faithful, accountable stewardship of every gift."}'),
('about_values', 3, '{"icon":"sprout","title":"Self-Reliance","text":"We build lasting capacity, not just relief."}'),

-- About stats
('about_stats', 0, '{"num":"2,000+","label":"Individuals reached with relief"}'),
('about_stats', 1, '{"num":"350+","label":"Food packages distributed"}'),
('about_stats', 2, '{"num":"120+","label":"Women trained & equipped"}'),

-- Get Involved ways
('involvement_ways', 0, '{"icon":"hand-heart","title":"Volunteer","text":"Join distributions, mentoring and outreach. Hands on the ground change everything."}'),
('involvement_ways', 1, '{"icon":"handshake","title":"Partner With Us","text":"Corporate CSR, NGOs and institutions — let''s scale impact together through partnership."}'),
('involvement_ways', 2, '{"icon":"gift","title":"Donate Goods","text":"Food, clothing, books and materials. In-kind giving reaches families directly."}'),

-- Donate tiers
('donate_tiers', 0, '{"amount":"₦5,000","text":"provides a family''s food pack for Ramadan."}'),
('donate_tiers', 1, '{"amount":"₦25,000","text":"equips a woman with a tailoring starter kit."}'),
('donate_tiers', 2, '{"amount":"₦50,000","text":"sponsors an orphan''s schooling for a term."}'),

-- Home trust/partners bar
('home_trust', 0, '{"name":"Emirate Council"}'),
('home_trust', 1, '{"name":"CSR Partners"}'),
('home_trust', 2, '{"name":"Philanthropists"}'),
('home_trust', 3, '{"name":"Community Donors"}');

-- ============================================================
-- SETTINGS
-- ============================================================

insert into public.site_settings (key, value) values
('home_hero', '{
  "eyebrow":"Compassion · Dignity · Upliftment",
  "heading":"Your Kindness Transforms Lives",
  "lede":"We feed the hungry, empower women and educate orphans across Birnin-Kebbi and Kebbi State — turning everyday generosity into lasting change.",
  "cta_primary":"Donate Now",
  "cta_secondary":"Become a Volunteer"
}'),
('home_mission', '{
  "statement":"A registered foundation born from compassion — serving widows, orphans and families in hardship with food, skills, education and dignity.",
  "stat":"100%",
  "stat_text":"of your intention reaches families in need — delivered with accountability and care."
}'),
('home_reach', '{
  "total":"2,000+",
  "caption":"Lives touched with relief, training & education",
  "food_packs":"350+",
  "women_trained":"120+",
  "communities":"8"
}'),
('about_intro', '{
  "image_url":"/images/founder.jpeg",
  "title":"A foundation built on compassion and action.",
  "para1":"The Aminatu Abdulkarim Charity Foundation (RC No. 175798) is a registered non-profit serving the most vulnerable members of our community — widows, orphans, persons with disabilities and families living in hardship.",
  "para2":"What began as quiet, personal giving has grown into an organised movement for dignity and self-reliance — meeting immediate needs while building long-term capacity in the people we serve."
}'),
('about_vm', '{
  "vision":"A society where every vulnerable person can live with dignity, hope, and the means to thrive.",
  "mission":"To relieve poverty and empower the disadvantaged through food, education, healthcare and sustainable livelihoods."
}'),
('about_governance', '{
  "text":"Every contribution is managed with faith-based stewardship and open accountability — so your generosity always reaches the families who need it most."
}'),
('impact_quote', '{
  "image_url":"/images/patron-emir.jpeg",
  "quote":"This foundation reflects the very best of our values — caring for the orphan, the widow and the needy. It has my full support and blessing.",
  "attribution":"His Royal Highness, the Emir of Argungu",
  "role":"Grand Patron of the Foundation"
}'),
('impact_feature', '{
  "image_url":"/images/women-group.jpeg",
  "heading":"Real change, measured in lives.",
  "text":"Every donation becomes food on a table, a child in school, or a woman with a trade. Since our launch, the foundation''s reach has grown steadily — community by community.",
  "cta":"Support This Work"
}'),
('home_impact_band', '{
  "image_url":"/images/ramadan-handover.jpeg",
  "photo_num":"350+",
  "photo_caption":"Ramadan food packages delivered to fasting families.",
  "stat1_num":"120+",
  "stat1_text":"Women equipped with skills and starter kits to earn a living.",
  "stat2_num":"200+",
  "stat2_text":"Orphans & children supported with education and materials."
}'),
('get_involved_intro', '{
  "heading":"Be a Volunteer",
  "sub":"Whether you give your time, your skills or your support — you help carry hope further.",
  "form_heading":"You Can Save Lives",
  "form_sub":"Tell us a little about you — a coordinator will be in touch."
}'),
('contact_info', '{
  "phone":"+234 803 000 0000",
  "hours":"Mon–Sat, 9am–5pm",
  "email1":"info@aacfoundation.org",
  "email2":"support@aacfoundation.org",
  "address":"Yari House, Near Gesse Roundabout, Birnin-Kebbi, Kebbi State"
}'),
('donate_bank', '{
  "account_name":"AACF Foundation",
  "account_no":"0000000000",
  "bank_name":"[Bank Name]"
}')
on conflict (key) do update set value = excluded.value;
