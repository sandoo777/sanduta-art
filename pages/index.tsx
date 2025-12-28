import Head from 'next/head';
import { useRouter } from 'next/router';
import ro from '../locales/ro.json';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const messages = { ro, ru, en };

export default function Home() {
  const { locale } = useRouter();
  const t = messages[locale as keyof typeof messages];

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.desc} />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <img src="/logo.png" alt="Logo" className="h-12" />
          <LanguageSwitch />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">{t.hero}</h1>
        <p className="mb-6">{t.sub}</p>
        <a
          href="/editor"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
        >
          {t.cta}
        </a>
      </main>

      <footer className="text-sm text-gray-600 px-4 py-6 border-t">
        {t.footer}
      </footer>
    </>
  );
}

function LanguageSwitch() {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      {router.locales?.map(l => (
        <button
          key={l}
          onClick={() => router.push(router.pathname, router.pathname, { locale: l })}
          className={`px-2 py-1 border rounded ${router.locale === l ? 'bg-gray-200' : ''}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
