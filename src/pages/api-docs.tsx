// src/pages/api-docs.tsx
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getApiDocs } from '../lib/swagger';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export const getStaticProps: GetStaticProps = async () => {
  const spec = getApiDocs();
  return {
    props: {
      spec,
    },
  };
};

const ApiDoc = ({ spec }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <SwaggerUI spec={spec} />;
};

export default ApiDoc;