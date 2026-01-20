export const LogoText = () => {
  return (
    <p className="font-black text-2xl text-[#0B1C39] tracking-tighter uppercase">
      Honda <span className="text-danger">Clinik</span> Pradana
    </p>
  );
};

export default function Logo() {
  return (
    <div className="bg-danger p-1.5 rounded-sm">
      <span className="text-white font-black text-xl italic leading-none">
        HCP
      </span>
    </div>
  );
}
