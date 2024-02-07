"use client";

import * as yup from "yup";
import { useContext, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import DefaultButton from "@/components/ui/Buttons/DefaultButton";
import DefaultSelect from "@/components/ui/inputs/DefaultSelect";
import Map from "@/components/map/Map";
import ProvinceSelect from "@/components/ui/inputs/address/ProvinceSelect";
import CitySelect from "@/components/ui/inputs/address/CitySelect";

import TextArea from "@/components/ui/inputs/TextArea";

interface StepTwoProps<T> {
  locales: T;
  stepOneDetails: {};
}

const StepTwo: React.FC<StepTwoProps<{ [key: string]: string }>> = ({
  locales,
  stepOneDetails,
}) => {
  // const { registerFunc } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMap, setShowMap] = useState(false);

  const validationSchema = yup.object({
    province: yup.array().min(1, locales.required),
    city: yup.array().min(1, locales.required),

    area: yup.array().test({
      name: "conditionalRequired",
      test: function (value: any) {
        const city = this.parent.city as any;
        return (
          !(city && city.length === 1 && city[0].id === 1) ||
          (value && value.length > 0)
        );
      },
      message: locales.required,
    }),

    address: yup.string().required(locales.required),
    latlang: yup.object(),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<yup.InferType<typeof validationSchema>>({
    defaultValues: {
      province: [],
      city: [],
      area: [],
      address: "",
      latlang: {},
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // await registerFunc({
      //   last_name: (stepOneDetails as { last_name: string }).last_name,
      //   first_name: (stepOneDetails as { first_name: string }).first_name,
      //   national_id: (stepOneDetails as { national_code: string })
      //     .national_code,
      //   mobile_number: (stepOneDetails as { mobile_number: string })
      //     .mobile_number,
      //   categories: (stepOneDetails as { activity_field: [{ id: string }] })
      //     .activity_field?.[0]?.id,
      //   address: data.address,
      //   price_classes: [],
      //   country: 1,
      //   province: data.province?.[0]?.id,
      //   city: data.city?.[0]?.id,
      //   lat: data.latlang?.lat,
      //   long: data.latlang?.lng,
      // });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const provinceWatch = watch("province");
  const cityWatch = watch("city");
  const areaWatch = watch("area");

  // const { data: provinceList } = useGetProvinceByCountryQuery(1);

  // const { data: citiesList } = useGetCitiesByProvinceQuery(
  //   provinceWatch?.[0]?.id ?? ""
  // );

  return (
    <>
      {showMap && (
        <Map
          showMap={showMap}
          setShowMap={setShowMap}
          setValue={setValue}
          btnTitle={locales.add_address}
        />
      )}

      {!showMap && (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 pt-8">
            <ProvinceSelect
            isSearchable={false}
              disabled={isLoading}
              label={locales.province}
              options={[]}
              onChange={(value) =>
                setValue("province", [value], {
                  shouldValidate: true,
                })
              }
              setValue={setValue}
              value={provinceWatch}
              required={true}
              placeHolder={locales.province}
              errors={errors}
              id="province"
            />

            <CitySelect
            isSearchable={false}
              disabled={isLoading}
              label={locales.city}
              options={[]}
              onChange={(value) =>
                setValue("city", [value], {
                  shouldValidate: true,
                })
              }
              value={cityWatch}
              required={true}
              placeHolder={locales.city}
              errors={errors}
              id="city"
            />

            {cityWatch?.[0]?.id == 1 && (
              <DefaultSelect
                disabled={isLoading}
                label={locales.area}
                options={[
                  { id: 1, name: "a" },
                  { id: 2, name: "b" },
                ]}
                onChange={(value) =>
                  setValue("area", [value], {
                    shouldValidate: true,
                  })
                }
                value={areaWatch}
                required={true}
                placeHolder={locales.area}
                errors={errors}
                id="area"
                defaultName="defaultName"
              />
            )}

            <TextArea
              label={locales.address}
              id="address"
              register={register}
              errors={errors}
              disabled={isLoading}
              required={true}
              placeholder={locales.address}
              icon={
                <div onClick={() => setShowMap(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0d9488"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </div>
              }
            />

            <DefaultButton
              disabled={isLoading}
              type="submit"
              fullWidth
              className="translate-y-7"
            >
              {locales.register}
            </DefaultButton>
          </div>
        </form>
      )}
    </>
  );
};

export default StepTwo;
