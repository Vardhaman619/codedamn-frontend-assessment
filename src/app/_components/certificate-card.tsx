import type { Certificate } from "@prisma/client";
import format from "date-fns/format";
import { z } from "zod";
import CertificationIllustration from "~/components/illustrations/certification";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
type CertificateCardProps = Omit<Certificate, "imageKey" | "userId">;
const urlSchema = z.string().url();

export default function CertificateCard({
  image,
  title,
  issuedOn,
  credentialLink,
}: CertificateCardProps) {
  const parsedImage = urlSchema.safeParse(image);
  const parsedCredentialLink = urlSchema.safeParse(credentialLink);
  const formatedIssuedDate = format(issuedOn, "MMM Mo , yyyy");
  return (
    <Card className="p-5" variant={"secondary"}>
      <CardContent className="flex flex-col items-start p-0">
        {parsedImage.success ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={parsedImage.data} alt={`${title} - ${image}`} />
        ) : (
          <div className="grid aspect-video w-full place-items-center bg-muted">
            <CertificationIllustration className="w-32 text-primary" />
          </div>
        )}

        <CardTitle className="mb-1 mt-6">
          Advanced theoretical Javascript
        </CardTitle>
        <CardDescription className="mb-3">
          Issued on {formatedIssuedDate}
        </CardDescription>
        {parsedCredentialLink.success ? (
          <Button size={"sm"} variant={"link"} className="p-0" asChild>
            <a href={parsedCredentialLink.data}>See credentials</a>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
