export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-6 text-center text-sm text-muted-foreground">
          <p>
            Créé avec <span className="text-red-500">❤️</span> par{" "}
            <a
              href="https://www.linkedin.com/in/valentin-harrang/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-blue-600"
            >
              Valentin Harrang
            </a>{" "}
            à des fins de formation pour la{" "}
            <a
              href="https://www.linkedin.com/school/normandiewebschool/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-blue-600"
            >
              Normandie Web School
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
