import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/courses";

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return notFound();

  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{course.title}</h1>
      <div className="space-y-8">
        {course.lessons.map((lesson, idx) => (
          <section key={idx} className="rounded-xl border border-black/10 p-4 bg-white/60">
            <h2 className="text-lg font-semibold mb-3">{lesson.title}</h2>
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                className="w-full h-full"
                src={lesson.videoUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}