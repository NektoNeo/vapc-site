export const goToLink = (link, type = '_blank') => {
  return window.open(
    link,
    type
  );
}