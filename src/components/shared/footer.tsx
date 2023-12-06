import Link from "next/link";
import LinkedinIcon from "../icons/socials/linkedin";
import GithubIcon from "../icons/socials/github";
import { buttonVariants } from "../ui/button";
import { cn } from "~/lib/utils";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col flex-wrap items-center justify-between space-y-3 py-5 md:h-16 md:flex-row md:py-0">
        <div className="text-center text-sm leading-loose text-muted-foreground">
          Created by{"  "}
          <Link
            aria-label="Vardhaman's github profile"
            href="https://github.com/vardhaman619"
            target="_blank"
            className="font-medium text-foreground underline"
          >
            Vardhaman Bhandari
          </Link>
          .
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "items-center gap-2",
              }),
            )}
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vardhaman-bhandari/"
            target="_blank"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "items-center gap-2",
              }),
            )}
          >
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
            Linkedin
          </a>
        </div>
      </div>
    </footer>
  );
}
