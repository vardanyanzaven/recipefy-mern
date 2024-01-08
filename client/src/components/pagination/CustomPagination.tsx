import React from 'react'
import { StyledPagination } from './CustomPagination.styles';

type PaginationProps = {
    count: number;
    page: number;
    isLoading?: boolean;
    changeHandler: React.ChangeEventHandler<unknown>;
}

const CustomPagination = ({count, page, isLoading, changeHandler}: PaginationProps) => {
  return (
    <StyledPagination sx={{display: isLoading ? "none" : "flex" }} size="large"
    count={count} page={page} onChange={changeHandler}/>
  )
}

export default CustomPagination;