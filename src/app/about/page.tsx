import {
  TypographyH1,
  TypographyH3,
  TypographyH4,
  TypographyLead,
} from "~/components/ui/typography";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-prose ">
      <TypographyH1 className="mb-4 text-2xl font-bold">
        About This Project
      </TypographyH1>
      <TypographyLead>Codedamn User Profile Creating Task</TypographyLead>
      <section className="my-4 ">
        <TypographyH3 className="mb-2">Technology Used</TypographyH3>
        <div className="flex flex-col flex-wrap gap-4">
          <TypographyH4>Nextjs </TypographyH4>
          <TypographyH4>React </TypographyH4>
          <TypographyH4>Prisma </TypographyH4>
          <TypographyH4>Tailwind CSS</TypographyH4>
          <TypographyH4>NextAuth</TypographyH4>
          <TypographyH4>Uploadthing</TypographyH4>
        </div>
      </section>
      <section className="mt-6">
        <TypographyH3 className="mb-4">API</TypographyH3>
        <div className="flex flex-col flex-wrap gap-4">
          <TypographyH4>Dicebear - for avatar image </TypographyH4>
          <TypographyH4>Google Authentication </TypographyH4>
        </div>
      </section>
      <section className="mt-6">
        <TypographyH3 className="mb-4"> Figma UI Design</TypographyH3>
        <iframe
          height="450"
          width="800"
          className="bg-muted"
          src="https://www.figma.com/embed?embed_host=astra&url=https://www.figma.com/file/TXLwYa51OaUfXRjO5AQvL0/Codedamn-Frontend-Assessment
       "
          allowFullScreen
        />
      </section>
    </main>
  );
}
