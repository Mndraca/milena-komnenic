import Link from "next/link";
import { ModeToggle } from "./modeToggle";

const BlogNav = () => {
  return (
    <nav
      id="blog"
      className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5"
    >
      <Link href="/" className="font-bold text-3xl">
        Codify by <span className="text-pink-400"> Mndraca</span>
      </Link>
      <ModeToggle />
    </nav>
  );
};
export default BlogNav;
