import React from 'react';

const TableRows = ({
  rows = [],
  rowProps = [],
  valueMappings = {},
}) => {
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={`${index}-${row.pk}`}>
          {rowProps.map(({ prop, CellComp }, index) => (
            <td key={`${index}-${prop}`}>
              {
                !!CellComp ? (
                  <CellComp row={row} />
                ) : (
                  !!valueMappings[prop]
                    ? valueMappings[prop][row[prop]]
                      : row[prop]
                )
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default React.memo(TableRows);
