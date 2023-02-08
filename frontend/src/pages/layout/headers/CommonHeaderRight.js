import { Button } from "antd";
import React, { useContext } from "react";
import Avatar from "../../../components/Avatar";
import ProfileModal from "../../../components/ProfileModal";
import * as authActions from "../../../lib/actions/auth-actions";
import { useDispatch } from "react-redux";
import AuthContext from "../../../contexts/authContexts";
import { useSelector } from "react-redux";

const CommonHeaderRight = () => {
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

    const profile = {
        name: 'John Doe',
        src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        srcSet: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        color: 'primary',
        mail: 'jkanskjwnjksq',
        phone: '123456789',
    }
    return (
        <>
            <div
				className='col d-flex align-items-flex-end cursor-pointer'
				role='presentation'
            >
				<div className='me-3'>
					<div className='text-end'>
						<div className='fw-bold fs-6 mb-0'>
							{`Alex Stein`}
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
                            {...profile}
                            size={50}
                        />
                    </Button>
                    <ProfileModal
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