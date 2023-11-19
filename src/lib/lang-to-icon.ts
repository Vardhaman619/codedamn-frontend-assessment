import { type Languages } from "@prisma/client";
import HtmlIcon from "~/components/icons/programming/html";
import JavascriptIcon from "~/components/icons/programming/javascript";
import JavaIcon from "~/components/icons/programming/java";
import NodejsIcon from "~/components/icons/programming/nodejs";
import PythonIcon from "~/components/icons/programming/python";
import NextjsIcon from "~/components/icons/programming/nextjs";
import ReactIcon from "~/components/icons/programming/react";
import { type IconProps } from "~/components/icons/types";
import MongoDbIcon from "~/components/icons/programming/mongodb";
import TailwindcssIcon from "~/components/icons/programming/tailwindcss";
import TypescriptIcon from "~/components/icons/programming/typescript";

const LanguagesToIcon: {
  [key in Languages]: (prosp: IconProps) => JSX.Element;
} = {
  HTML: HtmlIcon,
  JAVASCRIPT: JavascriptIcon,
  JAVA: JavaIcon,
  NODEJS: NodejsIcon,
  PYTHON: PythonIcon,
  NEXTJS: NextjsIcon,
  REACT: ReactIcon,
  MONGODB: MongoDbIcon,
  TAILWINDCSS: TailwindcssIcon,
  TYPESCRIPT: TypescriptIcon,
};
export default function langToIcon(language: Languages) {
  return LanguagesToIcon[language] ?? null;
}
