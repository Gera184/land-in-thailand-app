/*
 * Copy for the About and Legal pages, in Hebrew and English.
 *
 * ⚠ DRAFTS. The legal texts are starting templates for an Israeli business, not legal advice —
 *   have a lawyer review them before launch. Nothing in [square brackets] is published: fill in
 *   the constants below and the matching sentences appear on the Legal page.
 */
import type { Locale } from "./content";

export type PageSection = { id?: string; heading: string; paragraphs: string[]; list?: string[] };
export type InfoPage = { eyebrow: string; /** Name of the page's in-page index (distinct from the footer's nav names) */ indexAria: string; title: string; intro: string; updated?: string; sections: PageSection[] };

/** Fill these in (shown on the Legal page once filled; empty values are left out) */
export const ACCESSIBILITY_COORDINATOR = { he: "", en: "" };
/** Legal business name, registration (e.g. עוסק מורשה 123456789) and postal address */
export const BUSINESS = {
  he: { name: "", registration: "", address: "" },
  en: { name: "", registration: "", address: "" },
};
const filled = (...parts: string[]) => parts.filter(Boolean).join(", ");
const UPDATED = { he: "עודכן לאחרונה: אוקטובר 2026", en: "Last updated: October 2026" };

const about: Record<Locale, InfoPage> = {
  he: {
    eyebrow: "עלינו",
    indexAria: "תוכן העמוד",
    title: "אנחנו הצוות\nשמחכה לכם *בשער.*",
    intro:
      "Land In Thailand נולדה מתוך מעבר אחד שהיה צריך להיות פשוט יותר. אנחנו ישראלים שגרים בתאילנד, מכירים את הדרך מבפנים, ובנינו את השירות שהיינו רוצים שיחכה לנו כשנחתנו.",
    sections: [
      {
        heading: "מה אנחנו עושים",
        paragraphs: [
          "אנחנו מלווים ישראלים — יחידים, זוגות ומשפחות — במעבר לתאילנד מקצה לקצה: בחירת עיר ומסלול ויזה, הכנת מסמכים, מגורים, בתי ספר, בנק, ביטוח והתאקלמות.",
          "אנחנו פועלים בחמישה יעדים: בנגקוק, צ'יאנג מאי, פוקט, קוסמוי וקופנגן.",
        ],
      },
      {
        heading: "איך אנחנו עובדים",
        paragraphs: ["ארבעה עקרונות שמנחים כל תיק:"],
        list: [
          "בעברית, מההודעה הראשונה ועד הדירה.",
          "איש קשר אחד שמכיר את התיק שלכם — לא מוקד.",
          "מחיר ברור מראש, בלי תוספות שלא סוכמו מראש.",
          "אנשים בשטח, שמגיעים איתכם פיזית לסיורים, לבנק ולבית הספר.",
        ],
      },
      {
        heading: "למה אנחנו עושים את זה",
        paragraphs: [
          "כי מעבר לחו״ל הוא אחד הצעדים הגדולים בחיים, והוא לא צריך להתחיל בטפסים בתאית ובשיחות שאף אחד לא עונה עליהן. אנחנו כאן כדי שתוכלו להתמקד בחלק הטוב.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "About us",
    indexAria: "On this page",
    title: "We're the team\nwaiting for you *at the gate.*",
    intro:
      "Land In Thailand was born from one move that should have been simpler. We're Israelis living in Thailand who know the road from the inside, and we built the service we wished had been waiting for us when we landed.",
    sections: [
      {
        heading: "What we do",
        paragraphs: [
          "We guide Israelis — singles, couples and families — through moving to Thailand end to end: choosing a city and visa route, paperwork, housing, schools, banking, insurance and settling in.",
          "We work in five destinations: Bangkok, Chiang Mai, Phuket, Koh Samui and Koh Phangan.",
        ],
      },
      {
        heading: "How we work",
        paragraphs: ["Four principles behind every case:"],
        list: [
          "In Hebrew, from the first message to the front door.",
          "One point of contact who knows your case — not a call centre.",
          "A clear price up front, with no extras that weren't agreed in advance.",
          "People on the ground who come with you to viewings, the bank and the school.",
        ],
      },
      {
        heading: "Why we do it",
        paragraphs: [
          "Because moving abroad is one of life's biggest steps, and it shouldn't start with forms in Thai and calls nobody answers. We're here so you can focus on the good part.",
        ],
      },
    ],
  },
};

const businessHe = filled(BUSINESS.he.name, BUSINESS.he.registration, BUSINESS.he.address);
const businessEn = filled(BUSINESS.en.name, BUSINESS.en.registration, BUSINESS.en.address);

const legal: Record<Locale, InfoPage> = {
  he: {
    eyebrow: "מידע משפטי",
    indexAria: "תוכן העמוד",
    title: "*משפטי,* בלי אותיות קטנות.",
    intro: "מדיניות הפרטיות, תנאי השימוש והצהרת הנגישות של האתר — בשפה ברורה.",
    updated: UPDATED.he,
    sections: [
      {
        id: "privacy",
        heading: "מדיניות פרטיות",
        paragraphs: [
          ...(businessHe ? [`האחראי למידע: ${businessHe}. פניות בנושא פרטיות: support@landinthailand.studio.`] : []),
          "האתר אינו כולל טפסים, אינו משתמש בעוגיות (cookies) ואינו כולל כלי ניתוח או פרסום. עם זאת, כמו בכל אתר, שרתי האחסון (GitHub Pages של חברת Microsoft, ארה״ב) מקבלים באופן טכני את כתובת ה-IP, סוג הדפדפן ופרטי הבקשה שלכם. כל התמונות, הגופנים והסרטונים מוגשים מהאתר עצמו. האתר שומר בדפדפן, למשך הגלישה בלבד, הגדרות תצוגה טכניות (sessionStorage) לתפעול התפריט והמעברים; הן אינן נשלחות אלינו.",
          "פנייה בוואטסאפ עוברת דרך שירות WhatsApp של חברת Meta, שחלים עליו תנאי השימוש ומדיניות הפרטיות שלו. מסירת פרטים אלינו היא מרצונכם ואינה חובה, אך בלעדיהם לא נוכל לטפל בפנייה.",
          "המידע שתמסרו (שם, פרטי קשר, פרטי המעבר ובמידת הצורך מסמכים כגון דרכון) ישמש רק לטיפול בפנייה ולמתן השירות. נעביר מידע רק לגורמים הנדרשים לשירות (למשל משרדי הגירה, בעלי דירות, בתי ספר, בנקים וחברות ביטוח, ובכלל זה בתאילנד) ובהסכמתכם, ולכן הוא עשוי להיות מועבר ומעובד מחוץ לישראל. איננו מוכרים מידע אישי.",
          "לא נשלח אליכם הודעות פרסומיות בלי הסכמה מפורשת מראש, ותוכלו לבקש הסרה בכל עת.",
          "אנו שומרים את המידע רק כל עוד הוא נדרש למתן השירות או כנדרש בדין, ונוקטים אמצעי אבטחה סבירים. מומלץ לשלוח מסמכים רגישים כמו דרכון רק לפי הנחיותינו.",
          "בהתאם לחוק הגנת הפרטיות, התשמ״א–1981, אתם רשאים לעיין במידע שנשמר עליכם, לבקש לתקנו או למחוק אותו. כתבו לנו ל-support@landinthailand.studio ונשיב תוך 30 ימים.",
        ],
      },
      {
        id: "terms",
        heading: "תנאי שימוש",
        paragraphs: [
          "התוכן באתר — כולל מידע על ויזות, יוקר מחיה וערים — הוא כללי בלבד, נכון למועד כתיבתו ועשוי להשתנות. תנאי הויזות בתאילנד משתנים לעיתים קרובות ונבדקים מחדש בכל תיק.",
          "איננו משרד עורכי דין, יועצי מס או סוכני ביטוח, ואיננו מספקים ייעוץ משפטי, מיסויי או ביטוחי. ההחלטה על אישור ויזה, חוזה שכירות או קבלה לבית ספר נתונה בידי הגורם המוסמך בלבד, ואיננו יכולים להבטיח את תוצאתה.",
          "המחירים המוצגים הם בשקלים ואינם כוללים אגרות ממשלתיות, טיסות ושכר דירה. היקף השירות והמחיר הסופי נקבעים בהסכם בכתב לפני תחילת העבודה, ומחיר החבילה כולל את השירותים המפורטים בה בלבד.",
          "ביטול עסקה: הסכם שנערך מרחוק (למשל בוואטסאפ או בטלפון) ניתן לבטל בהתאם לחוק הגנת הצרכן, התשמ״א–1981 ולתקנות הגנת הצרכן (ביטול עסקה), התשע״א–2010, בהודעה בכתב ל-support@landinthailand.studio. בביטול ייתכן ניכוי דמי ביטול כפי שהדין מתיר, וכן תשלום יחסי בעבור שירות שכבר ניתן לבקשתכם.",
          "כל התכנים באתר (טקסטים, עיצוב, לוגו וסרטונים) שייכים ל-Land In Thailand או לבעלי הזכויות בהם, ואין להעתיקם ללא אישור בכתב. חלק מהוויזואלים נוצרו או שופרו בבינה מלאכותית והם להמחשה בלבד; חלק מהצילומים מ-Unsplash. Thailand Privilege ו-Zoom הם סימנים של בעליהם, ואין לנו קשר רשמי איתם או עם רשויות ההגירה.",
          "על השימוש באתר ובשירותים חלים דיני מדינת ישראל.",
        ],
      },
      {
        id: "accessibility",
        heading: "הצהרת נגישות",
        paragraphs: [
          "אנחנו רואים חשיבות בהנגשת האתר לכלל המשתמשים, כולל אנשים עם מוגבלות, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג–2013, ולתקן הישראלי ת״י 5568 המבוסס על הנחיות WCAG ברמה AA.",
          "באוקטובר 2026 נבדק האתר בכלי בדיקה אוטומטיים (axe) ובבדיקה ידנית של ניווט מקלדת, ניגודיות, הגדלה והפחתת תנועה, בעברית ובאנגלית, במחשב ובנייד. בין ההתאמות שבוצעו:",
        ],
        list: [
          "ניווט מלא במקלדת, כולל קישור ״דילוג לתוכן״ ומיקוד נראה לעין.",
          "ניגודיות צבעים העומדת ברמה AA.",
          "טקסט חלופי לתמונות ותוויות לרכיבים אינטראקטיביים עבור קוראי מסך.",
          "כפתורי עצירה לתוכן נע (רצועת היעדים והסרטון), וכיבוד הגדרת ״הפחתת תנועה״ במערכת ההפעלה.",
          "מבנה כותרות ותגיות סמנטיות, ותמיכה בהגדלת טקסט עד 200%.",
        ],
      },
      {
        heading: "מגבלות ידועות ופנייה בנושא נגישות",
        paragraphs: [
          "האתר טרם נבדק עם קוראי מסך בפועל (כגון VoiceOver ו-NVDA).",
          `${ACCESSIBILITY_COORDINATOR.he ? `רכז/ת הנגישות: ${ACCESSIBILITY_COORDINATOR.he}. ` : ""}נתקלתם בבעיית נגישות? אפשר לפנות בוואטסאפ או בטלפון 054-275-8427, או באימייל support@landinthailand.studio. נשמח לקבל משוב ונטפל בכל פנייה בהקדם.`,
        ],
      },
    ],
  },
  en: {
    eyebrow: "Legal",
    indexAria: "On this page",
    title: "*Legal,* without the small print.",
    intro: "The site's privacy policy, terms of use and accessibility statement — in plain language.",
    updated: UPDATED.en,
    sections: [
      {
        id: "privacy",
        heading: "Privacy policy",
        paragraphs: [
          ...(businessEn ? [`Responsible for your information: ${businessEn}. Privacy requests: support@landinthailand.studio.`] : []),
          "This site has no forms, uses no cookies and has no analytics or advertising tools. Like any website, though, our hosting (GitHub Pages, Microsoft, USA) technically receives your IP address, browser type and request details. All images, fonts and videos are served from this site itself. The site also keeps technical display settings in your browser's session storage for the current visit only (to run the menu and page transitions); these are never sent to us.",
          "Contacting us on WhatsApp goes through Meta's WhatsApp service, which has its own terms and privacy policy. Giving us your details is voluntary, but without them we can't handle your enquiry.",
          "What you send us (name, contact details, details of your move and, where needed, documents such as a passport) is used only to handle your enquiry and deliver the service. We pass information only to parties needed for the service (such as immigration offices, landlords, schools, banks and insurers, including in Thailand) and with your consent, so it may be transferred and processed outside Israel. We don't sell personal information.",
          "We won't send you promotional messages without your explicit prior consent, and you can opt out at any time.",
          "We keep information only as long as the service needs it or the law requires, and apply reasonable security measures. Please send sensitive documents such as passports only as we instruct.",
          "Under Israel's Protection of Privacy Law, 5741-1981, you may ask to see, correct or delete the information we hold about you. Write to support@landinthailand.studio and we'll reply within 30 days.",
        ],
      },
      {
        id: "terms",
        heading: "Terms of use",
        paragraphs: [
          "Content on this site — including information on visas, cost of living and cities — is general only, correct when written, and may change. Thai visa rules change often and are checked again for every case.",
          "We are not a law firm, tax advisers or insurance agents, and we don't give legal, tax or insurance advice. Decisions on visas, leases or school admissions rest solely with the relevant authority, and we can't guarantee their outcome.",
          "Prices are shown in shekels and don't include government fees, flights or rent. The scope of service and final price are set in a written agreement before work begins, and a package price covers only the services listed in it.",
          "Cancellation: an agreement made at a distance (for example on WhatsApp or by phone) can be cancelled under Israel's Consumer Protection Law, 5741-1981 and the Consumer Protection (Cancellation of Transaction) Regulations, 5771-2010, by written notice to support@landinthailand.studio. A cancellation fee may be deducted as the law allows, together with a proportionate charge for services already provided at your request.",
          "All content on this site (text, design, logo and video) belongs to Land In Thailand or its rights holders and may not be copied without written permission. Some visuals were created or enhanced with AI and are illustrative; some photos are from Unsplash. Thailand Privilege and Zoom are marks of their owners; we're not officially affiliated with them or with any immigration authority.",
          "Use of the site and services is governed by the laws of the State of Israel.",
        ],
      },
      {
        id: "accessibility",
        heading: "Accessibility statement",
        paragraphs: [
          "We want this site to be usable by everyone, including people with disabilities, in line with Israel's Equal Rights for Persons with Disabilities (Service Accessibility Adjustments) Regulations, 5773-2013, and Israeli Standard 5568, based on WCAG level AA.",
          "In October 2026 the site was tested with automated tools (axe) and manually for keyboard navigation, contrast, zoom and reduced motion, in Hebrew and English, on desktop and mobile. Adjustments include:",
        ],
        list: [
          "Full keyboard navigation, including a \"skip to content\" link and visible focus.",
          "Colour contrast that meets level AA.",
          "Alternative text for images and labels on interactive elements for screen readers.",
          "Pause buttons for moving content (the destinations ticker and the video), and respect for the operating system's \"reduce motion\" setting.",
          "Semantic headings and markup, and support for text zoom up to 200%.",
        ],
      },
      {
        heading: "Known limitations and accessibility contact",
        paragraphs: [
          "The site hasn't yet been tested with real screen readers (such as VoiceOver and NVDA).",
          `${ACCESSIBILITY_COORDINATOR.en ? `Accessibility coordinator: ${ACCESSIBILITY_COORDINATOR.en}. ` : ""}Found an accessibility problem? Reach us on WhatsApp or by phone at 054-275-8427, or by email at support@landinthailand.studio. We welcome feedback and will handle every request promptly.`,
        ],
      },
    ],
  },
};

export const PAGES = { about, legal };
export type PageKey = keyof typeof PAGES;
