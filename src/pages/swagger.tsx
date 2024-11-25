// src/pages/swagger.tsx
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <div>Loading Swagger UI...</div>
});

const SwaggerPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div>Loading...</div>;

  return (
    <div className="swagger-container">
      <SwaggerUI url="/api/swagger" />
      <style>{`
        .swagger-ui .info {
          margin: 20px 0;
        }
        .swagger-container {
          margin: 20px;
        }
      `}</style>
    </div>
  );
};

export default SwaggerPage;