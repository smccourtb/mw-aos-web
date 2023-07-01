import Meta from '@/components/Meta';
import { meta } from '@/configuration/meta';

export default function Head() {
  return <Meta title={meta.app.title} description={meta.app.description} />;
}
