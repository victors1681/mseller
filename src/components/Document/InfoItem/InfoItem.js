import React, {useEffect} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import styled from 'styled-components';
import {ActivityIndicator} from 'react-native';
import {ListItem, Input} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import {GET_DOCUMENT_SEQUENCE, UPDATE_DOCUMENT_INFO} from '../../../graphql';

export const CardHolder = styled(ListItem).attrs(({theme}) => ({
  friction: 90,
  tension: 100,
  activeScale: 0.95,
  titleStyle: {color: theme.colors.grey2, fontSize: theme.font.size.medium},
  subtitleStyle: {color: theme.colors.grey3, fontSize: theme.font.size.regular},
  chevron: {color: theme.colors.primary},
}))``;

const InfoItem = () => {
  const {data: sequenceData, loading} = useQuery(GET_DOCUMENT_SEQUENCE, {
    variables: {
      sellerCode: '24',
      documentType: 'invoice',
    },
    fetchPolicy: 'network-only',
  });
  const [updateDocumentInfo, {data: documentDataInfo}] = useMutation(
    UPDATE_DOCUMENT_INFO,
  );

  useEffect(() => {
    if (sequenceData) {
      const documentId =
        sequenceData.docSequence && sequenceData.docSequence.sequenceGenerated;
      const documentType =
        sequenceData.docSequence && sequenceData.docSequence.documentType;

      updateDocumentInfo({
        variables: {
          documentInfo: {documentId, documentType},
        },
      });
    }
  }, [sequenceData]);
  //   console.log('datadata', documentInfo);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <CardHolder
      Component={TouchableScale}
      title={`No. ${documentDataInfo &&
        documentDataInfo.updateDocumentInfo.documentId}`}
      subtitle={
        documentDataInfo && documentDataInfo.updateDocumentInfo.documentType
      }
    />
  );
};

export default InfoItem;
