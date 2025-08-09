export type Lesson = {
  title: string;
  videoUrl: string; // YouTube embed or video URL
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  lessons: Lesson[];
};

export const courses: Course[] = [
  {
    id: "arabic-basics",
    slug: "arabic-basics",
    title: "أساسيات اللغة العربية",
    description: "ابدأ من الصفر وتعرف على الحروف، الأصوات، والكلمات الأولى",
    priceCents: 1999,
    currency: "usd",
    lessons: [
      { title: "مقدمة الدورة", videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1" },
      { title: "الحروف العربية", videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2" },
    ],
  },
  {
    id: "arabic-grammar",
    slug: "arabic-grammar",
    title: "قواعد النحو والصرف",
    description: "تعمّق في قواعد اللغة العربية مع أمثلة وتطبيقات عملية",
    priceCents: 2999,
    currency: "usd",
    lessons: [
      { title: "مقدمة في النحو", videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3" },
      { title: "الإعراب والأساليب", videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4" },
    ],
  },
];

export function getCourseById(courseId: string): Course | undefined {
  return courses.find((c) => c.id === courseId);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}