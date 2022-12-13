import { useCallback } from 'react';
import './BaseBadge.css';

const BaseBadge = ({
  id,
  name,
  variant = 'standard',
  removable = false,
  onRemove,
}) => {
  const handleRemove = useCallback(() => onRemove(id), [onRemove, id]);

  return (
    <span className={`base-badge badge badge-${id} rounded-pill ${variant}`}>
      {name}
      {removable && (
        <i
          title={`Remove ${name}`}
          className="bi bi-x ms-1 as-pointer"
          onClick={handleRemove}
        />
      )}
    </span>
  );
};

export default BaseBadge;
