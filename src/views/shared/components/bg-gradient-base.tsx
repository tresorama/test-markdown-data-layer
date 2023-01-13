export const BgGradientBase = ({ children }: { children: React.ReactNode; }) => (
  <div className="w-full h-full relative">
    <div className="absolute inset-0 bg-gradient-base" />
    <div className="absolute inset-0 backdrop-blur-md" />
    <div className="relative w-full h-full">
      {children}
    </div>
  </div>
);