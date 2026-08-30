export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();
  
  const exceptionPaths = [
    localePath('/'), 
    localePath('login'),
    localePath('register'),
    localePath('reset_password'),
    localePath('dictionary')
  ];

  const auth = useAuthStore();

  /**
   * home sayfası dışında diğer exceptionPath arrayindeki url ile başlayan alt urlleri çözüyor
   */
  const isExceptionPath = exceptionPaths.some(path => {
    if (path === localePath('/')) {
      return to.path === path;
    }

    return to.path.startsWith(path);
  });

  // Tokeni yoksa(login değilse) ve exceptionPath olarak seçilenler hariç diğer tüm url erişimi kısıtlar
  if (!isExceptionPath && !auth.token) {
    return navigateTo(localePath('login'));
  }

  // Token'ı olup login sayfasına erişim engeli
  const isAuthPage = to.path.includes('/login') || to.path.includes('/giris');
  
  if (isAuthPage && auth.token) {
    return navigateTo(localePath('/'));
  }
})