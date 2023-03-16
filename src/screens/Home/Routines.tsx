import React, {useState} from 'react';
import {View} from 'react-native';
import Routine from '../../components/Routine';
import styled from 'styled-components/native';

const RoutinesContainer = styled(View)`
  flex-direction: row;
  padding: 15px;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #fdfcff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
`;

function Routines(): JSX.Element {
  const [morningRoutineFlag, setMorningRoutineFlag] = useState<boolean>(true);
  const [nightRoutineFlag, setNightRoutineFlag] = useState<boolean>(false);
  return (
    <RoutinesContainer>
      <Routine
        title="Morning Routine"
        icon={require('../../assets/morning.png')}
        iconStyle={{height: 55.88, width: 63}}
        days="Weekdays"
        time="7:00 AM"
        flagValue={morningRoutineFlag}
        setFlagValue={setMorningRoutineFlag}
      />
      <Routine
        title="Night Routine"
        icon={require('../../assets/moon.png')}
        iconStyle={{height: 41.62, width: 28.9}}
        days="Everyday"
        time="9:00 PM"
        flagValue={nightRoutineFlag}
        setFlagValue={setNightRoutineFlag}
        nightMode
      />
    </RoutinesContainer>
  );
}

export default Routines;
