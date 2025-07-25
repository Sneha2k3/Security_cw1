import {useState,  useEffect } from 'react';
import axios from 'axios';
import  Layout  from '../components/Layout';
import { toast } from 'react-hot-toast';
import { useSelector,useDispatch } from 'react-redux';
import {setUser} from '../redux/userSlice';

export default function(){
    const {user} = useSelector(state => state.user);
      const dispatch = useDispatch();
    
    const [isLoading,setIsLoading] = useState(false);
    useEffect(()=> {
        // const fetchUserData = async () => {
        //     try {
        //         const response = await axios.get('/users/profile?id'+user._id, {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
        //             },
        //         });
        //         if (response.data.success) {
        //             setUser(response.data.user);
        //             setIsLoading(false);
        //         } else {
        //             toast.error(response.data.message);
        //         }
        //     } catch (error) {
        //         toast.error('Error fetching user data');
        //     }
        // };
        // fetchUserData();
    },[]);
    return (
        <Layout>
            {isLoading ? (
                <div className="spinner-parent">
                    <div className="spinner-border" role="status"></div>
                </div>
            ) : (
                <div className="user-profile">
                    {user && (
                        <div className="flex justify-between items-center mb-4 w-[500px] p-5 rounded-lg shadow-md border">
                            <div>
                                <h1 className='font-bold text-lg'> Multi-Factor Authentication </h1>
                                <p className='text-muted text-md'> Secure your account with MFA</p>
                            </div>
                            <div>
                                <button
                                onClick={async () => {
                                    setIsLoading(true);
                                    axios({
                                        method: 'post',
                                        url: '/api/user/mfa/enable',
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                                        },
                                        data: {
                                            email: user.email,
                                            enable : !user.mfaEnabled
                                        },
                                    }).then((response) => {
                                        if (response.data.success) {
                                            if(response.data.enabled) {
                                                toast.success("MFA Enabled");
                                            }else
                                            {
                                                toast.error("MFA Disabled");
                                            }
                                            dispatch(setUser({
                                                ...user,
                                                mfaEnabled: !user.mfaEnabled
                                            }))
                                            setIsLoading(false);
                                        } else {
                                            toast.error(response.data.message);
                                        }
                                    })
                                }}
                                    className="btn btn-primary"
                                > {user.mfaEnabled? "Disable" : "Enable"} </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Layout>
    )
}