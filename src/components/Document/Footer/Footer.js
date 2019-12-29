import React, {useEffect, useRef} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import styled from 'styled-components';
import {Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import get from 'lodash/get';
import {
  GET_CURRENT_DOCUMENT,
  UPDATE_DOCUMENT_INFO,
  RESET_CURRENT_DOCUMENT,
} from '../../../graphql';

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

export const ClearButton = styled(Button).attrs(({theme}) => ({
  titleStyle: {
    fontSize: theme.font.size.medium,
    margin: 4,
    color: theme.colors.error,
  },
  buttonStyle: {
    borderColor: theme.colors.error,
  },
  containerStyle: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
}))``;

const Footer = () => {
  const observationRef = React.createRef();
  const annotationRef = React.createRef();
  const {data: currentDocument} = useQuery(GET_CURRENT_DOCUMENT);

  const [updateDocumentInfo] = useMutation(UPDATE_DOCUMENT_INFO);
  const [resetCurrentDocument] = useMutation(RESET_CURRENT_DOCUMENT);

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

  const handleConfirmation = () => {
    Alert.alert(
      'Reset Current Document',
      'Are you sure you want to create a new empty document?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => resetCurrentDocument()},
      ],
      {cancelable: true},
    );
  };

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
      <ClearButton
        type="outline"
        title="Clear Document"
        onPress={handleConfirmation}
      />
    </ItemListFooterWrapper>
  );
};

export default Footer;
