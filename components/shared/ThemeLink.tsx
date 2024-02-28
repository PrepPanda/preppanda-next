import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const ThemeLink = ({ linkUrl, text }: any) => {
  return (
    <>
      <Link
        className="hover:underline font-other flex items-center gap-1 font-black mobile:text-lg z-[100]"
        href={linkUrl}
      >
        {text}
        <MdArrowOutward />
      </Link>
    </>
  );
};

export default ThemeLink;
