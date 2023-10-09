export default function formatCurrency(number: number) {
    // Ensure the input is a valid number
    if (isNaN(number)) {
        return "Invalid input";
    }

    // Convert the number to a string and split it into integer and decimal parts
    const parts = number.toString().split(".");
    let integerPart = parts[0];
    const decimalPart = parts[1] || "";

    // Add commas as thousands separators to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer and decimal parts with the appropriate separator
    const formattedNumber = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;

    // Add the Indian currency symbol (Rupee) if needed
    const formattedCurrency = `₹${formattedNumber}`;

    return formattedCurrency;
}