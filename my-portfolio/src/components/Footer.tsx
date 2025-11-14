const GithubIcon = () => (
  <svg className="inline-block w-6 h-6 align-middle" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 00-3.64 22.42c.58.11.8-.25.8-.56v-2.1c-3.26.71-3.95-1.4-3.95-1.4-.53-1.33-1.3-1.69-1.3-1.69-1.06-.74.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.74 1.27 3.41.97.11-.76.4-1.27.72-1.56-2.6-.29-5.33-1.3-5.33-5.8 0-1.28.46-2.32 1.21-3.14-.12-.29-.53-1.46.12-3.05 0 0 1-.32 3.27 1.2a11.3 11.3 0 015.96 0c2.26-1.53 3.26-1.2 3.26-1.2.66 1.59.25 2.76.13 3.05.76.82 1.2 1.86 1.2 3.14 0 4.52-2.73 5.5-5.34 5.79.41.35.77 1.04.77 2.11v3.12c0 .31.21.68.81.56A11.5 11.5 0 0012 .5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="inline-block w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="6" width="18" height="12" rx="3" />
    <path d="M3.25 7.75l8.87 7.09a1.5 1.5 0 001.76 0l8.87-7.09" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="text-center text-gray-500 dark:text-gray-400 text-sm py-10 mt-16 border-t border-gray-200 dark:border-[#2c2f47] bg-transparent transition-colors duration-300 select-none">
      <div className="flex gap-6 justify-center mb-4">
        <a
          href="https://github.com/mmadersbacher"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-cyan-400 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 rounded"
          aria-label="GitHub Profil öffnen"
        >
          <GithubIcon />
        </a>
        <a
          href="mailto:mario.madersbacher.2008@gmail.com"
          className="text-gray-400 hover:text-cyan-400 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 rounded"
          aria-label="E-Mail senden"
        >
          <MailIcon />
        </a>
      </div>
      <div className="font-mono tracking-wide select-text">
        © {new Date().getFullYear()} · Mario Madersbacher · Security Engineering
      </div>
    </footer>
  );
}
