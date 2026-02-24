import { Avatar, Button } from "@heroui/react";
import { Camera } from "lucide-react";
import { useRef, useMemo, ChangeEvent } from "react";

import { getAvatarByName } from "@/utils/helpers/global";

interface Props {
  file: File | string | null; // Mendukung File (objek) atau string (URL preview/API)
  setFile: (val: File) => void;
}

export default function UploadAvatar({ file, setFile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewSrc = useMemo(() => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }

    return file || getAvatarByName("");
  }, [file]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="relative inline-block">
      <Avatar className="w-32 h-32 text-large shadow-lg" src={previewSrc} />

      {/* Input File Tersembunyi */}
      <input
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />

      <Button
        isIconOnly
        className="absolute bottom-1 right-1 bg-danger text-white border-2 border-white"
        radius="full"
        size="sm"
        onClick={handleButtonClick}
      >
        <Camera size={16} />
      </Button>
    </div>
  );
}
