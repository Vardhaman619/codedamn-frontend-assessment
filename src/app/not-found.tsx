import Link from "next/link";
import NotFoundIllustation from "~/components/illustrations/not-found";
import { Button } from "~/components/ui/button";
import { TypographyH2, TypographyLarge } from "~/components/ui/typography";

export default function NotFound() {
  return (
    <div className="my-36 grid h-full w-full place-items-center text-center">
      <NotFoundIllustation className="w-full" />
      <TypographyH2 className="mt-5">Not Found</TypographyH2>
      <TypographyLarge>The Page You Want Not Exists</TypographyLarge>
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        <Button variant={"link"} asChild>
          <Link href="/">Go To Home Page</Link>
        </Button>
        <Button variant={"link"} asChild>
          <Link href="/about">Go To About Page</Link>
        </Button>
      </div>
    </div>
  );
}
