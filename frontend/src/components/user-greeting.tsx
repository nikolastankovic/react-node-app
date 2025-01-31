import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UserGreetingProps {
  firstName: string;
  lastName: string;
  onLogout: () => void;
}

export const UserGreeting = ({ firstName, lastName }: UserGreetingProps) => {
  return (
    <Card className="w-full md:w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back  {firstName} {lastName}</CardTitle>
				<CardDescription>
				You are logged in
			</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        
      </CardContent>
    </Card>
  );
};