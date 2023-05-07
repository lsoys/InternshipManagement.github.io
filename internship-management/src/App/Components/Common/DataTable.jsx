import { useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function DataTable(props) {
    const rows = props.rows;
    const columns = props.cols;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    // return <Box sx={{ width: '90vw', margin: "auto" }}>
    return <Box sx={{ width: '100%', margin: "auto" }}>
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 460 }}>
                <Table
                    stickyHeader
                    aria-labelledby="interns table"
                    sx={{ minWidth: 150 }}
                    aria-label="sticky table"
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id + "column"}
                                    align={column.align}
                                    style={{ fontWeight: "bold", minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code ?? i + "data"}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id + "colum"} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })
                        }
                    </TableBody>
                </Table>
                {
                    props.loading &&
                    <h3 className="textCenter p1 textLight"><CircularProgress /></h3>
                }
                {
                    !props.loading && rows.length == 0 &&
                    <>
                        <h3 className="textCenter p1 textLight">No data Available</h3>
                    </>
                }
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </Box>
}