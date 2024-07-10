import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Form, useActionData } from "react-router-dom";

export function contactFormAction() {
  return "Feedback sent succesfully";
}
export default function ContactPage() {
  const action = useActionData();
  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Send us your feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <Form id="contactForm" method="post" className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Subject</Label>
              <Input name="subject" placeholder="Subject Title" required />
            </div>
            <div className="grid gap-2">
              <Textarea
                name="message"
                placeholder="Type your message here"
                className="min-h-32"
                required
              />
            </div>
          </Form>
        </CardContent>
        <CardFooter className="flex gap-8">
          <Button form="contactForm">Submit</Button>
          {action && <p>{action}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
