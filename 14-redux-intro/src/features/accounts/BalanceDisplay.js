// import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

function formatCurrency(value) {
	return new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
	}).format(value);
}

// function BalanceDisplay({ balance }) {
function BalanceDisplay() {
	const account = useSelector((store) => store.account);
	return <div className="balance">{formatCurrency(account.balance)}</div>;
}

/* Legacy way of connecting components to Redux store */
/**
 * Subscribes the component to the Redux store. It specifies which pieces of the state the component needs as props. In this case, we are only interested in the balance from the account slice of the state, so we return an object with a balance property that is equal to state.account.balance.
 */
// function mapStateToProps(state) {
// 	return {
// 		balance: state.account.balance,
// 	};
// }

/**
 * The connect() function connects a React component to the Redux store. It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.
 *
 * connect() accepts up to four arguments, all of which are optional:
 * 1. mapStateToProps: If this argument is specified, the component will subscribe to Redux store updates. Any time the store is updated, mapStateToProps will be called. It should return an object that will be merged as props to the connected component.
 * 2. mapDispatchToProps: If an object is passed, each function inside it will be assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props.
 * 3. mergeProps: If specified, it will be used instead of the default mergeProps implementation provided by connect.
 * 4. options: If specified, it is an object that can contain any of the following options:
 *    - pure (boolean): If true, the component will not re-render when its props have not changed. Defaults to true.
 *    - areStatesEqual (function): If specified, it will be used to determine if the Redux store state has changed. It should return true if the states are equal, and false otherwise.
 *    - areOwnPropsEqual (function): If specified, it will be used to determine if the ownProps have changed. It should return true if the ownProps are equal, and false otherwise.
 *    - areStatePropsEqual (function): If specified, it will be used to determine if the stateProps have changed. It should return true if the stateProps are equal, and false otherwise.
 *    - areMergedPropsEqual (function): If specified, it will be used to determine if the mergedProps have changed. It should return true if the mergedProps are equal, and false otherwise.
 *
 * The connect() function returns a higher-order component that you can use to wrap your component. The resulting component will subscribe to the Redux store and will receive the specified pieces of the state and dispatch functions as props.
 *
 * In this example, we are only using the mapStateToProps argument to specify that we want to receive the balance from the account slice of the state as a prop in our BalanceDisplay component.
 */
// export default connect(mapStateToProps)(BalanceDisplay);
export default BalanceDisplay;
