import React from 'react';
import { BehaviorSubject } from 'rxjs';

export const withObservable = (observable, initialState) => Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);        
      this.state = {
        ...initialState,
      };
    }

    componentDidMount() {
      this.subscription = observable.subscribe(newState =>
        this.setState({ ...newState }),
      );
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return (
        <Component {...this.props} {...this.state} />
      );
    }
  };
};
