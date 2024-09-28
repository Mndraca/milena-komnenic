import { BlogProps } from "@/lib/interface";
import Navbar from "./components/navbar";
import Navlink from "./components/navlink";
import About from "./about/page";
import Projects from "./projects/page";
import Footer from "./components/footer";
import Contact from "./contact/page";
import BlogNav from "./components/navbarblog";
import BlogCard from "./components/blogCard";
import { client } from "./env";

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
          <BlogCard
            key={idx}
            title={post.title}
            smallDescription={post.smallDescription}
            currentSlug={post.currentSlug}
            titleImage={post.titleImage}
            categories={post.category}
          />
        ))}
      </div>
      <Contact />
      <Footer />
    </>
  );
}
