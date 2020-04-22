import React, { useContext } from 'react';
import StoreContext from './StoreContext';

export const storeProvider = (extraprops = () => ({})) => Component => {
  const WithStore = props => {
    const store = useContext(StoreContext);
    return <Component {...props} {...extraprops(store, props)} store={store} />;
  };
  WithStore.displayName = Component.name + 'Container';
  return React.memo(WithStore);
};

export default storeProvider;
