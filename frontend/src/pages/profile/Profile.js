import React, { useState } from 'react';
import UserProfile from '../../components/UserProfile';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { useSelector } from 'react-redux';
import * as myProfileActions from '../../lib/actions/my-profile-actions';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

const Profile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [changePassword, setChangePassword] = useState({
        password: '',
        confirmPassword: '',
    });
    const { myProfile } = useSelector(state => state.myProfile);

    const handleUpload = (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('files', file);
        dispatch(myProfileActions.updateMyProfilePicture(formData));
        setLoading(false);
    };

    const handlePasswordChange = () => {
        if (changePassword.password !== changePassword.confirmPassword) {
            message.error('Passwords do not match!');
            return;
        }

        if (changePassword.password.length < 8) {
            message.error('Password must be at least 6 characters long!');
            return;
        }

        if (changePassword.password.length > 40) {
            message.error('Password must be less than 20 characters long!');
            return;
        }

        dispatch(myProfileActions.updateMyPassword(changePassword));
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    return (
        <PageWrapper
            title="Profile"
            className="bg-dark"
        >
            <Page>
                <div className="row d-flex-no h-100 align-items-center justify-content-center">
                    <div className='col-xl-4 col-lg-6 col-md-8'>
                        <UserProfile 
                            {...myProfile}
                            handleUpload={handleUpload}
                            beforeUpload={beforeUpload}
                            loading={loading}
                            changePassword={changePassword}
                            setChangePassword={setChangePassword}
                            handlePasswordChange={handlePasswordChange}
                        />
                    </div>
                </div>
            </Page>
        </PageWrapper>
    );
}

export default Profile;