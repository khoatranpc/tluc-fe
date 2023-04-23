import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Badge, Input } from 'antd';
import { ReactComponent as Plus } from '../../assets/svg/plus.svg';
import Chat from './Chat';
import './style.scss';
import httpClient from '../../utils/axios';
import { Obj } from '../../global/interface';
import { formatTimeLast } from '../../utils';
import { useGetUser } from '../../utils/Hook';

const Messenger = () => {
    const [crrRoomId, setCrrRoomId] = useState(null);
    const [chat, setChat] = useState<any>(null);
    const [crrChat, setCrrChat] = useState<any>(null);
    const [userMail, setUserMail] = useState<string>('');
    const [foundUser, setFoundUser] = useState<Obj | null>(null);
    const crrUser = useGetUser();
    async function callData() {
        if (!chat) {
            const dataChat = await httpClient.get('api/chat');
            if (dataChat && dataChat.data.response.data.length !== 0) {
                setChat(dataChat.data.response.data.filter((item: Obj) => {
                    return item.myFriendInfo._id === crrUser._id || item.myInfo._id == crrUser._id
                }));
                setCrrRoomId(dataChat.data.response.data[0]._id);
            } else {
                setChat([]);
            }
        }
    }
    async function findUser(mail: string) {
        if (mail) {
            const user = await httpClient.get(`api/user/${mail}`);
            if (user.data.success && user.data.response.data._id !== crrUser._id) {
                setFoundUser(user.data.response.data);
            } else (
                setFoundUser(null)
            )
        }
    }
    async function createChat(idFoundUser: string) {
        const existChat = chat.findIndex((item: Obj) => item.myFriendInfo._id === idFoundUser);
        if (idFoundUser && existChat < 0) {
            const createChat = await httpClient.post(`api/chat/create`, {
                chatName: 'Trò chuyện',
                friendUserId: foundUser?._id
            });
            setCrrRoomId(createChat.data.response.data.insertedId);
        }
    }

    useEffect(() => {
        callData();
    }, []);
    useEffect(() => {
        if (crrRoomId) {
            setCrrChat(() => {
                return (chat as unknown as Array<Obj>)?.filter((item) => item._id === crrRoomId)
            })
        }
    }, [crrRoomId])
    useEffect(() => {
        if (userMail) {
            findUser(userMail)
        }
    }, [userMail])
    const searchUser = (e: Event) => {
        setUserMail((e.target as Obj)?.value as string)
    }

    return <div className="container-messenger">
        <div className="left-messenger">
            <div className="round">
                <div className="title">
                    <span>Tin nhắn</span>
                    <Plus className="add" />
                </div>
                <div className="search">
                    <Input size="large" value={userMail} onChange={(e: any) => { searchUser(e) }} placeholder="Search" prefix={<SearchOutlined className="icon-search" />} className="input-search" />
                </div>
            </div>
            {foundUser && userMail && <div className="finding-user" onClick={() => {
                createChat(foundUser._id)
            }}>
                <Badge>
                    <Avatar shape="circle" size="large" src={foundUser.img as string} />
                </Badge>
                {foundUser.username as string}
            </div>}
            {!chat ? 'Loading...' : chat && chat.length !== 0 ? (chat as any).map((item: Obj) => {
                return (
                    <div className="summary-chat" key={item._id} onClick={() => { setCrrRoomId(item._id) }}>
                        <div className="image-partner">
                            <Badge>
                                <Avatar shape="circle" size="large" src={""} />
                            </Badge>
                        </div>
                        <div className="current-chat">
                            <div className="name-time">
                                <span className="name-user">
                                    {item.myInfo.name === crrUser.username ? item.myFriendInfo.name : item.myInfo.name}
                                </span>
                                <span className="time">{(formatTimeLast(new Date(item.createTime)))}</span>
                            </div>
                            <div className="summary-chat-own">
                                <div className="summary-near-chat-time">
                                    <p>
                                        {item.message[item.message.length]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) : 'Bạn chưa có tin nhắn!'}

        </div>
        <div className="right-messenger">
            {crrChat && crrChat.length !== 0 ? <Chat currentRoomId={crrRoomId as unknown as string} data={crrChat[0]} /> : 'Hiện bạn chưa có cuộc trò chuyện nào cả! Hãy bắt đầu ngay nhé.'}
        </div>
    </div>
}
export default Messenger