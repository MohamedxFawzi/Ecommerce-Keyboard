import { ReactNode } from "react";

type BoundedProps = {
  as?: "section" | "footer";
  fullWidth?: boolean;
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
};
export default BoundedProps;