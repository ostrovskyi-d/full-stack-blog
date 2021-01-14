import s from "./PostItem.module.scss";
import ReactMarkdown from 'react-markdown';
import { Avatar, Button } from "antd";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Moment from "react-moment";
import Link from "next/link";


const PostItem = (props) => {

    // const { author } = props;
    return (
        <div className={s.post_item}>

            <div className={s.top}>

                <h2>
                    <Link href={props.url}>
                      <a>{props.title}</a>
                    </Link>
                </h2>
                <div className={s.buttons}>
                    <Button
                        icon={<EditOutlined />}
                        size='default'
                        shape='circle-outline'
                        type='primary'
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        size='default'
                        shape='circle-outline'
                        type='danger'
                    />
                </div>


            </div>
            <div className={s.item_body}>
                <ReactMarkdown source={props.body} />
            </div>

            <section className={s.bottom}>
                {props.renderAuthor && <RenderAuthor  {...props} />}
                <div className={s.timestamp}>
                    {/*Created at:&nbsp;*/}

                    <Link href='#'>
                        <Moment date={props.createdAt} />
                    </Link>
                </div>
                <div className={s.comments}>
                    <Link href='#'><a>Comments</a></Link>
                </div>
            </section>
        </div>
    )
};

const RenderAuthor = props => {
    if (props.author) {
        return (
            <div className={s.author}>
                <Link  href={`/users/${props.author.login}`}>
                  <a className={s.author_link}>
                    <Avatar className={s.author_link_avatar} icon={<UserOutlined />} size='small' />
                    <span className={s.author_link_name}>
                        {props.author.login}
                    </span>
                  </a>

                </Link>
            </div>
        )
    } else return <div className={s.author}>
            Maybe Hacker
        </div>
}
export default PostItem;
