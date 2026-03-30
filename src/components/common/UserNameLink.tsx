import { useNavigate } from 'react-router-dom';

interface UserNameLinkProps {
  userId: string;
  name: string;
  className?: string;
}

/** Clickable user name that navigates to user detail page */
export default function UserNameLink({ userId, name, className = '' }: UserNameLinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/users/${userId}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`font-bold hover:fg_accent_primary transition-colors cursor-pointer bg-transparent border-none outline-none p-0 text-left ${className}`}
    >
      {name}
    </button>
  );
}
