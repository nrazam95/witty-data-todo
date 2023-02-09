import React, { Suspense } from 'react';
import { Content as AntdContent } from 'antd/es/layout/layout';
import ContentRoutes from './ContentRoutes';
import PageWrapper from '../PageWrapper/PageWrapper';
import Page from '../Page/Page';
import { Card } from 'antd';

const LOADING = (
	<PageWrapper>
		<Page>
			<div className='row h-100'>
				<div className='col-lg-6'>
					<Card>
						<Card.Meta>
							<div />
						</Card.Meta>
					</Card>
				</div>
				<div className='col-lg-6'>
					<Card>
						<Card.Meta>
							<div />
						</Card.Meta>
					</Card>
					<Card>
						<Card.Meta>
							<div />
						</Card.Meta>
					</Card>
				</div>
			</div>
		</Page>
	</PageWrapper>
);

const Content = () => {
    const contentStyle = {
        padding: 24,
        minHeight: 280,
    };

	return (
		<AntdContent className='content' style={contentStyle}>
			<Suspense fallback={LOADING}>
				<ContentRoutes />
			</Suspense>
            {/* <ContentRoutes /> */}
		</AntdContent>
	);
};

export default Content;