"use client";

import type { Gender } from "@prisma/client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { memo, useEffect, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Card } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { useToast } from "~/components/ui/use-toast";
import { type ProfileFormSchema, profileFormSchema } from "./schema";
import SubmitButton from "~/components/shared/submit-button";
import CancelButton from "~/components/shared/cancel-button";
import { Button, buttonVariants } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import profileFormAction from "../action";
import UserIcon from "~/components/icons/custom/user";

type ProfileFormProps = {
  about: string;
  name: string;
  image: string;
  showXP: boolean;
  showAchievementBadges: boolean;
  showFollowersFollowing: boolean;
  profession: string;
  dob: string;
  gender: Gender;
};
function ProfileForm({
  name,
  about,
  dob,
  image,
  showXP,
  showAchievementBadges,
  showFollowersFollowing,
  profession,
  gender,
}: ProfileFormProps) {
  const [isPending, startTranstion] = useTransition();
  const { toast } = useToast();
  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      image: image as unknown as FileWithPreview,
      name,
      about,
      showXP,
      showAchievementBadges,
      showFollowersFollowing,
      profession,
      gender: gender,
      dob: dob as unknown as Date,
    },
  });

  const { isDirty, isSubmitting, dirtyFields } = form.formState;
  const isFormDisable = isSubmitting || isPending;

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handelFormSubmit(formdata: ProfileFormSchema) {
    startTranstion(async () => {
      const data = new FormData();
      for (const key in formdata) {
        data.append(key, formdata[key as keyof ProfileFormSchema] as string);
      }
      const result = await profileFormAction(data);
      if (result.error) {
        if (result.errors) {
          for (const [field, errors] of Object.entries(result.errors)) {
            form.setError(field as keyof ProfileFormSchema, {
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
  function deleteImage() {
    form.setValue("image", null);
  }

  return (
    <Form {...form}>
      <form
        name="profile-form"
        onSubmit={form.handleSubmit(handelFormSubmit)}
        className="mb-10 max-w-screen-md space-y-10"
      >
        <section className="flex flex-row items-center gap-6">
          <FormField
            control={form.control}
            name="image"
            disabled={isFormDisable}
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem className="flex items-center justify-start gap-6">
                <Avatar role="button" variant={"large"}>
                  <AvatarImage
                    src={
                      typeof value == "string"
                        ? value ?? undefined
                        : value?.preview
                    }
                  />
                  <AvatarFallback>
                    <UserIcon className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <FormControl>
                  <div className="space-x-3">
                    <label
                      className={buttonVariants({
                        variant: "default",
                        className: {
                          "cursor-pointer": !field.disabled,
                          "cursor-not-allowed": !field.disabled,
                        },
                      })}
                      aria-disabled={true}
                    >
                      <input
                        type="file"
                        {...field}
                        onChange={(e) => {
                          if (e.target.files?.length && e.target.files[0]) {
                            console.log(e.target.files[0]);
                            onChange(
                              Object.assign(e.target.files[0], {
                                preview: URL.createObjectURL(e.target.files[0]),
                              }),
                            );
                          }
                        }}
                        multiple={false}
                        accept="image/*"
                        className="hidden"
                        disabled={field.disabled}
                      />
                      Custom Upload
                    </label>
                    <Button
                      onClick={deleteImage}
                      variant={"secondary"}
                      className="disabled:cursor-not-allowed"
                      disabled={!Boolean(dirtyFields?.image) || field.disabled}
                    >
                      Delete
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div className="relative">
            <Avatar role="button" variant={"large"}>
              <AvatarImage src={image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex gap-3">
            <Button size={"lg"}>Upload new picture</Button>
            <Button size={"lg"} variant={"secondary"}>
              Delete
            </Button>
          </div> */}
        </section>

        <section className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            disabled={isFormDisable}
            render={({ field }) => (
              <FormItem>
                <FormLabel> Display Name </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jhon Doe"
                    type="text"
                    size={"large"}
                    {...field}
                    disabled={isFormDisable}
                  />
                </FormControl>
                <FormDescription>
                  Name entered above will be used for all issued certificates
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            disabled={isFormDisable}
            render={({ field }) => (
              <FormItem>
                <FormLabel> About </FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="I am passionate about learning new things on web/programming"
                    className="resize-none"
                    {...field}
                    disabled={isFormDisable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profession"
            disabled={isFormDisable}
            render={({ field }) => (
              <FormItem>
                <FormLabel> Profession </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Software Developer"
                    autoComplete="profession"
                    {...field}
                    disabled={isFormDisable}
                    size={"large"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            disabled={isFormDisable}
            render={({ field }) => (
              <FormItem>
                <FormLabel> Date of birth </FormLabel>
                <FormControl>
                  {/* @ts-expect-error input type is date so input value must be string and field.value is typeof Date*/}
                  <Input
                    disabled={isFormDisable}
                    type="date"
                    placeholder="DD / MM / YYYY"
                    min="1987-01-01"
                    max="2019-01-01"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            disabled={isFormDisable}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isFormDisable}
                >
                  <FormControl>
                    <SelectTrigger size={"large"}>
                      <SelectValue
                        placeholder="What is your gender"
                        className="text-muted-foreground"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="TRANSGENDER">Transgender</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <section>
          <div>
            <h4 role="heading" className="text-xl font-semibold tracking-tight">
              Section Visibility
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Select which sections and content should show on your profile
              page.
            </p>
          </div>
          <Card className="mt-6  rounded-2xl" variant={"secondary"}>
            <ul className="space-y-4 p-6">
              <li className="flex items-center">
                <FormField
                  control={form.control}
                  name="showFollowersFollowing"
                  disabled={isFormDisable}
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Followers and following</FormLabel>
                        <FormDescription>
                          Shows your followers and the users you follow on
                          codedamn
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isFormDisable}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </li>
              <li className="flex items-center">
                <FormField
                  control={form.control}
                  name="showXP"
                  disabled={isFormDisable}
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>XP</FormLabel>
                        <FormDescription>
                          Shows the XP you have earned
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isFormDisable}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </li>
              <li className="flex items-center">
                <FormField
                  control={form.control}
                  name="showAchievementBadges"
                  disabled={isFormDisable}
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Achievement badges</FormLabel>
                        <FormDescription>
                          Shows your relative percentile and proficiency
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isFormDisable}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </li>
            </ul>
          </Card>
        </section>
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

export default memo(ProfileForm);
