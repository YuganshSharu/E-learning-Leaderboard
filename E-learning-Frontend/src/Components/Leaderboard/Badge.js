import { ReactComponent as GoldBadge } from '../../Assets/Images/gold.svg';
import { ReactComponent as SilverBadge } from '../../Assets/Images/silver.svg';
import { ReactComponent as BronzeBadge } from '../../Assets/Images/bronze.svg';
const Badge = (props) => {
  const badgeStyle = { width: '20px', height: 'auto' };

  return props.badgeName === 'gold' ? (
    <GoldBadge style={badgeStyle} />
  ) : props.badgeName === 'silver' ? (
    <SilverBadge style={badgeStyle} />
  ) : (
    <BronzeBadge style={badgeStyle} />
  );
};
export default Badge;
