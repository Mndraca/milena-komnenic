import { BlogPropsSecond } from "@/lib/interface";
import { client } from "@/lib/sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import BlogNav from "@/app/components/navbarblog";

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}']{
        "currentSlug": slug.current,
        title,
        content,
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

      <div className="flex justify-center mt-10">
        <Image
          src={urlFor(data.titleImage).url()}
          width={800}
          height={800}
          alt="Title Image"
          className="rounded-lg shadow-lg object-cover w-full max-w-4xl"
        />
      </div>
      <div className="mt-16 prose prose-blue  dark:prose-invert ml-16 text-lg text-justify">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
