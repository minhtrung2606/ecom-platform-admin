import React, { useCallback, useState } from 'react';
import ProductValuesMapping from './ProductValuesMapping';

const ProductStatusForm = ({ initialStatus, onChange }) => {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = useCallback((e) => {
    const { value } = e.target || {};
    setStatus(value);
    onChange({
      target: {
        name: 'status',
        value,
      },
    });
  }, [onChange]);

  return (
    <>
      <label className="form-label">Status</label>
      <div>
        <div class="form-check">
          <input
            id="product-status-draft"
            name="status"
            className="form-check-input"
            type="radio"
            value="Draft"
            checked={status === 'Draft'}
            onChange={handleStatusChange}
          />
          <label class="form-check-label" htmlFor="product-status-draft">
            {ProductValuesMapping.status['Draft']}
          </label>
        </div>
        <div class="form-check">
          <input
            id="product-status-archived"
            name="status"
            className="form-check-input"
            type="radio"
            value="Archived"
            checked={status === 'Archived'}
            onChange={handleStatusChange}
          />
          <label class="form-check-label" htmlFor="product-status-archived">
            {ProductValuesMapping.status['Archived']}
          </label>
        </div>
        <div class="form-check">
          <input
            id="product-status-published"
            name="status"
            className="form-check-input"
            type="radio"
            value="Published"
            checked={status === 'Published'}
            onChange={handleStatusChange}
          />
          <label class="form-check-label" htmlFor="product-status-published">
            {ProductValuesMapping.status['Published']}
          </label>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProductStatusForm);
