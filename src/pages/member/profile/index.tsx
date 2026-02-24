import { Tabs, Tab } from "@heroui/react";
import { User, Lock } from "lucide-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import PersonalForm from "./personal-form";
import ChangePassword from "./change-password";

import { useAppSelector } from "@/stores/hooks";
import UploadAvatar from "@/components/upload-avatar";
import { uploadFile } from "@/utils/helpers/upload-file";
import { notify, notifyError } from "@/utils/helpers/notify";
import { http } from "@/utils/libs/axios";

export default function MemberProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [file, setFile] = useState<any>();

  useEffect(() => {
    if (user?.profile) {
      setFile(user.profile?.photo_url);
    }
  }, [user]);

  async function updatePhotoProfile(file: File) {
    try {
      const photo = await uploadFile(file);

      const { data } = await http.patch(`/user/photo-profile`, { photo });

      notify(data.message);
    } catch (error) {
      notifyError(error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header Profile */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl border-1 border-divider shadow-sm">
        <div className="relative">
          <UploadAvatar
            file={file}
            setFile={(file) => {
              setFile(file);
              updatePhotoProfile(file);
            }}
          />
        </div>
        <div className="text-center md:text-left space-y-1">
          <h1 className="text-2xl font-black text-[#0B1C39]">{user?.name}</h1>
          <p className="text-default-500 font-medium">
            Member • Sejak {dayjs(user?.created_at).format("MMM YYYY")}
          </p>
          <div className="flex gap-2 mt-2 justify-center md:justify-start">
            <div className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-bold">
              Verified
            </div>
            {/* <div className="px-3 py-1 bg-danger/10 text-danger rounded-full text-xs font-bold">
              450 Poin
            </div> */}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs
        aria-label="Profile Options"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-danger",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-danger font-bold",
        }}
        color="danger"
        variant="underlined"
      >
        {/* TAB 1: DATA DIRI */}
        <Tab
          key="personal-info"
          title={
            <div className="flex items-center space-x-2">
              <User size={18} />
              <span>Data Diri</span>
            </div>
          }
        >
          <PersonalForm />
        </Tab>

        {/* TAB 2: GANTI PASSWORD */}
        <Tab
          key="security"
          title={
            <div className="flex items-center space-x-2">
              <Lock size={18} />
              <span>Keamanan</span>
            </div>
          }
        >
          <ChangePassword />
        </Tab>
      </Tabs>
    </div>
  );
}
