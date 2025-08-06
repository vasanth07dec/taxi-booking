import { Suspense, ComponentType, LazyExoticComponent } from 'react';
import { Spin } from 'antd';

type Props = {
  component: LazyExoticComponent<ComponentType<any>>;
};

const LazyRoute = ({ component: Component }: Props) => (
  <Suspense
    fallback={
      <div className="flex justify-center p-8">
        <Spin size="large" />
      </div>
    }
  >
    <Component />
  </Suspense>
);

export default LazyRoute;