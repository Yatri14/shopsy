import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span className="text-slate-300">/</span> : null}
            {isLast || !item.href ? (
              <span className={isLast ? 'text-slate-700 dark:text-slate-200' : ''}>{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-blue-500">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
