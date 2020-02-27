import React, {useEffect, useState} from "react";
import {Pagination} from "antd";
import s from './Paginator.module.scss'
import { withRouter} from "react-router-dom";

const Paginator = ({getReqPageTC, posts, history, ...props}) => {
    const [currentPage, setCurrentPage] = useState(+props.match.params.page);
    useEffect(() => {
        history.push(`/archive/${currentPage}`);
        getReqPageTC(currentPage)
    }, [currentPage, getReqPageTC, history]);

    return (
        <div className={s.paginator}>
            <Pagination
                // pageSize={1}
                total={posts.totalPages * 10}
                onChange={(p) => setCurrentPage(+p)}
                defaultCurrent={+props.match.params.page}
                inputCurrent={+props.match.params.page}
                size='small'
            />
        </div>
    )
};

export default withRouter(Paginator);