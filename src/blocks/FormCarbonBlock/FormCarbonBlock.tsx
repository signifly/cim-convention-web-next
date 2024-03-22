'use client'

import { FormCarbonBlockRecord } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
//Do not remove below comment - it is used to ignore type error
// @ts-ignore - Type error: Could not find a declaration file for module 'react-signature-canvas'
import SignatureCanvas from 'react-signature-canvas'
import { GridContainer } from '@/components/GridContainer'
import IconSelector from '@/components/IconSelector/IconSelector'
import citiesDataFly from './citiesFly.json'
import citiesDataLand from './citiesLand.json'
import transpCity from './transpCity.json'
import accomodationType from './accomodation.json'

type FieldError = {
  field: string
  error: string
}

type PostSubmit = {
  posted: boolean
  success: boolean
}

// Define types for cities from each JSON file
type CityFly = {
  City: string
  Country: string
  From: string
  To: string
  'Economy Emissions': number
  'Premium Emissions': number
}

type CityLand = {
  City: string
  Province_State: string
  Country: string
  Car_Gasoline: number
  Car_Diesel: number
  Car_Hybrid: number
  Car_Bev?: number | null
  Cruise?: number | null
  Train?: number | null
}

type FormData = {
  [key: string]: string | number | boolean // Adjust the types according to your field types
}

export function FormCarbonBlock(props: FormCarbonBlockRecord) {
  const { form, anchorId, title, description, image } = props
  const formUrlRedirectionUrl = form.redirectionBtnUrl
  const pricePerTonsCreditCarbon = 38.96 //CAD$ - from 28.66US;
  const [formData, setFormData] = useState<FormData>(() => {
    const initialFormData: FormData = {}
    form.fieldset.forEach((field: any) => {
      initialFormData[field.fieldId] = '' // Initialize all fields with empty strings
    })
    return initialFormData
  })

  const [formErrors, setFormErrors] = useState<FieldError[]>([])
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [postSubmit, setPostSubmit] = useState<PostSubmit>({
    posted: false,
    success: false,
  })

  const [cities, setCities] = useState<CityFly[]>([])
  const [citiesLand, setCitiesLand] = useState<CityLand[]>([])
  const [departureCity, setDepartureCity] = useState<string>('')
  const [numberOfNights, setNumberOfNights] = useState<number>(2)
  const [accomodationStay, setAccomodationStay] = useState<string>('')
  const [transportationInCity, setTransportationInCity] = useState<string>('')
  const [totalEmissionKgCo2e, setTotalEmissionKgCo2e] = useState<number>(0)

  const [showStep1, setShowStep1] = useState<boolean>(true)
  const [formRefCurrentSave, setFormRefCurrentSave] = useState<any>(null)

  // Calculate total carbon impact transport to convention
  const calculateTotalCarbonImpact = (): number => {
    let emissionData: number | null = null
    // Check if the transportation mode contains 'plane'
    if (formData.transportation.toString().toLowerCase().includes('plane')) {
      // Select the appropriate emission data from cityFly object based on formData.departureCity
      const selectedCity = citiesDataFly.find(
        (city) => city.City === departureCity,
      )
      if (selectedCity) {
        // Select the corresponding emissions based on the form type
        if (formData.transportation === 'Airplane-Economy') {
          emissionData = selectedCity['Economy Emissions']
        } else if (formData.transportation === 'Airplane-Premium') {
          emissionData = selectedCity['Premium Emissions']
        }
      }
    } else {
      // Select emission data from cityLand object based on formData.departureCity
      const selectedCity = citiesDataLand.find(
        (city) => city.City === departureCity,
      )

      if (selectedCity) {
        // Select the corresponding emissions based on the transportation mode
        switch (formData.transportation) {
          case 'Bus':
            emissionData = selectedCity.Car_Gasoline // Assuming Car_Gasoline represents emissions for a bus
            break
          case 'Car-Gasoline':
            emissionData = selectedCity.Car_Gasoline
            break
          case 'Car-GasolineDiesel':
            emissionData = selectedCity.Car_Diesel
            break
          case 'Car-Hybrid':
            emissionData = selectedCity.Car_Hybrid
            break
          case 'Car-BatteryElectric':
            emissionData = selectedCity.Car_BEV
            break
          case 'Train':
            emissionData =
              selectedCity.Train !== undefined ? selectedCity.Train : null
            break
          default:
            emissionData = null
        }
      }
    }
    // Return emission data in kgCO2e
    return emissionData !== null ? emissionData : 0
  }
  /**ACCOMODATION CALCULATOR */
  // Calculate accommodation emissions
  const calculateAccommodationEmissions = (
    accommodationType: string,
    numberOfNights: number,
  ): number => {
    let emissionData: number | null = null
    const accommodation = accomodationType.find(
      (acc) => acc.accomodationType === accommodationType,
    )
    if (accommodation) {
      // Select the emission data based on the number of nights
      switch (numberOfNights) {
        case 1:
          emissionData = accommodation['1']
          break
        case 2:
          emissionData = accommodation['2']
          break
        case 3:
          emissionData = accommodation['3']
          break
        case 4:
          emissionData = accommodation['4']
          break
        case 5:
          emissionData = accommodation['5']
          break
        case 6:
          emissionData = accommodation['6']
          break
        default:
          emissionData = null
      }
    }
    // console.log("Accomodation Emissions  "+ emissionData)
    // Return emission data in kgCO2e
    return emissionData !== null ? emissionData : 0
  }

  function calculateDailyCommuteEmissions(
    commutingType: string,
    numberOfNights: string | number,
  ) {
    // Retrieve emissions data based on commuting type
    const emissionsData = transpCity.find(
      (item) => item.commutingType === commutingType,
    )
    if (!emissionsData) {
      // Handle case where commuting type is not found
      return 0
    }
    const emissions =
      emissionsData[numberOfNights.toString() as keyof typeof emissionsData] ||
      0
    // console.log("Communting Emissions--- "+ emissions)
    return emissions
  }

  const sigCanvas = useRef(null)
  const formRef = useRef(null)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setFormSubmitted(true)
    const formObject = getFormObject()
    const isFormValid = validateForm(formObject)
    const isDepartureCityEmpty = departureCity === ''

    if (isFormValid && !isDepartureCityEmpty) {
      // Store form data in state
      setFormData(formObject)
      // Advance to the next step
      setShowStep1(false) // Show step 2
      const totalEmissions =
        Number(
          calculateDailyCommuteEmissions(transportationInCity, numberOfNights),
        ) +
        Number(
          calculateAccommodationEmissions(accomodationStay, numberOfNights),
        ) +
        Number(calculateTotalCarbonImpact())
      setTotalEmissionKgCo2e(totalEmissions) //setTotal
    } else {
      // Reset the form submitted state
      setFormSubmitted(false)
      // Scroll to the top of the form
      //window.scrollTo({ top: 0, behavior: 'smooth' });
      // Set the form error for the departure city if it's empty
      if (isDepartureCityEmpty) {
        setFormErrors((prevErrors) => [
          ...prevErrors,
          { field: 'select-departure-city', error: 'required' },
        ])
      }
    }
  }

  const handlePrevious = () => {
    setShowStep1(true) // Show step 1 again
  }
  //Send Email on purchase click and will redirect
  const handleSendToEmail = (e: any) => {
    e.preventDefault()
    const formObject = getFormObject()

    //add results to email
    formObject.totalCarbonFootprint = `${(totalEmissionKgCo2e / 1000).toFixed(
      2,
    )} tCO2e`
    formObject.totalCarbonCreditAvg = `${(
      (totalEmissionKgCo2e / 1000) *
      pricePerTonsCreditCarbon
    ).toFixed(2)} CAD`

    if (validateForm(formObject)) {
      //This use forspree to send forms
      fetch('https://formspree.io/f/xgegllde', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      })
        .then((response) => {
          if (response.status === 200) {
            // Handle successful submission
            setPostSubmit({ posted: true, success: true })
            // Redirect user after successful submission
            if (formUrlRedirectionUrl) {
              if (
                formUrlRedirectionUrl.includes('https://convention.cim.org/')
              ) {
                window.location.href = formUrlRedirectionUrl || '#'
              }
              // Open the redirection URL in a new tab or window
              window.open(formUrlRedirectionUrl, '_blank')
            }
          } else {
            // Handle submission failure
            setPostSubmit({ posted: true, success: false })
          }
          return response.json()
        })
        .catch((error) => {
          // Handle submission error
          console.error('Error:', error)
          setPostSubmit({ posted: true, success: false })
        })
    }
  }
  const handleChange = (e: any) => {
    const formObject = getFormObject()
    if (formSubmitted) {
      validateForm(formObject)
    }
    if (e.target.name === 'Select-duration') {
      //setNumberOfNights(e.target.value);
      const valueAsNumber = parseInt(e.target.value, 10) // Parse the value to an integer
      setNumberOfNights(isNaN(valueAsNumber) ? 0 : valueAsNumber) // If the parsed value is NaN, set it to an empty string
    } else if (e.target.name === 'select-accommodation-type') {
      setAccomodationStay(e.target.value)
    } else if (e.target.name === 'transportationInVancouver') {
      setTransportationInCity(e.target.value)
    }
  }

  const handleTextInputChange = (e: any) => {
    e.target.value = e.target.value.replace(/[^0-9()+-\s]/g, '')
  }

  const getFormObject = () => {
    const formData =
      formRefCurrentSave instanceof HTMLFormElement
        ? new FormData(formRefCurrentSave)
        : new FormData(formRef.current as any)
    const formObject = {} as any
    // Set initial Form Object
    form.fieldset.forEach((field) => {
      formObject[field.fieldId] = null
    })
    // Set Current Form Values
    formData.forEach((value, key) => {
      formObject[key] = value
    })
    // Add Signature to Form Object if required
    if (form.requireSignature) {
      let signature = sigCanvas.current as any
      formObject.signature = signature?.getSignaturePad()?.points?.length
        ? signature?.toDataURL()
        : null
    }
    return formObject
  }

  const validateForm = (formObject: any) => {
    const errors: FieldError[] = []
    if (formRef.current) {
      setFormRefCurrentSave(formRef.current)
    }
    Object.keys(formObject).forEach((key) => {
      const fieldData = form.fieldset.find(
        (field) => field.fieldId === key,
      ) as any

      if (
        !formObject[key] &&
        (fieldData?.required || (key === 'signature' && form.requireSignature))
      ) {
        errors.push({ field: key, error: 'required' })
      }

      if (fieldData?._modelApiKey === 'form_text_input') {
        const phonePattern = /^[0-9()+-]{6,18}$/g
        if (
          fieldData?.fieldType === 'tel' &&
          !phonePattern.test(formObject[key])
        ) {
          const existingError = errors.find((error) => error.field === key)
          if (!existingError) {
            errors.push({ field: key, error: 'pattern' })
          }
        }

        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/g
        if (
          fieldData?.fieldType === 'email' &&
          !emailPattern.test(formObject[key])
        ) {
          const existingError = errors.find((error) => error.field === key)
          if (!existingError) {
            errors.push({ field: key, error: 'pattern' })
          }
        }
      }
    })

    setFormErrors(errors)
    return errors.length === 0
  }

  const fieldHasError = (fieldId: string) => {
    return formErrors.find((error) => error.field === fieldId)
  }

  const clearSignature = () => {
    let signature = sigCanvas.current as any
    signature?.clear()
  }

  const arrangedOptions = (options: any[]) => {
    const arrangedOptions = []
    const rows = Math.ceil(options.length / 2)
    for (let i = 0; i < rows; i++) {
      arrangedOptions.push(options[i])
      if (options[i + rows]) {
        arrangedOptions.push(options[i + rows])
      }
    }
    return arrangedOptions
  }

  const halfWidthFields: number[] = []
  let consecutiveTextFields = 0

  form.fieldset.forEach((field: any, index: number) => {
    const isTextInput = field._modelApiKey === 'form_text_input'
    consecutiveTextFields = isTextInput ? consecutiveTextFields + 1 : 0
    if (
      isTextInput &&
      !(
        form.fieldset[index + 1]?._modelApiKey === 'form_text_input' &&
        consecutiveTextFields % 2 !== 0
      )
    ) {
      halfWidthFields.push(index)
    }
  })

  const checkmarkBg =
    'checked:bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMC42NjY2IDEuNUw0LjI0OTkyIDcuOTE2NjdMMS4zMzMyNSA1IiBzdHJva2U9IiMwMEE1NTAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=")] checked:bg-no-repeat checked:bg-center checked:bg-[background-size: 75%] checked:p-1'

  useEffect(() => {
    if (
      typeof formData.transportation === 'string' &&
      formData.transportation.toLowerCase().includes('airplane')
    ) {
      setCities(citiesDataFly as CityFly[])
    } else {
      setCitiesLand(citiesDataLand as CityLand[])
    }
  }, [formData])

  /*** */
  return (
    <section
      className="flex flex-col gap-8 bg-brand-gradient-form py-10 md:gap-16 md:py-20"
      id={anchorId ?? undefined}
    >
      <div className="container flex max-w-[100%] flex-col items-center justify-center gap-4 ">
        <h2 className="text-20/[140%] font-semibold md:text-32/[125%]">
          {title}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: description || '' }}
          className="mb-4 max-w-[800px] text-14/[150%] md:text-16/[150%]"
        />
        <GridContainer className="gap-y-8">
          <div className="col-span-6">
            {image &&
              (image?.responsiveImage ? (
                <DatoImage
                  data={image.responsiveImage}
                  className="h-auto w-[100%] object-contain"
                  pictureClassName="object-contain"
                />
              ) : (
                <Image
                  src={image?.url || ''}
                  alt={image?.alt || ''}
                  fill
                  priority={false}
                  className="object-contain"
                />
              ))}
          </div>

          <div className="col-span-6">
            {showStep1 && (
              <form
                onSubmit={(e) => handleSubmit(e)}
                onChange={(e) => handleChange(e)}
                className="grid grid-cols-2 gap-4 md:gap-6"
                noValidate
                ref={formRef}
              >
                {form.fieldset.map((field: any, i: number) => (
                  <div
                    key={field.id}
                    className={`col-span-2 flex flex-col justify-start ${
                      field._modelApiKey === 'form_selectbox_group'
                        ? 'md:col-span-1'
                        : halfWidthFields.includes(i)
                          ? 'md:col-span-1'
                          : 'md:col-span-2'
                    } `}
                  >
                    <label
                      htmlFor={field.fieldId}
                      className="mb-2 text-12/[140%] text-brand-grey-600 md:text-14/[150%]"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-brand-red">*</span>
                      )}
                    </label>
                    {/* TEXT INPUT  */}
                    {field._modelApiKey === 'form_text_input' && (
                      <input
                        {...(field?.fieldType === 'tel' && { maxLength: 18 })}
                        onChange={(e) => {
                          const { value } = e.target
                          setFormData((prevFormData: FormData) => {
                            return { ...prevFormData, [field.fieldId]: value }
                          })
                        }}
                        type={field.fieldType === 'email' ? 'email' : 'text'}
                        id={field.fieldId}
                        name={field.fieldId}
                        required={field.required}
                        disabled={postSubmit.posted && postSubmit.success}
                        value={String(formData[field.fieldId]) || ''}
                        className="rounded border-[1px] border-brand-grey-300 px-[14px] py-3 text-14/[150%] focus:shadow-skyblue focus:outline-none md:text-16/[150%]"
                      />
                    )}
                    {/* SELECTBOX */}
                    {field._modelApiKey === 'form_selectbox_group' && (
                      <div className="flex flex-col">
                        <select
                          id={field.fieldId}
                          name={field.fieldId}
                          className="rounded border border-gray-300 px-3 py-3 focus:border-brand-green focus:outline-none"
                          disabled={postSubmit.posted && postSubmit.success}
                          value={String(formData[field.fieldId] || '')}
                          onChange={(e) => {
                            const { value } = e.target
                            // Update the available cities based on the selected transportation option
                            const selectedCitiesData =
                              value === 'Airplane-Economy'
                                ? citiesDataFly
                                : citiesDataLand
                            if (
                              value == 'Airplane-Economy' ||
                              (value == 'Airplane-Premium' &&
                                value != undefined)
                            ) {
                              setCities(selectedCitiesData as CityFly[])
                            } else {
                              setCitiesLand(selectedCitiesData as CityLand[])
                            }

                            // Update the form data
                            setFormData((prevFormData) => {
                              return { ...prevFormData, [field.fieldId]: value }
                            })
                          }}
                        >
                          <option disabled value="">
                            Select an option
                          </option>
                          {field.checkboxOptions.map(
                            (option: any, index: number) => (
                              <option
                                key={`${option.id}-${index}`}
                                value={option.value}
                                data-value-numeric={option.valueNumeric}
                              >
                                {option.label}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                    )}

                    {/* SELECT CITY */}
                    {field._modelApiKey === 'form_select_citie' && (
                      <div
                        className="relative flex flex-col"
                        style={{ marginBottom: '2em' }}
                      >
                        <input
                          type="text"
                          placeholder="Search for a city or capital"
                          className="rounded border border-gray-300 px-3 py-2 focus:border-brand-green focus:outline-none"
                          onChange={(e) => {
                            const searchTerm = e.target.value.toLowerCase()
                            const filteredCities = cities.filter(
                              (city) =>
                                city.City &&
                                city.City.toLowerCase().includes(searchTerm),
                            )
                            setDepartureCity(
                              filteredCities.length > 0
                                ? filteredCities[0]?.City || ''
                                : '',
                            )
                          }}
                          required
                        />
                        {formData.transportation
                          .toString()
                          .toLowerCase()
                          .includes('plane') && (
                          <select
                            id={field.fieldId}
                            name={field.fieldId}
                            value={departureCity || ''}
                            onChange={(e) => {
                              setDepartureCity(e.target.value)
                              // Update the form data
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                [field.fieldId]: e.target.value,
                              }))
                            }}
                            className="absolute left-0 right-0 top-full z-10 rounded border border-gray-300 px-3 py-2 focus:border-brand-green focus:outline-none"
                            required={field.citySelectionActive}
                          >
                            <option disabled value="">
                              Select a city
                            </option>
                            {cities.map((city: CityFly, index: number) => (
                              <option
                                key={`${city.City}-${index}`}
                                value={city.City}
                              >
                                {city.City} - {city.From}
                              </option>
                            ))}
                          </select>
                        )}
                        {!formData.transportation
                          .toString()
                          .toLowerCase()
                          .includes('airplane') && (
                          <select
                            id={field.fieldId}
                            name={field.fieldId}
                            value={departureCity || ''}
                            onChange={(e) => {
                              setDepartureCity(e.target.value)
                              // Update the form data
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                [field.fieldId]: e.target.value,
                              }))
                            }}
                            className="absolute left-0 right-0 top-full z-10 rounded border border-gray-300 px-3 py-2 py-3 focus:border-brand-green focus:outline-none"
                            required={field.citySelectionActive}
                          >
                            <option disabled value="">
                              Select a city
                            </option>
                            {citiesLand.map((city: CityLand, index: number) => (
                              <option
                                key={`${city.City}-${index}`}
                                value={city.City}
                              >
                                {city.City}
                              </option>
                            ))}
                          </select>
                        )}

                        {formSubmitted &&
                          field.citySelectionActive &&
                          !departureCity && (
                            <span className="mt-2 text-12/[140%] text-brand-red md:text-14/[150%]">
                              Please select a city {field.fieldErrorMsg}
                            </span>
                          )}
                      </div>
                    )}

                    {/* Checkbox  */}
                    {field._modelApiKey === 'form_checkbox_group' && (
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {arrangedOptions(field.checkboxOptions).map(
                          (option: any, index: number) => (
                            <div
                              key={`${option.id}-${index}`}
                              className="col-span-2 row-span-1 flex w-[100%] items-center md:col-span-1"
                            >
                              <input
                                type="radio"
                                id={`${field.fieldId}_${option.value}`}
                                name={field.fieldId}
                                value={option.value}
                                disabled={
                                  postSubmit.posted && postSubmit.success
                                }
                                className={`h-[20px] w-[20px] cursor-pointer appearance-none rounded border-[1px] border-brand-grey-300 bg-white checked:border-brand-green focus:shadow-skyblue focus:outline-none ${checkmarkBg}`}
                              />
                              <label
                                htmlFor={`${field.fieldId}_${option.value}`}
                                className="ml-3 cursor-pointer text-12/[140%] md:text-14/[150%]"
                              >
                                {option.label}
                              </label>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                    {/* TEXT AREA  */}
                    {field._modelApiKey === 'form_textarea' && (
                      <textarea
                        id={field.fieldId}
                        name={field.fieldId}
                        className="h-[150px] resize-none rounded border-[1px] border-brand-grey-300 px-[14px] py-3 text-14/[150%] focus:shadow-skyblue focus:outline-none md:text-16/[150%]"
                        placeholder={field.placeholder || ''}
                        required={field.required}
                        disabled={postSubmit.posted && postSubmit.success}
                      />
                    )}
                    {fieldHasError(field.fieldId) && (
                      <span className="mt-2 text-12/[140%] text-brand-red md:text-14/[150%]">
                        {fieldHasError(field.fieldId)?.error === 'pattern'
                          ? form.fieldTypeErrorMsg
                          : form.fieldErrorMsg}
                      </span>
                    )}
                  </div>
                ))}
                {form.requireSignature && (
                  <div className="col-span-2">
                    <label className="mb-2 text-14/[150%] text-brand-grey-600">
                      {form.signatureLabel}
                    </label>
                    <div className="mt-2 overflow-hidden rounded border-[1px] border-brand-grey-300">
                      <SignatureCanvas
                        ref={sigCanvas}
                        penColor="black"
                        canvasProps={{
                          height: 250,
                          className: 'bg-white w-[100%] cursor-crosshair',
                        }}
                        onEnd={() => handleChange(null)}
                      />
                      {fieldHasError('signature') && (
                        <div className="w-[100%] bg-brand-red py-2 text-center text-12 text-white">
                          {form.signatureErrorMsg}
                        </div>
                      )}
                      <button
                        className="w-[100%] overflow-hidden bg-gray-400 px-6 py-[10px] text-14/[125%] font-[500] text-white shadow-xs lg:text-16"
                        onClick={clearSignature}
                        type="button"
                      >
                        {form.signatureClear}
                      </button>
                    </div>
                  </div>
                )}
                {formErrors.length > 0 && (
                  <div className="pointer-events-none col-span-2 flex items-center gap-3 rounded border-none bg-brand-red-translucent px-4 py-2 text-brand-red">
                    <IconSelector
                      selectorId="alert_icon"
                      className="text-brand-red"
                    />
                    {form.formErrorMsg ||
                      '*Please make sure all fields are filled in correctly.'}
                  </div>
                )}
                <div className="col-span-2">
                  <button
                    disabled={postSubmit.posted && postSubmit.success}
                    type="submit"
                    onClick={handleSubmit}
                    className="w-[50%] rounded bg-brand-gradient px-6 py-[10px] text-14/[125%] font-[500] text-white shadow-xs transition-all focus:shadow-skyblue focus:outline-none disabled:cursor-not-allowed disabled:bg-brand-grey-300 lg:text-16"
                  >
                    {postSubmit.posted
                      ? postSubmit.success
                        ? form.submitBtnLabel
                        : form.previousStepBtn || 'Previous'
                      : form.nextStepBtn || 'Next'}
                  </button>
                </div>
              </form>
            )}
            {/* Step 2 Section */}
            {!showStep1 && (
              <div className="step-2 col-span-2 mb-3 flex flex-col justify-start md:col-span-1">
                <h2
                  className="mb-3 text-20/[140%] font-semibold md:text-32/[125%]"
                  style={{ fontSize: '1.25rem' }}
                >
                  {form.step2Title}
                </h2>
                <div className="structured-text mb-3  text-14/[150%] md:text-16/[150%]">
                  {Object.entries(formData).map(([fieldId, value]) => {
                    // Find the corresponding field in the form fieldset
                    const field = form.fieldset.find(
                      (field) => field.fieldId === fieldId,
                    )
                    // Use the field label as the title
                    const title = field ? field.label : fieldId
                    return (
                      <p
                        key={fieldId}
                        className="mb-2 text-12/[140%] text-brand-grey-600 md:text-14/[150%]"
                        style={{ marginBottom: '2px' }}
                      >
                        <strong
                          className="bg-clip-text text-transparent"
                          style={{
                            backgroundImage:
                              'linear-gradient(to right, rgb(37, 170, 198), rgb(12, 167, 77), rgb(0 166 84))',
                            paddingRight: '0.5em',
                          }}
                        >
                          {title}:{' '}
                        </strong>{' '}
                        {value}
                      </p>
                    )
                  })}
                </div>

                <button
                  onClick={handlePrevious}
                  className="mb-3 w-[50%] rounded bg-brand-gradient px-6 py-[10px] text-14/[125%] font-[500] text-white shadow-xs transition-all focus:shadow-skyblue focus:outline-none disabled:cursor-not-allowed disabled:bg-brand-grey-300 lg:text-16"
                >
                  {form.previousStepBtn || 'Back'}
                </button>

                <div className="mx-auto mb-6 mt-6 w-3/4 border-b border-gray-300"></div>

                {/* Display total carbon impact */}
                {totalEmissionKgCo2e.toFixed(2) !== undefined && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(45%,1fr))',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        padding: '10px',
                        textAlign: 'center',
                        border: '2px solid #00ade9',
                        boxShadow: '2px 2px 1px 0 #f3ed047a',
                        borderRadius: '3%',
                      }}
                      className="mb-3 max-w-[800px] text-14/[150%] md:text-16/[150%]"
                    >
                      <strong>{form.carbonFootprintResults}</strong> <br />
                      <p
                        style={{
                          color: '#00abc5',
                          fontSize: '1.5em',
                          fontWeight: '600',
                          textShadow: '0 0 1px #6d6d6d96',
                          marginTop: '1em',
                        }}
                      >{`${(totalEmissionKgCo2e / 1000).toFixed(2)} tCO2e`}</p>
                    </div>

                    <div
                      style={{
                        padding: '10px',
                        textAlign: 'center',
                        border: '2px solid #00ade9',
                        boxShadow: '2px 2px 1px 0 #f3ed047a',
                        borderRadius: '3%',
                      }}
                      className="mb-3 max-w-[800px] text-14/[150%] md:text-16/[150%]"
                    >
                      <strong>{form.priceCreditsTitle}</strong> <br />
                      <p
                        style={{
                          color: '#00abc5',
                          fontSize: '1.5em',
                          fontWeight: '600',
                          textShadow: '0 0 1px #6d6d6d96',
                          marginTop: '1em',
                        }}
                      >
                        $
                        {`${(
                          (totalEmissionKgCo2e / 1000) *
                          pricePerTonsCreditCarbon
                        ).toFixed(2)} CAD `}
                        <span style={{ fontSize: '0.6em' }}>(approx.)</span>
                      </p>
                    </div>
                  </div>
                )}
                {/* Redirection button  */}
                <a
                  href={formUrlRedirectionUrl || ''}
                  className="mb-1 mt-3 w-[50%] rounded bg-brand-gradient px-6 py-[10px] text-14/[125%] font-[500] text-white shadow-xs transition-all focus:shadow-skyblue focus:outline-none lg:text-16"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textAlign: 'center' }}
                  onClick={handleSendToEmail}
                >
                  {form.redirectionLinkBtn || 'Purchase Credits'}
                </a>
              </div>
            )}
          </div>
        </GridContainer>
      </div>
    </section>
  )
}
