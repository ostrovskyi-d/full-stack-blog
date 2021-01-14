import React, {useEffect, useState} from "react";
import {Pagination} from "antd";
import s from './Paginator.module.scss'
import {useRouter} from "next/router";

const Paginator = ({getReqPageTC, posts, ...props}) => {
    const router = useRouter();
    const {page} = router.query;

    const [currentPage, setCurrentPage] = useState(+page);

    useEffect(() => {
        // history.push(`/archive/${currentPage}`);
        getReqPageTC(currentPage)
    }, [currentPage, getReqPageTC, router.query]);

    const onPageChange = (p) => {
        // console.log(p)
        setCurrentPage(Number(p));
        router.push(`/archive/${p}`)
    };
    debugger
    if (posts.totalPostsCount > posts.pageSize) return (
        <div className={s.paginator}>
            <Pagination
                // pageSize={10}
                total={posts.totalPages * 10}
                onChange={onPageChange}
                defaultCurrent={+page}
                inputCurrent={+page}
                size='small'
            />
        </div>
    );
    else return null
};

export default Paginator;
