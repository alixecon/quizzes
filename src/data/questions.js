export const categories = [
  { id: 'general',   name: 'معلومات عامة',    emoji: '🌍', color: '#4ecdc4' },
  { id: 'islamic',   name: 'التاريخ الإسلامي', emoji: '🕌', color: '#f0a500' },
  { id: 'poetry',    name: 'الشعر العربي',     emoji: '📜', color: '#a78bfa' },
  { id: 'geography', name: 'الجغرافيا',        emoji: '🗺️', color: '#60a5fa' },
  { id: 'science',   name: 'العلوم',           emoji: '🔬', color: '#34d399' },
  { id: 'sports',    name: 'الرياضة',          emoji: '⚽', color: '#fb923c' },
  { id: 'saudi',     name: 'المملكة العربية السعودية', emoji: '🇸🇦', color: '#10b981' },
  { id: 'culture',   name: 'الدين والثقافة',   emoji: '☪️', color: '#f472b6' },
]

export const questions = [
  // ─── معلومات عامة ────────────────────────────────────────────
  {
    id: 1, category: 'general', difficulty: 'easy',
    question: 'ما هي أطول نهر في العالم؟',
    options: ['نهر النيل', 'نهر الأمازون', 'نهر المسيسيبي', 'نهر اليانغتسي'],
    answer: 0,
  },
  {
    id: 2, category: 'general', difficulty: 'easy',
    question: 'كم عدد قارات الأرض؟',
    options: ['خمس', 'ست', 'سبع', 'ثماني'],
    answer: 2,
  },
  {
    id: 3, category: 'general', difficulty: 'medium',
    question: 'ما هي أصغر دولة في العالم من حيث المساحة؟',
    options: ['موناكو', 'سان مارينو', 'الفاتيكان', 'ليختنشتاين'],
    answer: 2,
  },
  {
    id: 4, category: 'general', difficulty: 'medium',
    question: 'في أي عام اخترع ألكسندر غراهام بيل الهاتف؟',
    options: ['1866', '1876', '1886', '1896'],
    answer: 1,
  },
  {
    id: 5, category: 'general', difficulty: 'hard',
    question: 'ما هو العنصر الكيميائي الذي يحمل الرمز "Au"؟',
    options: ['الفضة', 'الألومنيوم', 'الذهب', 'النحاس'],
    answer: 2,
  },
  {
    id: 6, category: 'general', difficulty: 'hard',
    question: 'كم يبلغ عدد عظام الجسم البشري البالغ؟',
    options: ['196', '206', '216', '226'],
    answer: 1,
  },

  // ─── التاريخ الإسلامي ────────────────────────────────────────
  {
    id: 7, category: 'islamic', difficulty: 'easy',
    question: 'في أي مدينة وُلد النبي محمد ﷺ؟',
    options: ['المدينة المنورة', 'مكة المكرمة', 'الطائف', 'جدة'],
    answer: 1,
  },
  {
    id: 8, category: 'islamic', difficulty: 'easy',
    question: 'ما هو أول مسجد بُني في الإسلام؟',
    options: ['المسجد الحرام', 'المسجد النبوي', 'مسجد قباء', 'المسجد الأقصى'],
    answer: 2,
  },
  {
    id: 9, category: 'islamic', difficulty: 'medium',
    question: 'في أي عام هجري وقعت غزوة بدر الكبرى؟',
    options: ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة'],
    answer: 1,
  },
  {
    id: 10, category: 'islamic', difficulty: 'medium',
    question: 'من هو الصحابي الملقب بـ"سيف الله المسلول"؟',
    options: ['عمر بن الخطاب', 'علي بن أبي طالب', 'خالد بن الوليد', 'سعد بن أبي وقاص'],
    answer: 2,
  },
  {
    id: 11, category: 'islamic', difficulty: 'hard',
    question: 'من هو المؤسس لعلم النحو العربي في رواية مشهورة؟',
    options: ['الخليل بن أحمد الفراهيدي', 'سيبويه', 'أبو الأسود الدؤلي', 'الكسائي'],
    answer: 2,
  },
  {
    id: 12, category: 'islamic', difficulty: 'hard',
    question: 'ما هي المعركة التي أنقذت الحضارة الإسلامية من الغزو المغولي؟',
    options: ['معركة حطين', 'معركة عين جالوت', 'معركة اليرموك', 'معركة القادسية'],
    answer: 1,
  },

  // ─── الشعر العربي ────────────────────────────────────────────
  {
    id: 13, category: 'poetry', difficulty: 'easy',
    question: 'من هو شاعر النيل الملقب بـ"شاعر القطرين"؟',
    options: ['أحمد شوقي', 'حافظ إبراهيم', 'المتنبي', 'أبو تمام'],
    answer: 1,
  },
  {
    id: 14, category: 'poetry', difficulty: 'easy',
    question: 'من هو الشاعر الملقب بـ"أمير الشعراء"؟',
    options: ['حافظ إبراهيم', 'أحمد شوقي', 'نزار قباني', 'محمود درويش'],
    answer: 1,
  },
  {
    id: 15, category: 'poetry', difficulty: 'medium',
    question: 'اكتمل هذا البيت للمتنبي: "على قدر أهل العزم تأتي العزائم..."',
    options: [
      'وتأتي على قدر الكرام المكارم',
      'ويكبر في عين الصغير صغيرها',
      'وتصغر في عين العظيم العظائم',
      'وتعظم في عين العظيم العزائم',
    ],
    answer: 0,
  },
  {
    id: 16, category: 'poetry', difficulty: 'medium',
    question: 'من هو صاحب المعلقة التي تبدأ بـ"قفا نبكِ من ذكرى حبيب ومنزل"؟',
    options: ['عنترة بن شداد', 'زهير بن أبي سلمى', 'امرؤ القيس', 'طرفة بن العبد'],
    answer: 2,
  },
  {
    id: 17, category: 'poetry', difficulty: 'hard',
    question: 'في أي عصر ازدهرت حركة الشعر المهجري؟',
    options: ['العصر الجاهلي', 'العصر العباسي', 'القرن التاسع عشر', 'أوائل القرن العشرين'],
    answer: 3,
  },
  {
    id: 18, category: 'poetry', difficulty: 'hard',
    question: 'من هو الشاعر الفلسطيني المعروف بـ"شاعر المقاومة"؟',
    options: ['سميح القاسم', 'توفيق زياد', 'محمود درويش', 'فدوى طوقان'],
    answer: 2,
  },

  // ─── الجغرافيا ───────────────────────────────────────────────
  {
    id: 19, category: 'geography', difficulty: 'easy',
    question: 'ما هي عاصمة المملكة العربية السعودية؟',
    options: ['جدة', 'مكة المكرمة', 'الرياض', 'الدمام'],
    answer: 2,
  },
  {
    id: 20, category: 'geography', difficulty: 'easy',
    question: 'ما هو أعلى جبل في العالم؟',
    options: ['جبل كيليمانجارو', 'جبل إيفرست', 'جبل ماكينلي', 'جبل ألبروس'],
    answer: 1,
  },
  {
    id: 21, category: 'geography', difficulty: 'medium',
    question: 'ما هو أكبر محيط في العالم؟',
    options: ['المحيط الأطلسي', 'المحيط الهندي', 'المحيط المتجمد الشمالي', 'المحيط الهادئ'],
    answer: 3,
  },
  {
    id: 22, category: 'geography', difficulty: 'medium',
    question: 'ما هو أكبر صحراء في العالم؟',
    options: ['صحراء الربع الخالي', 'صحراء جوبي', 'صحراء أتاكاما', 'الصحراء الكبرى الأفريقية'],
    answer: 3,
  },
  {
    id: 23, category: 'geography', difficulty: 'hard',
    question: 'ما هو أعمق بحيرة في العالم؟',
    options: ['بحيرة تنجانيقا', 'بحيرة بايكال', 'بحيرة ماراكايبو', 'بحيرة سوبيريور'],
    answer: 1,
  },
  {
    id: 24, category: 'geography', difficulty: 'hard',
    question: 'ما هي أطول سلسلة جبال في العالم؟',
    options: ['جبال الهيمالايا', 'جبال الألب', 'جبال الأنديز', 'جبال روكي'],
    answer: 2,
  },

  // ─── العلوم ──────────────────────────────────────────────────
  {
    id: 25, category: 'science', difficulty: 'easy',
    question: 'ما هو الغاز الأكثر وفرة في الغلاف الجوي للأرض؟',
    options: ['الأكسجين', 'ثاني أكسيد الكربون', 'النيتروجين', 'الأرغون'],
    answer: 2,
  },
  {
    id: 26, category: 'science', difficulty: 'easy',
    question: 'كم يبلغ عدد كواكب المجموعة الشمسية؟',
    options: ['سبعة', 'ثمانية', 'تسعة', 'عشرة'],
    answer: 1,
  },
  {
    id: 27, category: 'science', difficulty: 'medium',
    question: 'ما هو الجهاز المسؤول عن ضخ الدم في جسم الإنسان؟',
    options: ['الكبد', 'الرئتان', 'القلب', 'الكليتان'],
    answer: 2,
  },
  {
    id: 28, category: 'science', difficulty: 'medium',
    question: 'ما هو الرمز الكيميائي للماء؟',
    options: ['HO', 'H2O', 'H3O', 'OH'],
    answer: 1,
  },
  {
    id: 29, category: 'science', difficulty: 'hard',
    question: 'من اكتشف قانون الجاذبية؟',
    options: ['ألبرت أينشتاين', 'غاليليو غاليلي', 'إسحاق نيوتن', 'نيكولاس كوبرنيكوس'],
    answer: 2,
  },
  {
    id: 30, category: 'science', difficulty: 'hard',
    question: 'ما هو الكوكب الأقرب إلى الشمس؟',
    options: ['الزهرة', 'المريخ', 'الأرض', 'عطارد'],
    answer: 3,
  },

  // ─── الرياضة ─────────────────────────────────────────────────
  {
    id: 31, category: 'sports', difficulty: 'easy',
    question: 'كم عدد اللاعبين في فريق كرة القدم داخل الملعب؟',
    options: ['9', '10', '11', '12'],
    answer: 2,
  },
  {
    id: 32, category: 'sports', difficulty: 'easy',
    question: 'في أي دولة أُقيمت أولمبياد باريس 2024؟',
    options: ['المملكة المتحدة', 'ألمانيا', 'فرنسا', 'إسبانيا'],
    answer: 2,
  },
  {
    id: 33, category: 'sports', difficulty: 'medium',
    question: 'كم مرة فازت البرازيل بكأس العالم لكرة القدم؟',
    options: ['أربع مرات', 'خمس مرات', 'ست مرات', 'سبع مرات'],
    answer: 1,
  },
  {
    id: 34, category: 'sports', difficulty: 'medium',
    question: 'من هو أكثر لاعبي كرة القدم تسجيلاً للأهداف في تاريخ المنتخب السعودي؟',
    options: ['ياسر القحطاني', 'سامي الجابر', 'محمد الدعيع', 'فهد المهلل'],
    answer: 0,
  },
  {
    id: 35, category: 'sports', difficulty: 'hard',
    question: 'ما هي رياضة يلتزم فيها اللاعب بقاعدة "لا مس للكرة باليد"؟',
    options: ['الرغبي', 'البيسبول', 'كرة القدم', 'الكريكيت'],
    answer: 2,
  },
  {
    id: 36, category: 'sports', difficulty: 'hard',
    question: 'ما هي المسافة الرسمية لسباق الماراثون بالكيلومترات؟',
    options: ['40 كم', '41.195 كم', '42.195 كم', '43 كم'],
    answer: 2,
  },

  // ─── المملكة العربية السعودية (مصدر: Saudipedia) ────────────
  {
    id: 37, category: 'saudi', difficulty: 'easy',
    question: 'ما هي عاصمة المملكة العربية السعودية؟',
    options: ['جدة', 'مكة المكرمة', 'الرياض', 'الدمام'],
    answer: 2,
  },
  {
    id: 38, category: 'saudi', difficulty: 'easy',
    question: 'ما هو الدين الرسمي للمملكة العربية السعودية؟',
    options: ['المسيحية', 'الإسلام', 'اليهودية', 'الهندوسية'],
    answer: 1,
  },
  {
    id: 39, category: 'saudi', difficulty: 'easy',
    question: 'ما هي اللغة الرسمية للمملكة العربية السعودية؟',
    options: ['الإنجليزية', 'العربية', 'الأردية', 'الفارسية'],
    answer: 1,
  },
  {
    id: 40, category: 'saudi', difficulty: 'medium',
    question: 'ما هو تقريباً عدد سكان المملكة العربية السعودية وفق أحدث تعداد؟',
    options: ['25 مليون نسمة', '32 مليون نسمة', '40 مليون نسمة', '50 مليون نسمة'],
    answer: 1,
  },
  {
    id: 41, category: 'saudi', difficulty: 'medium',
    question: 'في أي عام تأسست المملكة العربية السعودية على يد الملك عبدالعزيز؟',
    options: ['1920', '1925', '1932', '1945'],
    answer: 2,
  },
  {
    id: 42, category: 'saudi', difficulty: 'medium',
    question: 'ما هي أكبر صحراء في المملكة العربية السعودية؟',
    options: ['صحراء النفود', 'الربع الخالي', 'صحراء الدهناء', 'صحراء الصمان'],
    answer: 1,
  },
  {
    id: 43, category: 'saudi', difficulty: 'hard',
    question: 'كم تبلغ مساحة المملكة العربية السعودية تقريباً؟',
    options: ['مليون كم²', '1.5 مليون كم²', 'مليونَا كم²', '2.5 مليون كم²'],
    answer: 2,
  },
  {
    id: 44, category: 'saudi', difficulty: 'hard',
    question: 'ما النسبة المئوية للسعوديين من إجمالي سكان المملكة وفق آخر تعداد؟',
    options: ['45%', '55%', '58.4%', '65%'],
    answer: 2,
  },
  {
    id: 45, category: 'saudi', difficulty: 'hard',
    question: 'المملكة هي الدولة الوحيدة التي لها ساحل على بحرين، ما هما؟',
    options: ['البحر الأحمر والبحر الأبيض المتوسط', 'البحر الأحمر وخليج عُمان', 'البحر الأحمر والخليج العربي', 'الخليج العربي وخليج عُمان'],
    answer: 2,
  },

  // ─── الدين والثقافة ──────────────────────────────────────────
  {
    id: 46, category: 'culture', difficulty: 'easy',
    question: 'كم عدد أركان الإسلام؟',
    options: ['أربعة', 'خمسة', 'ستة', 'سبعة'],
    answer: 1,
  },
  {
    id: 47, category: 'culture', difficulty: 'easy',
    question: 'ما هو شهر الصيام في الإسلام؟',
    options: ['محرم', 'شعبان', 'رمضان', 'ذو الحجة'],
    answer: 2,
  },
  {
    id: 48, category: 'culture', difficulty: 'medium',
    question: 'كم عدد سور القرآن الكريم؟',
    options: ['110', '114', '120', '124'],
    answer: 1,
  },
  {
    id: 49, category: 'culture', difficulty: 'medium',
    question: 'ما هو الطعام التقليدي الأبرز في احتفالات الأعياد العربية؟',
    options: ['الكسكس', 'الكبسة', 'المنسف', 'كل ما سبق حسب المنطقة'],
    answer: 3,
  },
  {
    id: 50, category: 'culture', difficulty: 'hard',
    question: 'ما هو اسم الخط الكوفي الذي يُعدّ من أقدم الخطوط العربية؟',
    options: ['الخط النسخي', 'الخط الكوفي', 'خط الرقعة', 'الخط الديواني'],
    answer: 1,
  },
  {
    id: 51, category: 'culture', difficulty: 'hard',
    question: 'أين تقع مدينة البتراء الأثرية؟',
    options: ['اليمن', 'مصر', 'سوريا', 'الأردن'],
    answer: 3,
  },
]
