import { Joke } from "@prisma/client";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke | null };
export let loader: LoaderFunction = async ({ params }) => {
  const { jokeId } = params;
  const data: LoaderData = {
    joke: await db.joke.findUnique({
      where: { id: jokeId },
    }),
  };
  return data;
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke?.content}</p>
      <Link to=".">{data.joke?.name} Permalink</Link>
    </div>
  );
}
