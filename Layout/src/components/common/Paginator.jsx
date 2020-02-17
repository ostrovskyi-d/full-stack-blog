import React from "react";
import {Pagination} from "antd";

const Paginator = props => {
    const {
        posts: {
            postsStore,
            totalPostsCount,
            pageSize
        },
        onPostsPageChange
    } = props;
    const pagesCount = Math.ceil(totalPostsCount / pageSize);
    const onPaginatorChange = (e) => {
        onPostsPageChange(e);
    };

    return postsStore.length <= pageSize
            ? <Pagination
                onChange={onPaginatorChange}
                defaultCurrent={1}
                total={Number(`${pagesCount}0`)}
            />
            : null
};

export default Paginator