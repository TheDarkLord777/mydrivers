
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

const SwaggerPage: React.FC = () => {
  return <SwaggerUI url="/api/swagger" />;
};

export default SwaggerPage;