import { Alert, AlertTitle } from "@/components/ui/alert";
import { FaCircleInfo } from "react-icons/fa6";

type FormAlertProps = {
  message: string;
};

export default function FormAlert({ message }: FormAlertProps) {
  return (
    <Alert className="mb-5 w-full text-black">
      <FaCircleInfo className="text-lg" color="#3b82f6" />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}
