import type { Certificate } from "@prisma/client";
import format from "date-fns/format";
import { z } from "zod";
import CertificationIllustration from "~/components/illustrations/certification";
import CertificateDeleteDialog from "~/components/shared/certificate/certificate-delete-dialog";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
type CertificateCardProps = Omit<Certificate, "imageKey" | "userId">;
const urlSchema = z.string().url();

export default function CertificateCard({
  image,
  title,
  issuedOn,
  credentialLink,
  id,
}: CertificateCardProps) {
  const parsedImage = urlSchema.safeParse(image);
  const parsedCredentialLink = urlSchema.safeParse(credentialLink);
  const formatedIssuedDate = format(issuedOn, "MMM Mo , yyyy");
  return (
    <Card className="max-w-sm p-5 md:max-w-xl" variant={"secondary"}>
      <CardContent className="flex flex-col items-start p-0">
        {parsedImage.success ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={parsedImage.data}
            alt={`${title} - image`}
            className="aspect-video w-full object-cover object-center "
          />
        ) : (
          <div className="grid aspect-video w-full  place-items-center bg-muted object-cover object-center">
            <CertificationIllustration className="w-32 text-primary" />
          </div>
        )}

        <CardTitle className="mb-1 mt-6">
          Advanced theoretical Javascript
        </CardTitle>
        <CardDescription className="mb-3">
          Issued on {formatedIssuedDate}
        </CardDescription>
        <CardFooter className="w-full justify-between p-0">
          {parsedCredentialLink.success ? (
            <Button size={"sm"} variant={"link"} className="px-0" asChild>
              <a href={parsedCredentialLink.data}>See credentials</a>
            </Button>
          ) : null}
          <CertificateDeleteDialog id={id} />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
