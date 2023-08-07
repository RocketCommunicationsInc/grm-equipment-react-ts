import { RuxBreadcrumb, RuxBreadcrumbItem } from '@astrouxds/react';
import { useMatches, useParams, useNavigate } from 'react-router-dom';
import './BreadcrumbNav.css';
import { capitalize } from '../../utils';
import SearchBar from '../SearchBar/SearchBar';

export const BreadcrumbNav = () => {
  const navigate = useNavigate();
  const params = useParams();
  const matches = useMatches();
  if (matches.length === 0) return null;

  const filteredMatches = matches.filter(
    (match) => match.pathname.slice(-1) !== '/' && match.pathname !== '/alerts'
  );

  const getLastPath = (pathname: string) => {
    const index = pathname.lastIndexOf('/');
    const lastPath = pathname.substring(index + 1);

    if (lastPath.length === 36) {
      if (params.alertId) return `Alert ${lastPath} Details`;
      if (params.contactId) return `Contact ${lastPath} Details`;
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
      <SearchBar
        searchValue={''}
        setSearchValue={function (value: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};
