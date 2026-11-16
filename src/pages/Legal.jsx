import { NavLink } from 'react-router-dom';
import { LEGAL_DOCS, findLegalDoc } from '../data/legal.js';

// P-06 약관·정책 문서 (이용약관 / 개인정보처리방침 / 교환·반품 안내)
export default function Legal({ docId }) {
  const doc = findLegalDoc(docId);

  return (
    <section className="section section--tight">
      <div className="container legal">
        <nav className="legal__tabs" aria-label="약관 및 정책">
          {LEGAL_DOCS.map((d) => (
            <NavLink key={d.id} to={d.path}>
              {d.title}
            </NavLink>
          ))}
        </nav>

        <article className="legal__doc">
          <header className="legal__head">
            <h1>{doc.title}</h1>
            <p className="legal__date">시행일 {doc.updated}</p>
            <p className="demo-note">초안이에요. 실제 운영 전에 법률 검토가 필요해요.</p>
          </header>

          {doc.sections.map((s) => (
            <section key={s.h} className="legal__section">
              <h2>{s.h}</h2>
              {s.body.map((b, i) =>
                Array.isArray(b) ? (
                  <ul key={i}>
                    {b.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{b}</p>
                ),
              )}
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}
