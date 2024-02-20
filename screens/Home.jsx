function Home() {
   const navigate = ReactRouter.useNavigate();

   const [location, setLocation] = React.useState('');
   const [destination, setDestination] = React.useState('');
   const [weight, setWeight] = React.useState('');
   const [weightUnit, setWeightUnit] = React.useState('t');
   const [price, setPrice] = React.useState('');
   const [priceCurrency, setPriceCurrency] = React.useState('UZS');
   const [truckType, setTruckType] = React.useState('');
   const [truckBodyType, setTruckBodyType] = React.useState('any');
   const [info, setInfo] = React.useState('');
   const [formatedPhoneNumber, setFormatedPhoneNumber] = React.useState('998');
   const [phoneNumber, setPhoneNumber] = React.useState('');
   
   const [spinnerVisible, setSpinnerVisible] = React.useState(false);
   const [directionsCode, setDirectionsCode] = React.useState('');
   const [directionsTitle, setDirectionsTitle] = React.useState('');
   const [directionsVisible, setDirectionsVisible] = React.useState(false);

   const disabled = React.useMemo(() => {
      if(location && destination && weight && phoneNumber) {
         return false;
      }

      return true;
   }, [location, destination, weight, phoneNumber])

   async function handleSubmit() {
      setSpinnerVisible(true);
      
      let data = { 
         phone_number: phoneNumber,
         location: location, 
         destination: destination, 
         weight: weight, 
         weight_unit: weightUnit,
         price: price, 
         price_currency: priceCurrency, 
         truck_type: truckType, 
         truck_body_type: truckBodyType, 
         info: info
      };

      console.log(data)

      let response = await request.post('/ad/web', data)

      if(response.status == '200') 
      {
         const data = await response.json();

         navigate('/success', { state: data.result })
      } 
      else 
      {
         let error = await response.text();
         console.log(error)
         
         }
      
   }

   return (
      <div>
         <header class="header">
            <div class="container">
               <Logo />
               <h5 class="header-title">E'lon Berish</h5>
            </div>
         </header>
         <main class="container">
            <form class="form" action="POST">
               <label class="input-label">Yukni olish va yetkazish manzili *</label>
               <div class="input-group">
                  <Picker 
                     class="input-left" 
                     placeholder="Olish manzili"
                     onFocus={() => {
                        setDirectionsCode('location')
                        setDirectionsTitle('Yukni olish manzili')
                        setDirectionsVisible(true)
                     }}
                     value={prettyLocation(location, 'all', 'auto')}
                  />
                  <Picker 
                     class="input-right" 
                     placeholder="Yetkazish manzili"
                     onFocus={() => {
                        setDirectionsCode('destination')
                        setDirectionsTitle('Yukni yetkazish manzili')
                        setDirectionsVisible(true)
                     }}
                     value={prettyLocation(destination, 'all', 'auto')}

                  />
               </div>

               <label class="input-label">Yuk og'irligi *</label>
               <div class="input-group">
                  <input 
                     type="number" 
                     inputmode="numeric" 
                     class="input input-left" 
                     max="1"
                     length="2"
                     onChange={(e) => setWeight(e.target.value)}
                  />
                  <select class="input input-right" onChange={(e) => setWeightUnit(e.target.value)}>
                     <option value="t" selected>tonna</option>
                     <option value="kg" >kilogarm</option>
                  </select>
               </div>

               <label class="input-label">Narxi</label>
               <div class="input-group">
                  <input 
                     type="number" 
                     inputmode="numeric" 
                     class="input input-left" 
                     max="1"
                     length="2"
                     onChange={(e) => setPrice(e.target.value)}
                  />
                  <select class="input input-right" onChange={(e) => setPriceCurrency(e.target.value)}>
                     <option value="UZS" selected>UZS</option>
                     <option value="USD" >USD</option>
                     <option value="EUR" >EUR</option>
                     <option value="RUB" >RUB</option>
                  </select>
               </div>

               <label class="input-label">Yuk mashina kuzov turi</label>
               <select class="input" onChange={(e) => setTruckBodyType(e.target.value)}>
                  <option value="any" selected>Farqi yo'q</option>
                  <option value="tentli" >Tentli</option>
                  <option value="bortli" >Bortli</option>
                  <option value="refrijerator" >Refrijerator</option>
                  <option value="konteyner" >Konteyner</option>
                  <option value="samosval" >Samosval</option>
                  <option value="ploshadka" >Ploshadka</option>
                  <option value="shalanda" >Shalanda</option>
               </select>

               <label class="input-label">Qo'shimcha ma'lumot</label>

               <textarea class="input" onChange={(e) => setInfo(e.target.value)}></textarea>
               <DirectionPicker 
                  title={directionsTitle} 
                  visible={directionsVisible}
                  onChange={(value) => {
                     if(directionsCode == 'location') setLocation(value)
                     if(directionsCode == 'destination') setDestination(value)
                     setDirectionsVisible(false)
                  }}
               />
               
               <label class="input-label">Aloqa uchun telefon *</label>
               
               <div class="relative">
                  <span>+</span>
                  <input 
                     type="text" 
                     inputmode="numeric" 
                     class="input input-tel" 
                     onChange={(e) => {
                        let result = formatPhone(e.target.value);

                        setFormatedPhoneNumber(result.formatted)
                        setPhoneNumber(result.phone)
                     }}
                     value={formatedPhoneNumber}
                  />
               </div>

               <button 
                  type="button" 
                  disabled={disabled}
                  onClick={handleSubmit}
               >
                  Yuk E'lonini Joylash
               </button>
            </form>
         </main>
         <Spinner visible={spinnerVisible} />
      </div>
   );
}