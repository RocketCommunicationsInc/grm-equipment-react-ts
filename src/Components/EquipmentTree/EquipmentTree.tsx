import {
  RuxContainer,
  RuxStatus,
  RuxTree,
  RuxTreeNode,
} from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
// import { Equipment, Job } from '../../Types/Equipment';
import { useState } from 'react';
import { capitalize } from '../../utils';
import './EquipmentTree.css';

const EquipmentTree = () => {
  const { state, dispatch }: any = useAppContext();
  const [equipment, setEquipment] = useState(null);

  // const selectedEquipment = (id: number) => {
  //   for (const item of state.equipment) {
  //     console.log(item, 'item');
  //     if (item.scheduledJobs.some((job: Job) => job.jobId === id)) {
  //       return item;
  //     }
  //   }
  //   return null;
  // };

  // const handleSelectedEquipment = (equipment: any) => {
  //   dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
  //   setEquipment(equipment);
  // };
  // console.log(state, 'state');

  // const handleSelectedEquipment = (category: string, index: string) => {
  //   const selectedJob = state.equpimentByCategory[category][index];
  //   console.log(selectedJob);

  //   // const mainEquipment = state.equipment.find(
  //   //   (equipmentParent: any) =>
  //   //   equipmentParent.equipment === selectedJob.equipment
  //   //   console.log(equipmentParent, "plz")
  //   //   );
  //   setEquipment(equipment);

  //   dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
  // };
  // console.log(state);

  const handleSelectedEquipment = (
    category: string
    // config: string,
    // jobId: any
  ) => {
    const selectedEquipment = state.equpimentByCategory[category];
    //    const selectedEquipment = state.equpimentByCategory[category][config];
    console.log(state.equpimentByCategory[category], 'selected equip');
    setEquipment(equipment);
    dispatch({ type: 'CURRENT_EQUIPMENT', payload: selectedEquipment });
  };
  console.log(equipment, 'equipment');

  // const handleSelectedEquipment = (
  //   category: string,
  //   index: number,
  //   id: number
  // ) => {
  //   // const selectedJob = state.equpimentByCategory[category][
  //   //   index
  //   // ].scheduledJobs.find((job: any) => job.jobId === id);

  //   const selectedEquip = state.equipment.find((item: any) =>
  //     item.scheduledJobs.some((job: any) => job.jobId === id)
  //   );
  //   console.log(selectedEquip, 'equip that is selected plz');

  //   let selectedEquipment = null;
  //   // for (const category in state.equpimentByCategory) {
  //   //   if (state.equpimentByCategory.hasOwnProperty(category)) {
  //   //     const equipByCategory = state.equpimentByCategory[category];
  //   //     console.log(equipByCategory);
  //   //     // for (const jobsByCategory of equipByCategory) {
  //   //     //   for (const item of jobsByCategory) {
  //   //     //     if (item.scheduledJobs.some((job: any) => job.jobId === id)) {
  //   //     //       selectedEquipment = item;
  //   //     //     }
  //   //     //   }
  //   //     // }
  //   //   }
  //   //   if (selectedEquipment) {
  //   //     setEquipment(selectedEquipment);
  //   //   }
  //   // }
  //   dispatch({ type: 'CURRENT_EQUIPMENT', payload: selectedEquip });
  // };

  return (
    <RuxContainer className='equipment-tree'>
      <RuxTree>
        {Object.keys(state.equpimentByCategory).map((category) => (
          <RuxTreeNode key={category}>
            {category === 'rf' ? category.toUpperCase() : capitalize(category)}
            {Object.keys(state.equpimentByCategory[category]).map((config) => (
              <RuxTreeNode slot='node' key={`${category}${config}`}>
                Component {config}
                {Object.values(state.equpimentByCategory[category][config]).map(
                  (job: any, i: any) => (
                    <RuxTreeNode
                      key={`${category}${config}${i}`}
                      slot='node'
                      onRuxtreenodeselected={() =>
                        handleSelectedEquipment(category)
                      }
                    >
                      <RuxStatus slot='prefix' status={job.equipmentStatus} />
                      A-{job.equipment}
                    </RuxTreeNode>
                  )
                )}
              </RuxTreeNode>
            ))}
          </RuxTreeNode>
        ))}
      </RuxTree>
    </RuxContainer>
  );
};

export default EquipmentTree;
