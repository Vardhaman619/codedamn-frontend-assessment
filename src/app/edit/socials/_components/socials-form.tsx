"use client";
import { useForm } from "react-hook-form";
import { memo, useEffect, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";
import { type SocialsFormSchema, socialsFormSchema } from "./schema";
import { Input } from "~/components/ui/input";
import SubmitButton from "~/components/shared/submit-button";
import CancelButton from "~/components/shared/cancel-button";
import socialsFormAction from "../action";

type SocialsFormProps = {
  githubProfile: string;
  behanceProfile: string;
  dribbleProfile: string;
  facebookProfile: string;
  linkedinProfile: string;
  instagramProfile: string;
  youtubeProfile: string;
};
function SocialsForm({
  githubProfile,
  behanceProfile,
  dribbleProfile,
  facebookProfile,
  instagramProfile,
  linkedinProfile,
  youtubeProfile,
}: SocialsFormProps) {
  const [isPending, startTranstion] = useTransition();
  const { toast } = useToast();

  const form = useForm<SocialsFormSchema>({
    resolver: zodResolver(socialsFormSchema),
    defaultValues: {
      githubProfile: githubProfile,
      behanceProfile: behanceProfile,
      dribbleProfile: dribbleProfile,
      facebookProfile: facebookProfile,
      instagramProfile: instagramProfile,
      linkedinProfile: linkedinProfile,
      youtubeProfile: youtubeProfile,
    },
  });
  function handelFormSubmit(formdata: SocialsFormSchema) {
    startTranstion(async () => {
      const result = await socialsFormAction(formdata);
      if (result.error) {
        if (result.errors) {
          for (const [field, errors] of Object.entries(result.errors)) {
            form.setError(field as keyof SocialsFormSchema, {
              message: errors[0],
            });
          }
          toast({
            title: result.message,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: result.message,
          variant: "destructive",
        });
        return;
      }
      if (result.success) {
        toast({
          title: result.message,
          variant: "default",
        });
      }
    });
  }
  const { isDirty, isSubmitting } = form.formState;
  const isFormDisable = isSubmitting || isPending;
  useEffect(() => {
    form.reset();
  }, [form]);
  return (
    <Form {...form}>
      <form
        name="socials-form"
        className="max-w-screen-md space-y-6"
        onSubmit={form.handleSubmit(handelFormSubmit)}
      >
        <FormField
          control={form.control}
          name="githubProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Github </FormLabel>
              <FormControl>
                <Input
                  placeholder="Github profile URL"
                  type="text"
                  size={"large"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Linkedin </FormLabel>
              <FormControl>
                <Input
                  placeholder="Linkedin profile URL"
                  type="text"
                  size={"large"}
                  disabled={isFormDisable}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebookProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Facebook </FormLabel>
              <FormControl>
                <Input
                  placeholder="Facebook profile URL"
                  type="text"
                  size={"large"}
                  disabled={isFormDisable}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagramProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Instagram </FormLabel>
              <FormControl>
                <Input
                  placeholder="Instagram profile URL"
                  type="text"
                  size={"large"}
                  disabled={isFormDisable}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youtubeProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Youtube </FormLabel>
              <FormControl>
                <Input
                  placeholder="Youtube channel URL"
                  type="text"
                  size={"large"}
                  disabled={isFormDisable}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dribbleProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Dribble </FormLabel>
              <FormControl>
                <Input
                  placeholder="Dribble profile URL"
                  type="text"
                  size={"large"}
                  disabled={isFormDisable}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="behanceProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Behance</FormLabel>
              <FormControl>
                <Input
                  placeholder="Behance profile URL"
                  type="text"
                  size={"large"}
                  disabled={isFormDisable}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex flex-row-reverse gap-3">
          <SubmitButton
            isLoading={isPending}
            disabled={isFormDisable || !isDirty}
          />
          <CancelButton />
        </section>
      </form>
    </Form>
  );
}

export default memo(SocialsForm);
