import { useMemo, useCallback, useState } from 'react';
import { RuxCheckbox, RuxIcon } from '@astrouxds/react';
import AlertListItem from './AlertsListItem';
import type { Category, Status, Alert } from '@astrouxds/mock-data';
import { useTTCGRMActions, useTTCGRMAlerts } from '@astrouxds/mock-data';

type SortDirection = 'ASC' | 'DESC';

type PropTypes = {
  severitySelection: Status | 'all';
  categorySelection: Category | 'all';
};

const AlertsList = ({ severitySelection, categorySelection }: PropTypes) => {
  const { dataArray: alertsArray, dataById: alerts } = useTTCGRMAlerts();
  const { allAlertsHaveProp, anyAlertsHaveProp, modifyAllAlerts } =
    useTTCGRMActions();
  const allSelected = allAlertsHaveProp('selected', true);
  const selectAll = () => modifyAllAlerts({ selected: true });
  const selectNone = () => modifyAllAlerts({ selected: false });
  const anySelected = anyAlertsHaveProp('selected', true);
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');
  const [sortProp, setSortProp] = useState<keyof Alert>('id');

  const filterAlerts = useCallback(
    (
      alertsArray: Alert[],
      severity: Status | 'all',
      category: Category | 'all'
    ) => {
      const filteredForSeverityAlerts =
        severity !== 'all'
          ? alertsArray.filter((alert) => alert.status === severity)
          : alertsArray;
      const filteredForCategoryAlerts =
        category !== 'all'
          ? filteredForSeverityAlerts.filter(
              (alert) => alert.category === category
            )
          : filteredForSeverityAlerts;
      return filteredForCategoryAlerts.map((alert) => alert.id);
    },
    []
  );

  const filteredAlertIds = useMemo(() => {
    return filterAlerts(alertsArray, severitySelection, categorySelection);
  }, [filterAlerts, alertsArray, severitySelection, categorySelection]);

  const sortAlerts = useCallback(
    (
      filteredAlertIds: string[],
      property: keyof Alert,
      sortDirection: SortDirection
    ) => {
      const newSortedAlertIds = [...filteredAlertIds].sort(
        (a: string, b: string) => {
          const firstAlert = alerts[a];
          const secondAlert = alerts[b];
          const firstAlertValue = firstAlert[property as keyof Alert];
          const secondAlertValue = secondAlert[property as keyof Alert];
          if (sortDirection !== 'ASC') {
            return String(firstAlertValue).localeCompare(
              String(secondAlertValue)
            );
          } else {
            return String(secondAlertValue).localeCompare(
              String(firstAlertValue)
            );
          }
        }
      );
      return newSortedAlertIds;
    },
    [alerts]
  );

  const displayAlertIds = useMemo(() => {
    return sortAlerts(filteredAlertIds, sortProp, sortDirection);
  }, [sortAlerts, filteredAlertIds, sortProp, sortDirection]);

  const selectAllHandler = (e: CustomEvent) => {
    const checkbox = e.target as HTMLRuxCheckboxElement;
    if (checkbox.checked === true) {
      selectAll();
    } else {
      selectNone();
    }
  };

  const handleClick = (event: any) => {
    const target = event.currentTarget as HTMLElement;
    const sortProperty = target.dataset.sortprop as keyof Alert;
    if (sortProperty === sortProp) {
      // clicked same currently sorted column
      if (sortDirection === 'ASC') {
        setSortDirection('DESC');
        sortAlerts(filteredAlertIds, sortProperty, 'DESC');
      } else {
        setSortDirection('ASC');
        sortAlerts(filteredAlertIds, sortProperty, 'ASC');
      }
    } else {
      // clicked new column
      setSortProp(sortProperty);
      sortAlerts(filteredAlertIds, sortProperty, 'ASC');
      setSortDirection('ASC');
    }
  };

  return (
    <>
      <div className='alert-list-headers'>
        <RuxCheckbox
          className='select-all-checkbox'
          onRuxchange={selectAllHandler}
          checked={allSelected}
          indeterminate={anySelected && !allSelected}
        />
        <span data-sortprop='message' onClick={handleClick}>
          Message
          <RuxIcon
            icon={sortDirection === 'ASC' ? 'arrow-drop-down' : 'arrow-drop-up'}
            size='small'
            className={sortProp === 'message' ? 'visible' : 'hidden'}
          />
        </span>
        <span data-sortprop='category' onClick={handleClick}>
          Category
          <RuxIcon
            icon={sortDirection === 'ASC' ? 'arrow-drop-down' : 'arrow-drop-up'}
            size='small'
            className={sortProp === 'category' ? 'visible' : 'hidden'}
          />
        </span>
        <span data-sortprop='timestamp' onClick={handleClick}>
          Time
          <RuxIcon
            icon={sortDirection === 'ASC' ? 'arrow-drop-down' : 'arrow-drop-up'}
            size='small'
            className={sortProp === 'timestamp' ? 'visible' : 'hidden'}
          />
        </span>
      </div>
      <ul className='alert-list'>
        {displayAlertIds.map((id) => (
          <AlertListItem alertItem={alerts[id]} key={id} />
        ))}
      </ul>
    </>
  );
};

export default AlertsList;
