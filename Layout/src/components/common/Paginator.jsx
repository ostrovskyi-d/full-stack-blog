import React from "react";
import {Pagination} from "antd";


const Paginator = (props) => {

    return (
        <Pagination
            total={props.posts.totalPages * 10}
            onChange={props.onPageChange}
            defaultCurrent={1}
            size='small'
        />
    )
};

export default Paginator;