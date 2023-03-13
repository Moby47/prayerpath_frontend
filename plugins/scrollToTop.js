export default ({ app }, inject) => {
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };

    const scrollToBottom = () => {
      const body = document.body;
      const html = document.documentElement;
      const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      window.scrollTo({ top: height, behavior: 'smooth' });
    };
  
    const fabButton = document.querySelector('.fab-button');
    window.addEventListener('scroll', () => {
      if (fabButton) {
        if (window.pageYOffset > 0) {
          fabButton.classList.add('show');
        } else {
          fabButton.classList.remove('show');
        }
      }
    });
  
    inject('scrollToTop', scrollToTop);
    inject('scrollToBottom', scrollToBottom);
  };
  