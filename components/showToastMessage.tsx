import { toast } from "sonner";

interface ShowToastMessageProps {
    type: "error" | "success";
    message: string;
    description: string;
}

const showToastMessage = ({
    message,
    description,
    type,
}: ShowToastMessageProps) => {
    if (type === "success") {
        toast(message, {
            description: description,
            duration: 3000,
            style: {
                backgroundColor: "#A7F3D0",
                color: "#064E3B",
                border: "1px solid #047857",
                padding: "12px 16px",
                borderRadius: "12px",
                fontWeight: 500,
                fontSize: "15px",
            },
        });
    } else if (type === "error") {
        toast(message, {
            description: description,
            duration: 3000,
            style: {
                backgroundColor: "#FECACA",
                color: "#7F1D1D",
                border: "1px solid #B91C1C",
                padding: "12px 16px",
                borderRadius: "12px",
                fontWeight: 500,
                fontSize: "15px",
            },
        });
    }
};

export default showToastMessage;
