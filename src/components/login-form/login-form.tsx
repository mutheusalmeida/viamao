import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  PasswordControl,
  PasswordField,
  PasswordToggler,
} from "@/components/ui/password";
import { validatePassword } from "@/js/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

export const LoginForm = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .refine(
        (password) => validatePassword(password),
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&)",
      ),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    setIsLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.ok) {
      setError(result.message);
      setIsLoading(false);

      return;
    }

    setIsLoading(false);
    form.reset();
    window.location.replace("/my-trips");
  };

  return (
    <div>
      <div>
        <h1 className="text-center mb-12 font-bold text-4xl">
          Log in or Sign up
        </h1>

        {error && (
          <p className="text-sm mb-5 text-center font-medium text-destructive">
            {error}
          </p>
        )}

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input {...field} placeholder="Enter your email" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <PasswordField
                        render={({ showPassword }) => (
                          <PasswordControl>
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                            />

                            <PasswordToggler />
                          </PasswordControl>
                        )}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                size="lg"
                type="submit"
                disabled={isLoading}
                className="w-full gap-2 disabled:opacity-75"
              >
                {isLoading ? <>Loading...</> : <>Continue</>}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <p className="text-center font-medium text-sm text-neutral-500 max-w-72">
          By using our services, you agree to our{" "}
          <a href="/" className="font-normal hover:underline text-primary">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </div>
  );
};
