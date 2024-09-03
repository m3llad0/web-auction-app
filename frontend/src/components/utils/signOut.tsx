import Cookies from 'js-cookie';

export function signOut(redirect: any) {
  // Remove the token from cookies
  Cookies.remove('token');
  
  // Redirect the user to the login page or home page
  if (redirect) {
    redirect();
  }
}
