import { useTransition } from "react";
import { Button } from "~/components/ui/button";
import MoreHorizontal from "~/components/icons/custom/more-horizontal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { TrashIcon } from "@radix-ui/react-icons";
// import { DeleteProjectAction } from "../action";
import Spinner from "~/components/icons/custom/spinner";
import { ProjectDeleteAction } from "../action";

export default function ProjectDeleteDialog({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handelClick() {
    startTransition(async () => {
      await ProjectDeleteAction(id);
    });
  }
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isPending}>
          <Button variant="ghost">
            {isPending ? <Spinner /> : <MoreHorizontal />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            {/* <TrashIcon className="w-5" />
          <span>Delete Project</span> */}
            <AlertDialogTrigger
              className="flex items-center gap-4 "
              disabled={isPending}
            >
              {isPending ? (
                <Spinner className="w-4" />
              ) : (
                <TrashIcon className="w-4 text-inherit" />
              )}
              Delete Project
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handelClick} type="submit">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
