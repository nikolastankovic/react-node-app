import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Page Not Found</CardTitle>
					<CardDescription>
						
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button onClick={() => {navigate('/')}}>Go Home</Button>
				</CardContent>
			</Card>
		</div>
	)
}