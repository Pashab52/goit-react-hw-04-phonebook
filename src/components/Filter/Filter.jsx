
import PropTypes from 'prop-types';
import css from './Filter.module.css' 
  
export function Filter(props) {

 
    return (
      <div className={css.filter}>
        <label>
          Find contacts by name <br />
          <input
            type="text"
            name="name"
            value={props.value}
            onChange={event => props.onFilterChange(event.currentTarget.value)}
          />
        </label>
             </div>
    );
  }



 Filter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
  

// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import css from './Filter.module.css';

// export class Filter extends Component {
//   static propTypes = {
//     onFilterChange: PropTypes.func.isRequired,
//     value: PropTypes.string.isRequired,
//   };

//   filterChangeHandler = event => {
//     this.props.onFilterChange(event.currentTarget.value);
//   };

//   render() {
//     return (
//       <div className={css.filter}>
//         <label>
//           Find contacts by name <br />
//           <input
//             type="text"
//             name="name"
//             value={this.props.value}
//             onChange={this.filterChangeHandler}
//           />
//         </label>
//         {/* <button type="submit">sdfsf</button> */}
//       </div>
//     );
//   }
// }