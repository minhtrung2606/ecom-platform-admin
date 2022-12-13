import TableHeaders from './TableHeaders';
import TableRows from './TableRows';
import './styles.css';

const Table = ({
  headers,
  rows,
  valueMappings = {},
}) => {
  return (
    <table className="table table-striped table-hover">
      <TableHeaders headers={headers} />
      <TableRows
        rows={rows}
        rowProps={headers}
        valueMappings={valueMappings}
      />
    </table>
  );
};

export default Table;
