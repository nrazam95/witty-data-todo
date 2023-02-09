import { Button } from "antd";
import React, { useContext, useEffect } from "react";
import Avatar from "../../../components/Avatar";
import ProfileModal from "../../../components/ProfileModal";
import * as authActions from "../../../lib/actions/auth-actions";
import * as myProfileActions from "../../../lib/actions/my-profile-actions";
import { useDispatch } from "react-redux";
import AuthContext from "../../../contexts/authContexts";
import { useSelector } from "react-redux";

const CommonHeaderRight = () => {
    const { myProfile } = useSelector(state => state.myProfile);
    const { setToken } = useContext(AuthContext);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = React.useState(false);

    const showModal = () => {
        setOpenModal(true);
    }

    const onSigninOut = () => {
        dispatch(authActions.logout())
        setOpenModal(false);

        if (token) {
            setToken('');
            window.location.reload();
        }
    }

    useEffect(() => {
        dispatch(myProfileActions.getMyProfile());
    }, [dispatch]);

    return (
        <>
            <div
				className='col d-flex align-items-flex-end cursor-pointer'
				role='presentation'
            >
				<div className='me-3'>
					<div className='text-end'>
						<div className='fw-bold fs-6 mb-0'>
							{myProfile?.name}
						</div>
					</div>
				</div>
				<div className='position-relative'>
                    <Button
                        type="secondary"
                        htmlType="submit"
                        onClick={showModal}
                        style={{ padding: 0 }}
                    >
                        <Avatar
                            {...myProfile}
                            size={50}
                        />
                    </Button>
                    <ProfileModal
                        profile={myProfile}
                        openModal={openModal}
                        onOk={() => setOpenModal(false)}
                        onCancel={() => setOpenModal(false)}
                        onSigninOut={onSigninOut}
                    />
				</div>
			</div>
        </>
    )
}

export default CommonHeaderRight;