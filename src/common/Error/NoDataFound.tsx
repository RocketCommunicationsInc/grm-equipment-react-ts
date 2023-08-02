import { useRouteError, useParams } from 'react-router-dom';
import { capitalize } from '../../utils';
import './NoDataFound.css';

type PropTypes = {
  dataType: string;
};

const NoDataFound = ({ dataType }: PropTypes) => {
  const params = useParams();
  const dataTypeParam = `${dataType}Id`;
  let error = useRouteError();
  console.error(error);

  return (
    <div className='no-data-found'>
      <h3>{`${capitalize(dataType)} with ID ${
        params[dataTypeParam]
      } is not available`}</h3>
      <a href='/'>Return to Dashboard</a>
    </div>
  );
};

export default NoDataFound;
