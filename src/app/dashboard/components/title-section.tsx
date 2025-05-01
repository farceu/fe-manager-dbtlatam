import React from "react";

interface TitleSectionProps {
  title?: string;
  description?: string;
  icon: React.ReactNode;
  subDescription?: string;
}

const TitleSection = ({ title, description, icon, subDescription }: TitleSectionProps) => {
  return (
    <div className="border border-[#0A78F3] rounded-2xl p-2 px-5 flex items-center bg-white mb-5">
      {/* Sección izquierda: ícono y texto pequeño */}
      <div className="flex items-center justify-center max-w-40 gap-2">
        <div className="bg-primary rounded-xl p-3 flex items-center justify-center text-white">
          {icon}
        </div>
        {subDescription && (
          <span className="text-base font-bold text-primary text-left leading-tight">
            {subDescription}
          </span>
        )}
      </div>
      {/* Línea divisoria vertical */}
      <div className="h-16 border-l border-[#0A8BF3] mx-6" />
      {/* Sección derecha: título y descripción */}
      <div className="flex flex-col justify-center">
        {title && <h2 className="text-2xl font-black text-gray-800 leading-tight">{title}</h2>}
        {description && <p className="text-base text-gray-500">{description}</p>}
      </div>
    </div>
  );
};

export default TitleSection;
