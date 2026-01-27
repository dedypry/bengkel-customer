import {
  Card,
  CardBody,
  Button,
  Input,
  Avatar,
  Tabs,
  Tab,
  Divider,
} from "@heroui/react";
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  ShieldCheck,
} from "lucide-react";

export default function MemberProfilePage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header Profile */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl border-1 border-divider shadow-sm">
        <div className="relative">
          <Avatar
            className="w-32 h-32 text-large shadow-lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          <Button
            isIconOnly
            className="absolute bottom-1 right-1 bg-danger text-white border-2 border-white"
            radius="full"
            size="sm"
          >
            <Camera size={16} />
          </Button>
        </div>
        <div className="text-center md:text-left space-y-1">
          <h1 className="text-2xl font-black text-[#0B1C39]">Dedy Pry</h1>
          <p className="text-default-500 font-medium">
            Member Platinum • Sejak Jan 2024
          </p>
          <div className="flex gap-2 mt-2 justify-center md:justify-start">
            <div className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-bold">
              Verified
            </div>
            <div className="px-3 py-1 bg-danger/10 text-danger rounded-full text-xs font-bold">
              450 Poin
            </div>
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
          <Card className="mt-4 border-1 border-divider shadow-none">
            <CardBody className="p-8">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  defaultValue="Dedy Pry"
                  label="Nama Lengkap"
                  labelPlacement="outside"
                  placeholder="Masukkan nama lengkap"
                  startContent={<User className="text-default-400" size={18} />}
                  variant="bordered"
                />
                <Input
                  defaultValue="dedypry@gmail.com"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="email@contoh.com"
                  startContent={<Mail className="text-default-400" size={18} />}
                  variant="bordered"
                />
                <Input
                  defaultValue="081234567890"
                  label="Nomor Telepon"
                  labelPlacement="outside"
                  placeholder="0812..."
                  startContent={
                    <Phone className="text-default-400" size={18} />
                  }
                  variant="bordered"
                />
                <Input
                  defaultValue="Bekasi Regency, West Java"
                  label="Alamat"
                  labelPlacement="outside"
                  placeholder="Masukkan alamat"
                  startContent={
                    <MapPin className="text-default-400" size={18} />
                  }
                  variant="bordered"
                />
                <div className="md:col-span-2 flex justify-end mt-4">
                  <Button
                    className="font-bold px-8"
                    color="danger"
                    startContent={<Save size={18} />}
                  >
                    Simpan Perubahan
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
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
          <Card className="mt-4 border-1 border-divider shadow-none">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-warning/10 text-warning rounded-lg">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B1C39]">Ganti Password</h4>
                  <p className="text-xs text-default-500">
                    Pastikan password baru Anda kuat dan unik.
                  </p>
                </div>
              </div>

              <form className="flex flex-col gap-6 max-w-md">
                <Input
                  label="Password Saat Ini"
                  labelPlacement="outside"
                  placeholder="••••••••"
                  type="password"
                  variant="bordered"
                />
                <Divider />
                <Input
                  label="Password Baru"
                  labelPlacement="outside"
                  placeholder="••••••••"
                  type="password"
                  variant="bordered"
                />
                <Input
                  label="Konfirmasi Password Baru"
                  labelPlacement="outside"
                  placeholder="••••••••"
                  type="password"
                  variant="bordered"
                />
                <div className="flex justify-start mt-2">
                  <Button className="font-bold px-8" color="danger">
                    Perbarui Password
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
