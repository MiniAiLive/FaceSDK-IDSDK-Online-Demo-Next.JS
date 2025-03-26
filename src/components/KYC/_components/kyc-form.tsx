import { FC, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import KycRadio from "@/components/svg/kyc-radio";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface KYCFormProps {
  router: AppRouterInstance;
}

interface FormData {
  fullName: string;
  address: string;
  sex: string;
  dob: string | null; // Store formatted date as string
}

const LOCAL_STORAGE_KEY = "kycFormData";

const KYCForm: FC<KYCFormProps> = ({ router }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    // getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      address: "",
      // sex: "",
      dob: null,
    },
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsedData: FormData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key as keyof FormData, parsedData[key as keyof FormData]);
      });
    }
  }, [setValue]);

  // Save data to localStorage on form update
  const saveToLocalStorage = (data: FormData) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    saveToLocalStorage(data); // Save data before navigating
    router.push("?license=proof-identity");
  };

  // const handleBack = () => {
  //   const currentData = getValues(); // Get current form data
  //   saveToLocalStorage(currentData); // Save data before navigating back
  //   router.back(); // Navigate to the previous page
  // };

  return (
    <div className="lg:w-6/12 h-[200px] mx-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <KycRadio />
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
          2
        </div>
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
          3
        </div>
         
      </div>

      {/* Subtitle */}
      <h2 className="text-center text-[16px] font-semibold mt-6">
        Enter your details
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6 ">
        {/* Full Name */}
        <div>
          <input
            {...register("fullName", { required: "Full name is required" })}
            type="text"
            placeholder="Full name"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${
              errors.fullName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <input
            {...register("address", { required: "Address is required" })}
            type="text"
            placeholder="Address"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${
              errors.address
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Sex 
        <div>
          <input
            {...register("sex", { required: "Sex is required" })}
            type="text"
            placeholder="Sex"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${
              errors.sex
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary"
            }`}
          />
          {errors.sex && (
            <p className="text-red-500 text-sm mt-1">{errors.sex.message}</p>
          )}
        </div>
*/}
        {/* Date of Birth */}
        <div>
          <Controller
            name="dob"
            control={control}
            rules={{ required: "Date of birth is required" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                selected={value ? new Date(value) : null}
                onChange={(date) => {
                  const formattedDate = date
                    ? date.toISOString().split("T")[0]
                    : null;
                  onChange(formattedDate);
                }}
                onBlur={onBlur}
                placeholderText="Date of birth"
                dateFormat="yyyy-MM-dd"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none ${
                  errors.dob
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                ref={ref}
              />
            )}
          />

          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* <button
            type="button"
            onClick={handleBack}
            className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-300 transition"
          >
            Back
          </button> */}
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg px-4 py-2 hover:bg-orange-600 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default KYCForm;
