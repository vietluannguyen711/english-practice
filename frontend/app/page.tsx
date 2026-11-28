import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Headphones,
  Mic2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/navigation/Header";

const features = [
  {
    icon: BookOpen,
    title: "Vocabulary",
    description: "Mở rộng vốn từ qua những chủ đề gần gũi và ví dụ dễ nhớ.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Brain,
    title: "Grammar",
    description: "Ôn luyện ngữ pháp theo từng chủ điểm, từng bước vững chắc.",
    color: "bg-violet-50 text-violet-700",
  },
  {
    icon: Headphones,
    title: "Listening",
    description: "Luyện nghe thường xuyên để quen với cách phát âm tự nhiên.",
    color: "bg-sky-50 text-sky-700",
  },
  {
    icon: Mic2,
    title: "Speaking",
    description: "Thực hành diễn đạt và xây dựng sự tự tin khi giao tiếp.",
    color: "bg-amber-50 text-amber-700",
  },
];

const steps = [
  {
    number: "01",
    title: "Chọn nội dung",
    description: "Bắt đầu với kỹ năng hoặc chủ đề tiếng Anh bạn muốn cải thiện.",
  },
  {
    number: "02",
    title: "Luyện tập mỗi ngày",
    description: "Dành một khoảng thời gian ngắn để học và thực hành đều đặn.",
  },
  {
    number: "03",
    title: "Theo dõi tiến bộ",
    description: "Nhìn lại quá trình học và tiếp tục cải thiện từng ngày.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-cyan-50" />
        <div className="absolute -right-36 top-10 -z-10 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-32 left-0 -z-10 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-emerald-800 shadow-sm">
              <Sparkles size={15} />
              YOUR ENGLISH JOURNEY STARTS HERE
            </div>

            <h1 className="text-4xl leading-[1.13] font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Học tiếng Anh mỗi ngày,
              <span className="mt-2 block text-emerald-700">tự tin hơn mỗi bước.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Xây dựng thói quen học tiếng Anh với những bài luyện tập về từ vựng, ngữ pháp, nghe và
              nói. Bắt đầu từ những bước nhỏ và tiến bộ theo tốc độ của riêng bạn.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Bắt đầu hành trình
                <ArrowRight size={17} />
              </Link>
              <a
                href="#features"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-white"
              >
                Khám phá tính năng
                <ChevronRight size={17} />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-600" />
                Học theo tốc độ của bạn
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-600" />
                Luyện tập mỗi ngày
              </span>
            </div>
          </div>

          {/* Learning preview */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-5 top-16 h-28 w-28 rounded-full bg-emerald-200/70 blur-2xl" />
            <div className="absolute -right-5 bottom-10 h-36 w-36 rounded-full bg-cyan-200/70 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">
                    Daily practice
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900">
                    Một chút tiến bộ mỗi ngày
                  </h2>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <Sparkles size={23} />
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold tracking-wide text-emerald-800 uppercase">
                    Word of the day
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                    Vocabulary
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">Consistency</p>
                <p className="mt-1 text-sm text-slate-500">/kənˈsɪs.tən.si/ · sự kiên trì</p>
                <p className="mt-4 rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-sm italic text-slate-600">
                  “Consistency is the key to improvement.”
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                    <Headphones size={21} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">Listening</span>
                    <span className="mt-0.5 block text-xs text-slate-500">Luyện nghe</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                    <Mic2 size={21} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">Speaking</span>
                    <span className="mt-0.5 block text-xs text-slate-500">Luyện nói</span>
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <TrendingUp size={21} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-800">
                    Small steps, steady progress
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    Duy trì thói quen để tiến bộ lâu dài
                  </span>
                </span>
                <CheckCircle2 size={19} className="text-emerald-600" />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl shadow-slate-900/10 sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Target size={20} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">Keep learning</span>
                <span className="block text-xs text-slate-500">Every day matters</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase">
              Learn your way
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Phát triển toàn diện kỹ năng tiếng Anh
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-500">
              Tập trung vào từng kỹ năng và xây dựng nền tảng vững chắc qua những lần luyện tập đều
              đặn.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}
                  >
                    <Icon size={23} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{feature.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 transition group-hover:gap-2">
                    Khám phá
                    <ArrowRight size={15} />
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="scroll-mt-24 border-y border-slate-100 bg-slate-50/80 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="max-w-lg">
              <p className="text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase">
                Simple learning routine
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Bắt đầu đơn giản,
                <span className="block text-emerald-700">tiến bộ từng ngày.</span>
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-500">
                Bạn không cần học tất cả trong một ngày. Hãy bắt đầu với một mục tiêu nhỏ, duy trì
                luyện tập và từng bước tiến gần hơn đến khả năng tiếng Anh mong muốn.
              </p>
              <Link
                href="/auth"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Bắt đầu ngay
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.02] sm:p-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-700 to-teal-800 px-7 py-12 text-center shadow-xl shadow-emerald-900/10 sm:px-12 sm:py-16">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
            <GraduationCap size={29} />
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Mỗi ngày một chút luyện tập,
            <span className="block text-emerald-100">mỗi ngày một bước tiến bộ.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-emerald-50/85 sm:text-base">
            Bắt đầu hành trình rèn luyện tiếng Anh của bạn cùng English Practice.
          </p>
          <Link
            href="/auth"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-emerald-800 transition hover:-translate-y-0.5 hover:bg-emerald-50"
          >
            Bắt đầu học ngay
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <BookOpen size={19} />
            </span>
            <span>
              <span className="block text-sm font-bold text-slate-900">English Practice</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Learn every day
              </span>
            </span>
          </Link>
          <p className="text-xs text-slate-400">
            © 2026 English Practice. Learn. Practice. Improve.
          </p>
          <div className="flex items-center gap-5 text-sm text-slate-500">
            <Link href="/auth" className="transition hover:text-emerald-700">
              Đăng nhập
            </Link>
            <a href="#features" className="transition hover:text-emerald-700">
              Tính năng
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
