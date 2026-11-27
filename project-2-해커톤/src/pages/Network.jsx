
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Network.css";
import { FiEdit } from "react-icons/fi";

import Nav from "../components/ui/nav/Nav";

import search from "../images/search.png";
import write from "../images/write.png";
import chat from "../images/chat.png";

const Network = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("자유게시판");

    const handleTabClick = (tabName, path) => {
        setActiveTab(tabName);
        navigate(path);
    };

    return (
        <div className="PhoneCanvas">
            <div className="PhoneFrame NetworkScene">
                <div className="network-content">

                    {/* 헤더 */}
                    <header className="network-header">
                        <p>창업 네트워크</p>
                        <div className="search-icon">
                            <Link to="/settings2">
                                <img src={search} alt="검색" />
                            </Link>
                        </div>
                    </header>

                    {/* 탭 메뉴 */}
                    <nav className="network-tabs">
                        <span
                            className={activeTab === "자유게시판" ? "tab active" : "tab"}
                            onClick={() => handleTabClick("자유게시판", "/network/free")}
                        >
                            자유게시판
                        </span>

                        <span
                            className={activeTab === "창업모집" ? "tab active" : "tab"}
                            onClick={() => handleTabClick("창업모집", "/network/recruit")}
                        >
                            창업모집
                        </span>

                        <span
                            className={activeTab === "요청함" ? "tab active" : "tab"}
                            onClick={() => handleTabClick("요청함", "/network/request")}
                        >
                            요청함
                        </span>
                    </nav>

                    {/* 자유게시판 글 목록 */}
                    {activeTab === "자유게시판" && (
                        <div className="post-list">
                            <p className="no-posts">
                                게시글을 불러올 수 없습니다.
                            </p>
                        </div>
                    )}

                    {/* 글쓰기 버튼 */}
                    <button
                        className="write-button"
                        onClick={() => navigate("/writingfree")}
                    >
                        <img src={write} alt="글쓰기" />
                        <FiEdit size={24} />
                    </button>

                </div>

                <Nav />
            </div>
        </div>
    );
};

export default Network;
