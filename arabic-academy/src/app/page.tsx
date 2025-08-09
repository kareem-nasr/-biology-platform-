import Link from "next/link";
import { courses } from "@/lib/courses";

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold">أكاديمية العربية</h1>
        <p className="mt-2 text-neutral-600">تعلم اللغة العربية من الصفر إلى الاحتراف</p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2">
        {courses.map((course) => (
          <article key={course.id} className="rounded-2xl border border-black/10 p-5 shadow-sm bg-white/60">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-sm text-neutral-700 mb-4">{course.description}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold">{(course.priceCents / 100).toFixed(2)} USD</span>
              <div className="flex gap-3">
                <Link href={`/courses/${course.slug}`} className="rounded-full px-4 py-2 text-sm bg-neutral-900 text-white hover:bg-neutral-800">تفاصيل الدورة</Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="mt-14 text-center text-xs text-neutral-500">© {new Date().getFullYear()} أكاديمية العربية</footer>
    </div>
  );
}
