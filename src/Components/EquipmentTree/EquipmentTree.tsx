import {
  RuxContainer,
  RuxStatus,
  RuxTree,
  RuxTreeNode,
} from '@astrouxds/react';
import { Status } from '@astrouxds/mock-data';
import equipment from '../../data/equipment.json';
import './EquipmentTree.css';
import { useState } from 'react';
import { Equipment } from '../../Types/Equipment';

const EquipmentTree = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);

  const handleSelectedEquipment = (equipmentItem: Equipment) => {
    setSelectedEquipment([...selectedEquipment, { ...equipmentItem }]);
  };
  return (
    <RuxContainer className='equipment-tree'>
      <RuxTree>
        <RuxTreeNode>
          Comms
          <RuxTreeNode slot='node'>
            Component A
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'A' &&
                equipmentItem.category === 'comms' && (
                  <RuxTreeNode
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectedEquipment(equipmentItem as any)
                    }
                  >
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    A-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component B
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'B' &&
                equipmentItem.category === 'comms' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    B-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component C
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'C' &&
                equipmentItem.category === 'comms' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    C-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component D
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'D' &&
                equipmentItem.category === 'comms' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    D-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component E
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'E' &&
                equipmentItem.category === 'comms' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    E-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
        </RuxTreeNode>
        <RuxTreeNode>
          Digital
          <RuxTreeNode slot='node'>
            Component A
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'A' &&
                equipmentItem.category === 'digital' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    A-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component B
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'B' &&
                equipmentItem.category === 'digital' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    B-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component C
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'C' &&
                equipmentItem.category === 'digital' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    C-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component D
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'D' &&
                equipmentItem.category === 'digital' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    D-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component E
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'E' &&
                equipmentItem.category === 'digital' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    E-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
        </RuxTreeNode>
        <RuxTreeNode>
          Facilities
          <RuxTreeNode slot='node'>
            Component A
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'A' &&
                equipmentItem.category === 'facilities' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    A-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component B
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'B' &&
                equipmentItem.category === 'facilities' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    B-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component C
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'C' &&
                equipmentItem.category === 'facilities' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    C-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component D
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'D' &&
                equipmentItem.category === 'facilities' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    D-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component E
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'E' &&
                equipmentItem.category === 'facilities' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    E-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
        </RuxTreeNode>
        <RuxTreeNode>
          RF
          <RuxTreeNode slot='node'>
            Component A
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'A' &&
                equipmentItem.category === 'rf' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    A-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component B
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'B' &&
                equipmentItem.category === 'rf' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    B-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component C
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'C' &&
                equipmentItem.category === 'rf' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    C-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component D
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'D' &&
                equipmentItem.category === 'rf' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    D-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
          <RuxTreeNode slot='node'>
            Component E
            {equipment.map(
              (equipmentItem) =>
                equipmentItem.config === 'E' &&
                equipmentItem.category === 'rf' && (
                  <RuxTreeNode slot='node'>
                    <RuxStatus
                      slot='prefix'
                      status={equipmentItem.status as Status | undefined}
                    />
                    E-{equipmentItem.equipmentString}
                  </RuxTreeNode>
                )
            )}
          </RuxTreeNode>
        </RuxTreeNode>
      </RuxTree>
    </RuxContainer>
  );
};

export default EquipmentTree;
