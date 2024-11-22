import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerPage: React.FC = () => {
  return <SwaggerUI url={`${process.env.BASE_URL}/api/swagger`} />

};

export default SwaggerPage;
