/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
import { useLocation } from 'react-router';

export default function withRouter(Child) {
  return (props) => {
    const location = useLocation();
    return <Child {...props} location={location} />;
  };
}
