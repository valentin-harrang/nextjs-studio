import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const GoHome = () => (
  <Link
    href="/"
    className="text-blue-600 underline hover:text-blue-800 flex items-center gap-2 mb-12"
  >
    <ArrowLeftIcon className="size-4" />
    <span>Retour à l&apos;accueil</span>
  </Link>
);
