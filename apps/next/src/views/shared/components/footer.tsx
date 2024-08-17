const getThisYear = () => new Date().getFullYear();

type FooterProps = {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export const Footer = ({ className = '' }: FooterProps) => (
  <div className={`py-6 px-8 ${className}`}>
    @ {getThisYear()} - Blog - Powered by Next.js
  </div>
);