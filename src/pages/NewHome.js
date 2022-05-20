import React, { useContext } from 'react'
import { GoHome, GoSearch } from 'react-icons/go';
import { FaRegUser } from 'react-icons/fa'
import { BsChatQuote, BsFillBookmarkStarFill } from 'react-icons/bs'
import { BiDotsVertical, BiLike, BiShareAlt } from 'react-icons/bi'
import { GoCommentDiscussion } from 'react-icons/go'
import { AiOutlineLogout } from 'react-icons/ai'

import { AuthContext } from '../context/auth';
// import Logo from '../assests/Logo.png'

import '../style/pages/Home.scss'

function NewHome() {
    const { user, logout } = useContext(AuthContext);
    const arr = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    return (
        <div className='home_container'>
            {/* <div className='home_navbar_container'>
                <div className='home_navbar'>
                    <div className='navbar_content'>
                        Huddle
                        <img src={Logo} className='navbar_logo' />
                    </div>
                </div>
            </div> */}
            <div className='home_page'>
                <div className='new_post_container'>
                    <div className='new_post_heading'>New Post</div>
                    <div className='all_new_post'>
                        {
                            arr.map((i) => (
                                <div className='info_container'>
                                    <div className="circle">
                                        <img src="https://en.gravatar.com/userimage/8283692/4c9d9ec1cd3fd02acb5ac9572e3583da?size=200" alt="" />
                                        <svg
                                            viewBox="0 0 100 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{
                                                enableBackground: "new -580 439 577.9 194",
                                            }}
                                            xmlSpace="preserve"
                                        >
                                            <circle cx={50} cy={50} r={40} />
                                        </svg>
                                    </div>
                                    <div className='text_container'>memezone</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='card_container'>
                    <div className='recent_post'>Recent Post</div>
                    <div className='card_container_inner'>
                        {
                            arr.map((i) => (
                                <div className='card'>
                                    <div className='card_img_container'>
                                        <img src='https://i.imgur.com/oYiTqum.jpeg' className='card_img' />
                                    </div>
                                    <div className='side_content'>
                                        <div className='side_navbar'>
                                            <div className='side_navbar_container'>
                                                <img src='https://i.imgur.com/sjLMNDM.png' />
                                                <div className='side_navbar_heading'>Memezone</div>
                                            </div>
                                            <BiDotsVertical className='icon' />
                                        </div>
                                        <div className='sidebar_description'>
                                            <div className='description_date'>24 dec 2022</div>
                                            Start getting massive engagement from real people on Instagram  with the best in class grows automation tools
                                            Start getting massive engagement from real people on Instagram  with the best in class grows automation tools
                                        </div>
                                        <div className='tag_container'>
                                            <div className='tag_name'>#mobile</div>
                                            <div className='tag_name'>#development</div>
                                            <div className='tag_name'>#famous</div>
                                            <div className='tag_name'>#mobile</div>
                                            <div className='tag_name'>#development</div>
                                            <div className='tag_name'>#famous</div>
                                        </div>
                                        <div className='icon_container'>
                                            <div className='first'>
                                                <div className='inside_first'><BiLike className='icon' />&nbsp;23K</div>
                                                <div className='inside_first'><GoCommentDiscussion className='icon' />&nbsp;23</div>
                                                <div className='inside_first'><BiShareAlt className='icon' /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='centered'>
                    <div className='floatin_bar'>
                        <GoHome className='icon active' />
                        <GoSearch className='icon' />
                        <BsChatQuote className='icon' />
                        <FaRegUser className='icon' />
                        <AiOutlineLogout className='icon' onClick={logout} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewHome