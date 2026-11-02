/* client/src/components/Breadcrumbs.tsx
 *
 * Visible breadcrumb trail. Pairs with the BreadcrumbList JSON-LD that
 * prerender.tsx emits for the same routes: structured data must describe
 * content users can see on the page.
 */
import { Link } from "wouter";

export type Crumb = { name: string; href?: string };

export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#5D5752]">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.name}-${i}`} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link href={c.href} className="underline-offset-4 hover:underline hover:text-[#8F5238] py-1">
                  {c.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="font-medium text-[#3D3733]">
                  {c.name}
                </span>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
