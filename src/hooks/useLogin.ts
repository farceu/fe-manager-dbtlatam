// import { signIn } from '@/services/auth';

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAuthLayout } from "@/stores/authLayout";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

const useLogin = () => {
  const router = useRouter();
  const { setIsLoading, isLoading } = useAuthLayout();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      await signIn("credentials", { redirectTo: "/dashboard", ...data })
        .then(() => {
          debugger;
          toast.success("Sign in successfully", {
            description: "Welcome back",
          });
          form.reset();
          router.push("/dashboard");
        })
        .catch((error: any) => {
          console.log("ERROR", error);
          toast.error(error?.message);
        })
        .finally(() => {
          debugger;
          setIsLoading(false);
        });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return { onSubmit, form, isLoading };
};

export default useLogin;
