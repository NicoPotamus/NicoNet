import React from "react";

interface DButtonProps {
  children: React.ReactNode;
  href: string;
  dfileName: string;
}

const DButton: React.FC<DButtonProps> = ({ children, href, dfileName }) => {
  return (
    <>
      <a
        href="./NicoResume"
        download={dfileName}
        target="_blank"
        rel="noreferrer"
      >
        <button
          className="
        w-full h-[48px] 
        flex items-center justify-center 
        gap-4 
        text-white text-lg font-extrabold tracking-[2px] 
        bg-[#644dff] border-2 border-[#4836bb] rounded-lg 
        shadow-[0_8px_0_#4836bb] skew-x-[-10deg] 
        drop-shadow-[0_15px_20px_rgba(101,77,255,0.39)] 
        transition-all duration-100 ease-in 
        active:tracking-normal active:translate-y-2 
        active:shadow-none 
        whitespace-nowrap"
          data-file={href}
        >
          <span className="px-2 whitespace-nowrap flex items-center">
            {children}
          </span>
        </button>
      </a>
    </>
  );
};

export default DButton;
