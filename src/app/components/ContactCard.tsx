import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faBuilding,
  faHelmetSafety,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  generalInfo: string;
  contactInfo: string;
}

const ContactCard = ({ title, generalInfo, contactInfo }: ContactCardProps) => {
  return (
    <div className="bg-[#F3F3F3] border border-[#E0E0E0] opacity-95 rounded-lg p-6 shadow-md max-w-md mx-auto text-center">
      <div className="flex items-center justify-center text-4xl mb-4">
        {title === "OFYS Management" ? (
          <FontAwesomeIcon icon={faListCheck} className="text-[#85277F]" />
        ) : title === "OFYS Realty" ? (
          <FontAwesomeIcon icon={faBuilding} className="text-[#85277F]" />
        ) : (
          <FontAwesomeIcon icon={faHelmetSafety} className="text-[#85277F]" />
        )}
      </div>

      <h2 className="text-[#1A1A1A] text-2xl font-semibold">{title}</h2>
      <p className="text-[#999]">{generalInfo}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-[#85277F] text-2xl"
          />
        </div>
        <span className="text-[#85277F] ml-3 font-bold">{contactInfo}</span>
      </div>
    </div>
  );
};

export default ContactCard;
