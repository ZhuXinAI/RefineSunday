import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { Text } from "@chakra-ui/react";

type Props = {
  form: {
    endpoint: string;
    redirectAfterSuccess: string;
  };
  isStatic?: boolean;
  children: React.ReactNode;
};

export const FormWrapper: React.FC<Props> = ({ form, children, isStatic }) => {
  const methods = useForm();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    if (isStatic && !submitted) {
      try {
        await axios.post(form.endpoint, data);
        setSubmitted(true);
        if (form.redirectAfterSuccess) {
          window.location.href = form.redirectAfterSuccess;
        }
      } catch {

      } finally {

      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        style={{
          width: "100%",
          height: "100%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
