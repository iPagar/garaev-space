export default function PageIntro({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg/8 text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
