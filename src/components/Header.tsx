import Link from "next/link";

export default function Header() {
  return (
    <nav className="w-full px-6 py-4 bg-white shadow-lg border-border/50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-black">TinyLink</span>
      </div>

      <div className="flex items-center gap-6 font-medium text-zinc-700">
        <Link href="/" className="hover:text-black">Dashboard</Link>
        <Link href="/stats" className="hover:text-black">Stats</Link>
        <Link href="/health" className="hover:text-black">Health</Link>
      </div>
    </nav>
  );
}
