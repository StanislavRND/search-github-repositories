import { TablePagination } from '@mui/material';

type PaginationProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

const Pagination = ({
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: PaginationProps) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count ?? 0}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      style={{ margin: '30px 0px' }}
    />
  );
};

export default Pagination;
