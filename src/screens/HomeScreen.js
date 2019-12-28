import React from 'react';
import {Ac} from 'react-native';
import Currency from '../common/Currency';
import {FinanceButton, ChatAvatarList, WaveChart} from '../components/Home';
import AvatarImage from '../components/AvatarImage';
import {
  ScrollView,
  Header,
  FinanceBloc,
  TeamBloc,
  SaleGraph,
  PaymentGraph,
  ProfileWrapper,
  ProfileAvatar,
  NotificationIcon,
  ProfileName,
  CompanyName,
  SummaryWrapper,
  SummaryTitle,
  SummaryValue,
} from './HomeScreen.styled';
import {useUserInfo} from '../hooks/useUserInfo';
import LogOutButton from '../components/LogOutButton';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
    },
  ],
};

export default function HomeScreen() {
  const {getFullUserName, getCompanyName} = useUserInfo();
  return (
    <ScrollView>
      <LogOutButton />
      <Header>
        <ProfileWrapper>
          <AvatarImage />
          <ProfileName>{getFullUserName()}</ProfileName>
          <CompanyName>{getCompanyName()}</CompanyName>
        </ProfileWrapper>
        <SummaryWrapper>
          <SummaryTitle> Sales</SummaryTitle>
          <SummaryValue value={20000.33} />
          <SummaryTitle> Payments</SummaryTitle>
          <SummaryValue value={23000.33} />
        </SummaryWrapper>
      </Header>
      <FinanceBloc>
        <FinanceButton
          title="Account receivable"
          value={23450.94}
          action={() => ({})}
        />
        <FinanceButton
          highlight
          chevronOrientation="right"
          title="Account receivable"
          value={23450.94}
          action={() => ({})}
        />
      </FinanceBloc>
      <ChatAvatarList />
      <WaveChart title="Sales" data={data} />
      <WaveChart title="Payments" data={data} />
    </ScrollView>
  );
}

HomeScreen.navigationOptions = ({navigation}) => ({
  title: 'Home',
  headerStyle: {
    shadowColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerRight: <NotificationIcon value={navigation.getParam('itemsTotal')} />,
});
