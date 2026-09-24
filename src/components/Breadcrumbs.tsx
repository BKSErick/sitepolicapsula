interface BreadcrumbsProps {
  current: string;
  parent?: { label: string; href: string };
}

export function Breadcrumbs({ current, parent }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      <a href="/">Início</a>
      <span aria-hidden="true">/</span>
      {parent && (
        <>
          <a href={parent.href}>{parent.label}</a>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span aria-current="page">{current}</span>
    </nav>
  );
}
