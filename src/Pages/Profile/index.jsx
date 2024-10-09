import avatar from '../../assets/images/userAvatar.png'
import ImageUploader from '../../components/ImageUploader'
import { Button, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { EditOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { updateUser } from '../../features/Slices/userSlice'

export default function Profile() {
    const user = useSelector((state) => state.user.user);
    const [userName, setUserName] = useState(user.name);
    const [userPhone, setUserPhone] = useState(user.phone);
    const [userEmail, setUserEmail] = useState(user.email);
    const [isModified, setIsModified] = useState(false);
    const profileImage = user.picture || avatar;
    const dispatch = useDispatch();


    // Function to check if the current values match the initial values
    useEffect(() => {
        const isFormModified =
            userName !== user.name ||
            userPhone !== user.phone ||
            userEmail !== user.email;

        setIsModified(isFormModified);
    }, [userName, userPhone, userEmail, user]);

    // Function to update the user details
const updateUserDetails = () => {
    const id = user._id;
    const userData = {};

    // Check each field and only include the changed fields
    if (userName !== user.name) {
        userData.name = userName;
    }
    if (userPhone !== user.phone) {
        userData.phone = userPhone;
    }
    if (userEmail !== user.email) {
        userData.email = userEmail;
    }
    console.log(userData);
    // Only dispatch if there are changes to update

        try {
            dispatch(updateUser({ id, userData })).then((response) => {
                if(response){
                  message.success("Profile updated");
                }
                else{
                  message.error("Something went wrong, Try again ");
                }
            });
        } catch (error) {
            message.error("Something went wrong, Try again ");
        }
    
};


    return (
        <main className='w-full p-2 flex flex-col items-center justify-center'>
            <div className=''>
                <ImageUploader imageName={"picture"} defImage={profileImage} />
                <p className='text-sm opacity-50 text-center mt-2'>Update Profile <EditOutlined /></p>
            </div>
            <div className='lg:w-1/4'>
                <span>
                    <label>Name</label>
                    <Input 
                        placeholder="Enter Name" 
                        value={userName} 
                        suffix={<EditOutlined className='opacity-50' />}
                        size='large'
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </span>
                <span>
                    <label>Phone</label>
                    <Input 
                        type='number'
                        placeholder="Enter Phone number"    
                        value={userPhone} 
                        suffix={<EditOutlined className='opacity-50' />}
                        size='large'
                        onChange={(e) => setUserPhone(e.target.value)}
                    />
                </span>
                <span>
                    <label>Email</label>
                    <Input 
                        type='email' 
                        placeholder="Email" 
                        value={userEmail} 
                        suffix={<EditOutlined className='opacity-50' />}
                        size='large'
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </span>
                
                <Button 
                    type='primary' 
                    className='w-full mt-4' 
                    color='default' 
                    variant='solid'
                    size='large'
                    disabled={!isModified}  // Button disabled if no changes are made
                    onClick={updateUserDetails}
                >
                    Update Details
                </Button>
                
            </div>
        </main>
    )
}
