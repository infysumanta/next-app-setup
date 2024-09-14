"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  { code: "en", name: "English", flag: "🇺🇸", language: "English" },
  { code: "fr", name: "French", flag: "🇫🇷", language: "French" },
];
export default function LanguageToggle() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  return (
    <div>
      <Select
        value={selectedLanguage}
        onValueChange={async (value) => {
          setSelectedLanguage(value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.flag} {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
