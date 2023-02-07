import { Button } from "antd";
import React from "react";
import Avatar from "../../../components/Avatar";
import ProfileModal from "../../../components/ProfileModal";
const CommonHeaderRight = () => {
    const [openModal, setOpenModal] = React.useState(false);

    const showModal = () => {
        setOpenModal(true);
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
                    />
				</div>
			</div>
        </>
    )
}

export default CommonHeaderRight;