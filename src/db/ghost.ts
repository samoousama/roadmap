export type Tag = {
  id: string;
  name: string;
  slug: string;
  visibility: string;
  url: string;
};

export type Post = {
  title: string;
  slug: string;
  feature_image?: string;
  feature_image_alt?: string;
  featured: boolean;
  published_at: string;
  tags?: Tag[];
  primary_tag?: Tag;
  url: string;
  excerpt: string;
};

const fields =
  "title,slug,feature_image,featured,published_at,primary_tag,url,excerpt,reading_time";

export async function getPosts(): Promise<Post[]> {
  const ghostUrl = `${process.env.GHOST_URL}/ghost/api/content/posts/?key=${process.env.GHOST_KEY}`;

  return fetch(
    `${ghostUrl}&include=tags&limit=3&order=published_at%20desc&filter=visibility:public&fields=${fields}`,
    {
      headers: {
        "Accept-Version": "v5.0",
        "Content-Type": "application/json",
      },
    },
  )
    .then((res) => res.json())
    .then((d) => {
      return d.posts;
    })
    .catch((e) => {
      console.error(e);
      return [];
    });

  // const api = new GhostContentAPI({
  //   url: process.env.GHOST_URL as string,
  //   key: process.env.GHOST_KEY as string,
  //   version: "v5.0",
  // });
  // return api.posts.browse({
  //   limit: 3,
  //   include: ["tags"],
  //   order: "published_at DESC",
  //   filter: "visibility:public",
  //   fields,
  // });
}
