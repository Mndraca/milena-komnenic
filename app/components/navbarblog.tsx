import Link from "next/link";

const BlogNav = () => {
  return (
    <nav
      id="blog"
      className="w-full relative flex items-center justify-center max-w-2xl mx-auto px-4 py-5"
    >
      <Link href="/" className="font-bold text-3xl">
        Codify by <span className="text-pink-400"> Mndraca</span>
      </Link>
    </nav>
  );
};
export default BlogNav;
