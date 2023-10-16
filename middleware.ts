export { default } from 'next-auth/middleware'

// this routes will redirect to login page if it has not signed in
// '/issues/edit/:id+' anything path has issues/edit will redirect.
export const config = {
  matcher: ['/issues/new', '/issues/edit/:id+'],
}
