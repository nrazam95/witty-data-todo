import React from 'react';
import UserProfile from '../../components/UserProfile';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';

const Profile = () => {
    const profile = {
        name: 'John Doe',
        src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        srcSet: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        color: 'primary',
        mail: 'jkanskjwnjksq',
        phone: '123456789',
    }
    return (
        <PageWrapper
            title="Profile"
            className="bg-dark"
        >
            <Page>
                <div className="row h-100 align-items-center justify-content-center">
                    <div className='col-xl-12 col-lg-12 col-md-12'>   
                        <UserProfile 
                            {...profile}
                        />
                    </div>
                </div>
            </Page>
        </PageWrapper>
    );
}

export default Profile;