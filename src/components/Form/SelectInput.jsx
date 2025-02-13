import { CaretDown, Globe } from "@phosphor-icons/react";
import React from "react";
import { useTranslation } from "react-i18next";
export default function SelectInput({ register }) {
  const { t } = useTranslation();
  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        {t("Select Country")}
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute top-1/2 left-4 -translate-y-1/2">
          <Globe size={20} />
        </span>

        <select
          {...register("country")}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            {t("Select Country")}
          </option>
          <option value="Ukraine" className="text-body dark:text-bodydark">
            {t("Ukraine")}
          </option>
          <option value="UK" className="text-body dark:text-bodydark">
            {t("UK")}
          </option>
          <option value="USA" className="text-body dark:text-bodydark">
            {t("USA")}
          </option>
        </select>

        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <CaretDown size={20} />
        </span>
      </div>
    </div>
  );
}
