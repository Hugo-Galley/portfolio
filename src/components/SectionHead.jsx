import '../Styles/Sections.css';

/* Section title, same everywhere: a bright first sentence, a muted second one,
   and an optional action on the right. */
export default function SectionHead({ id, title, muted, action, align = 'left' }) {
  return (
    <header className={`section-head section-head--${align}`}>
      <div className="section-head-text">
        <h2 id={id}>
          {title} {muted && <span className="section-muted">{muted}</span>}
        </h2>
      </div>
      {action}
    </header>
  );
}
