import { cookies } from 'next/headers';
import { getBaseUrl } from '@/lib/getBaseUrl';

export async function getUserFromCookies() {
  const cookieStore = await cookies();

  const token = cookieStore.get('token');
  console.log('[getUser.ts] Token from cookieStore:', token?.value ? 'Found' : 'Not Found');
  if (!token?.value) return null;

  try {
    const res = await fetch(`${getBaseUrl()}/api/users/me`, {
      headers: {
        Cookie: `token=${token.value}`,
      },
      cache: 'no-store',
    });

    console.log('[getUser.ts] Fetch response status:', res.status);
    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('[getUser.ts] Failed to fetch user:', err);
    return null;
  }
}