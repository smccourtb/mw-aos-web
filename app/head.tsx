import Meta from '@/components/Meta';
import { meta } from '@/configuration/meta';

export default function Head() {
  return (
    <Meta
      title={meta.landing.title}
      description={meta.landing.description}
      keywords={meta.landing.keywords}
    />
  );
}
