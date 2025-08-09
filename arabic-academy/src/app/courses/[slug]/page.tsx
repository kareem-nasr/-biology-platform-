import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/courses";
import { BuyButton } from "@/components/BuyButton";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return notFound();

  return (
    <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="text-neutral-700 mb-6">{course.description}</p>

      <div className="flex items-center gap-4 mb-10">
        <span className="text-lg font-semibold">السعر: {(course.priceCents / 100).toFixed(2)} USD</span>
        <BuyButton courseId={course.id} />
      </div>

      <h2 className="text-xl font-semibold mb-3">محتوى الدورة</h2>
      <ul className="list-disc pr-6 space-y-1 text-neutral-800">
        {course.lessons.map((l, idx) => (
          <li key={idx}>{l.title}</li>
        ))}
      </ul>
    </div>
  );
}