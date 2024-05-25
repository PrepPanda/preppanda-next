import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const PandaLink = ({ children, linkUrl, target = "_blank" }: any) => {
  return (
    <>
      <Link
        target={target}
        className="hover:underline font-other flex items-center gap-1 font-black mobile:text-lg z-[100]"
        href={linkUrl}
      >
        {children}
        <MdArrowOutward />
      </Link>
    </>
  );
};

export default PandaLink;
