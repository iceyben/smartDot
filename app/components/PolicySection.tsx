import React from "react";

interface PolicySectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const PolicySection = ({ icon, title, description }: PolicySectionProps) => {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-4xl text-red-600">{icon}</span>
      <span className="flex flex-col">
        <h2 className="font-bold">{title}</h2>
        <p className="text-sm">{description}</p>
      </span>
    </div>
  );
};

export default PolicySection;
