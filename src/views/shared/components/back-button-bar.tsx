import { useRouter } from "next/router";

type BackButtonBarProps = {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export const BackButtonBar = ({ className = '' }: BackButtonBarProps) => (
  <div className={`py-4 px-8 w-full h-[10vh] bg-gradient-bar-fade--top ${className}`}>
    <BackButton />
  </div>
);


const BackButton = () => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <button
      type="button"
      onClick={handleBackClick}
      className="text-underline-animated"
    >Back</button>
  );
};