import React from 'react';

const TableHeaders = ({ headers = [] }) => {
  return (
    <thead>
      <tr>
        {headers.map(({ name }, index) => (
          <th key={`${index}-name`} scope="col">{name}</th>
        ))}
      </tr>
    </thead>
  );
};

export default React.memo(TableHeaders);
