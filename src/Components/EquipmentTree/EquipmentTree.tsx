import {
  RuxContainer,
  RuxStatus,
  RuxTree,
  RuxTreeNode,
} from '@astrouxds/react';
import { Status } from '@astrouxds/mock-data';
import equipment from '../../data/equipment.json';
import './EquipmentTree.css';
import { Equipment } from '../../Types/Equipment';
import { Dispatch, SetStateAction } from 'react';

type PropTypes = {
  selectedEquipment: Equipment[];
  setSelectedEquipment: Dispatch<SetStateAction<Equipment[]>>;
};

const EquipmentTree = ({
  selectedEquipment,
  setSelectedEquipment,
}: PropTypes) => {
  const handleSelectEquipment = (equipmentItem: Equipment) => {
    //? I'm not sure why the first one doesn't work. In theory it should
    if (selectedEquipment.includes(equipmentItem)) return;
    for (const item of selectedEquipment) {
      if (item.equipmentString === equipmentItem.equipmentString) return;
    }
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
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
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
                equipmentItem.category === 'digital' && (
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
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
                equipmentItem.category === 'facilities' && (
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
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
                equipmentItem.category === 'rf' && (
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
                  <RuxTreeNode
                    key={equipmentItem.id}
                    slot='node'
                    onRuxtreenodeselected={() =>
                      handleSelectEquipment(
                        equipmentItem as unknown as Equipment
                      )
                    }
                  >
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
