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
  *[_type == 'blog'] | order(_createAt desc) {
    title,
      smallDescription,
      "currentSlug":slug.current,
      titleImage
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
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
        {data.map((post, idx) => (
          <Card key={idx}>
            <Image
              src={urlFor(post.titleImage).url()}
              alt={post.title || "Image description"}
              width={500}
              height={500}
              className="rounded-t-lg h-[200px] object-cover"
            />
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
