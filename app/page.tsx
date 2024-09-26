import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogProps } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar/page";
import Navlink from "./navlink/page";
import About from "./about/page";
import Projects from "./projects/page";
import Footer from "./footer/page";
import Contact from "./contact/page";
import BlogNav from "./components/navbarblog";

export const revalidate = 30;

const getData = async () => {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage,
    category[] -> {
      title
    }
  }`;
  const data = await client.fetch(query);
  return data;
};

export default async function Home() {
  const data: BlogProps[] = await getData();

  return (
    <>
      <Navbar />
      <Navlink title="" />
      <About />
      <Projects />
      <BlogNav />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {data.map((post, idx) => (
          <Card key={idx}>
            <Image
              src={urlFor(post.titleImage).url()}
              alt={post.title || "Image description"}
              width={500}
              height={500}
              className="rounded-t-lg h-[200px] object-cover"
            />
            <div className="mt-4 text-center">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Category:
              </h2>
              <ul className="flex justify-center space-x-4 mt-2">
                {post.category.map((cat: { title: string }) => (
                  <li
                    key={cat.title}
                    className="bg-green-200 rounded-full px-4 py-1 text-sm text-green-700"
                  >
                    {cat.title}
                  </li>
                ))}
              </ul>
            </div>
            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-pink-500 ">
                {post.smallDescription}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.currentSlug}`}>Read more</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Contact />
      <Footer />
    </>
  );
}
