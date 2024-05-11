"use client";

export const Footer = () => {
  const handleSupportClick = () => {
    window.location.href = "mailto:ajuda.alagamentos.rs@gmail.com";
  };

  return (
    <div className="hidden md:block fixed text-sm justify-between text-gray-400 opacity-80 bottom-2 w-[95%]">
      <div className="flex w-full justify-end">
        <button
          onClick={handleSupportClick}
          className="underline underline-offset-2 hover:text-slate-600 transition-all"
        >
          Suporte
        </button>
      </div>
    </div>
  );
};
