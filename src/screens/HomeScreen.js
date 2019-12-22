import React from 'react';
import {Text} from 'react-native';
import {
  MainContainer,
  ScrollView,
  Header,
  FinancialBloc,
  TeamBloc,
  SaleGraph,
  PaymentGraph,
  ProfileWrapper,
  ProfileAvatar,
  NotificationIcon,
} from './HomeScreen.styled';

export default function HomeScreen() {
  return (
    // <MainContainer>
    <ScrollView>
      <Header>
        <ProfileWrapper>
          <ProfileAvatar
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
            title="MT"
          />
        </ProfileWrapper>
        <Text>Header</Text>
      </Header>
      <FinancialBloc>
        <Text>Finance</Text>
      </FinancialBloc>
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
