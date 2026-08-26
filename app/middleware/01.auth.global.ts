export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();
  
  // 🎯 DİKKAT: '/login' yerine route'un adı olan 'login' veriyoruz!
  const exceptionPaths = [
    localePath('/'), 
    localePath('login'),       // Otomatik olarak tr'de /tr/giris, en'de /en/login üretir
    localePath('reset_password'), // tr'de /tr/sifre-sifirla, en'de /en/reset-password üretir
    localePath('education')    // /tr/egitim veya /en/education
  ];

  const auth = useAuthStore();

  // İstisnai sayfalarda değilse ve token yoksa doğru login sayfasına at
  if (!exceptionPaths.includes(to.path) && !auth.token) {
    return navigateTo(localePath('login'));
  }

  // Token'ı var ama login sayfalarına girmeye çalışırsa eğitime at
  const isAuthPage = to.path.includes('/login') || to.path.includes('/giris') || to.path.includes('/sifre-sifirla');
  if (isAuthPage && auth.token) {
    return navigateTo(localePath('education'));
  }
})