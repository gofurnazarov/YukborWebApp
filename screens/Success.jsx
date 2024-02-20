function Success() {
   const location = ReactRouter.useLocation();

   React.useEffect(() => {
      // Function to dynamically load the Telegram script
      const loadTelegramScript = (dataPost) => {
         const script = document.createElement('script');
         script.src = 'https://telegram.org/js/telegram-widget.js?22';
         script.async = true;
         script.setAttribute('data-telegram-post', dataPost);
         script.setAttribute('data-width', '100%');
         
         document.querySelector('.alert-embed').appendChild(script);
      };

      console.log(location)
      
      location.state.forEach((msg) => {
         let id = msg.messageId;
         let group = msg.group.replace('@', '');

         if(group != 'yukborelonlar') {
            loadTelegramScript(group +'/'+ id)
         }
      })
  
      // Clean up the scripts when the component unmounts
      return () => {
        document.querySelectorAll('.alert-embed script').forEach(script => script.remove());
      };
    }, []);

   return (
      <div>
         <header class="header">
            <div class="container">
               <a href="/"><ArrowLeft /></a> 
               <h5 class="header-title">E'loningiz Joylandi!</h5>
            </div>
         </header>
         <main class="container no-padding">
            <p class="alert-text">E'loningiz Yukbor ilovasiga muvaffaqiyatli joylandi va shuningdek quyidagi Telegram guruhlariga ham tarqatildi.</p>
            <div class="alert-embed">
               <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post="yuklar_markazi_pitak_uz/1200115" data-width="100%"></script>
               <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post="yuklar_markazi_pitak_uz/1200114" data-width="100%"></script>
               <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post="yuklar_markazi_pitak_uz/1200113" data-width="100%"></script>
            </div>
         </main>
      </div>
   );
}