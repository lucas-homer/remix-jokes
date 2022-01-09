import type { Joke } from "@prisma/client";
import type { LoaderFunction } from "remix";
import { Link, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke | null };
export let loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });
  return { joke: randomJoke } as LoaderData;
};

export default function JokesIndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{data.joke?.content}</p>
      <Link to={data.joke?.id ?? "."}>{data.joke?.name} Permalink</Link>
    </div>
  );
}
