import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const ThemeLink = ({ linkUrl, text }: any) => {
  return (
    <>
      <Link
        target="_blank"
        className="hover:underline flex items-center gap-1 "
        href={linkUrl}
      >
        {text}
        <MdArrowOutward />
      </Link>
    </>
  );
};

export default ThemeLink;
