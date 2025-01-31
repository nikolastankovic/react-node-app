import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthService } from "@/services/auth-service";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
});

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const navigate = useNavigate();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await AuthService.login(values);
			if (response.status === 200) {
				useAuthStore.getState().setAccessToken(response.data.accessToken);
				navigate('/');
			}
		} catch (error) {
			console.log('error', error);
		}
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Enter your email"
												{...field}
											/>
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
											<Input
												type="password"
												placeholder="Enter your password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full">
								Login
							</Button>
						</form>
					</Form>

					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link to="/register" className="underline underline-offset-4">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
