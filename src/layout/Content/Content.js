import React from 'react';
import { Content as AntdContent } from 'antd/es/layout/layout';
import ContentRoutes from './ContentRoutes';

const Content = () => {
    const contentStyle = {
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
    };

	return (
		<AntdContent className='content' style={contentStyle}>
			{/* <Suspense fallback={LOADING}>
				<ContentRoutes />
			</Suspense> */}
            <ContentRoutes />
		</AntdContent>
	);
};

export default Content;