import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import countries from '@/lib/countries.json';

export const config = {
  runtime: 'edge',
};

const edge = async (req: NextRequest) => {
  const { nextUrl: url, geo } = req;
  const country = geo?.country || 'N/A';
  const city = geo?.city || 'N/A';
  const region = geo?.region || 'N/A';
  const countryInfo = countries.find((x) => x.cca2 === country);
  const flag = countryInfo?.flag || 'N/A';

  return NextResponse.json({
    url,
    country,
    region,
    city,
    flag,
  });
};

export default edge;
