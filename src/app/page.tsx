export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="text-center">
          <h1 className="animate-fade-in text-5xl font-light tracking-tight sm:text-7xl md:text-8xl">
            Pavel Garaev
          </h1>
          <p className="animate-fade-in delay-200 mt-4 font-mono text-lg text-muted sm:text-xl">
            @ipagar
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-slow delay-500 absolute bottom-12">
          <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-muted to-transparent" />
        </div>
      </section>

      {/* Bio Section */}
      <section className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-24">
        <p className="max-w-md text-center text-lg leading-relaxed text-muted sm:text-xl">
          Building things on the internet.
        </p>
      </section>

      {/* Links Section */}
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-8 px-6 pb-24">
        <div className="flex gap-8">
          {/* Telegram */}
          <a
            href="https://t.me/ipagar"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-muted transition-colors duration-300 hover:text-foreground"
            aria-label="Telegram"
          >
            <svg
              className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span className="font-light">Telegram</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/ipagar"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-muted transition-colors duration-300 hover:text-foreground"
            aria-label="LinkedIn"
          >
            <svg
              className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-light">LinkedIn</span>
          </a>
        </div>

        {/* Footer */}
        <p className="mt-16 font-mono text-xs text-muted/50">
          © {new Date().getFullYear()}
        </p>
      </section>
    </main>
  );
}
