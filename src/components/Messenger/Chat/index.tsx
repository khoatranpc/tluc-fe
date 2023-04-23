import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Badge, Form } from 'antd';
import AvatarUser from '../../../assets/img/AvatarUser.jpg';
import { ReactComponent as More } from '../../../assets/svg/More.svg';
import { ReactComponent as AttachFile } from '../../../assets/svg/AttachFile.svg';
import { ReactComponent as Smile } from '../../../assets/svg/Smile.svg';
import { ReactComponent as Send } from '../../../assets/svg/Send.svg';
import './style.scss';
import { io } from 'socket.io-client';
import { useGetUser } from '../../../utils/Hook';
import { Obj } from '../../../global/interface';

const Chat = (props: any) => {
    const socketRef = useRef<any>(null);
    const [newMessage, setNewMessage] = useState<Obj | null>(props.data);
    const [messsage, setMessage] = useState<string>('');
    const crrUser = useGetUser();
    const [img,] = useState<any>({
        my: props.data.myInfo.name === crrUser.username ? props.data.myFriendInfo.img : props.data.myInfo.img,
        partner: props.data.myInfo.name === crrUser.username ? props.data.myFriendInfo.img : crrUser.img
    })
    const onFinish = (e: {
        message: string
    }) => {
        if (messsage) {
            socketRef.current.emit('on-chat', {
                message: e.message as string,
                idRoom: props.data._id,
                idUser: crrUser._id,
                time: (new Date()).getTime()
            });
            setMessage('');
        }
    }
    // useEffect(() => {
    //     setNewMessage(props.data);
    // }, [props.data])
    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_API_HOST as string);
        socketRef.current.emit('subcribe', {
            idRoom: props.data._id
        })
        socketRef.current.on('user-chat', (content: any) => {
            const data = {
                idUser: content.idUser,
                time: content.time,
                content: content.message
            };
            (newMessage as Obj).message.push(data);
            setNewMessage({ ...newMessage });
        })
    }, []);
    return (
        <div className="container-chat">
            <div className="top-chat">
                <div className="current-user">
                    <div className="avatar">
                        <Badge>
                            <Avatar shape="circle" size="large" src={img.partner as string} />
                        </Badge>
                    </div>
                    <div className="name-status">
                        <span className="name-user">{props.data.myInfo.name === crrUser.username ? props.data.myFriendInfo.name : props.data.myInfo.name}</span>
                        <span className="status">Online</span>
                    </div>
                </div>
                <div className="more">
                    <More className="more" />
                </div>
            </div>
            <div className="send-message">
                <div className="content">
                    {newMessage?.message?.map((item: any, idx: number) => {
                        return (
                            <div className={`mess-of-user ${item.idUser !== crrUser._id ? 'left' : 'right'}`} key={item.time}>
                                <div className="img-user">
                                    {
                                        idx < (props.data.message.length - 1) ? ((
                                            item.idUser !== props.data.message[idx + 1].idUser ? (<Badge>
                                                <Avatar shape="circle" size="large" src={AvatarUser} />
                                            </Badge>) : ((<Badge>
                                                <Avatar shape="circle" size="large" style={{ backgroundColor: 'transparent' }} />
                                            </Badge>))
                                        )) : (<Badge>
                                            <Avatar shape="circle" size="large" src={AvatarUser} />
                                        </Badge>)

                                    }
                                </div>
                                <div className="message">
                                    {
                                        item.content
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="type-message">
                    <div className="attachment"><AttachFile /></div>
                    <div className="type-message-user">
                        <Form
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                            className="my-form"
                        >
                            <Form.Item
                                name="message"
                            >
                                <input type="text" className="message-user" placeholder="Type a message..." value={messsage} name='message' onChange={(e) => { setMessage(e.target.value as string) }} />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="emoji-sent">
                        <Smile />
                        <Send />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Chat;
// class Chat extends Component<ChatProps, ChatState> {
//     private data: RoomMessenger | Obj;
//     constructor(props: ChatProps) {
//         super(props);
//         this.data = RoomChat;
//     }
//     private onFinish = (e: {
//         message: string
//     }) => {
//         console.log(e.message);
//     }
//     getDataChart = async () => {
//         const dataChat = await httpClient.get('api/chat');
//         if (dataChat) {
//             this.setState({
//                 chat: dataChat.data.response.data
//             })
//         }
//     }
//     render() {
//         return (
//             <div className="container-chat">
//                 <div className="top-chat">
//                     <div className="current-user">
//                         <div className="avatar">
//                             <Badge>
//                                 <Avatar shape="circle" size="large" src={AvatarUser} />
//                             </Badge>
//                         </div>
//                         <div className="name-status">
//                             <span className="name-user">Trần Đăng Khoa</span>
//                             <span className="status">Online</span>
//                         </div>
//                     </div>
//                     <div className="more">
//                         <More className="more" />
//                     </div>
//                 </div>
//                 <div className="send-message">
//                     <div className="content">
//                         {this.data.messInRoom.map((item: { idUser: string; time: React.Key | null | undefined; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, idx: number) => {
//                             return (
//                                 <div className={`mess-of-user ${item.idUser === '1' ? 'left' : 'right'}`} key={item.time}>
//                                     <div className="img-user">
//                                         {
//                                             idx < (this.data.messInRoom.length - 1) ? ((
//                                                 item.idUser !== this.data.messInRoom[idx + 1].idUser ? (<Badge>
//                                                     <Avatar shape="circle" size="large" src={AvatarUser} />
//                                                 </Badge>) : ((<Badge>
//                                                     <Avatar shape="circle" size="large" style={{ backgroundColor: 'transparent' }} />
//                                                 </Badge>))
//                                             )) : (<Badge>
//                                                 <Avatar shape="circle" size="large" src={AvatarUser} />
//                                             </Badge>)

//                                         }
//                                     </div>
//                                     <div className="message">
//                                         {
//                                             item.content
//                                         }
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                     <div className="type-message">
//                         <div className="attachment"><AttachFile /></div>
//                         <div className="type-message-user">
//                             <Form
//                                 initialValues={{ remember: true }}
//                                 onFinish={this.onFinish}
//                                 autoComplete="off"
//                                 className="my-form"
//                             >
//                                 <Form.Item
//                                     name="message"
//                                 >
//                                     <input type="text" className="message-user" placeholder="Type a message..." />
//                                 </Form.Item>
//                             </Form>
//                         </div>
//                         <div className="emoji-sent">
//                             <Smile />
//                             <Send />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state: State) => ({})

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(Chat)