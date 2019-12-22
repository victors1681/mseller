import React from 'react';
import {Text} from 'react-native';
import Currency from '../common/Currency';
import {FinanceButton, ChatAvatarList} from '../components/Home';
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

export default function HomeScreen() {
  return (
    <ScrollView>
      <Header>
        <ProfileWrapper>
          <ProfileAvatar
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
            title="MT"
          />
          <ProfileName>Victor Santos</ProfileName>
          <CompanyName>IT Soluclick</CompanyName>
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

      <SaleGraph>
        <Text>Graph Sales</Text>
      </SaleGraph>

      <PaymentGraph>
        <Text>Payment Graph</Text>
      </PaymentGraph>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = ({navigation}) => ({
  title: 'Home',
  headerRight: <NotificationIcon value={navigation.getParam('itemsTotal')} />,
});
