//formCarbon fragment contains both the form and formCarbon within the 'form'
//See CDA Playground -> PAGE > body > FormCarbonBlockRecord
import { gql } from 'graphql-request'
export const FORM_CARBON_BLOCK_FRAGMENT = gql`
  fragment FormCarbonBlockFragment on FormCarbonBlockRecord {
    id
    _modelApiKey
    anchorId
    title

    description(markdown: true)
    image {
      url
      alt
      responsiveImage(imgixParams: { auto: format }) {
        ...ResponsiveImageFragment
      }
    }
    form {
      ... on FormCarbonRecord {
        id
        _modelApiKey
        name
        requireSignature
        submitSuccessMessage
        submitErrorMessage
        submitBtnLabel
        signatureLabel
        signatureErrorMsg
        signatureClear
        requireSignature
        formErrorMsg
        fieldTypeErrorMsg
        fieldErrorMsg
        previousStepBtn
        nextStepBtn
        carbonFootprintResults
        priceCreditsTitle
        redirectionBtnUrl
        redirectionLinkBtn
        step2Title
        fromCity

        fieldset {
          ... on FormTextareaRecord {
            id
            required
            placeholder
            label

            _modelApiKey
            fieldId
          }
          ... on FormTextInputRecord {
            id
            label
            required

            _modelApiKey
            fieldId
            fieldType
          }
          ... on FormSignatureRecord {
            id
            label
            required

            _modelApiKey
            fieldId
          }
          ... on FormSelectboxGroupRecord {
            id
            label
            required
            fieldId
            _modelApiKey

            checkboxOptions {
              id
              label
              value
              valueNumeric
              _modelApiKey
            }
          }
          ... on FormSelectCitieRecord {
            id
            label
            fieldId
            _modelApiKey
            citySelectionActive
          }
          ... on FormCheckboxGroupRecord {
            id
            label
            required
            _modelApiKey
          }
        }
      }
    }
  }
`
