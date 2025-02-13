import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { UpdatePassword } from "../../redux/slices/user";
import { LogoutUser } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Компонент для оновлення пароля
const UpdatePasswordForm = () => {
  const { t } = useTranslation(); // Виклик хука всередині компонента
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Визначення схеми валідації
  const schema = yup.object().shape({
    currentPassword: yup.string().required(t("Current password is required")),
    newPassword: yup
      .string()
      .required(t("New password is required"))
      .min(8, t("New password must be at least 8 characters")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogout = () => {
    dispatch(LogoutUser(navigate));
  };

  const onSubmit = (data) => {
    console.log(data); // Обробка даних форми
    dispatch(UpdatePassword(data, handleLogout));
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-6">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:max-w-150">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5.5 p-6.5">
            {/* Поле для поточного пароля */}
            <div>
              <label className="mb-3 block text-black dark:text-white">
                {t("Current Password")}
              </label>
              <input
                type="password"
                placeholder={t("Enter your current password")}
                {...register("currentPassword")}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.currentPassword && (
                <p className="text-red text-sm">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* Поле для нового пароля */}
            <div>
              <label className="mb-3 block text-black dark:text-white">
                {t("New Password")}
              </label>
              <input
                type="password"
                placeholder={t("Choose a new password")}
                {...register("newPassword")}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.newPassword && (
                <p className="text-red text-sm">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Кнопка для відправки */}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary py-3 px-6 text-white transition hover:bg-opacity-90"
            >
              {t("Submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
