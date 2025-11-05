import Link from "next/link";

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavigationLink({ href, children }: NavigationLinkProps) {
  return (
    <Link href={href} className="text-blue-600 underline hover:text-blue-800">
      {children}
    </Link>
  );
}

