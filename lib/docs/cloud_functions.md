# ☁️ Cloud functions

[Vercel](https://vercel.com/) provides a serverless functions that allows to run code on-demand
in response to incoming HTTP requests without having to manage infrastructure. Read more about
[Edge functions](https://vercel.com/docs/concepts/functions/edge-functions).

Any file inside `./pages/api/` folder is mapped to `/api/*` and will be treated as an API endpoint instead of a page.
Those functions are server-side only and won't increase your client-side bundle size.

Check out `./pages/api/edge.ts`

```typescript
/* This example shows how to use the request.geo
   object to determine a user's location. */

export const config = {
  runtime: 'edge',
};

const edge = async (req: NextRequest) => {
  const { nextUrl: url, geo } = req;
  const country = geo?.country || 'US';
  const city = geo?.city || 'San Francisco';
  const region = geo?.region || 'CA';
  const countryInfo = countries.find((x) => x.cca2 === country);
  const flag = countryInfo?.flag;

  return NextResponse.json({ url, country, region, city, flag });
};

export default edge;
```
