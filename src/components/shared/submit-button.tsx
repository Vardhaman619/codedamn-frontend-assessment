import Spinner from "~/components/icons/custom/spinner";
import { Button, type ButtonProps } from "~/components/ui/button";

export default function SubmitButton({
  isLoading,
  disabled,
  children,
  ...props
}: {
  isLoading: boolean;
} & ButtonProps) {
  return (
    <Button type="submit" className="gap-2" disabled={disabled} {...props}>
      {isLoading ? <Spinner /> : null}
      {children ?? "Save Changes"}
    </Button>
  );
}
