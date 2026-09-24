interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  body?: string;
}

export function SectionHeading({ index, eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal="up">
      <span className="section-heading__index">{index}</span>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {body && <p>{body}</p>}
      </div>
    </div>
  );
}
