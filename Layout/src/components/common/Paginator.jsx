import React from "react";
import { Pagination } from "antd";
import s from './Paginator.module.scss'

const Paginator = (props) => {

    return (
        <div className={s.paginator}>
            <Pagination
                total={props.posts.totalPages * 10}
                onChange={props.onPageChange}
                defaultCurrent={1}
                size='small'
            />
        </div>
    )
};

export default Paginator;