import { RuxBreadcrumb, RuxBreadcrumbItem } from '@astrouxds/react';
import { useMatches, useParams, useNavigate } from 'react-router-dom';
import './BreadcrumbNav.css';
import { capitalize } from '../../utils';

export const BreadcrumbNav = () => {
  const navigate = useNavigate();
  const params = useParams();
  const matches = useMatches();
  if (matches.length === 0) return null;

  const filteredMatches = matches.filter(
    (match) =>
      match.pathname.slice(-1) !== '/' &&
      match.pathname !== '/equipment-details'
  );

  const getLastPath = (pathname: string) => {
    const index = pathname.lastIndexOf('/');
    const lastPath = pathname.substring(index + 1);

    if (lastPath.length === 36) {
      if (params.id) return ` ${lastPath}`;
    }
    return capitalize(lastPath);
  };

  return (
    <div className='breadcrumb-search-wrapper'>
      <RuxBreadcrumb className='Breadcrumb-nav'>
        <RuxBreadcrumbItem key={'Dashboard'} onClick={() => navigate('/')}>
          Dashboard
        </RuxBreadcrumbItem>
        {filteredMatches.map((match, index) => {
          return (
            <RuxBreadcrumbItem
              key={index}
              onClick={() => navigate(match.pathname)}
            >
              {getLastPath(match.pathname)}
            </RuxBreadcrumbItem>
          );
        })}
      </RuxBreadcrumb>
    </div>
  );
};
