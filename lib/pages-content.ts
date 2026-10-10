/*
 * Copy for the About and Legal pages, in Hebrew and English.
 *
 * ⚠ DRAFTS. The legal texts are starting templates for an Israeli business, not legal advice —
 *   have a lawyer review them before launch. Items in [square brackets] must be filled in by you.
 */
import type { Locale } from "./content";

export type PageSection = { id?: string; heading: string; paragraphs: string[]; list?: string[] };
export type InfoPage = { eyebrow: string; title: string; intro: string; updated?: string; sections: PageSection[] };

/** Fill these in before launch (shown on the Legal page) */
export const ACCESSIBILITY_COORDINATOR = { he: "[שם רכז/ת הנגישות]", en: "[Accessibility coordinator name]" };
const UPDATED = { he: "עודכן לאחרונה: אוקטובר 2026", en: "Last updated: October 2026" };

const about: Record<Locale, InfoPage> = {
  he: {
    eyebrow: "עלינו",
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
          "מחיר סגור מראש, בלי תוספות באמצע הדרך.",
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
          "A fixed price up front, with no add-ons halfway through.",
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

const legal: Record<Locale, InfoPage> = {
  he: {
    eyebrow: "מידע משפטי",
    title: "*משפטי,* בלי אותיות קטנות.",
    intro: "מדיניות הפרטיות, תנאי השימוש והצהרת הנגישות של האתר — בשפה ברורה.",
    updated: UPDATED.he,
    sections: [
      {
        id: "privacy",
        heading: "מדיניות פרטיות",
        paragraphs: [
          "האתר אינו כולל טפסים ואינו אוסף מידע אישי באופן אוטומטי. כשאתם פונים אלינו בוואטסאפ, בטלפון או באימייל, אנחנו משתמשים בפרטים שמסרתם — שם, פרטי קשר ופרטים על המעבר — רק כדי לטפל בפנייה ולספק את השירות.",
          "איננו מוכרים או מעבירים מידע אישי לצדדים שלישיים, למעט ספקים הנדרשים לביצוע השירות (למשל משרדי הגירה, בעלי דירות או בתי ספר) ובהסכמתכם.",
          "האתר טוען חלק מהתמונות משירות חיצוני (Unsplash), ולכן כתובת ה-IP של הדפדפן שלכם עשויה להיות מועברת אליו. האתר אינו משתמש בעוגיות (cookies) לצורכי מעקב או פרסום.",
          "בהתאם לחוק הגנת הפרטיות, התשמ״א–1981, אתם רשאים לבקש לעיין במידע שנשמר עליכם, לתקנו או למחוק אותו — בפנייה אלינו בפרטי הקשר שלמטה.",
        ],
      },
      {
        id: "terms",
        heading: "תנאי שימוש",
        paragraphs: [
          "התוכן באתר — כולל מידע על ויזות, יוקר מחיה וערים — הוא כללי בלבד, אינו מהווה ייעוץ משפטי, מיסויי או הגירתי, ועשוי להשתנות. תנאי הויזות בתאילנד משתנים לעיתים קרובות ונבדקים מחדש בכל תיק.",
          "המחירים המוצגים הם בשקלים ואינם כוללים אגרות ממשלתיות, טיסות ושכר דירה. היקף השירות והמחיר הסופי נקבעים בהסכם בכתב לפני תחילת העבודה.",
          "Land In Thailand מלווה ומסייעת, אך ההחלטה על אישור ויזה, חוזה שכירות או קבלה לבית ספר נתונה בידי הגורם המוסמך, ואיננו יכולים להבטיח את תוצאתה.",
          "על השימוש באתר ובשירותים חלים דיני מדינת ישראל, וסמכות השיפוט הבלעדית נתונה לבתי המשפט בתל אביב-יפו.",
        ],
      },
      {
        id: "accessibility",
        heading: "הצהרת נגישות",
        paragraphs: [
          "אנחנו רואים חשיבות בהנגשת האתר לכלל המשתמשים, כולל אנשים עם מוגבלות. האתר נבנה בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג–2013, ולתקן הישראלי ת״י 5568 המבוסס על הנחיות WCAG 2.0 ברמה AA.",
          "בין ההתאמות שבוצעו:",
        ],
        list: [
          "ניווט מלא במקלדת, כולל קישור ״דילוג לתוכן״ ומיקוד נראה לעין.",
          "ניגודיות צבעים העומדת ברמה AA.",
          "טקסט חלופי לתמונות ותוויות לרכיבים אינטראקטיביים עבור קוראי מסך.",
          "כיבוד הגדרת ״הפחתת תנועה״ במערכת ההפעלה — האנימציות מושבתות.",
          "מבנה כותרות ותגיות סמנטיות, ותמיכה בהגדלת טקסט עד 200%.",
        ],
      },
      {
        heading: "נתקלתם בבעיית נגישות?",
        paragraphs: [
          `רכז/ת הנגישות: ${ACCESSIBILITY_COORDINATOR.he}. אפשר לפנות בוואטסאפ או בטלפון 054-275-8427, או באימייל support@landinthailand.studio. נשמח לקבל משוב ונטפל בכל פנייה בהקדם.`,
          "ייתכן שחלק מהתוכן המגיע מצדדים שלישיים (כגון תמונות) אינו נגיש במלואו. אם נתקלתם בקושי — ספרו לנו.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Legal",
    title: "*Legal,* without the small print.",
    intro: "The site's privacy policy, terms of use and accessibility statement — in plain language.",
    updated: UPDATED.en,
    sections: [
      {
        id: "privacy",
        heading: "Privacy policy",
        paragraphs: [
          "This site has no forms and does not collect personal information automatically. When you contact us by WhatsApp, phone or email, we use the details you give us — name, contact details and information about your move — only to handle your enquiry and provide the service.",
          "We don't sell or share personal information with third parties, except providers needed to deliver the service (such as immigration offices, landlords or schools) and with your consent.",
          "Some images on the site load from an external service (Unsplash), so your browser's IP address may be sent to it. The site does not use cookies for tracking or advertising.",
          "Under Israel's Protection of Privacy Law, 5741-1981, you may ask to see, correct or delete the information we hold about you — contact us using the details below.",
        ],
      },
      {
        id: "terms",
        heading: "Terms of use",
        paragraphs: [
          "Content on this site — including information on visas, cost of living and cities — is general only, is not legal, tax or immigration advice, and may change. Thai visa rules change often and are checked again for every case.",
          "Prices are shown in shekels and do not include government fees, flights or rent. The scope of service and final price are set in a written agreement before work begins.",
          "Land In Thailand guides and assists, but decisions on visas, leases or school admissions rest with the relevant authority, and we cannot guarantee their outcome.",
          "Use of the site and services is governed by the laws of the State of Israel, and the courts of Tel Aviv-Jaffa have exclusive jurisdiction.",
        ],
      },
      {
        id: "accessibility",
        heading: "Accessibility statement",
        paragraphs: [
          "We want this site to be usable by everyone, including people with disabilities. It was built in line with Israel's Equal Rights for Persons with Disabilities (Service Accessibility Adjustments) Regulations, 5773-2013, and Israeli Standard 5568, based on WCAG 2.0 level AA.",
          "Adjustments include:",
        ],
        list: [
          "Full keyboard navigation, including a \"skip to content\" link and visible focus.",
          "Colour contrast that meets level AA.",
          "Alternative text for images and labels on interactive elements for screen readers.",
          "Respect for the operating system's \"reduce motion\" setting — animations are turned off.",
          "Semantic headings and markup, and support for text zoom up to 200%.",
        ],
      },
      {
        heading: "Found an accessibility problem?",
        paragraphs: [
          `Accessibility coordinator: ${ACCESSIBILITY_COORDINATOR.en}. Reach us on WhatsApp or by phone at 054-275-8427, or by email at support@landinthailand.studio. We welcome feedback and will handle every request promptly.`,
          "Some third-party content (such as images) may not be fully accessible. If you run into any difficulty, please tell us.",
        ],
      },
    ],
  },
};

export const PAGES = { about, legal };
export type PageKey = keyof typeof PAGES;
