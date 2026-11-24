import './Subbar.css';

export interface SubbarProps {
  title: string;
  badge?: string;
  avatars?: string[];
  extraMembersCount?: number;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const Subbar = ({
  title,
  badge,
  avatars = [],
  extraMembersCount = 0,
  actionLabel = '+ New Member',
  onActionClick,
}: SubbarProps) => {
  return (
    <div className="subbar">
      <div className="subbar-inner">
        <div className="subbar-leading">
          <h1 className="subbar-title">{title}</h1>
          {badge && <span className="subbar-badge">{badge}</span>}
        </div>

        <div className="subbar-trailing">
          {(avatars.length > 0 || extraMembersCount > 0) && (
            <div className="subbar-avatars">
              {avatars.map((src, index) => (
                <img key={index} src={src} alt={`User ${index + 1}`} className="subbar-avatar" />
              ))}
              {extraMembersCount > 0 && <span className="subbar-more">+{extraMembersCount}</span>}
            </div>
          )}

          <span className="subbar-divider" />

          <button type="button" className="subbar-new-member" onClick={onActionClick}>
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
