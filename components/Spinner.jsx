function Spinner(props) {
   return (
      <div class="spinner-container" style={props.visible ? null : {display: 'none'}}>
         <span class="spinner"></span>
      </div>
   )
}