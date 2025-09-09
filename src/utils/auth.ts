// A simple utility function to check for a specific role.
// This assumes your user object looks something like: { name: '...', role: 'admin' }
export const hasRole = (user: any, role: string): boolean => {
  if (!user || !user.role) {
    return false;
  }
  return user.role === role;
};