import { BlogPropsSecond } from "@/app/interface";
import { client } from "@/app/env";
import Image from "next/image";
import { urlFor } from "@/app/env";
import { PortableText } from "next-sanity";
import BlogNav from "@/app/components/navbarblog";

async function getData(slug: string) {
  const query = `
  *[_type == "blog" && slug.current == '${slug}']{
    "currentSlug": slug.current,
    title,
    content,
    category[] -> {
      title,
    },
    titleImage
  }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: BlogPropsSecond = await getData(params.slug);

  return (
    <div
      id="blog"
      className="bg-white dark:bg-gray-900 px-6 py-12 md:px-12 lg:px-32"
    >
      <BlogNav />
      <h1 className="my-8">
        <span className="block text-base text-center text-green-700 font-semibold tracking-wide uppercase">
          Milena Komnenic - Blogs
        </span>
        <span className="mt-2 block text-3xl md:text-4xl lg:text-5xl text-center leading-8 font-bold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </span>
      </h1>

      <div className="flex justify-center mt-12 ">
        <Image
          src={urlFor(data.titleImage).url()}
          width={600}
          height={600}
          alt="Title Image"
          className="rounded-lg shadow-lg object-cover w-full max-w-4xl"
        />
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Category:
        </h2>
        <ul className="flex justify-center space-x-4 mt-2">
          {data.category.map((cat: { title: string }) => (
            <li
              key={cat.title}
              className="bg-green-200 rounded-full px-4 py-1 text-sm text-green-700"
            >
              {cat.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 prose prose-blue dark:prose-invert ml-24 text-xl text-justify">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
