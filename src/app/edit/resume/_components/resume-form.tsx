"use client";

import { type User } from "@prisma/client";
import { useEffect, useReducer, useRef, useTransition } from "react";
import {
  type ResumeFormSchema,
  resumeFormSchema,
  techSkillArraySchema,
  interestArraySchema,
  languageArraySchema,
} from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "~/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import CloseIcon from "~/components/icons/custom/close";
import SubmitButton from "~/components/shared/submit-button";
import CancelButton from "~/components/shared/cancel-button";
import ResumeFormAction from "../action";

// Define action types
const SET_INTERESTS = "SET_INTERESTS";
const SET_TECH_SKILLS = "SET_TECH_SKILLS";
const SET_LANGUAGES = "SET_LANGUAGES";

// Define action interfaces
interface SetInterestsAction {
  type: typeof SET_INTERESTS;
  payload: string[];
}

interface SetTechSkillsAction {
  type: typeof SET_TECH_SKILLS;
  payload: string[];
}

interface SetLanguagesAction {
  type: typeof SET_LANGUAGES;
  payload: string[];
}

// Define the reducer
type Action = SetInterestsAction | SetTechSkillsAction | SetLanguagesAction;

interface State {
  interests: string[];
  techSkills: string[];
  languages: string[];
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_INTERESTS:
      return { ...state, interests: action.payload };
    case SET_TECH_SKILLS:
      return { ...state, techSkills: action.payload };
    case SET_LANGUAGES:
      return { ...state, languages: action.payload };
    default:
      return state;
  }
};

type ResumeFormProps = Pick<User, "techSkills" | "languages" | "interests">;

export default function ResumeForm({
  techSkills: defaultTechSkills,
  languages: defaultLanguages,
  interests: defaultInterests,
}: ResumeFormProps) {
  const [isPending, startTranstion] = useTransition();
  const form = useForm<ResumeFormSchema>({
    resolver: zodResolver(resumeFormSchema),
  });
  const [state, dispatch] = useReducer(reducer, {
    interests: defaultInterests,
    techSkills: defaultTechSkills,
    languages: defaultLanguages,
  });
  const { toast } = useToast();
  const { isDirty, isLoading, isSubmitting } = form.formState;
  const isFormDisable = isSubmitting || isPending;
  const techSkillsInputRef = useRef<HTMLInputElement>(null);
  const interestsInputRef = useRef<HTMLInputElement>(null);
  const languagesInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.techSkills.length) {
      form.setValue("techSkills", state.techSkills, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.techSkills]);
  useEffect(() => {
    if (state.interests.length) {
      form.setValue("interests", state.interests, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.interests]);
  useEffect(() => {
    if (state.languages.length > 1) {
      form.setValue("languages", state.languages, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.languages]);
  const addTechSkill = () => {
    console.log("addtechskill", techSkillsInputRef.current);
    if (!techSkillsInputRef.current) return;
    const currentTechSkill = techSkillsInputRef.current?.value;
    console.log(currentTechSkill);
    const result = techSkillArraySchema.safeParse([
      ...state.techSkills,
      currentTechSkill,
    ]);
    if (!result.success) {
      form.setError("techSkills", { message: result.error.issues[0]?.message });
      toast({
        title: result.error.issues[0]?.message,
        variant: "destructive",
      });
      return;
    }
    dispatch({
      type: "SET_TECH_SKILLS",
      payload: [...state.techSkills, currentTechSkill],
    });
    techSkillsInputRef.current.value = "";
  };
  function deleteTechSkill(currentTechSkill: string) {
    if (isPending) return;
    dispatch({
      type: "SET_TECH_SKILLS",
      payload: state.techSkills.filter(
        (eachTechSkill) => eachTechSkill !== currentTechSkill,
      ),
    });
  }

  const addInterest = () => {
    if (!interestsInputRef.current) return;
    const currentInterest = interestsInputRef.current.value ?? "";
    const result = interestArraySchema.safeParse([
      ...state.interests,
      currentInterest,
    ]);
    if (!result.success) {
      form.setError("interests", { message: result.error.issues[0]?.message });
      toast({
        title: result.error.issues[0]?.message,
        variant: "destructive",
      });
      return;
    }

    dispatch({
      type: "SET_INTERESTS",
      payload: [...state.interests, currentInterest],
    });
    interestsInputRef.current.value = "";
  };

  function deleteInterest(currentInterest: string) {
    if (isPending) return;
    dispatch({
      type: "SET_INTERESTS",
      payload: state.interests.filter(
        (eachInterest) => eachInterest !== currentInterest,
      ),
    });
  }
  const addLanguage = () => {
    if (!languagesInputRef.current) return;
    const currentLanguage = languagesInputRef.current.value ?? "";
    const result = languageArraySchema.safeParse([
      ...state.interests,
      currentLanguage,
    ]);
    if (!result.success) {
      console.log(result.error.issues[0]?.message);
      form.setError("languages", { message: result.error.issues[0]?.message });
      return toast({
        title: result.error.issues[0]?.message,
        variant: "destructive",
      });
    }

    dispatch({
      type: "SET_LANGUAGES",
      payload: [...state.languages, currentLanguage],
    });
    languagesInputRef.current.value = "";
  };

  function deleteLanguage(currentLanguage: string) {
    if (isPending) return;
    const updatedLangauges = state.languages.filter(
      (eachLanguage) => eachLanguage !== currentLanguage,
    );
    if (updatedLangauges.length <= 0) {
      toast({
        title: "Atleast one language need to be select",
        description: "minimum one language must be need",
        variant: "destructive",
      });
      return;
    }
    dispatch({ type: "SET_LANGUAGES", payload: updatedLangauges });
  }
  // const WorkExperiance = null;
  function handelFormSubmit(formdata: ResumeFormSchema) {
    startTranstion(async () => {
      const result = await ResumeFormAction(formdata);
      if (result.error) {
        if (result.errors) {
          for (const [field, errors] of Object.entries(result.errors)) {
            form.setError(field as keyof ResumeFormSchema, {
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

  return (
    <section>
      <Form {...form}>
        <form
          name="socials-form"
          className="mb-10 space-y-6"
          onSubmit={form.handleSubmit(handelFormSubmit)}
        >
          <section>
            <FormField
              control={form.control}
              name="techSkills"
              disabled={isFormDisable}
              render={() => {
                return (
                  <FormItem>
                    <FormLabel className="text-2xl font-semibold ">
                      Tech skills
                    </FormLabel>
                    <FormControl>
                      <Input
                        size={"large"}
                        placeholder="Enter the technologies you know. Ex. HTML5 , CSS3 , JavaScript"
                        ref={techSkillsInputRef}
                        disabled={isFormDisable}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                            e.preventDefault();
                            addTechSkill();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />

                    <div>
                      <Button
                        variant="outline"
                        onClick={addTechSkill}
                        type="button"
                      >
                        Add Technology
                      </Button>
                    </div>
                  </FormItem>
                );
              }}
            />
            {state.techSkills.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-2">
                {state.techSkills.map((techskill, index) => (
                  <Badge size={"large"} className="capitalize" key={index}>
                    {techskill}
                    <CloseIcon
                      aria-label={`delete ${techskill}`}
                      className="w-4 cursor-pointer "
                      onClick={() => deleteTechSkill(techskill)}
                    />
                  </Badge>
                ))}
              </ul>
            )}
          </section>

          <section>
            <FormField
              control={form.control}
              name="interests"
              disabled={isFormDisable}
              render={() => {
                return (
                  <FormItem>
                    <FormLabel className="text-2xl font-semibold ">
                      Interest
                    </FormLabel>
                    <FormControl>
                      <Input
                        size={"large"}
                        placeholder="Enter the interests you know. Ex. Hiking , Economics , Semantics"
                        ref={interestsInputRef}
                        disabled={isFormDisable}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                            e.preventDefault();
                            addInterest();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />

                    <div>
                      <Button
                        variant="outline"
                        onClick={addTechSkill}
                        type="button"
                      >
                        Add Interest
                      </Button>
                    </div>
                  </FormItem>
                );
              }}
            />
            {state.interests?.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-2">
                {state.interests.map((interest, index) => (
                  <Badge size={"large"} className="capitalize" key={index}>
                    {interest}
                    <CloseIcon
                      aria-label={`delete ${interest}`}
                      className="w-4 cursor-pointer "
                      onClick={() => deleteInterest(interest)}
                    />
                  </Badge>
                ))}
              </ul>
            ) : null}
          </section>
          <section>
            <FormField
              control={form.control}
              name="languages"
              disabled={isFormDisable}
              render={() => {
                return (
                  <FormItem>
                    <FormLabel className="text-2xl font-semibold ">
                      Languages
                    </FormLabel>
                    <FormControl>
                      <Input
                        size={"large"}
                        placeholder="Enter languages you know. Ex. English , Hindi..."
                        ref={languagesInputRef}
                        disabled={isFormDisable}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                            e.preventDefault();
                            addLanguage();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />

                    <div>
                      <Button
                        variant="outline"
                        onClick={addLanguage}
                        type="button"
                      >
                        Add Language
                      </Button>
                    </div>
                  </FormItem>
                );
              }}
            />

            {state.languages?.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-2">
                {state.languages.map((language, index) => (
                  <Badge size={"large"} className="capitalize" key={index}>
                    {language}

                    <CloseIcon
                      aria-label={`delete ${language}`}
                      className="w-4 cursor-pointer "
                      onClick={() => deleteLanguage(language)}
                    />
                  </Badge>
                ))}
              </ul>
            ) : null}
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
    </section>
  );
}

// function checkIfItemExists(array: string[], item: string) {
//   const alreadyExists = array.findIndex(
//     (element) => element.toLowerCase() === item.toLowerCase(),
//   );
//   return alreadyExists >= 0 ? true : false;
// }
