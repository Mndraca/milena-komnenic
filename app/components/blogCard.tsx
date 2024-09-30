import { FC } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/env";

interface BlogCardProps {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: string;
  categories: { title: string }[];
}

const BlogCard: FC<BlogCardProps> = ({
  title,
  smallDescription,
  currentSlug,
  titleImage,
  categories,
}) => {
  return (
    <Card>
      <Image
        src={urlFor(titleImage).url()}
        alt={title || "Image description"}
        width={500}
        height={500}
        className="rounded-t-lg h-[200px] object-cover"
      />
      <div className="mt-4 text-center">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Category:
        </h2>
        <ul className="flex justify-center space-x-4 mt-2">
          {categories.map((cat) => (
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
        <h3 className="text-lg line-clamp-2">{title}</h3>
        <p className="line-clamp-3 text-sm mt-2 text-pink-500">
          {smallDescription}
        </p>
        <Button asChild className="w-full mt-7">
          <Link href={`/blog/${currentSlug}`}>Read more</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
