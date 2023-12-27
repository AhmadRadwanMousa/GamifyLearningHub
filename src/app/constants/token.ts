import { jwtDecode } from 'jwt-decode';

export function getToken() {
  const decodedToken: string | null = localStorage.getItem('token');
  if (decodedToken) {
    return jwtDecode(decodedToken);
  } else {
    return null;
  }
}
