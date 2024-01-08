import { Pagination } from "@mui/material";
import styled from "styled-components";

export const StyledPagination = styled(Pagination)(() => ({
    '& .Mui-selected': {
        backgroundColor: '#3bd6c6 !important',
        '&:hover': {
          backgroundColor: '#3bd6c6 !important',
        },
    }
}));