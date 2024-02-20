function Picker(props) {
   return (
      <div class="input-select">
         <input 
            type="text" 
            className={"input " + props.class} 
            placeholder={props.placeholder}
            onFocus={props.onFocus}
            value={props.value}
         />
         <select></select>
      </div>
   );
}