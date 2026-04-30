import Navbar from "../components/Navbar";
import { getNavLinks } from "@/utils/navigation.server";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = await getNavLinks();
  return (
    <>
      <Navbar navLinks={navLinks} />
      <div className="flex-grow">
        {children}
      </div>
      <footer className="w-full py-12 border-t border-neutral-200 dark:border-neutral-800 bg-transparent flex flex-col items-center justify-center space-y-4 text-center max-w-2xl mx-auto px-8 mt-12">
        <div className="flex gap-6 font-serif text-sm tracking-wide">
          <a className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 opacity-80 hover:opacity-100 transition-opacity" href="#">Privacy</a>
          <a className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 opacity-80 hover:opacity-100 transition-opacity" href="#">Terms</a>
          <a className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 opacity-80 hover:opacity-100 transition-opacity" href="/login">Admin</a>
        </div>
      </footer>
    </>
  );
}
