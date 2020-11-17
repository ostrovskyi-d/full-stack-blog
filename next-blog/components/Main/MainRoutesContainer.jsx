
import {Route, Switch} from "react-router-dom"
import PostsContainer from "../Posts/PostsContainer";
import Sidebar from "../Sidebar/Sidebar";
import s from './Main.module.scss'
import FullPost from "../Posts/FullPost/FullPost";
import PostAddContainer from "../Posts/PostAdd/PostAddContainer";
import ProfileContainer from "../Profile/ProfileContainer";
import Newest from "../Newest/Newest";
import NoMatch from "../NoMatch";
import CommentsContainer from "../Posts/Comments/CommentsContainer";

const MainRoutesContainer = (wprops) => {
    return (
        <main className={s.main}>
            <div className={s.container}>
                <div className={s.content}>

                </div>
                <Sidebar/>
            </div>
        </main>
    )
};




export default MainRoutesContainer;
