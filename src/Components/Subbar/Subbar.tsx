import './Subbar.css';
import avatar1 from '../../assets/Avatar.png';
import avatar2 from '../../assets/Avatar1.png';
import avatar3 from '../../assets/Avatar2.png';

export const Subbar = () => {
  return (
    <div className="subbar">
      <div className="subbar-inner">
        <div className="subbar-leading">
          <h1 className="subbar-title">Product Design Team</h1>
          <span className="subbar-badge">Sprint 9</span>
        </div>

        <div className="subbar-trailing">
          <div className="subbar-avatars">
            <img src={avatar1} alt="User 1" className="subbar-avatar" />
            <img src={avatar2} alt="User 2" className="subbar-avatar" />
            <img src={avatar3} alt="User 3" className="subbar-avatar" />
            <span className="subbar-more">+4</span>
          </div>

          <span className="subbar-divider" />

          <button type="button" className="subbar-new-member">
            + New Member
          </button>
        </div>
      </div>
    </div>
  );
};
