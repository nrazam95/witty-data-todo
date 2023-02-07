import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { Wrapper } from '../layout/Wrapper/Wrapper';

const App = () => {
  const theme = {
    token: {
      colorPrimary: '#23a3d0',
      colorPrimaryHover: '#23a3d0',
      colorPrimaryActive: '#23a3d0',
      colorSuccess: '#23a3d0',
      colorSuccessHover: '#23a3d0',
      colorSuccessActive: '#23a3d0',
    },
  }
  return (
    <ConfigProvider
      theme={theme}
    >
      <div
				className='app'
				style={{
					backgroundColor: 'var(--bs-body-bg)',
					zIndex: 1 ,
					overflow: 'scroll',
				}}>
				<Wrapper />
			</div>
    </ConfigProvider>
  );
}

export default App;
