import React from 'react';
import {Text} from 'react-native';
import Currency from '../common/Currency';
import {
  MainContainer,
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
  Finance,
} from './HomeScreen.styled';

const FinanceButton = ({
  title,
  value,
  action,
  chevronOrientation = 'left',
  highlight = false,
}) => (
  <Finance.FinanceBtn onPress={action}>
    {chevronOrientation === 'left' && (
      <Finance.FinanceBtnChevron chevronOrientation="left" />
    )}
    <Finance.FinanceBtnContentWrapper>
      <Finance.FinanceBtnValue highlight={highlight} value={value} />
      <Finance.FinanceBtnTitle>{title}</Finance.FinanceBtnTitle>
    </Finance.FinanceBtnContentWrapper>
    {chevronOrientation === 'right' && (
      <Finance.FinanceBtnChevron chevronOrientation="right" />
    )}
  </Finance.FinanceBtn>
);

export default function HomeScreen() {
  return (
    // <MainContainer>
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
        <Text>Header</Text>
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
      <TeamBloc>
        <Text>Team</Text>
      </TeamBloc>

      <SaleGraph>
        <Text>Graph Sales</Text>
      </SaleGraph>

      <PaymentGraph>
        <Text>Payment Graph</Text>
      </PaymentGraph>
    </ScrollView>
    // </MainContainer>
  );
}

HomeScreen.navigationOptions = ({navigation}) => ({
  title: 'Home',
  headerRight: <NotificationIcon value={navigation.getParam('itemsTotal')} />,
});
