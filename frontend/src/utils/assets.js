// Utility to get the correct asset path for GitHub Pages
export const getAssetPath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // In production (GitHub Pages), we need to include the base path
  if (import.meta.env.MODE === 'production') {
    return `/teva-naot/${cleanPath}`;
  }

  // In development, use the regular path
  return `/${cleanPath}`;
};
