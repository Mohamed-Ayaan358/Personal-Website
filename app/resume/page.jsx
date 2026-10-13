import BlogShell from "../../components/BlogShell";
export const metadata = { title: "Résumé — Mohamed Ayaan" };
export default function Resume() {
  return (
    <BlogShell>
      <h1>Résumé.</h1>
      <p>
        <a className="button" href="/Ayaan.pdf" download>
          Download résumé ↗
        </a>
      </p>
      <p>
        <a className="button" href="https://calendly.com/ayaanweb/anyone">
          Schedule a meeting ↗
        </a>
      </p>
    </BlogShell>
  );
}
