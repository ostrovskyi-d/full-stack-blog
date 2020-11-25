import React, {useEffect, useState} from "react";
import {Pagination} from "antd";
import s from './Paginator.module.scss'
import {withRouter} from "react-router-dom";

const Paginator = ({getReqPageTC, posts, history, ...props}) => {
    const [currentPage, setCurrentPage] = useState(+props.match.params.page);
    useEffect(() => {
        // history.push(`/archive/${currentPage}`);
        getReqPageTC(currentPage)
    }, [currentPage, getReqPageTC, history]);
    const onPageChange = (p) => {
        // console.log(p)
        setCurrentPage(Number(p));
        history.push(`/archive/${p}`)
    };
    if (posts.totalPostsCount > posts.pageSize) return (
        <div className={s.paginator}>
            <Pagination
                // pageSize={10}
                total={posts.totalPages * 10}
                onChange={onPageChange}
                defaultCurrent={+props.match.params.page}
                inputCurrent={+props.match.params.page}
                size='small'
            />
        </div>
    );
    else return null
};

export default withRouter(Paginator);
