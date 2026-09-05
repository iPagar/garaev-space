export default function PageIntro({
  title,
  titleId,
}: {
  title: string;
  titleId?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-12 pb-10 md:px-8 md:pt-16">
      <h1 id={titleId} className="text-4xl font-medium md:text-5xl">
        {title}
      </h1>
    </section>
  );
}
