import React, {useEffect, useRef} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import styled from 'styled-components';
import {Input} from 'react-native-elements';
import get from 'lodash/get';
import {GET_CURRENT_DOCUMENT, UPDATE_DOCUMENT_INFO} from '../../../graphql';

export const ItemListFooterWrapper = styled.View`
  margin-top: 30px;
`;

export const ObservationInput = styled(Input).attrs(({theme}) => ({
  multiline: true,
  numberOfLines: 2,
  inputStyle: {
    fontSize: theme.font.size.regular,
  },
  containerStyle: {
    paddingHorizontal: 0,
  },
  inputContainerStyle: {
    margin: 0,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingLeft: 6,
    borderColor: theme.colors.grey5,
    backgroundColor: theme.colors.white,
  },
}))``;
export const AnnotationInput = styled(Input).attrs(({theme}) => ({
  multiline: true,
  numberOfLines: 2,
  inputStyle: {
    fontSize: theme.font.size.regular,
  },
  containerStyle: {
    paddingHorizontal: 0,
    paddingTop: 15,
  },
  inputContainerStyle: {
    margin: 0,
    paddingTop: 5,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingLeft: 6,
    borderColor: theme.colors.grey5,
    backgroundColor: theme.colors.white,
  },
}))``;
const Annotation = () => {
  const observationRef = React.createRef();
  const annotationRef = React.createRef();
  const {data: currentDocument} = useQuery(GET_CURRENT_DOCUMENT);

  const [updateDocumentInfo, {data: documentDataInfo}] = useMutation(
    UPDATE_DOCUMENT_INFO,
  );

  const handleUpdateAnnotation = annotation => {
    updateDocumentInfo({
      variables: {
        documentInfo: {annotation},
      },
    });
  };

  const handleUpdateObservations = observations => {
    updateDocumentInfo({
      variables: {
        documentInfo: {observations},
      },
    });
  };

  useEffect(() => {
    // Initial Loading
    if (currentDocument) {
      observationRef.current.setNativeProps({
        value: currentDocument.document.observations,
      });
      annotationRef.current.setNativeProps({
        value: currentDocument.document.annotation,
      });
    }
  }, [currentDocument]);

  useEffect(() => {
    // After update fields
    if (documentDataInfo) {
      observationRef.current.setNativeProps({
        value: get(documentDataInfo, 'updateDocumentInfo.observations', ''),
      });
      annotationRef.current.setNativeProps({
        value: get(documentDataInfo, 'updateDocumentInfo.annotation', ''),
      });
    }
  }, [documentDataInfo]);
  //   console.log('datadata', documentInfo);

  return (
    <ItemListFooterWrapper>
      <ObservationInput
        placeholder="Observations"
        ref={observationRef}
        onChangeText={handleUpdateObservations}
        value={currentDocument && currentDocument.document.observations}
      />
      <AnnotationInput
        placeholder="Annotation (Internal no visible to the client)"
        ref={annotationRef}
        onChangeText={handleUpdateAnnotation}
        value={currentDocument && currentDocument.document.annotation}
      />
    </ItemListFooterWrapper>
  );
};

export default Annotation;
