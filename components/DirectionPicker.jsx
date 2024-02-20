function DirectionPicker(props) {
   const [country, setCountry] = React.useState('');
   const [region, setRegion] = React.useState('');
   const [district, setDistrict] = React.useState('');
   
   const [lang, setLang] = React.useState('uz');
   const [regions, setRegions] = React.useState([]);
   const [districts, setDistricts] = React.useState([]);

   function resetInputs() {
      document.getElementById('countries').value = '';
      document.getElementById('regions').value = '';
      document.getElementById('districts').value = '';
   }

   React.useEffect(() => {
      switch (country) {
         case 'KZ':
            setRegions(kz.regions)
            break;
         case 'RU':
            setRegions(ru.regions)
            break;
         case 'TR':
            setRegions(tr.regions)
            break;
         default:
            setRegions(uz.regions)
            break;
      }

      if(country == 'UZ') {
         setLang('uz')
      } else {
         setLang('ru')
      }

      setDistricts([])
   }, [country])

   React.useEffect(() => {
      if(country && region)
      {
         switch (country) {
            case 'KZ':
               var dcts = kz.districts.filter((d) => d.includes(region))
               setDistricts(dcts)
               break;
            case 'RU':
               var dcts = ru.districts.filter((d) => d.includes(region))
               setDistricts(dcts)
               break;
            case 'TR':
               var dcts = tr.districts.filter((d) => d.includes(region))
               setDistricts(dcts)
               break;
            default:
               var dcts = uz.districts.filter((d) => d.includes(region))
               setDistricts(dcts)
               break;
         }
      }
   }, [region])

   return (
      <div class="alert" style={props.visible ? null : {display: 'none'}}>
         <div class="alert-content">
            <h5>{props.title}</h5>
            <select 
               id="countries"
               class="input" 
               onChange={(e) => {
                  let value = xmlToObject(e.target.value);

                  if(value.country) setCountry(value.country.code)
               }}
            >
               <option value="" >Mamlakatni tanlang</option>
               {countries.map(c => {
                  return (
                     <option value={c} >{ prettyLocation(c, 'country', 'uz') }</option>
                  )
               })}
            </select>
            <select 
               id="regions"
               class="input"
               onChange={(e) => setRegion(e.target.value)}
            >
               <option value="" >Viloyatni tanlang</option>
               {regions.map(r => {
                  return (
                     <option value={r} >{ prettyLocation(r, 'region', lang) }</option>
                  )
               })}
            </select>
            <select 
               id="districts"
               class="input"
               onChange={(e) => {
                  props.onChange(e.target.value)
                  resetInputs()
               }}
            >
               <option value="" selected>Tumanni tanlang</option>
               {districts.map(r => {
                  return (
                     <option value={r} >{ prettyLocation(r, 'district', lang) }</option>
                  )
               })}
            </select>
         </div>
      </div>
   );
}