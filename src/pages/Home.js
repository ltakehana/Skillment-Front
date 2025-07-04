import React, { useState, useEffect } from 'react'
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import "../styles/pages/home.css"
import { useHistory } from 'react-router-dom';
import getUser from '../services/requests/getUser';
import getCompany from '../services/requests/getCompany';
import getPosts from '../services/requests/getPosts';
import likePost from '../services/requests/likePost';
import createPosts from '../services/requests/createPosts';
import dislikePost from '../services/requests/dislikePost';
import PlusButton from '../components/PlusButton';
import Modal from '../components/Modal';
import defaultImage from "../assets/accountCircle.svg";
import externalLinks from '../utils/externalLinks';
import LoadingComponent from '../components/LoadingComponent';
import ErrorModal from '../components/ErrorModal';


function Home() {

    const history = useHistory();

    const [backgroundColor, setBackgroundColor] = useState("#C7C7C7");
    const [userPicture, setUserPicture] = useState("");
    const [highlightColor, setHighlightColor] = useState("#C7C7C7");

    const [postModalVisible, setPostModalVisible] = useState(false);
    const [postMessageInput, setPostMessageInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOnError, setIsOnError] = useState(false);

    const [player, setRankingPlayer] = useState({
        name: "Usuario do app",
        company: "skillab",
        id: 0,
        admin: false,
        office: "Consultor"
    });

    const [posts, setPosts] = useState([]);

    const handlePost = async () => {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("userToken");
        if (!userToken) {
            history.push("/login")
        }
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (!userInfo) {
            userInfo = await getUser(userToken);
            if (!userInfo)
                setIsOnError(true);
        }

        await createPosts(userToken, userInfo.id, postMessageInput);

        const posts = await getPosts(userToken);
        if (!posts)
            setIsOnError(true);
        else
            setPosts(posts);

        setPostModalVisible(false)
        setIsLoading(false);
    }

    useEffect(async () => {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("userToken");
        if (!userToken) {
            history.push("/login")
        }
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (!userInfo) {
            userInfo = await getUser(userToken);
            if (!userInfo)
                setIsOnError(true);
        }
        setUserPicture(userInfo.picture);
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if (!companyInfo) {
            companyInfo = await getCompany(userToken);
            if (!companyInfo)
                setIsOnError(true);
        }
        setBackgroundColor(companyInfo.second_color);
        setHighlightColor(companyInfo.first_color);
        setRankingPlayer({
            "name": userInfo.name,
            "company": companyInfo.name,
            "office": companyInfo.office,
            "id": userInfo.id,
            "admin": userInfo.admin
        });

        const posts = await getPosts(userToken);
        if (!posts)
            setIsOnError(true);
        else
            setPosts(posts);
        setIsLoading(false);
    }, []);

    const handleLikePost = async (postId) => {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("userToken");
        let updatePosts = []
        posts.map((post, index) => {
            if (post.id === postId)
                post.like = true;
            updatePosts.push(post);
        });
        await likePost(userToken, postId)
        setPosts(updatePosts);
        setIsLoading(false);
    }

    const handleDislikePost = async (postId) => {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("userToken");
        let updatePosts = []
        posts.map((post, index) => {
            if (post.id === postId)
                post.like = false;
            updatePosts.push(post);
        });
        await dislikePost(userToken, postId)
        setPosts(updatePosts);
        setIsLoading(false);
    }

    return (
        <div className="mainFrame" style={{ backgroundColor: backgroundColor }}>
            <div className="mainBody">
                <Menu selectedMenu={0}></Menu>
                <div className="mainContent" style={{ alignItems: "initial", overflow: "auto" }}>
                    <div className="homeFeed">
                        {
                            posts.map((post, index) => (<div className="homePost">
                                <div className="homePostHeader">
                                    <img style={{ borderRadius: "40vw" }} src={(post.picture === "") ? (defaultImage) : (externalLinks.userPic + post.picture)} className="homePostIcon" />
                                    <h1 className="homePostName">{post.name}</h1>
                                    {(post.author_id === player.id || player.admin) &&
                                        (<div className="homePostOptions">
                                            <span className="material-icons">
                                                more_vert
                                            </span>
                                            <div className="homePostDropdown">
                                                <div className="NavbarUserDropdownItem">
                                                    <span className="material-icons NavbarUserDropdownIcon">
                                                        block
                                                    </span>
                                                    <span className="NavbarUserDropdownText">Excluir postagem</span>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                                <div className="homePostText">{post.message}</div>
                                <div className="homePostLike" onClick={() => {
                                    if (post.like)
                                        handleDislikePost(post.id);
                                    else
                                        handleLikePost(post.id);
                                }}>
                                    <span className="material-icons">
                                        {(post.like) ? ("thumb_up") : ("thumb_up_off_alt")}
                                    </span>
                                    <label>Gostei</label>
                                </div>
                            </div>))
                        }
                    </div>
                    <div className="homePlayerColumn">
                        <div className="homePlayer">
                            <img style={{ borderRadius: "40vw" }} src={(userPicture === "") ? (defaultImage) : (externalLinks.userPic + userPicture)} className="homePlayerIcon" />
                            <h1 className="homePlayerName">{player.name}</h1>
                            <label className="homePlayerCompany">{player.company}</label>
                            <label className="homePlayerPoints">{player.office}</label>
                        </div>
                    </div>
                </div>
            </div>
            <PlusButton onClickFunction={() => { setPostModalVisible(true) }}></PlusButton>
            {(postModalVisible) && (
                <Modal onClose={() => { setPostModalVisible(false) }}>
                    <div className="postModal">
                        <h1 className="postModalText">Compartilhe suas ideias!!!</h1>
                        <textarea onChange={(e) => setPostMessageInput(e.target.value)} placeholder="Digite sua mensagem aqui!!!" className="postModalInput"></textarea>
                        <button onClick={handlePost} style={{ backgroundColor: highlightColor }} className="postModalButton">
                            <span className="material-icons">
                                send
                            </span>
                        </button>
                    </div>
                </Modal>
            )}
            <Navbar></Navbar>
            <LoadingComponent isOpen={isLoading} />
        </div>
    );

}

export default Home;
