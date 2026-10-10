/*
 * All page copy, in Hebrew and English. Headings use a tiny markup:
 *   *word*  → highlighted (accent colour)
 *   \n      → line break
 * Prices, photos and contact details are shared and live in lib/site.ts.
 */

import type { PhotoKey } from "./photos";

export type Locale = "he" | "en";

export type ServiceIcon = "visa" | "home" | "school" | "bank" | "health" | "transport" | "community";

export type City = {
  key: string;
  /** Airport code shown departure-board style (Koh Phangan has no airport: ferry from USM) */
  code: string;
  via?: string;
  name: string;
  thai: string;
  tag: string;
  photo: PhotoKey;
  alt: string;
  body: string;
  facts: [string, string][];
};

export type Plan = { name: string; for: string; price: string; items: string[]; cta: string; msg: string; highlight?: boolean };

export type Content = {
  locale: Locale;
  dir: "rtl" | "ltr";
  meta: { title: string; description: string; ogDescription: string; ogLocale: string };
  waDefault: string;
  skip: string;
  header: {
    homeAria: string;
    navAria: string;
    nav: { href: string; label: string }[];
    whatsapp: string;
    switchLabel: string;
    switchHref: string;
    switchLang: Locale;
    switchAria: string;
    /** This locale's home path ("/" or "/en/") */
    home: string;
    menu: string;
    closeMenu: string;
    about: string;
    languageLabel: string;
  };
  hero: { eyebrow: string; title: string; lede: string; cta: string; secondary: string; scrollAria: string; tileAlts: string[] };
  intro: { eyebrow: string; title: string; lead: string; pains: string[] };
  pass: { aria: string; label: string; from: string; to: string; stamp: string; meta: [string, string][] };
  services: { eyebrow: string; title: string; featureAlt: string; items: { icon: ServiceIcon; title: string; body: string }[] };
  journey: { eyebrow: string; title: string; lead: string; cta: string; steps: { when: string; title: string; body: string }[] };
  cities: { eyebrow: string; title: string; lead: string; items: City[] };
  cost: { eyebrow: string; title: string; lead: string; caption: string; note: string; items: { name: string; value: number; ref?: boolean }[] };
  pricing: { eyebrow: string; title: string; badge: string; plans: Plan[]; note: string; noteLink: string; noteMsg: string };
  visas: { eyebrow: string; title: string; lead: string; disclaimer: string; items: { code: string; title: string; body: string }[] };
  promises: { eyebrow: string; title: string; items: { num: string; title: string; body: string }[] };
  faq: { eyebrow: string; title: string; leadBefore: string; leadLink: string; items: { q: string; a: string }[] };
  final: { title: string; lede: string; cta: string };
  mobileCta: { label: string; aria: string };
  footer: {
    tag: string;
    company: string;
    about: string;
    process: string;
    faq: string;
    legal_: string;
    privacy: string;
    terms: string;
    accessibility: string;
    clocksLabel: string;
    bangkok: string;
    telAviv: string;
    /** "{h}" is replaced with the current hour difference */
    ahead: string;
  };

  jsonLdDescription: string;
};

const PHOTOS = {
  bkk: "bangkok",
  cnx: "chiangmai",
  hkt: "phuket",
  usm: "samui",
  kpg: "phangan",
} as const satisfies Record<string, PhotoKey>;

/* ------------------------------------------------------------------ Hebrew */

const he: Content = {
  locale: "he",
  dir: "rtl",
  meta: {
    title: "Land In Thailand · רילוקיישן לתאילנד בעברית",
    description:
      "ליווי רילוקיישן מלא לישראלים שעוברים לתאילנד: ויזה, דירה, בתי ספר, בנק וביטוח. בנגקוק, פוקט, צ'יאנג מאי, קוסמוי וקופנגן.",
    ogDescription: "ויזה, דירה, בתי ספר ובנק — אנחנו דואגים שהנחיתה שלכם בתאילנד תהיה רכה.",
    ogLocale: "he_IL",
  },
  waDefault: "שלום, אשמח לשמוע על רילוקיישן לתאילנד",
  skip: "דילוג לתוכן",
  header: {
    homeAria: "Land In Thailand — לראש העמוד",
    navAria: "ניווט ראשי",
    nav: [
      { href: "#services", label: "שירותים" },
      { href: "#journey", label: "התהליך" },
      { href: "#cities", label: "ערים" },
      { href: "#pricing", label: "מחירים" },
      { href: "#faq", label: "שאלות" },
    ],
    whatsapp: "וואטסאפ",
    switchLabel: "EN",
    switchHref: "/en/",
    switchLang: "en",
    switchAria: "English version",
    home: "/",
    menu: "תפריט",
    closeMenu: "סגירת התפריט",
    about: "עלינו",
    languageLabel: "English",
  },
  hero: {
    eyebrow: "רילוקיישן לתאילנד · בעברית, מקצה לקצה",
    title: "החיים החדשים שלכם\nנוחתים *בתאילנד.*",
    lede: "ויזה, דירה, בתי ספר, בנק וכל מה שביניהם. אתם בוחרים את העיר או האי — אנחנו דואגים שהנחיתה תהיה רכה.",
    cta: "לתיאום שיחת ייעוץ",
    secondary: "איך זה עובד",
    scrollAria: "גללו כדי לנחות",
    tileAlts: [
      "לגונה טורקיז בין צוקי גיר בדרום תאילנד, וסירת זנב ארוך שטה בה",
      "בנגקוק בלילה",
      "פגודה על הר בצפון תאילנד",
      "סלע גיר בים ליד פוקט",
      "נזירים בגלימות כתומות ברחוב בצ'יאנג מאי",
      "חוף ירוק ומים טורקיז בקוסמוי",
      "מפרץ קטן בקופנגן",
    ],
  },
  intro: {
    eyebrow: "למה צריך אותנו",
    title: "החלום הוא החלק הקל.\n*המעבר עצמו — עלינו.*",
    lead: "מי שעבר לתאילנד לבד יודע: המקום מושלם, אבל הדרך אליו מלאה בטפסים בתאית, בכללים שמשתנים ובאנשים שמבטיחים ולא מגיעים. אנחנו מכירים את הדרך, וצועדים אותה איתכם.",
    pains: [
      "ויזות עם תנאים שמשתנים כל כמה חודשים",
      "חוזי שכירות בתאית ובעלי בתים שלא עונים",
      "בתי ספר בינלאומיים עם רשימות המתנה",
      "בנק שדורש בדיוק את המסמך שאין לכם",
    ],
  },
  pass: {
    aria: "כרטיס עלייה למטוס, תל אביב לבנגקוק",
    label: "כרטיס עלייה",
    from: "תל אביב",
    to: "בנגקוק",
    stamp: "מאושר",
    meta: [["נוסעים", "אתם"], ["טיסה ישירה", "כ-11 שע׳"], ["שער", "חיים חדשים"]],
  },
  services: {
    eyebrow: "השירותים",
    title: "כל מה שצריך כדי *לגור* שם,\nלא רק להגיע.",
    featureAlt: "בריכת אינסוף המשקיפה על מפרץ באי טרופי",
    items: [
      { icon: "visa", title: "ויזה ומסמכים", body: "בוחרים איתכם את מסלול הויזה הנכון — DTV, לימודים, פרישה או Thailand Privilege — מכינים את המסמכים ומלווים את ההגשה עד האישור." },
      { icon: "home", title: "דירה או וילה", body: "סינון מוקדם לפי התקציב שלכם, סיורי צפייה עם נציג שלנו בשטח, משא ומתן ובדיקת חוזה לפני חתימה." },
      { icon: "school", title: "בתי ספר וגנים", body: "מיפוי בתי ספר בינלאומיים ודו־לשוניים באזור, תיאום סיורים, ריאיונות והרשמה." },
      { icon: "bank", title: "בנק, סים ותשלומים", body: "חשבון בנק תאילנדי, מספר טלפון מקומי ואפליקציות התשלום שכולם משתמשים בהן." },
      { icon: "health", title: "בריאות וביטוח", body: "התאמת ביטוח בריאות למשפחה והיכרות עם בתי החולים הפרטיים הקרובים אליכם." },
      { icon: "transport", title: "תחבורה", body: "רישיון נהיגה תאילנדי, השכרה או קנייה של רכב או קטנוע, וכל מה שצריך כדי לזוז בחופשיות." },
      { icon: "community", title: "קהילה והתאקלמות", body: "חיבור לקהילה הישראלית המקומית, לבית חב״ד ולחוגים לילדים — כדי שתרגישו בבית מהר יותר." },
    ],
  },
  journey: {
    eyebrow: "התהליך",
    title: "מהשיחה הראשונה\n*ועד המפתח ביד.*",
    lead: "חמש תחנות, איש קשר אחד, ולוח זמנים ברור. ברוב המקרים 4–8 שבועות מהשיחה הראשונה ועד שאתם גרים בבית שלכם.",
    cta: "מתחילים בתחנה הראשונה",
    steps: [
      { when: "שבוע 0", title: "שיחת מפה", body: "שעה שבה נכיר אתכם: ממה אתם מתפרנסים, מי עובר איתכם ומה חשוב לכם. יוצאים עם המלצה לעיר ולמסלול ויזה." },
      { when: "שבועות 1–4", title: "תוכנית ומסמכים", body: "רשימת מסמכים מסודרת, לוח זמנים אישי והגשת ויזה — צעד אחרי צעד, בלי לנחש." },
      { when: "היום הראשון", title: "נחיתה", body: "איסוף משדה התעופה, מגורים זמניים מוכנים מראש וכרטיס סים מקומי כבר בדרך מהשדה." },
      { when: "שבועות 1–3 בתאילנד", title: "התבססות", body: "סיורי דירות, חתימה על חוזה, פתיחת חשבון בנק, רישום לבית הספר וכל הרישומים מול הרשויות." },
      { when: "מכאן והלאה", title: "בבית", body: "ליווי שוטף בוואטסאפ בעברית — מהחשמלאי ועד הדיווח למשרד ההגירה — עד שתרגישו מקומיים." },
    ],
  },
  cities: {
    eyebrow: "חמישה יעדים",
    title: "איפה תרגישו *בבית?*",
    lead: "כל מקום בתאילנד הוא עולם אחר. הנה ההבדלים בקצרה — ובשיחת הייעוץ נתאים את המקום אליכם.",
    items: [
      {
        key: "bkk", code: "BKK", name: "בנגקוק", thai: "กรุงเทพฯ", tag: "עיר · קריירה · משפחות", photo: PHOTOS.bkk,
        alt: "בנגקוק בלילה, הנהר והגורדי שחקים מוארים",
        body: "מטרופולין שלא נרדם: בתי ספר בינלאומיים מהטובים באסיה, רפואה פרטית ברמה עולמית ותחבורה ציבורית מצוינת. מתאימה למשפחות, לאנשי הייטק ולמי שאוהב עיר.",
        facts: [["דירת 2 חדרים במרכז", "₪3,500–6,000"], ["מחיה חודשית לזוג", "₪10,000–15,000"]],
      },
      {
        key: "cnx", code: "CNX", name: "צ'יאנג מאי", thai: "เชียงใหม่", tag: "הרים · עצמאים · שקט", photo: PHOTOS.cnx,
        alt: "פגודה מוזהבת על ראש הר בצפון תאילנד בשקיעה",
        body: "עיר עתיקה בין הרים ומקדשים, עם קהילת עובדים מרחוק גדולה ויוקר מחיה נמוך. מושלמת לעצמאים ולמי שמחפש קצב רגוע. כדאי לדעת: בין פברואר לאפריל איכות האוויר יורדת — נעזור לכם לתכנן סביב זה.",
        facts: [["דירת 2 חדרים", "₪2,000–3,500"], ["מחיה חודשית לזוג", "₪6,500–9,500"]],
      },
      {
        key: "hkt", code: "HKT", name: "פוקט", thai: "ภูเก็ต", tag: "ים · תשתיות · משפחות", photo: PHOTOS.hkt,
        alt: "סלע גיר מתנשא מהים במפרץ פאנג נגה ליד פוקט",
        body: "האי הגדול של תאילנד: חופים לצד בתי חולים בינלאומיים, בתי ספר מצוינים ונמל תעופה עם טיסות לכל העולם. החיבור הכי טוב בין חיי ים לחיים נוחים.",
        facts: [["דירה או וילה קטנה", "₪4,000–8,000"], ["מחיה חודשית לזוג", "₪10,000–16,000"]],
      },
      {
        key: "usm", code: "USM", name: "קוסמוי", thai: "เกาะสมุย", tag: "אי · וילות · שלווה", photo: PHOTOS.usm,
        alt: "קו חוף ירוק ומים טורקיז בקוסמוי",
        body: "אי רגוע ומטופח עם קהילה בינלאומית, בתי ספר בינלאומיים ושדה תעופה משלו. מתאים למי שרוצה חיי אי אמיתיים — בלי לוותר על נוחות.",
        facts: [["וילה עם בריכה", "₪4,500–9,000"], ["מחיה חודשית לזוג", "₪9,000–14,000"]],
      },
      {
        key: "kpg", code: "USM", via: "+ מעבורת", name: "קופנגן", thai: "เกาะพะงัน", tag: "טבע · יוגה · קהילה ישראלית", photo: PHOTOS.kpg,
        alt: "מפרץ קטן עם מים צלולים וג'ונגל בקופנגן",
        body: "ג'ונגל, חופים שקטים, יוגה וקהילה ישראלית גדולה ומגובשת. אין שדה תעופה — מגיעים במעבורת מקוסמוי — וזה בדיוק חלק מהקסם.",
        facts: [["בונגלו או בית", "₪2,500–5,000"], ["מחיה חודשית לזוג", "₪7,000–11,000"]],
      },
    ],
  },
  cost: {
    eyebrow: "יוקר מחיה",
    title: "אותה איכות חיים,\n*בערך חצי מחיר.*",
    lead: "הערכה גסה של הוצאה חודשית לזוג, כולל שכר דירה באזור מרכזי. משפחות עם בית ספר בינלאומי — הוסיפו שכר לימוד.",
    caption: "הוצאה חודשית משוערת לזוג, בשקלים",
    note: "אמצע הטווח המשוער. המספרים משתנים לפי סגנון חיים ושער החליפין.",
    items: [
      { name: "תל אביב", value: 20000, ref: true },
      { name: "פוקט", value: 13000 },
      { name: "בנגקוק", value: 12500 },
      { name: "קוסמוי", value: 11500 },
      { name: "קופנגן", value: 9000 },
      { name: "צ'יאנג מאי", value: 8000 },
    ],
  },
  pricing: {
    eyebrow: "מחירים",
    title: "מחיר סגור מראש. *בלי הפתעות.*",
    badge: "הכי מבוקש",
    plans: [
      {
        name: "שיחת מפה", for: "למי שעוד מתלבט", price: "390", cta: "לקביעת שיחה", msg: "שלום, אשמח לקבוע שיחת מפה",
        items: ["שיחת ייעוץ של 60 דקות בזום או בטלפון", "המלצה לעיר ולמסלול ויזה", "תוכנית עבודה כתובה עם לוח זמנים", "הסכום מקוזז מכל חבילה שתבחרו"],
      },
      {
        name: "נחיתה רכה", for: "ליחידים וזוגות", price: "4,900", cta: "לפרטים", msg: "שלום, אשמח לשמוע על חבילת נחיתה רכה",
        items: ["כל מה שיש בשיחת המפה", "הכנת מסמכים וליווי בהגשת הויזה", "איסוף משדה התעופה ומגורים זמניים", "יומיים של סיורי דירות עם נציג", "משא ומתן ובדיקת חוזה", "חשבון בנק וסים מקומי", "30 יום ליווי בוואטסאפ"],
      },
      {
        name: "רילוקיישן משפחתי", for: "למשפחות עם ילדים", price: "9,800", cta: "בואו נדבר", msg: "שלום, אשמח לשמוע על חבילת רילוקיישן משפחתי", highlight: true,
        items: ["כל מה שיש ב\"נחיתה רכה\", ובנוסף:", "מיפוי בתי ספר, סיורים והרשמה", "התאמת ביטוח בריאות למשפחה", "רישיון נהיגה ורכב או קטנוע", "חיבור לקהילה ולחוגים לילדים", "90 יום ליווי צמוד בוואטסאפ"],
      },
    ],
    note: "המחירים אינם כוללים אגרות ממשלתיות, טיסות ושכר דירה. צריכים משהו אחר — הקמת עסק, Thailand Privilege או העברת חיית מחמד?",
    noteLink: "נבנה לכם הצעה",
    noteMsg: "שלום, אשמח להצעה מותאמת אישית",
  },
  visas: {
    eyebrow: "מדריך ויזות קצר",
    title: "איזו ויזה *מתאימה לכם?*",
    lead: "תאילנד מציעה כמה דרכים לגור בה לאורך זמן. הנה התמונה הכללית — את ההתאמה המדויקת נעשה יחד.",
    disclaimer: "תנאי הויזות בתאילנד משתנים לעיתים קרובות. המידע כאן כללי ואינו ייעוץ משפטי — בשיחה נבדוק את המצב העדכני.",
    items: [
      { code: "DTV", title: "ויזת יעד לעובדים מרחוק", body: "ויזה רב־שנתית לעובדים מרחוק ולעצמאים עם לקוחות מחוץ לתאילנד, וגם למי שבא ללמוד למשל בישול או אגרוף תאילנדי. מאפשרת שהייה ארוכה בכל כניסה, ודורשת הוכחת יכולת כלכלית." },
      { code: "ED", title: "ויזת לימודים", body: "למי שלומד במוסד מוכר, למשל תאית בבית ספר לשפות. מתחדשת לאורך תקופת הלימודים." },
      { code: "Non-O", title: "ויזת פרישה", body: "לבני 50 ומעלה, עם הוכחת הכנסה חודשית או פיקדון בבנק תאילנדי. מתחדשת מדי שנה." },
      { code: "Privilege", title: "ויזה ארוכת טווח בתשלום", body: "תוכנית החברות של ממשלת תאילנד (לשעבר Elite): ויזה ל־5 עד 20 שנה תמורת דמי חברות, כולל שירותי VIP בשדה התעופה." },
      { code: "Non-B", title: "ויזת עבודה ועסקים", body: "למי שמועסק בחברה תאילנדית או פותח עסק מקומי. מגיעה יחד עם היתר עבודה." },
      { code: "LTR", title: "תושבות ארוכת טווח", body: "ויזה ל־10 שנים לבעלי הכנסה גבוהה, למשקיעים ולעובדים מרחוק בחברות גדולות, עם הטבות מס." },
    ],
  },
  promises: {
    eyebrow: "ההבטחה שלנו",
    title: "ככה אנחנו *עובדים.*",
    items: [
      { num: "I", title: "בעברית, מההתחלה ועד הסוף", body: "כל שיחה, כל מסמך וכל הודעה — בשפה שלכם. אנחנו מתרגמים את תאילנד בשבילכם." },
      { num: "II", title: "איש קשר אחד", body: "לא מוקד ולא תורנות. מלווה אחד שמכיר את התיק שלכם ועונה בוואטסאפ." },
      { num: "III", title: "מחיר סגור מראש", body: "יודעים בדיוק כמה תשלמו לפני שמתחילים. בלי תוספות באמצע הדרך." },
      { num: "IV", title: "אנשים בשטח", body: "צוות שגר בתאילנד ומגיע איתכם פיזית לסיורי דירות, לבנק ולבית הספר." },
    ],
  },
  faq: {
    eyebrow: "שאלות נפוצות",
    title: "שאלתם, *ענינו.*",
    leadBefore: "לא מצאתם תשובה?",
    leadLink: "שלחו לנו הודעה",
    items: [
      { q: "כמה זמן לוקח כל התהליך?", a: "ברוב המקרים 4–8 שבועות מהשיחה הראשונה ועד שאתם גרים בדירה קבועה. הגורם המשמעותי ביותר הוא זמן הטיפול בויזה." },
      { q: "אפשר להמשיך לעבוד מרחוק לחברה ישראלית?", a: "כן. ויזת DTV נועדה בדיוק לזה. בשיחת המפה נבדוק שאתם עומדים בתנאים ונמליץ לכם לבדוק גם את ההיבט המיסויי מול רואה חשבון בישראל." },
      { q: "מה עם בתי ספר לילדים?", a: "בכל חמשת היעדים יש בתי ספר בינלאומיים באנגלית, ובחלקם גם אפשרויות דו־לשוניות וגנים. שכר הלימוד משתנה מאוד — נמפה עבורכם את האפשרויות לפי תקציב וגיל הילדים." },
      { q: "יש קהילה ישראלית?", a: "בהחלט. הקהילה הגדולה ביותר נמצאת בקופנגן, ויש קהילות פעילות גם בבנגקוק, בפוקט, בקוסמוי ובצ'יאנג מאי — כולל בתי חב״ד." },
      { q: "אפשר לקנות דירה בתאילנד?", a: "זרים יכולים לקנות דירה בבניין משותף (קונדו) במסגרת מכסת הזרים של הבניין, אבל לא קרקע. רוב הלקוחות שלנו מתחילים בשכירות ומחליטים אחר כך." },
      { q: "מה קורה כשתקופת הליווי נגמרת?", a: "אפשר להמשיך עם ליווי חודשי — לחידושי ויזה, דיווחים למשרד ההגירה ועניינים שוטפים. ואם צץ משהו חד־פעמי, פשוט כותבים לנו." },
    ],
  },
  final: {
    title: "הכרטיס כמעט ביד.",
    lede: "שלחו לנו הודעה, ספרו לנו קצת על עצמכם, ונחזור אליכם עם הצעדים הראשונים.",
    cta: "כתבו לנו בוואטסאפ",
  },
  mobileCta: { label: "שיחת ייעוץ בוואטסאפ", aria: "כתבו לנו בוואטסאפ" },
  footer: {
    tag: "רילוקיישן לתאילנד, בעברית.",
    company: "החברה",
    about: "עלינו",
    process: "התהליך",
    faq: "שאלות נפוצות",
    legal_: "משפטי",
    privacy: "פרטיות",
    terms: "תנאי שימוש",
    accessibility: "הצהרת נגישות",
    clocksLabel: "השעה עכשיו",
    bangkok: "בנגקוק",
    telAviv: "תל אביב",
    ahead: "{h} שעות קדימה",
  },
  jsonLdDescription: "ליווי רילוקיישן לישראלים שעוברים לתאילנד",
};

/* ----------------------------------------------------------------- English */

const en: Content = {
  locale: "en",
  dir: "ltr",
  meta: {
    title: "Land In Thailand · Relocation to Thailand for Israelis",
    description:
      "End-to-end relocation support for Israelis moving to Thailand: visa, housing, schools, banking and insurance. Bangkok, Phuket, Chiang Mai, Koh Samui and Koh Phangan.",
    ogDescription: "Visa, housing, schools and banking — we make sure your landing in Thailand is a soft one.",
    ogLocale: "en_US",
  },
  waDefault: "Hi, I'd like to hear about relocating to Thailand",
  skip: "Skip to content",
  header: {
    homeAria: "Land In Thailand — back to top",
    navAria: "Main navigation",
    nav: [
      { href: "#services", label: "Services" },
      { href: "#journey", label: "Process" },
      { href: "#cities", label: "Cities" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
    whatsapp: "WhatsApp",
    switchLabel: "עב",
    switchHref: "/",
    switchLang: "he",
    switchAria: "גרסה בעברית",
    home: "/en/",
    menu: "Menu",
    closeMenu: "Close menu",
    about: "About us",
    languageLabel: "עברית",
  },
  hero: {
    eyebrow: "Relocation to Thailand · handled end to end",
    title: "Your new life\nlands in *Thailand.*",
    lede: "Visa, housing, schools, banking and everything in between. You choose the city or the island — we make sure the landing is a soft one.",
    cta: "Book a consultation",
    secondary: "How it works",
    scrollAria: "Scroll to land",
    tileAlts: [
      "A turquoise lagoon between limestone cliffs in southern Thailand, with a longtail boat crossing it",
      "Bangkok at night",
      "A pagoda on a mountain in northern Thailand",
      "A limestone rock rising from the sea near Phuket",
      "Monks in saffron robes on a street in Chiang Mai",
      "Green coastline and turquoise water on Koh Samui",
      "A small cove on Koh Phangan",
    ],
  },
  intro: {
    eyebrow: "Why us",
    title: "The dream is the easy part.\n*The move itself — that's on us.*",
    lead: "Anyone who has moved to Thailand alone knows: the place is perfect, but the road there is full of forms in Thai, rules that keep changing and people who promise and don't show up. We know the road, and we walk it with you.",
    pains: [
      "Visa rules that change every few months",
      "Leases in Thai and landlords who don't answer",
      "International schools with waiting lists",
      "A bank asking for exactly the document you don't have",
    ],
  },
  pass: {
    aria: "Boarding pass, Tel Aviv to Bangkok",
    label: "Boarding pass",
    from: "Tel Aviv",
    to: "Bangkok",
    stamp: "Cleared",
    meta: [["Passengers", "You"], ["Direct flight", "~11 hrs"], ["Gate", "New life"]],
  },
  services: {
    eyebrow: "Services",
    title: "Everything you need to *live* there,\nnot just arrive.",
    featureAlt: "An infinity pool overlooking a bay on a tropical island",
    items: [
      { icon: "visa", title: "Visa and paperwork", body: "We choose the right visa route with you — DTV, education, retirement or Thailand Privilege — prepare the documents and stay with you until it's approved." },
      { icon: "home", title: "Apartment or villa", body: "Pre-screening to your budget, viewings with our person on the ground, negotiation and a contract check before you sign." },
      { icon: "school", title: "Schools and kindergartens", body: "Mapping the international and bilingual schools in your area, arranging tours, interviews and enrolment." },
      { icon: "bank", title: "Bank, SIM and payments", body: "A Thai bank account, a local phone number and the payment apps everyone actually uses." },
      { icon: "health", title: "Health and insurance", body: "Health insurance that fits your family, and an introduction to the private hospitals near you." },
      { icon: "transport", title: "Getting around", body: "A Thai driving licence, renting or buying a car or scooter — everything you need to move freely." },
      { icon: "community", title: "Community and settling in", body: "Connecting you with the local Israeli community, Chabad house and kids' activities — so it feels like home sooner." },
    ],
  },
  journey: {
    eyebrow: "The process",
    title: "From the first call\n*to the keys in your hand.*",
    lead: "Five stops, one point of contact and a clear timeline. Usually 4–8 weeks from the first call until you're living in your own home.",
    cta: "Start at the first stop",
    steps: [
      { when: "Week 0", title: "Mapping call", body: "An hour to get to know you: how you earn a living, who's moving with you and what matters to you. You leave with a recommended city and visa route." },
      { when: "Weeks 1–4", title: "Plan and paperwork", body: "An organised document list, a personal timeline and your visa application — step by step, no guesswork." },
      { when: "Day one", title: "Landing", body: "Airport pickup, temporary housing ready in advance and a local SIM before you've left the airport." },
      { when: "Weeks 1–3 in Thailand", title: "Settling in", body: "Apartment viewings, signing the lease, opening a bank account, school enrolment and all the official registrations." },
      { when: "From here on", title: "Home", body: "Ongoing support on WhatsApp — from the electrician to your immigration reports — until you feel like a local." },
    ],
  },
  cities: {
    eyebrow: "Five destinations",
    title: "Where will you feel *at home?*",
    lead: "Every place in Thailand is a different world. Here are the differences in short — and on the consultation call we'll match the place to you.",
    items: [
      {
        key: "bkk", code: "BKK", name: "Bangkok", thai: "กรุงเทพฯ", tag: "City · career · families", photo: PHOTOS.bkk,
        alt: "Bangkok at night, the river and lit-up skyscrapers",
        body: "A metropolis that never sleeps: some of Asia's best international schools, world-class private healthcare and excellent public transport. Great for families, tech people and anyone who loves a city.",
        facts: [["2-bedroom in the centre", "₪3,500–6,000"], ["Monthly living for a couple", "₪10,000–15,000"]],
      },
      {
        key: "cnx", code: "CNX", name: "Chiang Mai", thai: "เชียงใหม่", tag: "Mountains · freelancers · calm", photo: PHOTOS.cnx,
        alt: "A golden pagoda on a mountaintop in northern Thailand at sunset",
        body: "An old city among mountains and temples, with a big remote-work community and a low cost of living. Perfect for freelancers and anyone after a slower pace. Good to know: air quality drops between February and April — we'll help you plan around it.",
        facts: [["2-bedroom apartment", "₪2,000–3,500"], ["Monthly living for a couple", "₪6,500–9,500"]],
      },
      {
        key: "hkt", code: "HKT", name: "Phuket", thai: "ภูเก็ต", tag: "Sea · infrastructure · families", photo: PHOTOS.hkt,
        alt: "A limestone rock rising from the sea in Phang Nga Bay near Phuket",
        body: "Thailand's largest island: beaches alongside international hospitals, excellent schools and an airport with flights everywhere. The best mix of sea life and an easy life.",
        facts: [["Apartment or small villa", "₪4,000–8,000"], ["Monthly living for a couple", "₪10,000–16,000"]],
      },
      {
        key: "usm", code: "USM", name: "Koh Samui", thai: "เกาะสมุย", tag: "Island · villas · calm", photo: PHOTOS.usm,
        alt: "Green coastline and turquoise water on Koh Samui",
        body: "A calm, well-kept island with an international community, international schools and its own airport. For anyone who wants real island life — without giving up comfort.",
        facts: [["Villa with a pool", "₪4,500–9,000"], ["Monthly living for a couple", "₪9,000–14,000"]],
      },
      {
        key: "kpg", code: "USM", via: "+ ferry", name: "Koh Phangan", thai: "เกาะพะงัน", tag: "Nature · yoga · Israeli community", photo: PHOTOS.kpg,
        alt: "A small cove with clear water and jungle on Koh Phangan",
        body: "Jungle, quiet beaches, yoga and a large, close-knit Israeli community. There's no airport — you arrive by ferry from Koh Samui — and that's exactly part of the magic.",
        facts: [["Bungalow or house", "₪2,500–5,000"], ["Monthly living for a couple", "₪7,000–11,000"]],
      },
    ],
  },
  cost: {
    eyebrow: "Cost of living",
    title: "The same quality of life,\n*for about half the price.*",
    lead: "A rough estimate of monthly spending for a couple, including rent in a central area. Families with an international school — add tuition.",
    caption: "Estimated monthly spending for a couple, in shekels",
    note: "Middle of the estimated range. Figures vary with lifestyle and the exchange rate.",
    items: [
      { name: "Tel Aviv", value: 20000, ref: true },
      { name: "Phuket", value: 13000 },
      { name: "Bangkok", value: 12500 },
      { name: "Koh Samui", value: 11500 },
      { name: "Koh Phangan", value: 9000 },
      { name: "Chiang Mai", value: 8000 },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "A fixed price up front. *No surprises.*",
    badge: "Most popular",
    plans: [
      {
        name: "Mapping call", for: "Still deciding", price: "390", cta: "Book a call", msg: "Hi, I'd like to book a mapping call",
        items: ["A 60-minute consultation on Zoom or by phone", "A recommended city and visa route", "A written plan with a timeline", "Credited toward any package you choose"],
      },
      {
        name: "Soft landing", for: "Singles and couples", price: "4,900", cta: "See the Soft landing plan", msg: "Hi, I'd like to hear about the Soft landing package",
        items: ["Everything in the mapping call", "Document prep and visa application support", "Airport pickup and temporary housing", "Two days of apartment viewings with our rep", "Negotiation and contract check", "Bank account and local SIM", "30 days of WhatsApp support"],
      },
      {
        name: "Family relocation", for: "Families with kids", price: "9,800", cta: "Let's talk", msg: "Hi, I'd like to hear about the Family relocation package", highlight: true,
        items: ["Everything in Soft landing, plus:", "School mapping, tours and enrolment", "Family health insurance", "Driving licence and a car or scooter", "Community and kids' activities", "90 days of close WhatsApp support"],
      },
    ],
    note: "Prices don't include government fees, flights or rent. Need something else — setting up a business, Thailand Privilege or relocating a pet?",
    noteLink: "We'll put together a quote",
    noteMsg: "Hi, I'd like a custom quote",
  },
  visas: {
    eyebrow: "A short visa guide",
    title: "Which visa *fits you?*",
    lead: "Thailand offers several ways to live there long term. Here's the general picture — we'll find the exact fit together.",
    disclaimer: "Thai visa rules change often. This is general information, not legal advice — we'll check the current rules on the call.",
    items: [
      { code: "DTV", title: "Destination visa for remote workers", body: "A multi-year visa for remote workers and freelancers with clients outside Thailand, and for people coming to study things like cooking or Muay Thai. Allows long stays on each entry and requires proof of funds." },
      { code: "ED", title: "Education visa", body: "For students at a recognised institution, such as Thai at a language school. Renewable for the length of your studies." },
      { code: "Non-O", title: "Retirement visa", body: "For people aged 50 and over, with proof of monthly income or a deposit in a Thai bank. Renewed every year." },
      { code: "Privilege", title: "Paid long-term visa", body: "The Thai government's membership programme (formerly Elite): a 5- to 20-year visa for a membership fee, including VIP airport services." },
      { code: "Non-B", title: "Work and business visa", body: "For people employed by a Thai company or setting up a local business. Comes with a work permit." },
      { code: "LTR", title: "Long-term resident", body: "A 10-year visa for high earners, investors and remote workers at large companies, with tax benefits." },
    ],
  },
  promises: {
    eyebrow: "Our promise",
    title: "This is how we *work.*",
    items: [
      { num: "I", title: "In Hebrew, start to finish", body: "Every call, every document and every message — in your language. We translate Thailand for you." },
      { num: "II", title: "One point of contact", body: "No call centre, no shifts. One person who knows your case and answers on WhatsApp." },
      { num: "III", title: "A fixed price up front", body: "You know exactly what you'll pay before we start. No add-ons halfway through." },
      { num: "IV", title: "People on the ground", body: "A team that lives in Thailand and comes with you in person to viewings, the bank and the school." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "You asked, *we answered.*",
    leadBefore: "Didn't find an answer?",
    leadLink: "Send us a message",
    items: [
      { q: "How long does the whole process take?", a: "Usually 4–8 weeks from the first call until you're in a permanent home. The biggest factor is how long the visa takes." },
      { q: "Can I keep working remotely for an Israeli company?", a: "Yes. The DTV visa was designed for exactly that. On the mapping call we'll check that you qualify, and we recommend checking the tax side with an accountant in Israel." },
      { q: "What about schools for the kids?", a: "All five destinations have English-language international schools, and some have bilingual options and kindergartens. Tuition varies a lot — we'll map the options by budget and your children's ages." },
      { q: "Is there an Israeli community?", a: "Definitely. The largest community is on Koh Phangan, and there are active communities in Bangkok, Phuket, Koh Samui and Chiang Mai too — including Chabad houses." },
      { q: "Can I buy an apartment in Thailand?", a: "Foreigners can buy a condo within the building's foreign-ownership quota, but not land. Most of our clients start by renting and decide later." },
      { q: "What happens when the support period ends?", a: "You can continue with monthly support — for visa renewals, immigration reports and day-to-day matters. And if something one-off comes up, just write to us." },
    ],
  },
  final: {
    title: "Your ticket is almost in hand.",
    lede: "Send us a message, tell us a little about yourselves, and we'll get back to you with the first steps.",
    cta: "Message us on WhatsApp",
  },
  mobileCta: { label: "Consultation on WhatsApp", aria: "Message us on WhatsApp" },
  footer: {
    tag: "Relocation to Thailand, for Israelis.",
    company: "Company",
    about: "About us",
    process: "The process",
    faq: "FAQ",
    legal_: "Legal",
    privacy: "Privacy",
    terms: "Terms",
    accessibility: "Accessibility",
    clocksLabel: "Local time now",
    bangkok: "Bangkok",
    telAviv: "Tel Aviv",
    ahead: "{h} hours ahead",
  },
  jsonLdDescription: "Relocation support for Israelis moving to Thailand",
};

export const CONTENT: Record<Locale, Content> = { he, en };
