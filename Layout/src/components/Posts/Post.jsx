import React from "react";
import s from "../Main/Main.module.scss";

const Post = () => {
    const posts = {
        post: {
            postTitle: "lorem ipsum dolor sit amet",
            postBody: `tempora nam quod cumque soluta temporibus sed nostrum odio est suscipit ducimus vitae
                omnis voluptas sunt et reprehenderit velit architecto deserunt commodi voluptas eum id
                et ab deleniti nemo doloremque asperiores eligendi aut assumenda incidunt consequatur
                aut error quam amet quo dicta ipsa in quibusdam maxime corrupti ut recusandae ad amet ad
                error et non porro aut earum aspernatur exercitationem voluptatibus facere rerum atque
                sed nemo quod molestiae perferendis est quo qui quo adipisci et et voluptatem et sequi
                officiis exercitationem commodi et officiis maiores ea quia nobis rerum consequatur
                consequatur quam iusto ex tenetur hic aperiam quam aliquam et`,
            author: `5e355b06d6309d27f4488800`,
            slugURL: `duibusdam-et-similique-ut-et`
        }
    };

    return (
        <div className={s.post}>
            <div className={s.top}>
                <h2>
                    <a href={posts.post.slugURL}>
                        {posts.post.postTitle}
                    </a>
                </h2>
            </div>
            <div className={s.body}>{posts.post.postBody}</div>
            <div className={s.bottom}>
                <div className={s.author}>
                    Author:&nbsp;
                    <a href="/">
                        {posts.post.author}
                    </a>
                </div>
                <div className={s.comments}>
                    <a href="">Comments</a>
                </div>
            </div>
        </div>
    )
};

export default Post;